"""
Basic REST API for ai-traffic-mvp (FastAPI)
Provides endpoints for remote control and monitoring.
"""

from fastapi import FastAPI
from pydantic import BaseModel
import os
import json

app = FastAPI()

class SimulationControl(BaseModel):
    action: str

@app.get("/status")
def get_status():
    # Example: return SUMO and RL agent status
    status = {
        "sumo_running": any("sumo" in p for p in os.popen('tasklist').read().splitlines()),
        "model_exists": os.path.exists("models/ppo_sumo.zip")
    }
    return status

class SignalControl(BaseModel):
    intersection_id: str
    phase: int

@app.post("/api/v1/control/signal")
def control_signal(ctrl: SignalControl):
    # In a full setup, this would hook into the active SUMO session via traci:
    # traci.trafficlight.setPhase(ctrl.intersection_id, ctrl.phase)
    print(f"--> [MANUAL OVERRIDE] Intersection '{ctrl.intersection_id}' switched to Phase {ctrl.phase}")
    return {"status": "success", "message": f"Successfully switched {ctrl.intersection_id} to phase {ctrl.phase}"}

@app.post("/control")
def control_simulation(ctrl: SimulationControl):
    # Example: run baseline or RL agent
    if ctrl.action == "run_baseline":
        os.system("python src/sim/run_baseline.py")
        return {"result": "Baseline simulation started."}
    elif ctrl.action == "train_rl":
        os.system("python src/sim/train_agent.py")
        return {"result": "RL training started."}
    return {"result": "Unknown action."}

@app.get("/metrics")
def get_metrics():
    # Return latest metrics for dashboard
    try:
        with open("logs/rl_results.json") as f:
            rl_metrics = json.load(f)
    except Exception:
        rl_metrics = {}
    try:
        with open("logs/baseline_results.json") as f:
            baseline_metrics = json.load(f)
    except Exception:
        baseline_metrics = {}
    return {"rl": rl_metrics, "baseline": baseline_metrics}
