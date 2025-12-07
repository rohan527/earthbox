from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import os

app = Flask(__name__)
CORS(app)

# Config - for demo, use environment variables or edit here
EMAIL_RECEIVER = os.environ.get('EMAIL_RECEIVER', 'your_email@gmail.com')
EMAIL_RECEIVER_2 = os.environ.get('EMAIL_RECEIVER_2', 'another_email@example.com')
EMAIL_SENDER = os.environ.get('EMAIL_SENDER', 'earthbox.mum@gmail.com')
SENDGRID_API_KEY = os.environ.get('SENDGRID_API_KEY', '')

@app.route('/api/contact', methods=['POST'])
def contact():
    data = request.json
    name = data.get('name')
    email = data.get('email')
    message = data.get('message')
    if not name or not email or not message:
        return jsonify({'success': False, 'error': 'Missing fields'}), 400

    # Compose email for SendGrid
    if not EMAIL_SENDER:
        return jsonify({'success': False, 'error': 'EMAIL_SENDER environment variable not set'}), 500
    subject = f"New Contact Form Submission from {name}"
    body = f"Name: {name}\nEmail: {email}\nMessage:\n{message}"
    recipients = [EMAIL_RECEIVER, EMAIL_RECEIVER_2]
    data = {
        "personalizations": [
            {
                "to": [{"email": r} for r in recipients],
                "subject": subject
            }
        ],
        "from": {"email": EMAIL_SENDER},
        "content": [
            {
                "type": "text/plain",
                "value": body
            }
        ]
    }
    headers = {
        "Authorization": f"Bearer {SENDGRID_API_KEY}",
        "Content-Type": "application/json"
    }
    try:
        resp = requests.post("https://api.sendgrid.com/v3/mail/send", json=data, headers=headers)
        if resp.status_code == 202:
            return jsonify({'success': True})
        else:
            return jsonify({'success': False, 'error': resp.text}), 500
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

if __name__ == '__main__':
    import os
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True)
