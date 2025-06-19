import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Navbar() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

  const navigate = useNavigate();

  // Listen for changes like login/logout
  useEffect(() => {
    const handleUserChange = () => {
      setUser(JSON.parse(localStorage.getItem('user')));
    };

    window.addEventListener('userChanged', handleUserChange);

    return () => {
      window.removeEventListener('userChanged', handleUserChange);
    };
  }, []);

  const navigation = [
    { name: 'Home', to: '/', current: true },
  ];

  return (
    <Disclosure as="nav" className="bg-black shadow">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between items-center">
          {/* Logo */}
          <div className="flex items-center text-[1.6rem]">
            <Link to="/" className="flex items-center">
              <video src="/Logo.mp4" className="h-12 w-auto" autoPlay loop muted playsInline />
              <span className="ml-2 font-bold capitalize text-green-700">fitlife</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden sm:flex sm:items-center sm:space-x-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.to}
                className={classNames(
                  item.current ? 'text-white' : 'text-gray-300 hover:text-white',
                  'px-3 py-2 rounded-md text-sm font-medium'
                )}
              >
                {item.name}
              </Link>
            ))}

            {/* User Navigation */}
            {user ? (
              <>
                <Link
                  to={user.isAdmin ? '/user/dashboard' : '/admin/dashboard'}
                  className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Dashboard
                </Link>
                <button
                  onClick={() => {
                    localStorage.removeItem('user');
                    window.dispatchEvent(new Event('userChanged'));
                    navigate('/');
                  }}
                  className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="sm:hidden flex items-center">
            <DisclosureButton className="text-gray-300 hover:text-white focus:outline-none">
              {({ open }) =>
                open ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />
              }
            </DisclosureButton>
          </div>
        </div>
      </div>

      {/* Mobile menu panel */}
      <DisclosurePanel className="sm:hidden px-4 pt-2 pb-3 space-y-1">
        {navigation.map((item) => (
          <DisclosureButton
            key={item.name}
            as={Link}
            to={item.to}
            className="block text-gray-300 hover:text-white px-3 py-2 rounded-md text-base font-medium"
          >
            {item.name}
          </DisclosureButton>
        ))}

        {user ? (
          <>
            <DisclosureButton
              as={Link}
              to={user.isAdmin ? '/admin/Dashboard' : '/user/Dashboard'}
              className="block text-gray-300 hover:text-white px-3 py-2 rounded-md text-base font-medium"
            >
              Dashboard
            </DisclosureButton>
            <button
              onClick={() => {
                localStorage.removeItem('user');
                window.dispatchEvent(new Event('userChanged'));
                navigate('/');
              }}
              className="block text-gray-300 hover:text-white px-3 py-2 rounded-md text-base font-medium w-full text-left"
            >
              Logout
            </button>
          </>
        ) : (
          <DisclosureButton
            as={Link}
            to="/login"
            className="block text-gray-300 hover:text-white px-3 py-2 rounded-md text-base font-medium"
          >
            Login
          </DisclosureButton>
        )}
      </DisclosurePanel>
    </Disclosure>
  );
}
