import { useEffect, useRef, useState } from 'react';

// Singleton shared IntersectionObserver — one instance across the entire app
let sharedObserver = null;
const entryMap = new WeakMap();

const getSharedObserver = (threshold, rootMargin) => {
  const key = `${threshold}_${rootMargin}`;
  if (!sharedObserver) {
    sharedObserver = {};
  }
  if (!sharedObserver[key]) {
    sharedObserver[key] = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const cb = entryMap.get(entry.target);
          if (cb && entry.isIntersecting) {
            cb(true);
            sharedObserver[key].unobserve(entry.target);
          }
        });
      },
      { threshold, rootMargin }
    );
  }
  return sharedObserver[key];
};

export const useScrollAnimation = (threshold = 0.15, rootMargin = '0px 0px -50px 0px') => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const calledRef = useRef(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = getSharedObserver(threshold, rootMargin);
    const callback = (visible) => {
      // Fire once to prevent double-set state updates when threshold changes
      if (calledRef.current) return;
      calledRef.current = true;
      setIsVisible(true);
    };

    entryMap.set(element, callback);
    observer.observe(element);

    return () => {
      entryMap.delete(element);
      observer.unobserve(element);
    };
  }, [threshold, rootMargin]);

  return [ref, isVisible];
};

export default useScrollAnimation;
