from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
# Create your views here.
from ninja import NinjaAPI, Schema
from backend.services.file_reader import get_sentences_with_one_of, get_lines, get_random_lines
from typing import List
from pydantic import Field
api = NinjaAPI()

class ReadFileRequest(Schema):
    start: int = 1
    end: int = 3
    which_file: str = "small_file"
    
@api.post("/read-file")
def read_file_view(request, data: ReadFileRequest):
    file_path = f"../lookup_files/{data.which_file}.txt"
    print(file_path)
    content = get_lines(data.start, data.end, file_path)
    return JsonResponse(content)


class SentenceRequest(Schema):
    words: list[str] = ["ein", "zwei", "drei"]
    limit: int = 10
    which_file: str = "deu_news_2024_10K-sentences"
    
@api.post("/get-sentences-with-one-of")
def fetch_sentences_with_one_of(request, data: SentenceRequest):
    file_path = f"../lookup_files/{data.which_file}.txt"
    content = get_sentences_with_one_of(data.words, data.limit, file_path)
    #content = {"data": {"words": data.words, "limit": data.limit, "file_path": file_path}}
    return JsonResponse(content)

class RandomLinesRequest(Schema):
    num_lines: int = 20
    which_file: str = "deu_news_2024_10K-words"

@api.post("/get-random-lines")
def fetch_random_lines(request, data: RandomLinesRequest):
    file_path = f"../lookup_files/{data.which_file}.txt"
    content = get_random_lines(data.num_lines, file_path)
    return JsonResponse(content)







# def get_sentences_with_one_of(request):   
#     words = request["words"]
#     limit = request["limit"]
#     which_file = request["which_file"]
#     file_path = f"../lookup_files/{which_file}.txt"
#     content = get_sentences_with_one_of(words, limit, file_path)
#     return JsonResponse(content)

# @api.get("/hello")
# def hello(request):
#     return {"message": "Hello, world!"}

