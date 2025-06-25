# create_tables.py
# create_tables.py
from app import create_app, db
from app.models import Employee, Admin, LeaveApplication  # <-- Make sure this is here

app = create_app()

with app.app_context():
    db.create_all()
    print("Tables created successfully.")
    print("Using DB:", app.config["SQLALCHEMY_DATABASE_URI"])
