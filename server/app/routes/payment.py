from flask import Blueprint, jsonify, request
import uuid
import hmac
import hashlib
import requests
from app.utils import token_required
from app.models import User, db

payment_bp = Blueprint("payment", __name__, url_prefix="/api/payment")

MOMO_ENDPOINT = "https://test-payment.momo.vn/v2/gateway/api/create"
PARTNER_CODE = "MOMO"
ACCESS_KEY = "F8BBA842ECF85"
SECRET_KEY = "K951B6PE1waDMi640xX08PD3vg6EkVlz"
REDIRECT_URL = "https://celebai.site/payment-success"
IPN_URL = "https://celebai.site/api/payment/momo/callback"


@payment_bp.route("/momo", methods=["POST"])
@token_required
def create_payment(current_user):
    order_id = str(uuid.uuid4())
    request_id = str(uuid.uuid4())
    amount = "10000"
    order_info = "Upgrade CelebAI Premium"
    extra_data = str(current_user.id)

    raw_signature = f"accessKey={ACCESS_KEY}&amount={amount}&extraData={extra_data}&ipnUrl={IPN_URL}&orderId={order_id}&orderInfo={order_info}&partnerCode={PARTNER_CODE}&redirectUrl={REDIRECT_URL}&requestId={request_id}&requestType=captureWallet"
    signature = hmac.new(SECRET_KEY.encode(), raw_signature.encode(), hashlib.sha256).hexdigest()

    body = {
        "partnerCode": PARTNER_CODE,
        "accessKey": ACCESS_KEY,
        "requestId": request_id,
        "amount": amount,
        "orderId": order_id,
        "orderInfo": order_info,
        "redirectUrl": REDIRECT_URL,
        "ipnUrl": IPN_URL,
        "extraData": extra_data,
        "requestType": "captureWallet",
        "signature": signature,
        "lang": "en"
    }

    res = requests.post(MOMO_ENDPOINT, json=body, headers={"Content-Type": "application/json"})
    data = res.json()
    return jsonify({"payUrl": data.get("payUrl")})

@payment_bp.route("/momo/callback", methods=["POST"])
def momo_ipn():
    data = request.json
    print("📩 IPN nhận được:", data, flush=True)

    if data.get("resultCode") == 0:
        user_id = data.get("extraData")

        user = User.query.get(user_id)
        if user:
            user.is_premium = True
            db.session.commit()
            print(f"✅ Nâng cấp thành công cho user {user.username}")
        else:
            print("❌ Không tìm thấy user", flush=True)
    else:
        print("❌ Thanh toán thất bại", data, flush=True)

    return "OK", 200

@payment_bp.route('/confirm', methods=['POST'])
@token_required
def confirm_payment(current_user):
    return jsonify({
        "message": "Kiểm tra trạng thái thành công",
        "is_premium": current_user.is_premium
    }), 200
