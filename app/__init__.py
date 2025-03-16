from flask import Flask
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

def create_app():
    app = Flask(__name__)
    app.config.from_object('app.config.Config')

    db.init_app(app)

    from app.routes.auth import auth_bp
    from app.routes.chatbot import chatbot_bp
    from app.routes.conversation import conversation_bp
    from app.routes.message import message_bp

    app.register_blueprint(auth_bp)
    app.register_blueprint(chatbot_bp)
    app.register_blueprint(conversation_bp)
    app.register_blueprint(message_bp)

    return app