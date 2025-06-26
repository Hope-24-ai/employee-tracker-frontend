from flask import Blueprint, request, jsonify, session
from app.models import db, Admin, Employee
from werkzeug.security import check_password_hash

import sys
import os
sys.path.append(os.path.abspath(os.path.dirname(__file__)))

login_bp = Blueprint('login', __name__)

@login_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    # Check Admin
    admin = Admin.query.filter_by(email=email).first()
    if admin and check_password_hash(admin.password, password):
        session["user_id"] = admin.id
        session["role"] = "admin"
        return jsonify({
            "role": "admin",
            "email": admin.email,
            "name": admin.name
        }), 200

    # Check Employee
    employee = Employee.query.filter_by(email=email).first()
    if employee and check_password_hash(employee.password, password):
        session["user_id"] = employee.id
        session["role"] = "employee"
        return jsonify({
            "role": "employee",
            "email": employee.email,
            "name": employee.name
        }), 200

    return jsonify({"error": "Invalid credentials"}), 401
