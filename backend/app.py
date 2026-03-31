from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# MySQL Connection (Matches the user we created in Step 2)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://admin:password123@localhost/waste_management'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

class Manager(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    phone = db.Column(db.String(20))
    pincode = db.Column(db.String(10))

# Create table and add dummy data
with app.app_context():
    db.create_all()
    if not Manager.query.first():
        db.session.add(Manager(name="Patil", phone="9876543210", pincode="411001"))
        db.session.commit()

@app.route('/managers', methods=['POST'])
def get_managers():
    pincode = request.json.get('pincode')
    results = Manager.query.filter_by(pincode=pincode).all()
    return jsonify([{"name": m.name, "phone": m.phone} for m in results])

if __name__ == '__main__':
    app.run(port=8000, debug=True)