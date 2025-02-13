from flask import Flask, jsonify
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_migrate import Migrate
from datetime import timedelta
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Initialize Flask app
app = Flask(__name__)

# CORS Configurat
CORS(
    app,
    origins="http://localhost:5173",  # Your frontend URL
    methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["Content-Type", "Authorization"],
    supports_credentials=True  # If using cookies/sessions
) # This allows all origins (useful for debugging)

# Database & JWT Setup
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL', 'sqlite:///auction.db')
app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY', 'ytthghgvasthrdfdvdfjnsfffyjtf')  # Use environment variable
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(hours=24)

# Initialize extensions
from models import db
db.init_app(app)

jwt = JWTManager(app)
migrate = Migrate(app, db)

# Import & Register Blueprints
from views import auth_bp, user_bp, item_bp, bid_bp
app.register_blueprint(auth_bp)
app.register_blueprint(user_bp)
app.register_blueprint(item_bp)
app.register_blueprint(bid_bp)

# JWT Blocklist Check (Logout logic)
from models import TokenBlocklist

@jwt.token_in_blocklist_loader
def check_if_token_in_blocklist(jwt_header, jwt_payload):
    jti = jwt_payload["jti"]
    token = db.session.query(TokenBlocklist).filter_by(jti=jti).scalar()
    return token is not None

if __name__ == '__main__':
    app.run(debug=True, port=5000)
