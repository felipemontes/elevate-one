# Images Folder - Elevate by RAM

Place your event images here. The following images are needed:

## Feature Icons (64x64px recommended, will be cropped to square)

| Filename | Description | Current Fallback |
|----------|-------------|------------------|
| `fire-therapy.jpg` | Sauna/fire therapy session | Unsplash placeholder |
| `ice-bath.jpg` | Ice immersion/cold therapy | Unsplash placeholder |
| `lake-navigation.jpg` | Planchon boat on Calima lake | Unsplash placeholder |
| `healthy-food.jpg` | Brunch/healthy meal | Unsplash placeholder |
| `networking.jpg` | People networking/connecting | Unsplash placeholder |

## Leader Photos (Square, 200x200px or larger)

| Filename | Description |
|----------|-------------|
| `daniela.jpg` | Daniela Antury profile photo |
| `karen.jpg` | Karen profile photo |
| `ram.jpg` | RAM 888 profile photo |

## Hero/Background Images

| Filename | Description |
|----------|-------------|
| `hero-bg.jpg` | Mountain/nature background (1920x1080 or larger) |
| `vsl-thumbnail.jpg` | Video thumbnail (1280x720 recommended) |

## How to Update

1. Add your images to this folder
2. Update the `src` attributes in `index.html`:

```html
<!-- Example: Feature image -->
<img src="images/fire-therapy.jpg" alt="Inmersion en Fuego">

<!-- Example: Leader photo -->
<div class="leader-avatar daniela">
    <img src="images/daniela.jpg" alt="Daniela Antury">
</div>
```

## Image Optimization Tips

- Use WebP format for better compression
- Compress images using tools like TinyPNG or Squoosh
- Keep file sizes under 200KB for feature icons
- Keep file sizes under 500KB for hero/background images
