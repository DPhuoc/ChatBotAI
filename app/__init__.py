from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

db = SQLAlchemy()

def create_app():
    app = Flask(__name__)
    app.config.from_object('app.config.Config')
    CORS(app, supports_credentials=True, origins="http://127.0.0.1:5173")

    db.init_app(app)
    with app.app_context():
        # db.reflect()
        db.drop_all()
        db.create_all()



    from app.routes.auth import auth_bp
    from app.routes.chatbot import chatbot_bp
    from app.routes.conversation import conversation_bp
    from app.routes.message import message_bp

    app.register_blueprint(auth_bp)
    app.register_blueprint(chatbot_bp)
    app.register_blueprint(conversation_bp)
    app.register_blueprint(message_bp)

    return app