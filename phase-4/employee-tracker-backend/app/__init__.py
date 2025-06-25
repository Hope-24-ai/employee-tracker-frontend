# app/__init__.py
from flask import Flask
from .models import db, Employee, Admin, LeaveApplication  # ✅ get db from models

def create_app():
    app = Flask(__name__)

    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    db.init_app(app)

    return app

