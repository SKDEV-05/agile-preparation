import os
from PIL import Image, ImageDraw, ImageFont

def draw_icon_quiz(draw, x, y, color):
    # Mini document with lines
    draw.rounded_rectangle([x, y, x + 16, y + 20], radius=3, outline=color, width=1)
    draw.line([(x + 4, y + 6), (x + 12, y + 6)], fill=color, width=1)
    draw.line([(x + 4, y + 10), (x + 12, y + 10)], fill=color, width=1)
    draw.line([(x + 4, y + 14), (x + 9, y + 14)], fill=color, width=1)

def draw_icon_bolt(draw, x, y, color):
    # Mini lightning bolt
    points = [(x + 9, y), (x + 3, y + 11), (x + 8, y + 11), (x + 6, y + 20), (x + 14, y + 9), (x + 9, y + 9)]
    draw.polygon(points, fill=color)

def draw_icon_grid(draw, x, y, color):
    # 4 mini blocks
    s = 6
    draw.rounded_rectangle([x, y, x + s, y + s], radius=1, fill=color)
    draw.rounded_rectangle([x + s + 3, y, x + 2*s + 3, y + s], radius=1, fill=color)
    draw.rounded_rectangle([x, y + s + 3, x + s, y + 2*s + 3], radius=1, fill=color)
    draw.rounded_rectangle([x + s + 3, y + s + 3, x + 2*s + 3, y + 2*s + 3], radius=1, fill=color)

def draw_icon_shield(draw, x, y, color):
    # Shield shape with check
    draw.polygon([(x + 8, y), (x + 16, y + 4), (x + 16, y + 13), (x + 8, y + 19), (x, y + 13), (x, y + 4)], outline=color)
    # Mini check
    draw.line([(x + 5, y + 10), (x + 7, y + 12)], fill=color, width=2)
    draw.line([(x + 7, y + 12), (x + 12, y + 7)], fill=color, width=2)

def create_og_image(output_path="public/og-image.png"):
    W, H = 1200, 630
    
    # Base Canvas
    img = Image.new("RGBA", (W, H), (7, 11, 20, 255))
    
    # 1. Radial ambient glows
    glow_layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    glow_draw = ImageDraw.Draw(glow_layer)
    
    # Top-left Indigo glow
    cx1, cy1, r1 = 140, 60, 480
    for r in range(r1, 0, -5):
        alpha = int(55 * (1 - r / r1)**1.7)
        glow_draw.ellipse([cx1 - r, cy1 - r, cx1 + r, cy1 + r], fill=(79, 70, 229, alpha))
        
    # Bottom-right Cyan glow
    cx2, cy2, r2 = 1060, 530, 500
    for r in range(r2, 0, -5):
        alpha = int(45 * (1 - r / r2)**1.7)
        glow_draw.ellipse([cx2 - r, cy2 - r, cx2 + r, cy2 + r], fill=(6, 182, 212, alpha))

    # Center-right Purple glow
    cx3, cy3, r3 = 780, 260, 360
    for r in range(r3, 0, -5):
        alpha = int(32 * (1 - r / r3)**1.7)
        glow_draw.ellipse([cx3 - r, cy3 - r, cx3 + r, cy3 + r], fill=(168, 85, 247, alpha))

    img = Image.alpha_composite(img, glow_layer)
    
    # 2. Tech grid lines
    grid_layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    grid_draw = ImageDraw.Draw(grid_layer)
    step = 40
    for x in range(0, W, step):
        grid_draw.line([(x, 0), (x, H)], fill=(255, 255, 255, 7), width=1)
    for y in range(0, H, step):
        grid_draw.line([(0, y), (W, y)], fill=(255, 255, 255, 7), width=1)
    
    img = Image.alpha_composite(img, grid_layer)

    # 3. Glassmorphic card frame
    ui_layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    ui_draw = ImageDraw.Draw(ui_layer)
    ui_draw.rounded_rectangle([20, 20, W - 20, H - 20], radius=24, outline=(255, 255, 255, 24), width=1)
    
    # Glowing top accent gradient line
    x_start, x_end, y_bar = 64, W - 64, 23
    for i in range(x_start, x_end):
        ratio = (i - x_start) / (x_end - x_start)
        if ratio < 0.5:
            r = int(79 + (6 - 79) * (ratio * 2))
            g = int(70 + (182 - 70) * (ratio * 2))
            b = int(229 + (212 - 229) * (ratio * 2))
        else:
            r = int(6 + (16 - 6) * ((ratio - 0.5) * 2))
            g = int(182 + (185 - 182) * ((ratio - 0.5) * 2))
            b = int(212 + (129 - 212) * ((ratio - 0.5) * 2))
        ui_draw.line([(i, y_bar), (i, y_bar + 3)], fill=(r, g, b, 230), width=1)

    # Fonts
    font_dir = "C:/Windows/Fonts"
    try:
        font_hero = ImageFont.truetype(os.path.join(font_dir, "segoeuib.ttf"), 54)
        font_brand = ImageFont.truetype(os.path.join(font_dir, "segoeuib.ttf"), 25)
        font_body = ImageFont.truetype(os.path.join(font_dir, "segoeui.ttf"), 20)
        font_mono = ImageFont.truetype(os.path.join(font_dir, "consola.ttf"), 13)
        font_badge = ImageFont.truetype(os.path.join(font_dir, "segoeuib.ttf"), 15)
        font_cta = ImageFont.truetype(os.path.join(font_dir, "segoeuib.ttf"), 19)
    except Exception:
        font_hero = ImageFont.load_default()
        font_brand = font_hero
        font_body = font_hero
        font_mono = font_hero
        font_badge = font_hero
        font_cta = font_hero

    # 4. Header Section
    header_y = 56
    logo_size = 52
    
    # Logo
    if os.path.exists("public/logo.jpg"):
        try:
            raw_logo = Image.open("public/logo.jpg").convert("RGBA")
            raw_logo = raw_logo.resize((logo_size, logo_size), Image.Resampling.LANCZOS)
            mask = Image.new("L", (logo_size, logo_size), 0)
            mask_draw = ImageDraw.Draw(mask)
            mask_draw.rounded_rectangle([0, 0, logo_size, logo_size], radius=14, fill=255)
            img.paste(raw_logo, (64, header_y), mask)
            ui_draw.rounded_rectangle([64, header_y, 64 + logo_size, header_y + logo_size], radius=14, outline=(255, 255, 255, 50), width=1)
        except Exception:
            pass

    # Brand Title
    brand_x = 64 + logo_size + 16
    ui_draw.text((brand_x, header_y + 1), "FULLSTACK", font=font_brand, fill=(255, 255, 255, 255))
    ui_draw.text((brand_x + 152, header_y + 1), "2A", font=font_brand, fill=(56, 189, 248, 255))
    ui_draw.text((brand_x, header_y + 31), "DEVELOPPEMENT DIGITAL · OFPPT MAROC", font=font_mono, fill=(148, 163, 184, 240))

    # Top Right Pill
    pill_w, pill_h = 300, 42
    pill_x = W - 64 - pill_w
    pill_y = header_y + 5
    ui_draw.rounded_rectangle([pill_x, pill_y, pill_x + pill_w, pill_y + pill_h], radius=21, fill=(15, 23, 42, 220), outline=(255, 255, 255, 28))
    # Emerald status dot
    ui_draw.ellipse([pill_x + 18, pill_y + 16, pill_x + 28, pill_y + 26], fill=(16, 185, 129, 255))
    ui_draw.text((pill_x + 36, pill_y + 11), "Cursus Officiel & Examens EFM", font=font_badge, fill=(226, 232, 240, 255))

    # 5. Main Content
    content_y = 170
    ui_draw.line([(64, content_y + 7), (84, content_y + 7)], fill=(129, 140, 248, 255), width=3)
    ui_draw.text((94, content_y), "REVISION CURSUS 2EME ANNEE · WEB FULL STACK", font=font_mono, fill=(129, 140, 248, 255))

    title_y = content_y + 26
    ui_draw.text((64, title_y), "FullStack Master · 2ème Année", font=font_hero, fill=(255, 255, 255, 255))

    desc_y = title_y + 74
    ui_draw.text((64, desc_y), "Révisez le cursus Développement Digital OFPPT : cours interactifs, 200 QCM corrigés,", font=font_body, fill=(226, 232, 240, 245))
    ui_draw.text((64, desc_y + 30), "simulateurs interactifs PERT/Gantt et préparation complète aux examens.", font=font_body, fill=(148, 163, 184, 235))

    # 6. Badges (Frosted glass effect)
    badges_y = desc_y + 86
    badges_config = [
        {"text": "200 QCM Corrigés", "icon": draw_icon_quiz, "bg": (79, 70, 229, 45), "border": (99, 102, 241, 100), "fg": (199, 210, 254), "w": 210},
        {"text": "Simulateurs PERT & Gantt", "icon": draw_icon_bolt, "bg": (6, 182, 212, 40), "border": (6, 182, 212, 100), "fg": (165, 243, 252), "w": 265},
        {"text": "Modules M201 - M204", "icon": draw_icon_grid, "bg": (168, 85, 247, 40), "border": (168, 85, 247, 100), "fg": (233, 213, 255), "w": 235},
        {"text": "100% Conforme EFM", "icon": draw_icon_shield, "bg": (16, 185, 129, 40), "border": (16, 185, 129, 100), "fg": (167, 243, 208), "w": 215},
    ]

    bx = 64
    for b in badges_config:
        w = b["w"]
        # Frosted glass background
        ui_draw.rounded_rectangle([bx, badges_y, bx + w, badges_y + 44], radius=12, fill=b["bg"], outline=b["border"], width=1)
        # Vector Icon
        b["icon"](ui_draw, bx + 16, badges_y + 12, b["fg"])
        # Text label
        ui_draw.text((bx + 42, badges_y + 12), b["text"], font=font_badge, fill=b["fg"] + (255,))
        bx += w + 16

    # 7. Footer Divider & Action Row
    divider_y = 512
    ui_draw.line([(64, divider_y), (W - 64, divider_y)], fill=(255, 255, 255, 20), width=1)

    # Merge UI layer onto img before rendering CTA
    img = Image.alpha_composite(img, ui_layer)

    # CTA Button with glowing gradient
    cta_x = 64
    cta_y = divider_y + 22
    cta_w = 345
    cta_h = 56

    cta_img = Image.new("RGBA", (cta_w, cta_h), (0, 0, 0, 0))
    cta_draw = ImageDraw.Draw(cta_img)
    for col_x in range(cta_w):
        t = col_x / cta_w
        r = int(79 + (6 - 79) * t)
        g = int(70 + (182 - 70) * t)
        b = int(229 + (212 - 229) * t)
        cta_draw.line([(col_x, 0), (col_x, cta_h)], fill=(r, g, b, 255))

    cta_mask = Image.new("L", (cta_w, cta_h), 0)
    cta_mask_draw = ImageDraw.Draw(cta_mask)
    cta_mask_draw.rounded_rectangle([0, 0, cta_w, cta_h], radius=16, fill=255)

    img.paste(cta_img, (cta_x, cta_y), cta_mask)
    
    # CTA button border & text
    cta_overlay = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    cta_over_draw = ImageDraw.Draw(cta_overlay)
    cta_over_draw.rounded_rectangle([cta_x, cta_y, cta_x + cta_w, cta_y + cta_h], radius=16, outline=(255, 255, 255, 90), width=1)
    
    # CTA Text + Vector Arrow
    cta_text = "Commencer l'entraînement"
    cta_over_draw.text((cta_x + 22, cta_y + 15), cta_text, font=font_cta, fill=(255, 255, 255, 255))
    arrow_x = cta_x + 310
    arrow_y = cta_y + 27
    cta_over_draw.line([(arrow_x - 14, arrow_y), (arrow_x, arrow_y)], fill=(255, 255, 255, 255), width=2)
    cta_over_draw.line([(arrow_x - 6, arrow_y - 6), (arrow_x, arrow_y)], fill=(255, 255, 255, 255), width=2)
    cta_over_draw.line([(arrow_x - 6, arrow_y + 6), (arrow_x, arrow_y)], fill=(255, 255, 255, 255), width=2)

    # Right Trust Badge & Domain
    right_x = W - 64
    dom_text = "fullstack-2a.vercel.app"
    dom_w = 230
    dom_x = right_x - dom_w
    cta_over_draw.rounded_rectangle([dom_x, cta_y + 6, right_x, cta_y + 50], radius=10, fill=(56, 189, 248, 25), outline=(56, 189, 248, 70), width=1)
    cta_over_draw.text((dom_x + 18, cta_y + 17), dom_text, font=font_badge, fill=(56, 189, 248, 255))

    # Free badge with check
    free_x = dom_x - 220
    # Checkmark icon
    cta_over_draw.line([(free_x, cta_y + 27), (free_x + 4, cta_y + 31)], fill=(16, 185, 129, 255), width=2)
    cta_over_draw.line([(free_x + 4, cta_y + 31), (free_x + 11, cta_y + 23)], fill=(16, 185, 129, 255), width=2)
    cta_over_draw.text((free_x + 18, cta_y + 17), "100% Libre & Gratuit", font=font_badge, fill=(148, 163, 184, 255))

    img = Image.alpha_composite(img, cta_overlay)

    # Final Save
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    img.convert("RGB").save(output_path, "PNG", optimize=True)
    print(f"Refined OG Image successfully saved to {output_path} (1200x630)")

if __name__ == "__main__":
    create_og_image("public/og-image.png")
