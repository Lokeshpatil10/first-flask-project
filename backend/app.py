from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector
from mysql.connector import Error

app = Flask(__name__)
# Enable CORS so the React frontend can make requests to this API
CORS(app)

def get_db_connection():
    """Helper function to establish a database connection."""
    try:
        connection = mysql.connector.connect(
            host='localhost',
            database='local_services_db',
            user='root',       # Use your MySQL username
            password='groot'        # Use your MySQL password
        )
        return connection
    except Error as e:
        print(f"Error while connecting to MySQL: {e}")
        return None

@app.route('/search', methods=['GET'])
def search_providers():
    """
    Endpoint to search for service providers.
    Query params expected: 'pincode' and 'category'
    """
    pincode = request.args.get('pincode')
    category = request.args.get('category')

    if not pincode or not category:
        return jsonify({"error": "Missing pincode or category"}), 400

    connection = get_db_connection()
    if connection is None:
        return jsonify({"error": "Database connection failed"}), 500

    try:
        cursor = connection.cursor(dictionary=True)
        # Parameterized query to prevent SQL injection
        query = "SELECT * FROM service_providers WHERE pincode = %s AND category = %s"
        cursor.execute(query, (pincode, category))
        
        # Fetch all matching rows
        results = cursor.fetchall()
        return jsonify(results), 200

    except Error as e:
        return jsonify({"error": str(e)}), 500
    finally:
        if connection.is_connected():
            cursor.close()
            connection.close()

if __name__ == '__main__':
    # Run the Flask app on port 5000
    app.run(debug=True, port=5000)
