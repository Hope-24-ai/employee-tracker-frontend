from flask import request
from flask_restful import Resource
from models import User

class Login(Resource):
    def post(self):
        data = request.get_json()

        if not data or 'email' not in data or 'password' not in data:
            return {"error": "Email and password required"}, 400

        user = User.query.filter_by(email=data["email"]).first()

        if user and user.check_password(data["password"]):
            return {"message": "Login successful"}, 200
        else:
            return {"error": "Invalid email or password"}, 401

