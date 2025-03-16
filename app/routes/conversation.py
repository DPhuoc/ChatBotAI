from flask import Blueprint, request, make_response
from app.models import Conversation, db
from app.utils import token_required

conversation_bp = Blueprint('conversation', __name__, url_prefix='/conversations')

@conversation_bp.route("/", methods=["POST"])
@token_required
def create_conversation(current_user):
    data = request.json
    chatbot_id = data.get("chatbot_id")
    title = data.get("title")

    if not chatbot_id or not title:
        return make_response({"message": "Chatbot ID and Title are required"}, 400)

    conversation = Conversation(
        user_id=current_user.id,
        chatbot_id=chatbot_id,
        title=title
    )
    db.session.add(conversation)
    db.session.commit()

    return make_response({"message": "Conversation created successfully"}, 201)


@conversation_bp.route("/", methods=["GET"])
@token_required
def get_conversations(current_user):
    conversations = Conversation.query.filter_by(user_id=current_user.id).all()
    result = [
        {"id": c.id, "chatbot_id": c.chatbot_id, "title": c.title, "created_at": c.created_at}
        for c in conversations
    ]
    return make_response({"message": "Conversations retrieved successfully", "data": result}, 200)



@conversation_bp.route("/<int:id>", methods=["GET"])
@token_required
def get_conversation(current_user, id):
    conversation = Conversation.query.filter_by(id=id, user_id=current_user.id).first()
    if not conversation:
        return make_response({"message": "Conversation not found"}, 404)

    result = {
        "id": conversation.id,
        "chatbot_id": conversation.chatbot_id,
        "title": conversation.title,
        "created_at": conversation.created_at
    }
    return make_response({"message": "Conversation retrieved successfully", "data": result}, 200)
