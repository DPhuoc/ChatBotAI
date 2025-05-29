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

        # Check if chatbot(s) already exist, to avoid duplicates
        if Chatbot.query.count() == 0:
            bot = [
                Chatbot(
                    name="rick-llm",
                    description="Default free chatbot for all users",
                    context=""
                ),
            ]
            db.session.add_all(bot)

            db.session.commit()
            print("Initial chatbots created.")
        else:
            print("Chatbots already exist. Skipping initialization.")

        print("HIHIHIHIH", flush=True)

    from app.routes.auth import auth_bp
    from app.routes.chatbot import chatbot_bp
    from app.routes.conversation import conversation_bp
    from app.routes.message import message_bp

    app.register_blueprint(auth_bp)
    app.register_blueprint(chatbot_bp)
    app.register_blueprint(conversation_bp)
    app.register_blueprint(message_bp)

    return app