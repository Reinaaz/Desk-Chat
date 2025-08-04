import React,{ useContext, useState, useEffect } from 'react';
import assets from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { ChatContext } from '../../context/ChatContext';

const Sidebar = () => {
  
  const{getUsers, users,selectedUser,setSelectedUser,
    unseenMessages, setUnseenMessages } = useContext(ChatContext)
  
    const {logout, onlineUsers } = useContext(AuthContext)

    const [input, setInput] = useState(false)

  const navigate = useNavigate();

  const filteredUser = input ? users.filter((user)=>user.fullName.toLowerCase().includes(input.toLowerCase)): users;

  useEffect(()=>{
      getUsers();
  },[onlineUsers])
  return (
    <div
      className={`bg-[#25a3d9]/10 h-full p-5 rounded-r-xl overflow-y-scroll text-white ${
        selectedUser ? 'max-md:hidden' : ''
      }`}
    >
      {/* Logo and Menu */}
      <div className="pb-4">
        <div className="flex justify-between items-center">
          <img src={assets.logo} alt="logo" className="w-24 h-auto" />
          <div className="relative group">
            <img src={assets.menu_icon} alt="Menu" className="w-5 cursor-pointer" />
            <div className="absolute top-full right-0 z-20 w-32 p-4 rounded-md bg-teal-400 border border-gray-600 text-gray-100 hidden group-hover:block">
              <p
                onClick={() => navigate('/profile')}
                className="cursor-pointer text-sm text-white hover:text-red-500"
              >
                Edit Profile
              </p>
              <hr className="my-2 border-t border-gray-500" />
              <p onClick={()=> logout()}className="cursor-pointer text-sm text-white hover:text-red-400">Logout</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="mb-4">
        <div className="bg-white rounded-full flex items-center gap-2 py-2 px-4 border border-gray-600">
          <img src={assets.search_icon} alt="Search" className="w-4 h-4" />
          <input onChange={(e)=>setInput(e.target.value)}
            type="text"
            placeholder="Search users..."
            className="bg-transparent text-black placeholder:text-gray-700 text-sm focus:outline-none w-full"
          />
        </div>
      </div>

      {/* User List */}
      <div>
        {filteredUser.map((user, index) => (
          <div
            key={index}
            onClick={() => {
  setSelectedUser(user);
  setUnseenMessages((prev) => ({ ...prev, [user._id]: 0 }));
}}

            className={`relative flex items-center gap-2 p-2 pl-4 rounded cursor-pointer max-sm:text-sm ${
              selectedUser?._id === user._id ? 'bg-[#504dd1]/10' : ''
            }`}
          >
            {/* Left vertical bar for selected user */}
            {selectedUser?._id === user._id && (
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#8fc0a9] rounded-r"></div>
            )}

            <img
              src={user?.profilePic || assets.avatar_icon}
              alt=""
              className="w-[35px] aspect-[1/1] rounded-full"
            />

            <div className="flex flex-col leading-5 text-black">
              <p>{user.fullName}</p>
              {
              onlineUsers.includes (user._id)
              ? <span className= 'text-green-400 text-xs'>Online</span>
              : <span className='text-neutral-400 text-xs'>Offline</span>
              }
              </div>
            {unseenMessages[user._id] > 0 && <p className='absolute top-4 right-4 text-xs h-5 w-5 flex justify-center items-center rounded-full bg-green-500/50'>
                {unseenMessages[user._id] }</p>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
