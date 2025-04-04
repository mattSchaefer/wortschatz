from django.http import HttpResponse, JsonResponse
import os
from django.conf import settings
import random
import re

def get_lines(start, finish, file_path_in):
    data = []
    output = {"data": data}
    file_path = os.path.join(os.path.dirname(__file__), file_path_in)#"../lookup_files/small_file.txt"
    file_path = os.path.abspath(file_path)
    try:
        with open(file_path, "r", encoding="utf-8") as fp:
            fp.seek(start)
            i = 0
            leng = finish - start
            while i < leng:
                data.append(fp.readline())
                i += 1
        return output
    except Exception as e:
        return {"error": "File not found"}
def get_sentences_with_one_of(words, limit, file_path_in):
    data = {}
    for word in words:
        data[word] = []
    output = {"data": data}
    file_path = os.path.join(os.path.dirname(__file__), file_path_in)#"../lookup_files/small_file.txt"
    file_path = os.path.abspath(file_path)
    try:#todo it doesn't seem like the limit is really working...
        with open(file_path, "r", encoding="utf-8") as fp:
            for i, line in enumerate(fp):
                for word in words:#TODO should this be reversed with the above line?
                    if word.lower() in line.lower():
                        #data.append(line)
                        data[word].append(line)
                        if len(data) >= limit:
                            break
                if len(data) >= limit:
                    break
        return output
    except FileNotFoundError:
        return {"error": "File not found"}
    except Exception as e:
        return {"error": str(e)}
def get_sentences_with_one_of2(words, limit, file_path_in):
    data = {}
    for word in words:
        data[word] = {}
        data[word]["sentences"] = []
        data[word]["word"] = word
    output = {"data": data}
    file_path = os.path.join(os.path.dirname(__file__), file_path_in)#"../lookup_files/small_file.txt"
    file_path = os.path.abspath(file_path)
    try:#todo it doesn't seem like the limit is really working...
        with open(file_path, "r", encoding="utf-8") as fp:
            for i, line in enumerate(fp):
                for word in words:#TODO should this be reversed with the above line?
                    if word.lower() in line.lower():
                        #data.append(line)
                        data[word]["sentences"].append(line)
                        if len(data) >= limit:
                            break
                if len(data) >= limit:
                    break
        return output
    except FileNotFoundError:
        return {"error": "File not found"}
    except Exception as e:
        return {"error": str(e)}
def get_random_lines(num_lines, file_path_in):
    data = []
    i = 0
    output = {"data": data}
    file_path = os.path.join(os.path.dirname(__file__), file_path_in)#"../lookup_files/small_file.txt"
    file_path = os.path.abspath(file_path)
    try:
        with open(file_path, "r", encoding="utf-8") as fp:
            print(get_end_position(fp))
            while i < num_lines:
                random_l = random.randint(0, get_end_position(fp))
                if not random_l >= get_end_position(fp):
                    fp.seek(random_l)
                    fp.readline()
                    data.append(filter_with_regex(fp.readline()))
                    i += 1
    except Exception as e:
        return {"error": str(e)}
    return {"data": data}
def is_past_end_of_file(file, random_l):
    current_position = file.tell()
    
    # file.seek(random_l)
    # random_pos = file.tell()
    # file.seek(current_position)# Restore original position
    
    file.seek(0, os.SEEK_END)
    end_position = file.tell()
    file.seek(current_position)  # Restore original position
    
    return random_l >= end_position
def get_end_position(file):
    current_position = file.tell()
    file.seek(0, os.SEEK_END)
    end_position = file.tell()
    file.seek(current_position)  # Restore original position
    return end_position
def filter_with_regex(text):
    return re.sub(r"[\d\t\n]+", "", text)
#get_lines(1, 3, './lookup_files/small_file.txt')

# def get_lines(start, finish, file_path_in):
#     data = []
#     output = {"data": data}
#     file_path = os.path.join(os.path.dirname(__file__), file_path_in)#"../lookup_files/small_file.txt"
#     file_path = os.path.abspath(file_path)
#     try:
#         with open(file_path, "r", encoding="utf-8") as fp:
#             for i, line in enumerate(fp):
#                 if i >= start and i <= finish:
#                     data.append(line)
#                 else:
#                     break
#         return output
#     except FileNotFoundError:
#         return {"error": "File not found"}
#     except Exception as e:
#         return {"error": str(e)}