# seed.py
from app import create_app, db
from app.models import Employee

app = create_app()

with app.app_context():
    print("Using DB:", app.config["SQLALCHEMY_DATABASE_URI"])  # helpful debug

    # Optional safeguard
    db.create_all()

    e1 = Employee(name="Hope Yunia", username="hopeyunia", password="password123")
    db.session.add(e1)
    db.session.commit()
    print("Seed complete.")




