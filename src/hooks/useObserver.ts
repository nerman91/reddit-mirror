import React from 'react';

export const useObserver = (
  ref: React.RefObject<HTMLDivElement>,
  isLoading: boolean,
  callback: () => void
) => {
  React.useEffect(() => {
    if (isLoading) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) callback();
      },
      { rootMargin: '10px' }
    );

    if (ref.current) observer.observe(ref.current);

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [isLoading]);
};
