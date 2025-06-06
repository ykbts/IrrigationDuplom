import joblib
from fastapi import HTTPException

def load_model(model_path: str):
    try:
        model = joblib.load(model_path)
        return model
    except FileNotFoundError as e:
        raise HTTPException(status_code=500, detail=f"Model not found: {model_path}") from e
    except Exception as e:
        raise HTTPException(status_code=500, detail="Error loading model.") from e
