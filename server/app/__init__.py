from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

db = SQLAlchemy()

def create_app():
    app = Flask(__name__)
    app.config.from_object('app.config.Config')
    CORS(app, supports_credentials=True, origins="http://localhost:1503")

    db.init_app(app)

    with app.app_context():
        from app.models import Chatbot, Conversation, User, Message
        db.reflect()
        db.create_all()

        if Chatbot.query.count() == 0:
            bot = [
                Chatbot(
                    name="Rick",
                    description="Default free chatbot for all users",
                    context="rick-llm"
                ),
                Chatbot(
                    name="Trấn Thành",
                    description="Default free chatbot for all users",
                    context="tranthanh-llm"
                ),
            ]
            db.session.add_all(bot)

            db.session.commit()
            print("Initial chatbots created.")
        else:
            print("Chatbots already exist. Skipping initialization.")

    from app.routes.auth import auth_bp
    from app.routes.chatbot import chatbot_bp
    from app.routes.conversation import conversation_bp
    from app.routes.message import message_bp
    from app.routes.payment import payment_bp

    app.register_blueprint(auth_bp)
    app.register_blueprint(chatbot_bp)
    app.register_blueprint(conversation_bp)
    app.register_blueprint(message_bp)
    app.register_blueprint(payment_bp)

    return app