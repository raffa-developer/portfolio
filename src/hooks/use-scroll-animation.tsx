import { useEffect, useRef, useState } from 'react';

/**
 * Hook para animações de scroll baseado em IntersectionObserver
 * Retorna ref e estado de visibilidade para animações
 */
export const useScrollAnimation = (options?: {
  threshold?: number;
  rootMargin?: string;
}) => {
  const elementRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else {
          // Reset quando sair para animar novamente quando voltar
          setIsVisible(false);
        }
      },
      {
        threshold: options?.threshold || 0.1,
        rootMargin: options?.rootMargin || '0px 0px -100px 0px',
      }
    );

    const currentRef = elementRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [options?.threshold, options?.rootMargin]);

  return { ref: elementRef, isVisible };
};

