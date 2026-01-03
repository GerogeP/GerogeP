from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime
import uvicorn

app = FastAPI(title="Champ Code Academy API", version="1.0.0")

# Enable CORS for all origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify exact origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic models
class Student(BaseModel):
    name: str

class Lesson(BaseModel):
    id: str
    date: str
    type: str
    subject: str
    students: List[str]
    tutor: Optional[str] = None
    status: str

class LoginRequest(BaseModel):
    username: str
    password: str

class LoginResponse(BaseModel):
    success: bool
    message: str
    token: Optional[str] = None

# Mock lesson data
mock_lessons = [
    {
        "id": "L001",
        "date": "2025-10-28T14:00:00Z",
        "type": "Historic",
        "subject": "Minecraft Game Design - Level 1",
        "students": ["Ethan", "Ava"],
        "tutor": "Sarah Tan",
        "status": "Completed"
    },
    {
        "id": "L002",
        "date": "2025-11-02T09:00:00Z",
        "type": "Historic",
        "subject": "Roblox Coding Basics",
        "students": ["Lucas"],
        "tutor": "Sarah Tan",
        "status": "Completed"
    },
    {
        "id": "L003",
        "date": "2025-11-05T16:00:00Z",
        "type": "Historic",
        "subject": "Python for Kids - Introduction",
        "students": ["Chloe", "Aaron"],
        "tutor": "Sarah Tan",
        "status": "Completed"
    },
    {
        "id": "L004",
        "date": "2025-11-08T10:00:00Z",
        "type": "Upcoming",
        "subject": "Minecraft Redstone Logic",
        "students": ["Emma", "Noah"],
        "tutor": "Sarah Tan",
        "status": "Confirmed"
    },
    {
        "id": "L005",
        "date": "2025-11-09T15:00:00Z",
        "type": "Upcoming",
        "subject": "Roblox Game Design - Level 2",
        "students": ["Ryan", "Mia"],
        "tutor": "Sarah Tan",
        "status": "Confirmed"
    },
    {
        "id": "L006",
        "date": "2025-11-10T12:00:00Z",
        "type": "Upcoming",
        "subject": "Website Design for Beginners",
        "students": ["Olivia"],
        "tutor": "Sarah Tan",
        "status": "Confirmed"
    },
    {
        "id": "L007",
        "date": "2025-11-12T11:00:00Z",
        "type": "Available",
        "subject": "Python for Kids - Game Projects",
        "students": [],
        "tutor": None,
        "status": "Available"
    },
    {
        "id": "L008",
        "date": "2025-11-13T17:00:00Z",
        "type": "Available",
        "subject": "Roblox Game Design - Level 1",
        "students": [],
        "tutor": None,
        "status": "Available"
    },
    {
        "id": "L009",
        "date": "2025-11-14T10:00:00Z",
        "type": "Available",
        "subject": "Minecraft AI Coding Adventure",
        "students": [],
        "tutor": None,
        "status": "Available"
    },
    {
        "id": "L010",
        "date": "2025-11-15T09:00:00Z",
        "type": "Upcoming",
        "subject": "Python Automation for Kids",
        "students": ["Elijah"],
        "tutor": "Sarah Tan",
        "status": "Confirmed"
    },
    {
        "id": "L011",
        "date": "2025-11-16T14:00:00Z",
        "type": "Today",
        "subject": "Scratch Programming Basics",
        "students": ["Mason", "Sophia"],
        "tutor": "Sarah Tan",
        "status": "In Progress"
    },
    {
        "id": "L012",
        "date": "2025-11-16T16:00:00Z",
        "type": "Today",
        "subject": "Web Development with HTML/CSS",
        "students": ["James"],
        "tutor": None,
        "status": "Available"
    }
]

@app.get("/")
async def root():
    return {"message": "Champ Code Academy API is running!"}

@app.post("/api/login", response_model=LoginResponse)
async def login(login_data: LoginRequest):
    # Mock authentication - in production, validate against database
    if login_data.username == "tutor" and login_data.password == "password":
        return LoginResponse(
            success=True,
            message="Login successful",
            token="mock-jwt-token-12345"
        )
    else:
        raise HTTPException(status_code=401, detail="Invalid credentials")

@app.get("/api/lessons", response_model=List[Lesson])
async def get_lessons():
    """Get all lessons"""
    return mock_lessons

@app.get("/api/lessons/historic")
async def get_historic_lessons():
    """Get completed lessons"""
    return [lesson for lesson in mock_lessons if lesson["type"] == "Historic"]

@app.get("/api/lessons/upcoming")
async def get_upcoming_lessons():
    """Get upcoming lessons"""
    return [lesson for lesson in mock_lessons if lesson["type"] == "Upcoming"]

@app.get("/api/lessons/available")
async def get_available_lessons():
    """Get available lessons"""
    return [lesson for lesson in mock_lessons if lesson["type"] == "Available"]

@app.get("/api/lessons/today")
async def get_today_lessons():
    """Get today's lessons"""
    return [lesson for lesson in mock_lessons if lesson["type"] == "Today"]

@app.post("/api/lessons/{lesson_id}/take")
async def take_lesson(lesson_id: str):
    """Assign a tutor to an available lesson"""
    for lesson in mock_lessons:
        if lesson["id"] == lesson_id and lesson["type"] == "Available":
            lesson["tutor"] = "Sarah Tan"  # Mock current tutor
            lesson["type"] = "Upcoming"
            lesson["status"] = "Confirmed"
            return {"message": f"Lesson {lesson_id} assigned successfully"}
    
    raise HTTPException(status_code=404, detail="Lesson not found or not available")

@app.get("/api/lessons/filter")
async def filter_lessons(type: Optional[str] = None, month: Optional[str] = None):
    """Filter lessons by type and/or month"""
    filtered_lessons = mock_lessons
    
    if type:
        filtered_lessons = [lesson for lesson in filtered_lessons if lesson["type"].lower() == type.lower()]
    
    if month:
        # Filter by month (format: YYYY-MM)
        filtered_lessons = [
            lesson for lesson in filtered_lessons 
            if lesson["date"].startswith(month)
        ]
    
    return filtered_lessons

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)