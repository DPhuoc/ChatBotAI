from flask import Blueprint, request, make_response
from app.models import Chatbot, db
from app.utils import token_required

chatbot_bp = Blueprint('chatbot', __name__, url_prefix='/api/chatbots')

@chatbot_bp.route("/", methods=["GET"])
@token_required
def get_chatbots(current_user):
    chatbots = Chatbot.query.all()
    result = [
        {"id": bot.id, "name": bot.name, "description": bot.description}
        for bot in chatbots
    ]
    return make_response({"message": "Chatbots retrieved successfully", "data": result}, 200)

@chatbot_bp.route("/", methods=["POST"])
def create_chatbot():
    data = request.json

    name = data.get("name")
    description = data.get("description")
    context = data.get("context") 

    if not name or not description:
        return make_response({"message": "Name and description are required!"}, 400)

    new_chatbot = Chatbot(name=name, description=description, context=context)
    db.session.add(new_chatbot)
    db.session.commit()

    return make_response(
        {"message": "Chatbot created successfully!", "chatbot": {
            "id": new_chatbot.id,
            "name": new_chatbot.name,
            "description": new_chatbot.description,
            "context": new_chatbot.context
        }},
        201
    )