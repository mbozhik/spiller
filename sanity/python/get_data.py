# The python script is used to get data using Google Sheets API and format it

import requests
import json
import random

url = "https://script.googleusercontent.com/macros/echo?user_content_key=c6WklQpKaqkX6CpcKECPePcH2jGE-R8po4iwuZB_jJyt9Mei3lKCd-YDFqMr6tOgNDzQFR9GKqMDYRoeqXExIQE9SGOvFpvAm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnKVGZTHI_Nwxc5R_GMMIuVvd4M-QlgV3c755jirSdPP7XhD9pzQbvtbRvtpJS283DA1kEFBQe8SXJpuPbLSZyAQpTEda1UDEcA&lib=MsvCZFAvZ-7jT9ejadsDEN0cg7Il6qISr"
response = requests.get(url)
data = response.json()

prev_name = None
prev_description = None
prev_usage = None
prev_caption = None

counter = 0 

for obj in data["objectData"]:
    counter += 1

    split_index = obj["name"].find("  ")
    if split_index == -1:
        split_index = obj["name"].find("\n")

    if split_index != -1:
        text1 = obj["name"][:split_index].strip().replace("®", "")
        text2 = obj["name"][split_index:].strip().replace("®", "")
        obj["name"] = text1
        obj["caption"] = text2
    else:
        obj["caption"] = (prev_caption if prev_caption else "").replace("®", "")

    obj["name"] = prev_name if not obj["name"] else obj["name"]
    prev_name = obj["name"]

    prev_caption = obj["caption"]
    
    obj["description"] = prev_description if not obj["description"] else obj["description"]
    prev_description = obj["description"]

    obj["usage"] = prev_usage if not obj["usage"] else obj["usage"]
    prev_usage = obj["usage"]

    obj["_type"] = "product"

formatted_data = data["objectData"]

output_ndjson_file = "sanity/python/formatted_data.ndjson"
with open(output_ndjson_file, "w", encoding="utf-8") as ndjson_file:
    for item in formatted_data:
        ndjson_file.write(json.dumps(item, ensure_ascii=False) + '\n')

print("\033[35m" + f"Formatted data has been written to {output_ndjson_file}")
print(f"Total objects processed: {counter}")
