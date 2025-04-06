from django.http import HttpResponse, JsonResponse
import os
import requests
import json
from django.conf import settings

def gpt_translate(text, req_type, accept_multiple, requesting_multiple):
    response_data = {}
    prompt = "in as few words as possible,"
    gpt_url = "https://api.openai.com/v1/responses"
    if(accept_multiple):
        prompt += "using an array, "
    if(requesting_multiple == "yes"):
        prompt += "in a json object, "
        text = str(text)
    prompt += f"translate into English splitting on the commas and treating like an array with these terms: {text}. make the object have keys 'word' and 'translation'"
    payload = json.dumps({
        "model": "gpt-4o",
        "input": prompt
    })
    headers = {
        'Content-Type': 'application/json',
        'Authorization': f'Bearer {os.getenv("GPT_API_KEY")}',
    }
    response = requests.post(gpt_url, headers=headers, data=payload)
    response_data = response.json()
    return response_data