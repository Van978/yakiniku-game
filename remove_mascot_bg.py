import os
from rembg import remove
from PIL import Image

directory = r"c:\Users\USER\.gemini\antigravity\scratch\yakiniku"
filename = "kye_jun.png"
filepath = os.path.join(directory, filename)

if os.path.exists(filepath):
    try:
        input_image = Image.open(filepath)
        output_image = remove(input_image)
        output_image.save(filepath, "PNG")
        print(f"Perfectly isolated mascot: {filename}")
    except Exception as e:
        print(f"Error processing mascot: {e}")
