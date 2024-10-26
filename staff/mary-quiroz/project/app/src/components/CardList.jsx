import React, { useState, useEffect, useRef } from 'react'

export const CardList = ({ data, renderCard }) => {
  const [visibleItems, setVisibleItems] = useState(2); // Mostrar 2 elementos inicialmente
  const loadingRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first.isIntersecting && visibleItems < data?.length) {
          // Cuando el elemento loading es visible, cargamos más items
          setTimeout(() => {
            setVisibleItems((prev) => Math.min(prev + 2, data?.length));
          }, 500); // Pequeño delay para efecto visual
        }
      },
      { threshold: 0.1 } // Trigger cuando el 10% del elemento es visible
    );

    if (loadingRef.current) {
      observer.observe(loadingRef.current);
    }

    return () => {
      if (loadingRef.current) {
        observer.unobserve(loadingRef.current);
      }
    };
  }, [visibleItems, data?.length]);

  return (
    <div className='ml-8 mr-8 mb-8'>
      <ul className="divide-y divide-gray-200 dark:divide-gray-700 flex-grow pb-30">
        {data && data.slice(0, visibleItems).map((element, index) => renderCard(element, index))}
      </ul>
      
      {/* Elemento loading */}
      {data && visibleItems < data.length && (
        <div 
          ref={loadingRef}
          className="flex justify-center items-center p-4"
        >
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-white"></div>
        </div>
      )}
    </div>
  );
}
