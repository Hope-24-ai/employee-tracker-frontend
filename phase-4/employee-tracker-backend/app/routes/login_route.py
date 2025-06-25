# app/routes/login_route.py
from flask import request
from flask_restful import Resource
from werkzeug.security import check_password_hash
from app.models import Admin, Employee
import jwt, datetime

SECRET_KEY = "your-secret"

class LoginResource(Resource):
    def post(self):
        data = request.get_json()
        email = data.get("email")
        password = data.get("password")

        user = Admin.query.filter_by(email=email).first()
        role = "admin"

        if not user:
            user = Employee.query.filter_by(email=email).first()
            role = "employee"

        if user and check_password_hash(user.password, password):
            token = jwt.encode({
                "user_id": user.id,
                "role": role,
                "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=2)
            }, SECRET_KEY, algorithm="HS256")

            return {"token": token, "role": role}, 200

        return {"error": "Invalid credentials"}, 401
