import os
from PIL import Image

def optimize_images():
    print("=== Optimizing Images to WebP & Compressed Fallbacks ===")
    
    # 1. src/assets/logo.jpg -> logo.webp & compressed logo.jpg
    src_logo_path = "src/assets/logo.jpg"
    if os.path.exists(src_logo_path):
        with Image.open(src_logo_path) as img:
            img = img.convert("RGB")
            # Resize for high DPI (160x160 for 40px display)
            resized = img.resize((160, 160), Image.Resampling.LANCZOS)
            resized.save("src/assets/logo.webp", "WEBP", quality=85)
            resized.save(src_logo_path, "JPEG", quality=85, optimize=True)
            print(f"src/assets/logo.webp: {os.path.getsize('src/assets/logo.webp')} bytes")
            print(f"src/assets/logo.jpg: {os.path.getsize(src_logo_path)} bytes")

    # 2. public/logo.jpg -> logo.webp & compressed public/logo.jpg
    pub_logo_path = "public/logo.jpg"
    if os.path.exists(pub_logo_path):
        with Image.open(pub_logo_path) as img:
            img = img.convert("RGB")
            resized = img.resize((160, 160), Image.Resampling.LANCZOS)
            resized.save("public/logo.webp", "WEBP", quality=85)
            resized.save(pub_logo_path, "JPEG", quality=85, optimize=True)
            print(f"public/logo.webp: {os.path.getsize('public/logo.webp')} bytes")
            print(f"public/logo.jpg: {os.path.getsize(pub_logo_path)} bytes")

    # 3. src/assets/saadimage.jpg -> saadimage.webp & compressed saadimage.jpg
    saad_path = "src/assets/saadimage.jpg"
    if os.path.exists(saad_path):
        with Image.open(saad_path) as img:
            img = img.convert("RGB")
            resized = img.resize((160, 160), Image.Resampling.LANCZOS)
            resized.save("src/assets/saadimage.webp", "WEBP", quality=85)
            resized.save(saad_path, "JPEG", quality=85, optimize=True)
            print(f"src/assets/saadimage.webp: {os.path.getsize('src/assets/saadimage.webp')} bytes")
            print(f"src/assets/saadimage.jpg: {os.path.getsize(saad_path)} bytes")

    # 4. public/favicon.jpg & favicon.png
    fav_jpg_path = "public/favicon.jpg"
    if os.path.exists(fav_jpg_path):
        with Image.open(fav_jpg_path) as img:
            img = img.convert("RGB")
            resized_64 = img.resize((64, 64), Image.Resampling.LANCZOS)
            resized_64.save(fav_jpg_path, "JPEG", quality=85, optimize=True)
            resized_32 = img.resize((32, 32), Image.Resampling.LANCZOS)
            resized_32.save("public/favicon.png", "PNG", optimize=True)
            print(f"public/favicon.jpg: {os.path.getsize(fav_jpg_path)} bytes")
            print(f"public/favicon.png: {os.path.getsize('public/favicon.png')} bytes")

if __name__ == "__main__":
    optimize_images()
