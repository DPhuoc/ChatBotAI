from flask import Blueprint, request, make_response
from werkzeug.security import generate_password_hash, check_password_hash
from google.oauth2 import id_token
from google.auth.transport import requests as grequests
from app.models import User, db
import jwt
from datetime import datetime, timedelta, timezone
from app.utils import token_required

auth_bp = Blueprint('auth', __name__, url_prefix='/api/auth')

GOOGLE_CLIENT_ID = "81760605422-m9lhntv5moju0g6k8k86q65ad3sbqg5p.apps.googleusercontent.com"

@auth_bp.route("/google", methods=["POST"])
def google_login():
    data = request.json
    token = data.get("token")
    print("Received Google Token:", token, flush=True)

    try:
        idinfo = id_token.verify_oauth2_token(
            token,
            grequests.Request(),
            GOOGLE_CLIENT_ID,
            clock_skew_in_seconds=10  
        )

        if idinfo['aud'] != GOOGLE_CLIENT_ID:
            raise ValueError("Token audience mismatch")

        email = idinfo['email']
        username = idinfo.get('name', email.split('@')[0])

        user = User.query.filter_by(email=email).first()
        if not user:
            user = User(username=username, email=email, password="!@#$%^&*()")
            db.session.add(user)
            db.session.commit()

        token = jwt.encode({'id': user.id}, "secret", algorithm="HS256")
        resp = make_response({'status': "OK"}, 200)
        resp.set_cookie("token", token)
        return resp

    except ValueError as e:
        print("Google Token Error:", str(e), flush=True)
        return make_response({'message': "Invalid Google token"}, 401)


@auth_bp.route("/signup", methods=["POST"])
def signup():
    data = request.json
    email = data.get("email")
    username = data.get("username")
    password = data.get("password")

    if username and email and password:
        user = User.query.filter_by(email=email).first()
        if user:
            return make_response({"message": "Please sign in"}, 200)

    new_user = User(
        username=username,
        email=email,
        password=generate_password_hash(password),
        is_premium=False
    )
    db.session.add(new_user)
    db.session.commit()

    return make_response({"message": "User Created"}, 201)


@auth_bp.route("/login", methods=["POST"])
def login():
    auth = request.json
    print(auth)

    if not auth or not auth.get("email") or not auth.get("password"):
        return make_response("Proper Credniatials were not provinced", 401)
    
    user = User.query.filter_by(email=auth.get("email")).first()
    if not user:
        return make_response({"message": "User not found"}, 404)

    if check_password_hash(user.password, auth.get('password')):
        token = jwt.encode({'id': user.id }, "secret", algorithm="HS256")
        resp = make_response({'status': "OK"}, 200)
        resp.set_cookie("token", token)
        return resp
    
    return make_response({'Please check your credentials'}, 401)

@auth_bp.route('/logout', methods=['POST'])
def logout():
    resp = make_response({'message': 'Logged out'})
    resp.set_cookie('token', '', expires=0) 
    return resp

@auth_bp.route('/me', methods=["GET"])
@token_required
def get_me(current_user):
    return make_response({
        "id": current_user.id,
        "username": current_user.username,
        "is_premium": current_user.is_premium
    }, 200)