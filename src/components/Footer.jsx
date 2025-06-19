import React from 'react';

function Footer() {
  return (
    <footer className="bg-gray-800 py-4 text-center text-white">
      <div className="container mx-auto">
        <p>&copy; {new Date().getFullYear()} FitLife. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer; 