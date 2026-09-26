import React, { useEffect, useRef } from 'react';
import { ASCII_FLOWER_BASE64 } from './asciiFlowerAsset';

/**
 * Natural dimensions of the original ASCII flower composition.
 */
const ORIGINAL_WIDTH = 480;
const ORIGINAL_HEIGHT = 854;
const PERIOD_SECONDS = 6;
const FLIGHT_RATIO = 0.92;
const MAX_RADIUS = 360;
const POLLEN_COUNT = 22;
const CELL_SIZE = 6;
const SCALE_FACTOR = 0.58;
const CHAR_RAMP = ['1', '7', '4', '3', '2', '6', '5', '9', '8', '0'];

/**
 * Deterministic pseudo-random number generator for uniform particle distribution.
 *
 * @param {number} seed - Input seed value
 * @returns {number} Fractional pseudo-random float in [0, 1)
 */
function pseudoRandom(seed) {
  const x = Math.sin(seed * 999.7) * 43758.5453;
  return x - Math.floor(x);
}

/**
 * Generates the configuration list for rising pollen particles.
 *
 * @returns {Array<Object>} Array of particle configurations
 */
function createPollenParticles() {
  const particles = [];
  for (let i = 0; i < POLLEN_COUNT; i++) {
    particles.push({
      phase: (i / POLLEN_COUNT) * PERIOD_SECONDS,
      startOffX: (pseudoRandom(i * 2.3) - 0.5) * 40,
      startOffY: (pseudoRandom(i * 6.1) - 0.5) * 24,
      baseAngle: -Math.PI / 2 + (pseudoRandom(i * 3.1) - 0.5) * 1.3,
      swayAmp: 5 + pseudoRandom(i * 5.3) * 10,
      swayFreq: 0.7 + pseudoRandom(i * 7.7) * 1.1,
      swayPhase: pseudoRandom(i * 11.1) * Math.PI * 2,
      seedOffset: pseudoRandom(i * 13.9) * 10,
      size: 11 + pseudoRandom(i * 4.4) * 6,
      maxOp: 0.65 + pseudoRandom(i * 9.1) * 0.35,
    });
  }
  return particles;
}

const POLLEN_PARTICLES = createPollenParticles();

/**
 * Cached promise singleton to ensure the ASCII character rasterization
 * occurs exactly once across all component instances.
 */
let cachedAsciiPromise = null;

/**
 * Pre-renders the reference flower image into an offscreen ASCII character canvas.
 *
 * @returns {Promise<{ asciiCanvas: HTMLCanvasElement, centerX: number, centerY: number }>}
 */
function getPreRenderedAsciiFlower() {
  if (cachedAsciiPromise) {
    return cachedAsciiPromise;
  }

  cachedAsciiPromise = new Promise((resolve) => {
    const img = new Image();

    // Fallback and completion handler
    const processImage = () => {
      const artCanvas = document.createElement('canvas');
      artCanvas.width = ORIGINAL_WIDTH;
      artCanvas.height = ORIGINAL_HEIGHT;
      const artCtx = artCanvas.getContext('2d');

      const drawW = ORIGINAL_WIDTH * SCALE_FACTOR;
      const drawH = ORIGINAL_HEIGHT * SCALE_FACTOR;
      const offX = (ORIGINAL_WIDTH - drawW) / 2;
      const offY = ORIGINAL_HEIGHT * 0.34 - drawH * 0.02;

      artCtx.drawImage(img, offX, offY, drawW, drawH);

      const cols = Math.floor(ORIGINAL_WIDTH / CELL_SIZE);
      const rows = Math.floor(ORIGINAL_HEIGHT / CELL_SIZE);
      const smallCanvas = document.createElement('canvas');
      smallCanvas.width = cols;
      smallCanvas.height = rows;
      const smallCtx = smallCanvas.getContext('2d');
      smallCtx.drawImage(artCanvas, 0, 0, ORIGINAL_WIDTH, ORIGINAL_HEIGHT, 0, 0, cols, rows);

      const pxData = smallCtx.getImageData(0, 0, cols, rows).data;

      const asciiCanvas = document.createElement('canvas');
      asciiCanvas.width = ORIGINAL_WIDTH;
      asciiCanvas.height = ORIGINAL_HEIGHT;
      const aactx = asciiCanvas.getContext('2d');

      aactx.textAlign = 'center';
      aactx.textBaseline = 'middle';
      aactx.font = `${CELL_SIZE * 1.5}px "Courier New", monospace`;

      let sumX = 0;
      let sumY = 0;
      let sumW = 0;
      let defaultCenterX = ORIGINAL_WIDTH / 2;
      let defaultCenterY = ORIGINAL_HEIGHT * 0.42;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const idx = (r * cols + c) * 4;
          let lum = (pxData[idx] + pxData[idx + 1] + pxData[idx + 2]) / (3 * 255);
          if (lum <= 0.05) continue;

          lum = Math.pow(lum, 0.5); // Boost midtones for clean white appearance
          const chIdx = Math.min(
            CHAR_RAMP.length - 1,
            Math.max(0, Math.round(lum * (CHAR_RAMP.length - 1)))
          );

          aactx.fillStyle = `rgba(255, 255, 255, ${Math.max(0.65, lum)})`;
          aactx.fillText(
            CHAR_RAMP[chIdx],
            c * CELL_SIZE + CELL_SIZE / 2,
            r * CELL_SIZE + CELL_SIZE / 2
          );

          if (r < rows * 0.62) {
            sumX += c * lum;
            sumY += r * lum;
            sumW += lum;
          }
        }
      }

      if (sumW > 0) {
        defaultCenterX = (sumX / sumW) * CELL_SIZE;
        defaultCenterY = (sumY / sumW) * CELL_SIZE;
      }

      resolve({
        asciiCanvas,
        centerX: defaultCenterX,
        centerY: defaultCenterY,
      });
    };

    img.onload = processImage;
    img.onerror = () => {
      // If public asset fails to load, fallback to embedded base64 string
      img.onerror = null;
      img.src = `data:image/png;base64,${ASCII_FLOWER_BASE64}`;
    };

    // Attempt primary asset load first
    img.src = '/assets/ascii-flower-ref.png';
  });

  return cachedAsciiPromise;
}

/**
 * Draws the rising pollen dust particles on the main canvas context.
 *
 * @param {CanvasRenderingContext2D} ctx - Target 2D rendering context
 * @param {number} t - Current time in seconds within the animation loop period
 * @param {number} centerX - Origin X coordinate of the flower bloom
 * @param {number} centerY - Origin Y coordinate of the flower bloom
 */
function renderPollen(ctx, t, centerX, centerY) {
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  POLLEN_PARTICLES.forEach((s) => {
    const local = ((t - s.phase) % PERIOD_SECONDS + PERIOD_SECONDS) % PERIOD_SECONDS;
    const p = local / PERIOD_SECONDS;
    if (p >= FLIGHT_RATIO) return;

    const pf = p / FLIGHT_RATIO;
    const ease = 1 - (1 - pf) * (1 - pf); // Rises quickly then lingers
    const dist = MAX_RADIUS * ease;
    const sway = Math.sin(pf * s.swayFreq * Math.PI * 2 + s.swayPhase) * s.swayAmp * pf;
    const x = centerX + s.startOffX + Math.cos(s.baseAngle) * dist + sway;
    const y = centerY + s.startOffY + Math.sin(s.baseAngle) * dist;
    const op = Math.sin(Math.PI * pf) * s.maxOp;

    if (op <= 0.02) return;

    ctx.save();
    ctx.globalAlpha = op;
    ctx.fillStyle = '#ffffff';
    ctx.font = `${s.size.toFixed(1)}px "Courier New", monospace`;
    ctx.fillText('O', x, y);
    ctx.restore();
  });
}

/**
 * AsciiFlowerAnimation Component
 *
 * Programmatic reproduction of the Figma `ascii_flower_pollen` background animation.
 * Displays a flower composed of white ASCII characters with motes of rising pollen dust.
 *
 * @param {Object} props
 * @param {number} [props.opacity=0.3] - Layer opacity matching Figma (default 0.3)
 * @param {string} [props.className=''] - Additional CSS classes
 * @param {React.CSSProperties} [props.style={}] - Inline styling (e.g. positioning / rotation transforms)
 */
export default function AsciiFlowerAnimation({
  opacity = 0.3,
  className = '',
  style = {},
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId = null;
    let isMounted = true;

    // Adapt to display device pixel ratio for sharp monospace rendering
    const dpr = window.devicePixelRatio || 1;
    canvas.width = ORIGINAL_WIDTH * dpr;
    canvas.height = ORIGINAL_HEIGHT * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    getPreRenderedAsciiFlower().then(({ asciiCanvas, centerX, centerY }) => {
      if (!isMounted) return;

      /**
       * Primary requestAnimationFrame rendering loop.
       */
      const render = () => {
        if (!document.hidden) {
          ctx.clearRect(0, 0, ORIGINAL_WIDTH, ORIGINAL_HEIGHT);
          ctx.drawImage(asciiCanvas, 0, 0);
          const t = (performance.now() / 1000) % PERIOD_SECONDS;
          renderPollen(ctx, t, centerX, centerY);
        }
        animationFrameId = requestAnimationFrame(render);
      };

      animationFrameId = requestAnimationFrame(render);
    });

    return () => {
      isMounted = false;
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none select-none ${className}`}
      style={{
        opacity,
        ...style,
      }}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
        style={{
          aspectRatio: `${ORIGINAL_WIDTH} / ${ORIGINAL_HEIGHT}`,
        }}
      />
    </div>
  );
}
