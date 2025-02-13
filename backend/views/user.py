from flask import Blueprint, jsonify, request
from werkzeug.security import generate_password_hash
from models import User, db
from flask_jwt_extended import create_access_token

user_bp = Blueprint('user_bp', __name__)

# Handle registration
@user_bp.route('/register', methods=['POST', 'OPTIONS'])
def register():
    if request.method == 'OPTIONS':  # Handle preflight requests
        return jsonify({"message": "Preflight request successful"}), 200

    data = request.get_json()

    # Check if the user already exists
    if User.query.filter_by(email=data["email"]).first():
        return jsonify({"error": "User already exists"}), 400

    # Hash the password before storing
    hashed_password = generate_password_hash(data["password"])

    # Set the user's role based on existing admin users
    existing_admin = User.query.filter_by(role="admin").first()
    role = "admin" if existing_admin is None else "bidder"

    # Create new user object
    new_user = User(
        name=data["name"],
        email=data["email"],
        password=hashed_password,
        role=role
    )

    # Add the new user to the database
    db.session.add(new_user)
    db.session.commit()

    # Generate the access token for the newly created user
    access_token = create_access_token(identity=new_user.user_id)

    # Return the success message with the access token
    user_data = {
        "user_id": new_user.user_id,
        "name": new_user.name,
        "email": new_user.email,
        "role": new_user.role,
        "is_verified": new_user.is_verified
    }

    return jsonify({
        "access_token": access_token,
        "user": user_data,
        "message": f"User registered successfully as {role}!"
    }), 201
