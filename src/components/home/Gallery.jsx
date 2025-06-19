import axios from "axios";
import React, { useEffect } from "react";

const Gallery = () => {
  const [photo, setPhotos] = React.useState([]);
  const [selectedImage,setselecteImage] = React.useState(null);
  const [isOpen, setIsOpen] = React.useState(false); 

    const openImage = (image) => {
        setselecteImage(image);
        setIsOpen(true);
    }
    const closeImage = () => {
        setselecteImage(null);
        setIsOpen(false);
    }


    useEffect(() => {
      const fetchGallery = async () => {
        try {
          const res = await axios.get("http://localhost:8000/api/v1/admin/gallery");
          setPhotos(res.data); // ['gallery/1.jpg', 'gallery/2.jpg', ...]
        } catch (error) {
          console.error("Error fetching gallery:", error);
        }
      };
  
      fetchGallery();
    }, []);

  return (
    <section className="gallery">
        <h1 className="text-5xl pt-7 pb-7 font-bold flex flex-col items-center text-white mb-6 transition duration-200 ease-in-out animate-pulse text-[6rem] font-black text-center text-stroke-red">
            GALLERY
        </h1>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
            {photo.map((image, index) => (
            <div key={index} className="overflow-hidden rounded-lg shadow-lg">
                <img
               
                src={image.url}
                alt={`Gallery Image ${index + 3}`}
                className="w-full h-auto transition-transform duration-300 transform hover:scale-105"
                onClick={() => openImage(image.url)}
                />
            </div>
            ))}
              {isOpen && selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center"
          onClick={closeImage}
        >
          <img
            src={selectedImage}
            alt="Fullscreen"
            className="max-w-3xl max-h-[90vh] rounded-lg shadow-xl"
          />
        </div>
      )}
        </div>
    </section>
  );
};

export default Gallery;