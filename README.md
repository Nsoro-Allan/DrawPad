# DrawPad App

A modern, web-based drawing application built with React and TypeScript. DrawPad offers an intuitive canvas for freehand drawing, erasing, color selection, dark/light mode, and image export. Perfect for quick sketches, notes, or creative artwork.


## Features
- **Freehand Drawing**: Draw smoothly on a responsive canvas.
- **Eraser Tool**: Switch between pen and eraser for easy corrections.
- **Color Picker**: Choose your preferred drawing color.
- **Adjustable Brush Size**: Change the pen/eraser thickness.
- **Dark & Light Mode**: Toggle background color for comfort.
- **Clear Canvas**: Instantly erase all drawings.
- **Download as PNG**: Export your artwork with a single click.
- **Responsive Design**: Works great on desktop and mobile browsers.

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Nsoro-Allan/DrawPad.git
   cd DrawPad
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```

---

## Usage

1. **Start the development server:**
   ```bash
   npm run dev
   ```
   The app will be available at [http://localhost:5173](http://localhost:5173) (or as indicated in your terminal).

2. **Drawing:**
   - Use your mouse (or finger, on touch devices) to draw on the canvas.
   - Select the **Pen** or **Eraser** tool.
   - Pick a color and adjust the brush size as needed.
   - Toggle between **Dark** and **Light** backgrounds for comfortable viewing.
   - Click **Clear** to erase the canvas.
   - Click **Download** to save your drawing as a PNG file.

---

## Available Scripts
- `npm run dev` – Start the development server with hot reload.
- `npm run build` – Build the app for production to the `dist` folder.
- `npm run preview` – Preview the production build locally.
- `npm run lint` – Lint the source code for issues.

---

## Project Structure
```
DrawPad/
│
├── public/           # Static assets (favicon, etc.)
├── src/              # Source code
│   ├── App.tsx       # Main app component
│   ├── App.css       # App styles
│   ├── main.tsx      # Entry point
│   └── ...           # Other components/assets
├── index.html        # HTML template
├── package.json      # Project metadata & scripts
├── tsconfig*.json    # TypeScript configuration
└── README.md         # This file
```

---

## Contributing

Contributions are welcome! To contribute:
1. Fork this repository.
2. Create a new branch (`git checkout -b feature/your-feature-name`).
3. Commit your changes (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature/your-feature-name`).
5. Create a Pull Request.


Enjoy creating with DrawPad!