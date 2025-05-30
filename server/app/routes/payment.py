from flask import Blueprint, jsonify, request
import uuid
import hmac
import hashlib
import requests

payment_bp = Blueprint("payment", __name__, url_prefix="/api/payment")

# Cấu hình Momo test
MOMO_ENDPOINT = "https://test-payment.momo.vn/v2/gateway/api/create"
PARTNER_CODE = "MOMO"
ACCESS_KEY = "F8BBA842ECF85"
SECRET_KEY = "K951B6PE1waDMi640xX08PD3vg6EkVlz"
REDIRECT_URL = "http://localhost:1503/payment-success"
IPN_URL = "http://localhost:5000/api/payment/momo/callback"

@payment_bp.route("/momo", methods=["POST"])
def create_payment():
    order_id = str(uuid.uuid4())
    request_id = str(uuid.uuid4())
    amount = "10000"
    order_info = "Upgrade CelebAI Premium"
    extra_data = ""

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
    if data.get("resultCode") == 0:
        print("✅ Thanh toán thành công:", data)
    else:
        print("❌ Thanh toán thất bại:", data)
    return "OK", 200
