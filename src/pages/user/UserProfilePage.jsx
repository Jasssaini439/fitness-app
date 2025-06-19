import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
function UserProfilePage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({});

  useEffect(() => {
    // Replace with your actual API call to fetch user data
    const fetchUserProfile = async () => {

      const userId = localStorage.getItem('userId'); // Assuming you store the user ID in localStorage

      if (!userId) {
        console.error('User ID not found in localStorage');
        return;
      }

      try {
        // Simulate API call
        const response = await axios.get(`http://localhost:8000/api/v1/users/user/${userId}`);
        const userData = response.data; 
      //  if (userData.registrationDate) {
      //     userData.registrationDate = new Date(userData.registrationDate).toLocaleDateString();
      //   }
       
       
   // Add other relevant profile fields
       
        setUser(userData);
        setUpdatedUser(userData);
        setLoading(false);
      } catch (err) {
        setError('Failed to load profile information.', err);
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser(prevUser => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleEditProfile = () => {
    setIsEditing(true);
  };

  const handleSaveProfile = async () => {
    const userId = localStorage.getItem('userId');
    console.log("Updating user with:", updatedUser);
    try {
     await axios.put(`http://localhost:8000/api/v1/users/profile/${userId}`, updatedUser);
      // console.log("Response:", refreshed.data);
      const refreshed = await axios.get(`http://localhost:8000/api/v1/users/user/${userId}`);
      console.log("Refreshed user data:", refreshed.data);
      setUser(refreshed.data);
      setIsEditing(false);
      setUpdatedUser(refreshed.data.user);
      setIsEditing(false);
      alert('Profile updated successfully!');
    } catch (err) {
      console.error(err.refreshed?.data || err.message);
      setError('Failed to update profile.');
    }
  };

  const handleCancelEdit = () => {
    setUpdatedUser(user);
    setIsEditing(false);
  };

  if (loading) {
    return <div className="container mx-auto py-8">Loading profile information...</div>;
  }

  if (error) {
    return <div className="container mx-auto py-8 text-red-500">{error}</div>;
  }

  if (!user) {
    return <div className="container mx-auto py-8">No profile information available.</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-semibold mb-4">Your Profile</h1>

      <div className="bg-white shadow-md rounded-md p-6">
        <div className="mb-4 flex items-center">
          <img src={user.profilePicture} alt="Profile" className="rounded-full w-20 h-20 object-cover" />
          <div className="ml-4">
            <h2 className="text-xl font-semibold">{ user.username}</h2>
            <p className="text-gray-600">{user.email}</p>
            <p className="text-gray-500 text-sm">Age: {user.age}</p>
            <p className="text-gray-500 text-sm">gender: {user.gender}</p>
            {/* <p className="text-gray-500 text-sm">Registered on: {new Date(user.registrationDate).toLocaleDateString()}</p> */}
          </div>
        </div>

        {isEditing ? (
          <div>
            <div className="mb-4">
              <label htmlFor="displayName" className="block text-gray-700 text-sm font-bold mb-2">NEW Name</label>
              <input
                type="text"
                id="username"
                name="username"
                value={updatedUser.username || ''}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            
               <input
                type="text"
                id="email"
                name="email"
                value={updatedUser.email || ''}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-3"
              />

               <input
                type="text"
                id="gender"
                name="gender"
                value={updatedUser.gender || ''}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-3"
              />
              
            </div>


            {/* Add more editable fields as needed */}
            <div className="flex gap-2">
              <button onClick={handleSaveProfile} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Save
              </button>
              <button onClick={handleCancelEdit} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <button onClick={handleEditProfile} className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Edit Profile
          </button>
        )}
        
      </div>
      <Link to="/user/dashboard">
          <button className="bg-purple-500/55 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
         go back to dashboard
          </button>
          </Link>
      </div>
  
  );
}

export default UserProfilePage;