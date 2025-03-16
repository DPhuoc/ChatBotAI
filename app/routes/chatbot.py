from flask import Blueprint, make_response
from app.models import Chatbot
from app.utils import token_required

chatbot_bp = Blueprint('chatbot', __name__, url_prefix='/chatbots')

@chatbot_bp.route("/", methods=["GET"])
@token_required
def get_chatbots(current_user):
    chatbots = Chatbot.query.all()
    result = [
        {"id": bot.id, "name": bot.name, "description": bot.description}
        for bot in chatbots
    ]
    return make_response({"message": "Chatbots retrieved successfully", "data": result}, 200)