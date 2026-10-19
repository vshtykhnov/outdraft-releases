#!/bin/bash
# Generate favicon files and OG image for Outdraft landing

set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
OUT_DIR="${1:-$SCRIPT_DIR/..}"

echo "Generating assets..."
echo "Output directory: $OUT_DIR"

# Create temp working directory
TEMP_DIR=$(mktemp -d)
trap "rm -rf $TEMP_DIR" EXIT

# Generate favicons from SVG
echo "  Generating favicons..."

# First convert SVG to high-res PNG for better quality conversion
rsvg-convert -w 512 -h 512 "$SCRIPT_DIR/favicon.svg" > "$TEMP_DIR/favicon-512.png"

# Generate various favicon sizes
convert "$TEMP_DIR/favicon-512.png" -resize 180x180 "$OUT_DIR/apple-touch-icon.png"
convert "$TEMP_DIR/favicon-512.png" -resize 32x32 "$OUT_DIR/favicon-32x32.png"
convert "$TEMP_DIR/favicon-512.png" -resize 16x16 "$OUT_DIR/favicon-16x16.png"

# Generate multi-resolution ICO file
convert "$TEMP_DIR/favicon-512.png" -define icon:auto-resize=64,48,32,16 "$OUT_DIR/favicon.ico"

echo "    Created apple-touch-icon.png, favicon-32x32.png, favicon-16x16.png, favicon.ico"

# Generate OG image (1200x630) from demo.jpg or overlay.png
echo "  Generating OG image..."

# Use demo.jpg as base and add overlay + branding
if [ -f "$OUT_DIR/media/demo.jpg" ]; then
    # Create a 1200x630 OG image with the demo screenshot and brand
    convert "$OUT_DIR/media/demo.jpg" \
        -resize 1200x675^ \
        -gravity center \
        -extent 1200x630 \
        -brightness-contrast -10x5 \
        "$TEMP_DIR/og-base.png"
    
    # Create logo at larger size
    rsvg-convert -w 160 -h 160 "$SCRIPT_DIR/favicon.svg" > "$TEMP_DIR/logo.png"
    
    # Create text image with brand name
    convert -size 400x80 xc:transparent \
        -font DejaVu-Sans-Bold -pointsize 64 -fill white \
        -gravity west -annotate +0+0 "Outdraft" \
        "$TEMP_DIR/brand-text.png"
    
    # Create tagline text
    convert -size 600x40 xc:transparent \
        -font DejaVu-Sans -pointsize 28 -fill '#8b95a5' \
        -gravity west -annotate +0+0 "Free Dota 2 draft helper overlay" \
        "$TEMP_DIR/tagline.png"
    
    # Composite everything
    composite -gravity northwest -geometry +60+200 "$TEMP_DIR/logo.png" "$TEMP_DIR/og-base.png" "$TEMP_DIR/og-with-logo.png"
    composite -gravity northwest -geometry +240+230 "$TEMP_DIR/brand-text.png" "$TEMP_DIR/og-with-logo.png" "$TEMP_DIR/og-with-brand.png"
    composite -gravity northwest -geometry +240+300 "$TEMP_DIR/tagline.png" "$TEMP_DIR/og-with-brand.png" "$OUT_DIR/media/og-image.png"
    
    echo "    Created media/og-image.png"
else
    echo "    Warning: media/demo.jpg not found, skipping OG image generation"
fi

echo "Asset generation complete!"
