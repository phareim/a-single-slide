# Google Web Fonts URL Parameter Support

This slide editor now supports setting fonts dynamically via URL parameters using Google Web Fonts.

## Usage

### Basic Font Selection
Add a `font` parameter to the URL to set the font family:

```
http://localhost:5173/?font=Inter
http://localhost:5173/?font=Open Sans
http://localhost:5173/?font=Roboto
```

### Font Weight Selection
Add a `weight` parameter to set the font weight:

```
http://localhost:5173/?font=Raleway&weight=700
http://localhost:5173/?font=Montserrat&weight=300
```

### Available Fonts
The application includes 20 popular Google Web Fonts:

- Raleway (default)
- Inter
- Roboto
- Open Sans
- Lato
- Montserrat
- Source Sans Pro
- Oswald
- Merriweather
- Playfair Display
- Poppins
- Nunito
- PT Sans
- Ubuntu
- Crimson Text
- Lora
- Work Sans
- Fira Sans
- Rubik
- DM Sans

### Available Font Weights
- 100 (Thin)
- 200 (Extra Light)
- 300 (Light)
- 400 (Regular) - default
- 500 (Medium)
- 600 (Semi Bold)
- 700 (Bold)
- 800 (Extra Bold)
- 900 (Black)

*Note: Not all fonts support all weights. Google Fonts will automatically fall back to available weights.*

### Font Selector UI
Click the "Aa" button in the top-right corner to open the font selector interface, which allows you to:
- Choose from available fonts
- Select font weights
- See the current URL with parameters
- Test different combinations easily

### Custom Fonts
You can also use any Google Web Font by adding its name to the URL parameter:

```
http://localhost:5173/?font=Dancing Script&weight=400
http://localhost:5173/?font=Pacifico&weight=400
```

The application will automatically load the requested font from Google Fonts.

### Examples

1. **Bold Inter**: `?font=Inter&weight=700`
2. **Light Montserrat**: `?font=Montserrat&weight=300`
3. **Regular Playfair Display**: `?font=Playfair Display&weight=400`
4. **Thin Roboto**: `?font=Roboto&weight=100`

### How It Works

The application:
1. Reads URL parameters on page load
2. Dynamically loads the requested Google Web Font
3. Applies the font to the slide text editor
4. Updates the URL when fonts are changed via the UI

All font loading is done dynamically without requiring page refreshes, and the font selection persists across browser sessions via URL parameters.