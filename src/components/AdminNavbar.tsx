import { useState } from 'react';

const AdminNavbar = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <nav className="bg-gray-800 text-white">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Left: Navbar Links */}
        <ul className="flex space-x-6">
          <li>
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`hover:text-blue-400 ${activeTab === 'dashboard' ? 'text-blue-400' : ''}`}
            >
              Dashboard
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveTab('admins')}
              className={`hover:text-blue-400 ${activeTab === 'admins' ? 'text-blue-400' : ''}`}
            >
              Admins
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveTab('blogs')}
              className={`hover:text-blue-400 ${activeTab === 'blogs' ? 'text-blue-400' : ''}`}
            >
              Blogs
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveTab('posts')}
              className={`hover:text-blue-400 ${activeTab === 'posts' ? 'text-blue-400' : ''}`}
            >
              Posts
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveTab('mails')}
              className={`hover:text-blue-400 ${activeTab === 'mails' ? 'text-blue-400' : ''}`}
            >
              Mails
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveTab('settings')}
              className={`hover:text-blue-400 ${activeTab === 'settings' ? 'text-blue-400' : ''}`}
            >
              Settings
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveTab('support')}
              className={`hover:text-blue-400 ${activeTab === 'support' ? 'text-blue-400' : ''}`}
            >
              Support
            </button>
          </li>
        </ul>

        {/* Right: Search Bar and Notifications */}
        <div className="flex space-x-4 items-center">
          {/* Search Bar */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none"
            />
          </div>

          {/* Notification Icon */}
          <div className="relative">
            <button className="relative hover:text-blue-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V4a2 2 0 10-4 0v1.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0a3 3 0 11-6 0h6z"
                />
              </svg>
              {/* Notification Badge */}
              <span className="absolute top-0 right-0 inline-flex items-center justify-center w-4 h-4 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
                3
              </span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;
