import React, { useState, useRef, useEffect } from 'react';
import { faPaintBrush, faEraser, faTrash, faDownload, faAdjust } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './App.css';

function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#3ecf8e'); 
  const [size, setSize] = useState(5);
  const [hasDrawn, setHasDrawn] = useState(false);
  const [tool, setTool] = useState<'pen' | 'eraser'>('pen');
  const [bgColor, setBgColor] = useState('#121212');
  const [isDark, setIsDark] = useState(true);

  const toggleBg = () => {
    const newBg = isDark ? '#ffffff' : '#121212';
    setBgColor(newBg);
    setIsDark(!isDark);
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.globalCompositeOperation = 'source-over';
        ctx.fillStyle = newBg;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
    }
  };

  // Responsive canvas size and background fill
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (canvas) {
        // Make the canvas even larger (up to 2000x1200)
        canvas.width = Math.min(window.innerWidth * 0.99, 5000);
        canvas.height = Math.min(window.innerHeight * 0.92, 1200);
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.lineCap = 'round';
          ctx.lineJoin = 'round';
          ctx.globalCompositeOperation = 'source-over';
          ctx.fillStyle = bgColor;
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, [bgColor]);

  // Hide default cursor on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) canvas.style.cursor = 'crosshair'; // set back to normal crosshair
  }, []);

  const startDrawing = (event: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    setHasDrawn(true);
    handleMouseMove(event);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    const context = canvasRef.current?.getContext('2d');
    context?.beginPath();
  };

  const draw = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !canvasRef.current) return;
    const canvas = canvasRef.current;
    // Use event.nativeEvent.offsetX/Y for accurate drawing position
    const x = event.nativeEvent.offsetX;
    const y = event.nativeEvent.offsetY;
    const context = canvas.getContext('2d');
    if (!context) return;
    if (tool === 'eraser') {
      context.globalCompositeOperation = 'source-over';
      context.strokeStyle = bgColor;
      context.lineWidth = size * 2;
    } else {
      context.globalCompositeOperation = 'source-over';
      context.strokeStyle = color;
      context.lineWidth = size;
    }
    context.lineTo(x, y);
    context.stroke();
    context.beginPath();
    context.moveTo(x, y);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.globalCompositeOperation = 'source-over';
        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
    }
    setHasDrawn(false);
  };

  const downloadImage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = 'drawing.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  // For custom cursor positioning
  const handleMouseMove = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current) return;
    // Get bounding rect and scaling
    const rect = canvasRef.current.getBoundingClientRect();
    const scaleX = canvasRef.current.width / rect.width;
    const scaleY = canvasRef.current.height / rect.height;
    // Calculate accurate canvas coordinates
    const x = (event.clientX - rect.left) * scaleX;
    const y = (event.clientY - rect.top) * scaleY;
    // Pass a synthetic event to draw with corrected coordinates
    draw({ ...event, nativeEvent: { ...event.nativeEvent, offsetX: x, offsetY: y } });
  };

  return (
    <div className="App supabase-bg" style={{background: bgColor}}>
      <div className="background-grid" />
      <h1 className="app-title">DrawPad App</h1>
      <div className="controls animated-controls">
        <label className="color-label">
          <span>Color</span>
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            disabled={tool === 'eraser'}
          />
        </label>
        <label className="size-label">
          <span>Size</span>
          <input
            type="range"
            min="1"
            max="50"
            value={size}
            onChange={(e) => setSize(parseInt(e.target.value))}
          />
          <span className="size-preview" style={{ background: tool === 'eraser' ? bgColor : color, width: size * 1.5, height: size * 1.5, border: tool === 'eraser' ? '2px dashed #3ecf8e' : '' }} />
        </label>
        <button className={`fancy-btn tool-btn${tool === 'pen' ? ' active' : ''}`} onClick={() => setTool('pen')}>
          <FontAwesomeIcon icon={faPaintBrush} />
        </button>
        <button className={`fancy-btn tool-btn${tool === 'eraser' ? ' active' : ''}`} onClick={() => setTool('eraser')}>
          <FontAwesomeIcon icon={faEraser} />
        </button>
        <button className="fancy-btn bg-toggle-btn" onClick={toggleBg}>
          <FontAwesomeIcon icon={faAdjust} />
        </button>
        <button className="fancy-btn clear-btn" onClick={clearCanvas}>
          <FontAwesomeIcon icon={faTrash} />
        </button>
        {hasDrawn && (
          <button className="fancy-btn download-btn" onClick={downloadImage}>
            <FontAwesomeIcon icon={faDownload} />
          </button>
        )}
      </div>
      <div style={{ position: 'relative', display: 'inline-block' }}>
        <canvas
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseUp={stopDrawing}
          onMouseOut={stopDrawing} onMouseMove={handleMouseMove}
          className="drawing-canvas"
        />
      </div>
    </div>
  );
}

export default App;