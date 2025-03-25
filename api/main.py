from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel
import mysql.connector
from mysql.connector import Error
from typing import Optional

app = FastAPI()

# Database configuration
db_config = {
    'host': 'localhost',
    'user': 'root',
    'password': '',
    'database': 'users'
}


# Helper function to connect to the database
def get_db_connection():
    try:
        connection = mysql.connector.connect(**db_config)
        return connection
    except Error as e:
        print(f"Error connecting to MySQL: {e}")
        return None


# Pydantic models for request validation
class LoginRequest(BaseModel):
    email: str
    password: str


class RegisterRequest(BaseModel):
    email: str
    password: str
    name: str
    surname: str
    pesel: str
    phone: str


@app.post("/login")
def login(request: LoginRequest):
    connection = get_db_connection()
    if not connection:
        raise HTTPException(status_code=500, detail="Database connection failed")

    cursor = connection.cursor(dictionary=True)
    query = "SELECT * FROM users WHERE email = %s AND password = %s"
    cursor.execute(query, (request.email, request.password))
    user = cursor.fetchone()

    cursor.close()
    connection.close()

    if user:
        return {"message": "Login successful", "user": user}
    else:
        raise HTTPException(status_code=401, detail="Invalid email or password")

@app.get("/")
def read_root():
    return {"message": "Welcome to the FastAPI authentication API!"}



@app.post("/register")
def register(request: RegisterRequest):
    connection = get_db_connection()
    if not connection:
        raise HTTPException(status_code=500, detail="Database connection failed")

    cursor = connection.cursor()

    # Check if email, pesel, or phone already exists
    query = "SELECT * FROM users WHERE email = %s OR pesel = %s OR phone = %s"
    cursor.execute(query, (request.email, request.pesel, request.phone))
    existing_user = cursor.fetchone()

    if existing_user:
        cursor.close()
        connection.close()
        raise HTTPException(status_code=409, detail="Email, PESEL, or phone number already exists")

    # Insert new user
    insert_query = """
    INSERT INTO users (email, password, name, surname, pesel, phone)
    VALUES (%s, %s, %s, %s, %s, %s)
    """
    cursor.execute(insert_query,
                   (request.email, request.password, request.name, request.surname, request.pesel, request.phone))
    connection.commit()

    cursor.close()
    connection.close()

    return {"message": "Registration successful"}
