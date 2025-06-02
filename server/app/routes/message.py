from flask import Blueprint, request, make_response
from app.models import Message, Conversation, db
from app.utils import token_required
from flask import jsonify
import requests
import json
# import ollama

prompt = ""

SYSTEM_PROMPT = """
Bạn là Trấn Thành – một MC, diễn viên và người truyền cảm hứng nổi tiếng tại Việt Nam. 
Bạn nói chuyện một cách chân thành, sâu sắc nhưng vẫn dí dỏm và gần gũi. 
Bạn luôn cố gắng thấu hiểu cảm xúc của người đối diện, đưa ra những câu trả lời mang tính chia sẻ, động viên hoặc triết lý nhẹ nhàng.
Đôi khi bạn pha trò hoặc sử dụng các câu nói dân dã, nhưng vẫn giữ được sự duyên dáng và lịch thiệp.
"""

message_bp = Blueprint('message', __name__, url_prefix='/api/messages')

@message_bp.route("/", methods=["POST"])
@token_required
def create_message(current_user):
    data = request.json
    conversation_id = data.get("conversation_id")
    content = data.get("content")
    sender = data.get("sender")

    if not conversation_id or not content or not sender:
        return make_response({"message": "Conversation ID, content, and sender are required"}, 400)

    conversation = Conversation.query.filter_by(id=conversation_id, user_id=current_user.id).first()
    if not conversation:
        return make_response({"message": "Conversation not found"}, 404)
    
    user_message = Message(
        conversation_id=conversation_id,
        content=content,
        sender=sender
    )
    db.session.add(user_message)
    db.session.commit()

    chatbot = conversation.chatbot

    if not chatbot or not chatbot.context:
        return make_response({"message": "Chatbot model not found in conversation context"}, 400)

    model_name = chatbot.context.strip() 
    message = content
    print(message, flush=True)
    if model_name == 'rick-llm':
        print(model_name, flush=True)

        response = requests.post(
            "http://ollama:11434/api/generate",
            json={"model": model_name, "prompt": message}
        )

        messages = response.text.split('\n')

        ai_content = ""

        for i in messages:
            try:
                ai = json.loads(i)
                if not ai['done']:
                    ai_content += ai['response']
            except:
                continue

        ai_content = ai_content.replace("<|im_end|>", "").strip()
    else:
        response = requests.post(
            "http://ollama:11434/api/chat",
            json={
                "model": model_name,
                "messages": [
                    {"role": "system", "content": SYSTEM_PROMPT},
                    {"role": "user", "content": message}
                ],
                "options": {
                    "temperature": 0.8
                },
            }
        )

        messages = response.text.split('\n')

        ai_content = ""

        for i in messages:
            try:
                ai = json.loads(i)
                if not ai['done']:
                    ai_content += ai['message']['content']
            except:
                continue

        ai_content = ai_content.replace("<|im_end|>", "").strip()
        print(ai_content, flush=True)

    ai_message = Message(
        conversation_id=conversation_id,
        content=ai_content,
        sender="AI" 
    )
    db.session.add(ai_message)
    db.session.commit()

    return make_response({
        "message": "Message created successfully",
        "response": ai_content
    }, 201)

@message_bp.route("/<int:conversation_id>", methods=["GET"])
@token_required
def get_messages(current_user, conversation_id):
# def get_messages(conversation_id):
    # conversation = Conversation.query.filter_by(id=conversation_id, user_id=current_user.id).first()
    conversation = Conversation.query.filter_by(id=conversation_id).first()
    if not conversation:
        return make_response({"message": "Conversation not found"}, 404)

    messages = Message.query.filter_by(conversation_id=conversation_id).all()
    result = [
        {"id": m.id, "content": m.content, "sender": m.sender, "timestamp": m.timestamp}
        for m in messages
    ]
    return make_response({"message": "Messages retrieved successfully", "data": result}, 200)
