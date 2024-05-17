from flask_sqlalchemy import SQLAlchemy
from app import app

db = SQLAlchemy(app)

class User(db.Model):
    __tablename__ = "users"
    id = db.Column(db.Integer(), primary_key=True)
    first_name = db.Column(db.String(255), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(255), nullable=False, unique=True)
    password = db.Column(db.String(128), nullable=False)

class Product(db.Model):
    __tablename__ = "products"
    id = db.Column(db.Integer(), primary_key=True)
    category = db.Column(db.String(255), nullable=False)
    reference = db.Column(db.String(255), nullable=False)
    production_date = db.Column(db.Date, nullable=False) 
    anomalies = db.relationship('Anomaly', backref='product')


class Anomaly(db.Model):
    __tablename__ = "anomalies"
    id = db.Column(db.Integer(), primary_key=True)
    reference = db.Column(db.String(255), nullable=False)
    type = db.Column(db.String(255), nullable=False)
    date = db.Column(db.Date, nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey('products.id'))


db.create_all()