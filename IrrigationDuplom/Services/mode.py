import app_state

def set_auto_mode(mode: bool):
    app_state.is_auto_mode = mode
    print(f"Режим змінено на {'автоматичний' if app_state.is_auto_mode else 'ручний'}")
