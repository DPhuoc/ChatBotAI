from . import db
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship

class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)
    is_premium = db.Column(db.Boolean, default=False, nullable=False)
    created_at = db.Column(db.DateTime, default=func.now())

    def __repr__(self):
        return f"<User {self.username} {self.id}"

class Chatbot(db.Model):
    __tablename__ = 'chatbots'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(255))
    context = db.Column(db.String(2048))


class Conversation(db.Model):
    __tablename__ = 'conversations'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    chatbot_id = db.Column(db.Integer, db.ForeignKey('chatbots.id'))
    started_at = db.Column(db.DateTime, default=func.now())
    ended_at = db.Column(db.DateTime)

    chatbot = relationship("Chatbot")

class Message(db.Model):
    __tablename__ = 'messages'
    id = db.Column(db.Integer, primary_key=True)
    # conversation_id = db.Column(db.Integer, db.ForeignKey('conversations.id'))
    conversation_id = db.Column(db.Integer)
    sender = db.Column(db.String(10))
    content = db.Column(db.Text, nullable=False)
    timestamp = db.Column(db.DateTime, default=func.now())