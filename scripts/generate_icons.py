from PIL import Image, ImageDraw

def generate_app_icon(size, filename):
    scale = 4
    s = size * scale
    img = Image.new('RGBA', (s, s), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    
    # Draw rounded rectangle background with indigo color
    corner_radius = int(s * 0.22)
    bg_color = (79, 70, 229, 255) # Indigo 600
    draw.rounded_rectangle([0, 0, s, s], radius=corner_radius, fill=bg_color)
    
    # Subtle inner border
    draw.rounded_rectangle(
        [int(s * 0.02), int(s * 0.02), s - int(s * 0.02), s - int(s * 0.02)],
        radius=int(corner_radius * 0.9),
        outline=(129, 140, 248, 180),
        width=int(s * 0.015)
    )
    
    # Diamond coordinates
    cx, cy = s / 2, s / 2
    r_diamond = s * 0.32
    diamond = [
        (cx, cy - r_diamond),
        (cx + r_diamond, cy),
        (cx, cy + r_diamond),
        (cx - r_diamond, cy)
    ]
    draw.polygon(diamond, fill=(255, 255, 255, 240))
    
    # Cyan center circle
    r_circle = s * 0.095
    draw.ellipse([cx - r_circle, cy - r_circle, cx + r_circle, cy + r_circle], fill=(20, 184, 166, 255))
    
    # Resize with antialiasing
    final_img = img.resize((size, size), Image.Resampling.LANCZOS)
    final_img.save(filename, 'PNG')
    print(f'Generated {filename} {final_img.size}')

if __name__ == '__main__':
    generate_app_icon(192, 'public/icon-192.png')
    generate_app_icon(512, 'public/icon-512.png')
    generate_app_icon(180, 'public/apple-touch-icon.png')
    generate_app_icon(192, 'public/favicon.png')
