import os
import shutil

def extract_and_wrap_define_blocks(src_file, dest_file):
    with open(src_file, "r") as file:
        content = file.read()

    define_blocks = []
    start_idx = 0

    while True:
        start_idx = content.find("defineField({", start_idx)
        if start_idx == -1:
            break
        end_idx = content.find("}),", start_idx)
        if end_idx == -1:
            break
        
        define_block = content[start_idx:end_idx + len("}),")].strip()
        define_block = define_block.replace("defineField({", "    {")

        define_block_lines = define_block.split("\n")
        cleaned_block_lines = []
        for line in define_block_lines:
            if "type: '" not in line and "of: [" not in line and "hidden:" not in line:
                cleaned_block_lines.append(line)
        cleaned_define_block = "\n".join(cleaned_block_lines)

        define_block = cleaned_define_block.replace("}),", "}")
        define_blocks.append(define_block)
        start_idx = end_idx + len("}),")

    with open(dest_file, "w") as file:
        file.write("export const product: any = [\n")
        file.write(",\n".join(define_blocks))
        file.write("\n]\n")
        file.write("\nexport default product\n")

src_file_path = "sanity/schemaTypes/product.ts"
dest_file_path = "src/lib/categories_[product.ts].ts"

extract_and_wrap_define_blocks(src_file_path, dest_file_path)
