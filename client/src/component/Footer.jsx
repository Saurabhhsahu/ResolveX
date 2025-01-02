import React from 'react';
import { useNavigate } from 'react-router-dom';

function Footer() {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
    window.scrollTo(0, 0); // Scroll to top after navigation
  };

  return (
    <footer className="bg-blue-700 text-white py-8">
      <div className="container mx-auto px-6">
        {/* First Row: About Us, Quick Links, Contact */}
        <div className="flex justify-between mb-6 gap-10">
          {/* About Section */}
          <div className="w-1/3">
            <h3 className="text-xl font-semibold mb-4">About Us</h3>
            <p className="text-gray-400">
              We are a leading company providing the best services in the industry. Our mission is to make your life easier with technology.
            </p>
          </div>

          {/* Quick Links Section */}
          <div className="w-1/3">
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul>
              <li className="mb-2">
                <button
                  className="hover:text-gray-400"
                  onClick={() => handleNavigate('/home')}
                >
                  Home
                </button>
              </li>
              <li className="mb-2">
                <button
                  className="hover:text-gray-400"
                  onClick={() => handleNavigate('/about-us')}
                >
                  About Us
                </button>
              </li>
              <li className="mb-2">
                <button
                  className="hover:text-gray-400"
                  onClick={() => handleNavigate('/tasks')}
                >
                  Tasks
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div className="w-1/3">
            <h3 className="text-xl font-semibold mb-4">Contact</h3>
            <ul>
              <li className="mb-2">
                <p className="text-gray-400">Email: info@example.com</p>
              </li>
              <li className="mb-2">
                <p className="text-gray-400">Phone: +123 456 789</p>
              </li>
              <li className="mb-2">
                <p className="text-gray-400">Address: 123 Example St, City, Country</p>
              </li>
            </ul>
          </div>
        </div>

        {/* Second Row: Follow Us */}
        <div className="flex justify-center mb-6">
          <div className="w-full text-center">
            <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
            <div className="flex justify-center space-x-6">
              <a href="https://facebook.com" className="hover:text-gray-400">
                <i className="fab fa-facebook-f text-2xl">facebook</i>
              </a>
              <a href="https://twitter.com" className="hover:text-gray-400">
                <i className="fab fa-twitter text-2xl">twitter</i>
              </a>
              <a href="https://instagram.com" className="hover:text-gray-400">
                <i className="fab fa-instagram text-2xl">instagram</i>
              </a>
              <a href="https://linkedin.com" className="hover:text-gray-400">
                <i className="fab fa-linkedin-in text-2xl">linkedin</i>
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="text-center mt-8">
          <p className="text-gray-400 text-sm">&copy; 2025 Your Company. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
