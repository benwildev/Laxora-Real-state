/**
 * Luxora Properties - Ultra High Performance Controller
 * Instant 60/120 FPS Native Frame Scrubbing & Interactive Components
 */

(() => {
  const FRAME_COUNT = 240;
  const canvas = document.getElementById('hero-canvas');
  const ctx = canvas ? canvas.getContext('2d', { alpha: false, desynchronized: true }) : null;
  
  const loaderEl = document.getElementById('loader');
  const loaderBar = document.getElementById('loader-bar');
  const loaderPercent = document.getElementById('loader-percent');

  const images = new Array(FRAME_COUNT);
  let currentRenderedIndex = -1;
  let isInitialRenderDone = false;
  let isTicking = false;

  // Generate frame file path
  const getFrameUrl = (index) => {
    const paddedIndex = String(index + 1).padStart(4, '0');
    return `frames/frame_${paddedIndex}.jpg`;
  };

  // High Performance Canvas Sizing
  const resizeCanvas = () => {
    if (!canvas || !ctx) return;
    
    // Performance optimized resolution
    const dpr = Math.min(window.devicePixelRatio || 1, 1.25);
    canvas.width = Math.round(window.innerWidth * dpr);
    canvas.height = Math.round(window.innerHeight * dpr);
    
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'medium';

    if (currentRenderedIndex >= 0) {
      renderFrame(currentRenderedIndex, true);
    }
  };

  // Ultra-fast cover draw
  const renderFrame = (index, force = false) => {
    if (!ctx || !canvas) return;
    if (index === currentRenderedIndex && !force) return;

    const img = images[index];
    if (!img || !img.complete || img.naturalWidth === 0) return;

    currentRenderedIndex = index;

    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;

    // Cover calculation
    const hRatio = canvasWidth / img.naturalWidth;
    const vRatio = canvasHeight / img.naturalHeight;
    const ratio = Math.max(hRatio, vRatio);

    const renderWidth = img.naturalWidth * ratio;
    const renderHeight = img.naturalHeight * ratio;
    const offsetX = (canvasWidth - renderWidth) * 0.5;
    const offsetY = (canvasHeight - renderHeight) * 0.5;

    ctx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight, offsetX, offsetY, renderWidth, renderHeight);
  };

  // Instant Native Scroll Frame Calculation
  const onScroll = () => {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    if (maxScroll <= 0) return;

    const scrollTop = window.pageYOffset || document.documentElement.scrollTop || 0;
    const scrollFraction = Math.max(0, Math.min(1, scrollTop / maxScroll));
    const targetIndex = Math.min(FRAME_COUNT - 1, Math.floor(scrollFraction * FRAME_COUNT));

    if (targetIndex !== currentRenderedIndex) {
      renderFrame(targetIndex);
    }
  };

  // RequestAnimationFrame throttled scroll listener for 120 FPS buttery response
  const handleScrollThrottled = () => {
    if (!isTicking) {
      window.requestAnimationFrame(() => {
        onScroll();
        isTicking = false;
      });
      isTicking = true;
    }
  };

  // Preload all 240 frames with memory caching
  const preloadImages = () => {
    let loadedCount = 0;

    const onImageLoad = () => {
      loadedCount++;
      const progress = Math.round((loadedCount / FRAME_COUNT) * 100);

      if (loaderPercent) loaderPercent.textContent = `${progress}%`;
      if (loaderBar) loaderBar.style.width = `${progress}%`;

      // Render frame 0 immediately once ready
      if (!isInitialRenderDone && images[0] && images[0].complete) {
        resizeCanvas();
        renderFrame(0, true);
        isInitialRenderDone = true;
      }

      // When fully loaded, remove preloader and activate scroll sync
      if (loadedCount === FRAME_COUNT) {
        // Setup passive native scroll listener
        window.addEventListener('scroll', handleScrollThrottled, { passive: true });
        window.addEventListener('resize', () => {
          resizeCanvas();
          onScroll();
        }, { passive: true });

        // Initial sync
        onScroll();

        setTimeout(() => {
          if (loaderEl) {
            loaderEl.classList.add('hidden');
          }
        }, 200);
      }
    };

    // Parallel load all 240 frames
    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.src = getFrameUrl(i);
      img.onload = onImageLoad;
      img.onerror = onImageLoad;
      images[i] = img;
    }
  };

  // Interactive UI Components
  const initInteractiveComponents = () => {
    // 1. FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach((item) => {
      const btn = item.querySelector('.faq-question');
      if (!btn) return;
      btn.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        faqItems.forEach((other) => {
          other.classList.remove('active');
          const otherBtn = other.querySelector('.faq-question');
          if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
        });
        if (!isActive) {
          item.classList.add('active');
          btn.setAttribute('aria-expanded', 'true');
        }
      });
    });

    // 2. Favorite Buttons (Heart toggle)
    const favoriteBtns = document.querySelectorAll('.favorite-btn');
    favoriteBtns.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        btn.classList.toggle('favorited');
        const icon = btn.querySelector('i');
        if (icon) {
          if (btn.classList.contains('favorited')) {
            icon.classList.remove('fa-regular');
            icon.classList.add('fa-solid');
          } else {
            icon.classList.remove('fa-solid');
            icon.classList.add('fa-regular');
          }
        }
      });
    });

    // 3. Testimonial pagination dots
    const testDots = document.querySelectorAll('.test-dots .dot');
    const testText = document.querySelector('.testimonial-text');
    const testAuthor = document.querySelector('.author-name');
    const testTitle = document.querySelector('.author-title');
    const testAvatar = document.querySelector('.author-avatar');

    const testimonialsData = [
      {
        quote: '"From the first consultation to closing, Luxora Properties provided unmatched expertise and personalized service. Truly a world-class experience."',
        author: 'Michael Thompson',
        title: 'Entrepreneur, New York',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
      },
      {
        quote: '"The attention to detail and curated access to off-market estates in Beverly Hills surpassed all our expectations. Exceptional discretion and professionalism."',
        author: 'Elena Rostova',
        title: 'Tech Founder, London',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
      },
      {
        quote: '"Securing our Dubai penthouse through Luxora was completely frictionless. Their international advisory team is simply without equal."',
        author: 'David & Sarah Chen',
        title: 'Private Investors, Singapore',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80'
      }
    ];

    testDots.forEach((dot, idx) => {
      dot.addEventListener('click', () => {
        testDots.forEach(d => d.classList.remove('active'));
        dot.classList.add('active');
        if (testimonialsData[idx] && testText && testAuthor) {
          testText.textContent = testimonialsData[idx].quote;
          testAuthor.textContent = testimonialsData[idx].author;
          testTitle.textContent = testimonialsData[idx].title;
          if (testAvatar) testAvatar.src = testimonialsData[idx].avatar;
        }
      });
    });

    // 4. Video Play button
    const videoPlayBtn = document.querySelector('.video-play-btn');
    if (videoPlayBtn) {
      videoPlayBtn.addEventListener('click', () => {
        alert('Launching 4K Virtual Property Tour...');
      });
    }

    // 5. Filter items click
    const filterItems = document.querySelectorAll('.filter-item');
    filterItems.forEach(item => {
      item.addEventListener('click', () => {
        const selectVal = item.querySelector('.selected-val');
        if (!selectVal) return;
        selectVal.style.color = 'var(--color-gold-dark)';
      });
    });
  };

  // Initialize
  window.addEventListener('DOMContentLoaded', () => {
    resizeCanvas();
    preloadImages();
    initInteractiveComponents();
  });
})();
