import React, { useEffect } from 'react';

const CursorFollower = () => {
  useEffect(() => {
    const circle = document.querySelector('.cursor-circle');

    const moveCursor = (e) => {
      circle.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    };

    document.addEventListener('mousemove', moveCursor);
    return () => document.removeEventListener('mousemove', moveCursor);
  }, []);

  return (
    <div
      className="cursor-circle fixed top-0 left-0 w-10 h-10 border-2 border-yellow-500 rounded-full pointer-events-none z-[9999] transition-transform duration-75 ease-out bg-transparent backdrop-blur-sm"
    />
  );
};

export default CursorFollower;
