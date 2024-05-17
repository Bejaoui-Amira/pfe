import datetime
from flask import Flask, request, jsonify
from flask_jwt_extended import JWTManager, jwt_required, create_access_token
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS, cross_origin

# from sqlalchemy import event
# from flask_socketio import SocketIO, emit

# initialize the Flask app
app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

# add app configuration
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:postgres0@localhost/pfe'
app.config['SECRET_KEY'] = 'secret_key'
db = SQLAlchemy(app)

# set up Flask-JWT-Extended with the secret key

jwt = JWTManager(app)

# socketio = SocketIO(app)

# define constants 
MAX_PRODUCTION_PRODUCT1, MIN_PRODUCTION_PRODUCT1 = 100, 30
MAX_PRODUCTION_PRODUCT2, MIN_PRODUCTION_PRODUCT2 = 150, 50


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


# implement API endpoints

@app.route('/api/login', methods=['POST'])
def login():
    data = request.json
    user = User.query.filter_by(email=data["email"]).first()
    if user:
        if user.password == data["password"]:
            token = create_access_token(identity=user.id, expires_delta=datetime.timedelta(minutes=120))
            return jsonify({'token': token})
        else:
            return jsonify({"error": "login failed!"})
    else:
        return jsonify({"error": "login failed!"})


# @jwt_required()
@cross_origin()
@app.route('/api/products', methods=['GET'])
def get_products():
    products = Product.query.all()
    return jsonify([{'category': product.category, 'reference': product.reference, 'production_date': product.production_date} for product in products])


@jwt_required()
@app.route('/api/products_by_date_interval', methods=['GET'])
def get_products_by_date_interval():
    start_date_str, end_date_str = request.args.get('start_date'), request.args.get('end_date')
    start_date, end_date = datetime.strptime(start_date_str, '%d/%m/%Y'), datetime.strptime(end_date_str, '%d/%m/%Y')
    products = Product.query.filter(Product.date.between(start_date, end_date)).all()
    return jsonify([product.__dict__ for product in products])


@jwt_required()
@app.route('/api/anomalies', methods=['GET'])
def get_anomalies():
    anomalies = Anomaly.query.all()
    return jsonify([anomaly.__dict__ for anomaly in anomalies])


# @jwt_required()
# @app.route('/api/anomalies_by_date_interval', methods=['GET'])
# def get_products_by_date_interval():
#     start_date_str, end_date_str = request.args.get('start_date'), request.args.get('end_date')
#     start_date, end_date = datetime.strptime(start_date_str, '%d/%m/%Y'), datetime.strptime(end_date_str, '%d/%m/%Y')
#     anomalies = Anomaly.query.filter(Anomaly.date.between(start_date, end_date)).all()
#     return jsonify([anomaly.__dict__ for anomaly in anomalies])


# implement notification mechanism

# def check_products_quantity(): 
#     product1_count = Product.query.count()
#     if product1_count > MAX_PRODUCTION_PRODUCT1:
#         socketio.emit('notification', {'message': f'product1 quantity exceeded {MAX_PRODUCTION_PRODUCT1}. We have an overproduction'}, broadcast=True)
#     elif product1_count < MIN_PRODUCTION_PRODUCT1:
#         socketio.emit('notification', {'message': f'product1 quantity is lower than {MIN_PRODUCTION_PRODUCT1}. We have an overproduction'}, broadcast=True)

#     product2_count = Product.query.count()
#     if product2_count > MAX_PRODUCTION_PRODUCT2:
#         socketio.emit('notification', {'message': f'product2 quantity exceeded {MAX_PRODUCTION_PRODUCT2}. We have an overproduction'}, broadcast=True)
#     elif product2_count < MIN_PRODUCTION_PRODUCT1:
#         socketio.emit('notification', {'message': f'product2 quantity is lower than {MIN_PRODUCTION_PRODUCT2}. We have an overproduction'}, broadcast=True)


# # event listener to check products count by category after each product insertion
# @event.listens_for(Product, "after_insert")
# def receive_after_insert(mapper, connection, target):
#     check_products_quantity()

# # event listener to check products count by category after each product deletion
# @event.listens_for(Product, "after_delete")
# def receive_after_delete(mapper, connection, target):
#     check_products_quantity()


if __name__ == '__main__':
    # with app.app_context():
    #     db.create_all()
    #socketio.run(app, debug=True)
    app.run(debug=True)