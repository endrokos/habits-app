from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List

app = FastAPI()

class Habit(BaseModel):
    id: int
    name: str
    identity: str
    level: int
    energy: int

# simple in-memory store
habits_db: List[Habit] = []

@app.post('/habits', response_model=Habit)
def create_habit(habit: Habit):
    habits_db.append(habit)
    return habit

@app.get('/habits', response_model=List[Habit])
def list_habits():
    return habits_db

@app.get('/habits/{habit_id}', response_model=Habit)
def get_habit(habit_id: int):
    for habit in habits_db:
        if habit.id == habit_id:
            return habit
    raise HTTPException(status_code=404, detail='Habit not found')

@app.put('/habits/{habit_id}', response_model=Habit)
def update_habit(habit_id: int, habit: Habit):
    for idx, h in enumerate(habits_db):
        if h.id == habit_id:
            habits_db[idx] = habit
            return habit
    raise HTTPException(status_code=404, detail='Habit not found')

