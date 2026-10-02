import { useEffect } from 'react';

const useRippleEffect = () => {
  useEffect(() => {
    const activeRipples = new Set();
    let rafId = null;

    const cleanup = () => {
      activeRipples.forEach((el) => {
        el.removeEventListener('animationend', el._cleanupFn);
        el.remove();
      });
      activeRipples.clear();
      if (rafId) cancelAnimationFrame(rafId);
    };

    const createRipple = (target, clientX, clientY) => {
      // Defer DOM reads to next animation frame to avoid forced reflow
      rafId = requestAnimationFrame(() => {
        const rect = target.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = clientX - rect.left - size / 2;
        const y = clientY - rect.top - size / 2;

        const ripple = document.createElement('span');
        ripple.className = 'ripple';
        // Use transform + will-change for GPU layer promotion
        ripple.style.cssText = `
          width:${size}px;height:${size}px;
          left:${x}px;top:${y}px;
          will-change:transform,opacity;
        `;

        const cleanupFn = () => {
          ripple.removeEventListener('animationend', cleanupFn);
          activeRipples.delete(ripple);
          ripple.remove();
        };
        ripple._cleanupFn = cleanupFn;
        ripple.addEventListener('animationend', cleanupFn, { once: true });

        activeRipples.add(ripple);
        target.appendChild(ripple);

        // Hard cap at 2 ripples per button to prevent DOM bloat
        const ripples = target.getElementsByClassName('ripple');
        while (ripples.length > 2) ripples[0].remove();
      });
    };

    // Use capture phase + pointerdown (fires ~100ms before click for instant feedback)
    const handlePointerDown = (e) => {
      // Only primary button / single touch
      if (e.button !== undefined && e.button !== 0) return;
      const target = e.target.closest('.ripple-btn');
      if (!target) return;
      createRipple(target, e.clientX, e.clientY);
    };

    document.addEventListener('pointerdown', handlePointerDown, { passive: true });

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      cleanup();
    };
  }, []);
};

export default useRippleEffect;
