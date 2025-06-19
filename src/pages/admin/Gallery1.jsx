import axios from 'axios';
import React, { useEffect } from 'react'
import { useState } from 'react'

const Gallery1 = () => {
   const [photos, setPhotos] = useState([]);
   const [newPhoto, setNewPhoto] = useState({ url: '', title: '' });
  const [tittle,setNewtitle] = useState({ title: '' });
   useEffect(() => {

      fetchPhotos();
    }, []);

    const fetchPhotos = async () => {
      try {
        const res = await axios.get('http://localhost:8000/api/v1/admin/gallery');
        setPhotos(res.data);
      } catch (error) {
        console.error('Error fetching photos:', error);
      }
    };

    const handleAddPhoto = async () => {
      try {
        const res = await axios.post('http://localhost:8000/api/v1/admin/gallery', newPhoto);
        setPhotos([...photos, res.data]);
        setNewPhoto({ url: '', title: '' });
      } catch (error) {
        console.error('Error adding photo:', error);
      }
    }


    const handleDeletePhoto = async (id) => {
      const confirmDelete = window.confirm('Are you sure you want to delete this photo?');
      if (!confirmDelete) return;
    
      try {
        await axios.delete(`http://localhost:8000/api/v1/admin/gallery/${id}`);
        alert('Photo deleted successfully!');
        // Re-fetch gallery from backend for latest data
        fetchPhotos(); // Make sure fetchGallery is defined in your component
      } catch (err) {
        console.error('Error deleting photo:', err);
        alert('Failed to delete photo.');
      }
    };

   

    
  return (

    <div className='bg-[url("/bg5.jpg")] bg-cover bg-center min-h-screen'>
        <div>
            <h1 className='ml-44  uppercase text-[4rem] text-stroke-black'>Manage Gallery here 👇🏻</h1>
        </div>
        <div className="container mx-auto py-12">
      <h1 className="text-[3rem] font-bold mb-6  text-center text-black">Manage Gallery:-</h1>

      <div className="mb-6">
      <div className="mb-6 flex gap-4">
          <input
            type="text"
            placeholder="Image URL"
            value={newPhoto.url}
            onChange={(e) => setNewPhoto({ ...newPhoto, url: e.target.value })}
            className="p-2 border rounded w-1/2"
          />
          <input
            type="text"
            placeholder="Title"
            value={newPhoto.title}
            onChange={(e) => setNewPhoto({ ...newPhoto, title: e.target.value })}
            className="p-2 border rounded w-1/2"
          />
          <button
            onClick={handleAddPhoto}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Add New Photo
          </button>
        </div>

      </div>

      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {photos.map(photo => (
            <div key={photo._id} className="bg-white/35 shadow rounded-lg overflow-hidden">
              <img src={photo.url} alt={photo.title} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h2 className="font-semibold text-lg text-gray-700">{photo.title}</h2>
                <button
                  onClick={() => handleDeletePhoto(photo._id)}
                  className="mt-2 bg-red-500 hover:bg-red-700 text-white py-1 px-3 rounded"
                >
                  Delete
                </button> 

              </div>
            </div>
          ))}
        </div>
      </div>

      <div className='flex justify-center items-center pb-7'>
        <a href="/admin/dashboard" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">Back to Dashboard</a>
      </div>
    </div>
  );
};


export default Gallery1


