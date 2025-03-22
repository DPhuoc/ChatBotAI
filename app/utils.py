import jwt
from flask import request, make_response
from functools import wraps
from app.models import User

SECRET_KEY = "secret"

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        print(request.headers)
        token = request.cookies.get("token")
        print(token)
        if not token:
            return make_response({"message": "Token is missing"}, 401)

        data = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
        try:
            data = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
            current_user = User.query.filter_by(id=data['id']).first()
        except Exception:
            return make_response({"message": "Token is invalid"}, 401)

        return f(current_user, *args, **kwargs)
    return decorated