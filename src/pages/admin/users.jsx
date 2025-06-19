import axios from 'axios';
import React, { useState, useEffect } from 'react';
import CountUp from 'react-countup';
function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // --- Backend call commented out ---
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/v1/users/all-users');
        const data = response.data; 
        setUsers(data);
        setLoading(false);
      } catch (e) {
        setError(e.message);
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);



  const totalUsers = users.length; // Total number of users

  // DELETE user from backend
const handleDeleteUser = async (userId) => {
  try {
    await axios.delete(`http://localhost:8000/api/v1/users/user/${userId}`);
    setUsers(users.filter(user => user._id !== userId)); // remove from list
    console.log('User deleted successfully');
  } catch (e) {
    console.error('Error deleting user:', e);
    setError(e.message);
  }
};



// BLOCK/UNBLOCK user
const handleBlockUnblockUser = async (userId, isCurrentlyBlocked) => {
  const action = isCurrentlyBlocked ? 'unblock' : 'block';
  try {
    await axios.patch(`http://localhost:8000/api/v1/users/${userId}/${action}`);
    setUsers(users.map(user =>
      user._id === userId ? { ...user, isBlocked: !isCurrentlyBlocked } : user
    ));
    console.log(`User ${action}ed successfully`);
  } catch (e) {
    console.error(`Error ${action}ing user:`, e);
    setError(e.message);
  }
};


const now = new Date();

const isMembershipExpired = (expiryDate) => {
  return expiryDate ? new Date(expiryDate) < now : true;
};

const isNewUser = (createdAt) => {
  return (now - new Date(createdAt)) / (1000 * 60 * 60 * 24) <= 7;
};


  if (loading) {
    return <div className="container mx-auto py-12">Loading users...</div>;
  }

  if (error) {
    return <div className="container mx-auto py-12 text-red-500">Error loading users: {error}</div>;
  }

  return (
  
      <div className="bg-[url('/img2.jpg')] bg-cover bg-center bg-no-repeat min-h-screen">
          <div className="container mx-auto py-12 ">
      <h1 className="text-3xl font-bold  mb-6  text-stroke-yellow text-[4rem]">Admin - User Management</h1>
    
      <div className="bg-white shadow-md rounded-md overflow-x-auto mt-16">
        <div>
          <h1 className='text-[2rem]'>Total Number of Users are {totalUsers}</h1>
          </div>
        <table className="min-w-full leading-normal">
          <thead>
            <tr>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">ID</th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Username</th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Email</th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Registered</th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
              
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Membership</th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">New user</th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Expiry date</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id}>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{user._id}</td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{user.username}</td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{user.email}</td>

  {/* Blocked/Active */}
  <td className="...">
    {user.isBlocked ? (
      <span className="text-red-500 font-semibold">Blocked</span>
    ) : (
      <span className="text-green-500 font-semibold">Active</span>
    )}
  </td>

  {/* Registered Date */}
  <td className="...">{new Date(user.createdAt).toLocaleDateString()}</td>

  {/* Membership Status */}
  <td className="...">
    {isMembershipExpired(user.membershipExpiryDate) ?  (
      <span className="text-green-600 font-semibold">Valid</span>
    )
    :
    (
      <span className="text-red-600 font-semibold">Expired</span>
    ) }
  </td>

  {/* New User */}
  <td className="...">
    {isNewUser(user.createdAt) ? (
      <span className="text-blue-500 font-medium">New</span>
    ) : (
      <span className="text-gray-500">—</span>
    )}
  </td>

  {/* Expiry Date */}
  <td className="...">
    {user.membershipExpiryDate
      ? new Date(user.membershipExpiryDate).toLocaleDateString()
      : 'N/A'}
  </td>

  {/* Actions */}
  <td className="...">
    <button
      onClick={() => handleBlockUnblockUser(user._id, user.isBlocked)}
      className={`${
        user.isBlocked ? 'bg-green-500 hover:bg-green-700' : 'bg-red-500 hover:bg-red-700'
      } text-white font-bold py-2 px-4 rounded mr-2`}
    >
      {user.isBlocked ? 'Unblock' : 'Block'}
    </button>
    <button
      onClick={() => handleDeleteUser(user._id)}
      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
    >
      Delete
    </button>
  </td>
</tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    <div className="flex justify-center mt-6">
        <a
          href="/admin/dashboard"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Back to Dashboard
        </a>
      </div>
    </div>
  );
}

export default AdminUsersPage;
