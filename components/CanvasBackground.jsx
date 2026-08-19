'use client';

import { useEffect, useRef } from 'react';

const FRAME_COUNT = 240;

export default function CanvasBackground({ onProgress, onLoaded }) {
  const canvasRef = useRef(null);
  const imagesRef = useRef([]);
  const currentRenderedIndexRef = useRef(-1);
  const isTickingRef = useRef(false);

  // Generate frame path from public/frames
  const getFrameUrl = (index) => {
    const paddedIndex = String(index + 1).padStart(4, '0');
    return `/frames/frame_${paddedIndex}.jpg`;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false, desynchronized: true });
    if (!ctx) return;

    // High performance DPR canvas resize
    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.25);
      canvas.width = Math.round(window.innerWidth * dpr);
      canvas.height = Math.round(window.innerHeight * dpr);
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'medium';

      if (currentRenderedIndexRef.current >= 0) {
        renderFrame(currentRenderedIndexRef.current, true);
      }
    };

    // Draw frame with object-fit: cover calculation
    const renderFrame = (index, force = false) => {
      if (index === currentRenderedIndexRef.current && !force) return;

      const img = imagesRef.current[index];
      if (!img || !img.complete || img.naturalWidth === 0) return;

      currentRenderedIndexRef.current = index;

      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;

      const hRatio = canvasWidth / img.naturalWidth;
      const vRatio = canvasHeight / img.naturalHeight;
      const ratio = Math.max(hRatio, vRatio);

      const renderWidth = img.naturalWidth * ratio;
      const renderHeight = img.naturalHeight * ratio;
      const offsetX = (canvasWidth - renderWidth) * 0.5;
      const offsetY = (canvasHeight - renderHeight) * 0.5;

      ctx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight, offsetX, offsetY, renderWidth, renderHeight);
    };

    // Instant native scroll calculation
    const handleScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (maxScroll <= 0) return;

      const scrollTop = window.pageYOffset || document.documentElement.scrollTop || 0;
      const scrollFraction = Math.max(0, Math.min(1, scrollTop / maxScroll));
      const targetIndex = Math.min(FRAME_COUNT - 1, Math.floor(scrollFraction * FRAME_COUNT));

      if (targetIndex !== currentRenderedIndexRef.current) {
        renderFrame(targetIndex);
      }
    };

    const handleScrollThrottled = () => {
      if (!isTickingRef.current) {
        window.requestAnimationFrame(() => {
          handleScroll();
          isTickingRef.current = false;
        });
        isTickingRef.current = true;
      }
    };

    // Preload all 240 frames
    let loadedCount = 0;
    imagesRef.current = new Array(FRAME_COUNT);

    const onImageLoad = () => {
      loadedCount++;
      const progress = Math.round((loadedCount / FRAME_COUNT) * 100);
      if (onProgress) onProgress(progress);

      // Render frame 0 immediately once ready
      if (loadedCount === 1 || (imagesRef.current[0] && imagesRef.current[0].complete && currentRenderedIndexRef.current < 0)) {
        resizeCanvas();
        renderFrame(0, true);
      }

      if (loadedCount === FRAME_COUNT) {
        if (onLoaded) onLoaded();
        window.addEventListener('scroll', handleScrollThrottled, { passive: true });
        window.addEventListener('resize', () => {
          resizeCanvas();
          handleScroll();
        }, { passive: true });
        handleScroll();
      }
    };

    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.src = getFrameUrl(i);
      img.onload = onImageLoad;
      img.onerror = onImageLoad;
      imagesRef.current[i] = img;
    }

    resizeCanvas();

    return () => {
      window.removeEventListener('scroll', handleScrollThrottled);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [onProgress, onLoaded]);

  return (
    <div className="canvas-viewport">
      <canvas ref={canvasRef} id="hero-canvas"></canvas>
      <div className="canvas-ambient-gradient"></div>
    </div>
  );
}
