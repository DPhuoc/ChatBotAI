from flask import Blueprint, request, make_response
from app.models import Conversation, db
from app.utils import token_required

conversation_bp = Blueprint('conversation', __name__, url_prefix='/api/conversations')

@conversation_bp.route("/", methods=["POST"])
@token_required
def create_conversation(current_user):
    data = request.json
    chatbot_id = data.get("chatbot_id")

    if not chatbot_id:
        return make_response({"message": "Chatbot ID are required"}, 400)

    conversation = Conversation(
        user_id=current_user.id,
        chatbot_id=chatbot_id,
    )
    db.session.add(conversation)
    db.session.commit()

    return make_response({"message": "Conversation created successfully", "id": conversation.id}, 201)


@conversation_bp.route("/", methods=["GET"])
@token_required
def get_conversations(current_user):
    conversations = Conversation.query.filter_by(user_id=current_user.id).all()
    result = [
        {"id": c.id, "chatbot_id": c.chatbot_id, "started_at": c.started_at}
        for c in conversations
    ]
    return make_response({"message": "Conversations retrieved successfully", "data": result}, 200)


