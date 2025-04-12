from django.http import HttpResponse, JsonResponse
import os
import re
import requests
import json
from django.conf import settings
from openai import OpenAI
client = OpenAI()
def gpt_translate(text, req_type, accept_multiple, requesting_multiple):
    response_data = {}
    prompt = "in as few words as possible,"
    gpt_url = "https://api.openai.com/v1/responses"
    # if(accept_multiple):
    #     prompt += "using an array, "
    #prompt += "translate the following text to English, "
    #if(requesting_multiple == "yes"):
    try:
        prompt = (
            "Translate from German t                                                                                                                        he following words into English.\n\n"
            "Return a JSON array of objects with the structure:\n"
            '{ "word": "<original word>", "translation": "<English translation>" }\n\n'
            f"Words to translate: {text}"# {', '.join(text)}
        )
        payload = json.dumps({
            "model": "gpt-4o",
            "input": prompt
        })
        headers = {
            'Content-Type': 'application/json',
            'Authorization': f'Bearer {os.getenv("GPT_API_KEY")}',
        }
        response = requests.post(gpt_url, headers=headers, data=payload)
        response = client.responses.create(
            model="gpt-4o",
            input=prompt
        )
        response_data = response.output[0].content[0]
        json_str = re.sub(r"^```json\s*|\s*```$", "", response_data.text.strip(), flags=re.DOTALL)
        response_data = json_str
        return json_str
    except Exception as e:
        return {"error": str(e)}
    return response_data
    
    