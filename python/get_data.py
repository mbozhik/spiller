# The python script is used to get data using Google Sheets API and format it

import requests
import json

url = "https://script.googleusercontent.com/macros/echo?user_content_key=c6WklQpKaqkX6CpcKECPePcH2jGE-R8po4iwuZB_jJyt9Mei3lKCd-YDFqMr6tOgNDzQFR9GKqMDYRoeqXExIQE9SGOvFpvAm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnKVGZTHI_Nwxc5R_GMMIuVvd4M-QlgV3c755jirSdPP7XhD9pzQbvtbRvtpJS283DA1kEFBQe8SXJpuPbLSZyAQpTEda1UDEcA&lib=MsvCZFAvZ-7jT9ejadsDEN0cg7Il6qISr"
response = requests.get(url)
data = response.json()

prev_name = None
prev_description = None
prev_usage = None

# Iterate through objectData array and format the data
# If [name] is empty, replace it with the previous non-empty [name]

for obj in data["objectData"]:
    if not obj["name"]:
        obj["name"] = prev_name
    else:
        prev_name = obj["name"]
    
    if not obj["description"]:
        obj["description"] = prev_description
    else:
        prev_description = obj["description"]
    
    if not obj["usage"]:
        obj["usage"] = prev_usage
    else:
        prev_usage = obj["usage"]

output_file = "python/formatted_data.json"
with open(output_file, "w", encoding="utf-8") as f:
    json.dump(data, f, ensure_ascii=False, indent=4)

print(f"Formatted data has been written to {output_file}")
