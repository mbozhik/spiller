import re

# Function to extract IDs from a line of text
def extract_ids(line):
    # Regular expression to find IDs
    id_pattern = r'\b[a-f\d]{8}-[a-f\d]{4}-[a-f\d]{4}-[a-f\d]{4}-[a-f\d]{12}\b'
    ids = re.findall(id_pattern, line)
    return ids

# Read the text file and extract IDs
with open('mydocuments.txt', 'r') as file:
    ids = []
    for line in file:
        line_ids = extract_ids(line)
        ids.extend(line_ids)

# Convert list of IDs to a single string with spaces between them
ids_str = ' '.join(ids)

# Write the extracted IDs to a new text file
output_file = 'extracted_ids.txt'
with open(output_file, 'w') as outfile:
    outfile.write(ids_str)

print(f"Extracted IDs saved to {output_file}")
