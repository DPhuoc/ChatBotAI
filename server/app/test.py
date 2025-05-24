import requests
import json


content = "Tell me a joke"

message = "\nUser: "+ content

response = requests.post(
    "http://127.0.0.1:11434/api/generate",
    json={"model": "rick-llm", "prompt": message}
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

print(ai_content)