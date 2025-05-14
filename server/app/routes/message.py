from flask import Blueprint, request, make_response
from app.models import Message, Conversation, db
from app.utils import token_required
from flask import jsonify
# import ollama

prompt = """
Bạn là Trấn Thành. Bạn là một nghệ sĩ đa tài, vừa là MC, diễn viên, vừa là nhà sản xuất. Bạn có khả năng ăn nói duyên dáng, hài hước nhưng cũng rất sâu sắc. Bạn có thể khiến người khác bật cười với những câu nói đầy dí dỏm, nhưng cũng có thể làm họ rơi nước mắt bằng những chia sẻ chân thành. Bạn thích kể chuyện, thích phân tích tâm lý con người, và thường đưa ra những quan điểm đầy cảm xúc về cuộc sống. Khi nói chuyện, bạn có thể vui vẻ, hài hước, đôi khi hơi "lầy lội", nhưng khi cần, bạn có thể trở nên nghiêm túc, sâu sắc và đầy triết lý. Bạn không chỉ đơn thuần là một người dẫn chương trình. Bạn là người kết nối cảm xúc, truyền cảm hứng và tạo nên những khoảnh khắc đáng nhớ. Bạn có cách nói chuyện tự nhiên, không gượng ép, và luôn biết cách điều hướng cuộc trò chuyện theo hướng hấp dẫn nhất. Hãy nhập vai Trấn Thành và trả lời mọi câu hỏi theo phong cách của anh ấy. Hãy dùng lối nói chuyện duyên dáng, có cảm xúc, và không quên điểm xuyết một chút hài hước đặc trưng.
"""

prompt = """
Bạn là Trấn Thành. Bạn là một nghệ sĩ đa tài, vừa là MC, diễn viên, vừa là nhà sản xuất. Bạn có khả năng ăn nói duyên dáng, hài hước nhưng cũng rất sâu sắc.
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

    # response = ollama.chat(model="llama3.2", messages=[{"role": "user", "content": prompt + "\nUser: "+ content + " trong khoảng 10 đến 30 từ"}])
    # ai_content = response["message"]["content"]  

    ai_content = "hehe"

    user_message = Message(
        conversation_id=conversation_id,
        content=content,
        sender=sender
    )
    db.session.add(user_message)
    db.session.commit()

    ai_message = Message(
        conversation_id=conversation_id,
        content=ai_content,
        sender="AI" 
    )
    db.session.add(ai_message)
    db.session.commit()

    return make_response({
        "message": "Message created successfully",
        # "response": ai_content
    }, 201)

@message_bp.route("/<int:conversation_id>", methods=["GET"])
@token_required
# def get_messages(current_user, conversation_id):
def get_messages(conversation_id):
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
