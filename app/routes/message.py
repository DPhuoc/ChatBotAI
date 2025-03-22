from flask import Blueprint, request, make_response
from app.models import Message, Conversation, db
from app.utils import token_required
from flask import jsonify

message_bp = Blueprint('message', __name__, url_prefix='/messages')

@message_bp.route("/", methods=["POST"])
@token_required
def create_message(current_user):
# def create_message():
    data = request.json
    conversation_id = data.get("conversation_id")
    content = data.get("content")
    sender = data.get("sender") 

    # if not conversation_id or not content or not sender:
    #     return make_response({"message": "Conversation ID, content, and sender are required"}, 400)

    # conversation = Conversation.query.filter_by(id=conversation_id, user_id=current_user.id).first()
    # if not conversation:
    #     return make_response({"message": "Conversation not found"}, 404)

    message = Message(
        conversation_id=conversation_id,
        content=content,
        sender=sender
    )
    db.session.add(message)
    db.session.commit()

    return make_response({"message": "Message created successfully"}, 201)

@message_bp.route("/<int:conversation_id>", methods=["GET"])
# @token_required
# def get_messages(current_user, conversation_id):
def get_messages(conversation_id):
    # conversation = Conversation.query.filter_by(id=conversation_id, user_id=current_user.id).first()
    conversation = Conversation.query.filter_by(id=conversation_id).first()
    # if not conversation:
    #     return make_response({"message": "Conversation not found"}, 404)

    messages = Message.query.filter_by(conversation_id=conversation_id).all()
    result = [
        {"id": m.id, "content": m.content, "sender": m.sender, "timestamp": m.timestamp}
        for m in messages
    ]
    return make_response({"message": "Messages retrieved successfully", "data": result}, 200)
