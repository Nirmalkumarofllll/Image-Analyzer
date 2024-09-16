"use client";

import Link from 'next/link'
import { CiMail } from 'react-icons/ci';
import { FaWhatsapp, FaLinkedin, FaGithub, FaTelegram } from 'react-icons/fa'; // Import icons
import { IoMdMailOpen } from 'react-icons/io';

export const Footer = () => {
  return (
    <footer className="bg-white shadow-sm mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-lg font-semibold text-blue-600 mb-4">About Us</h3>
            <p className="text-gray-600">
              Image Identifier uses advanced AI technology to provide accurate image analysis, giving detailed results in seconds.
            </p>
          </div>

          {/* Quick Links Section */}
          <div>
            <h3 className="text-lg font-semibold text-blue-600 mb-4">Quick Links</h3>
            <ul className="text-gray-600 space-y-2">
              <li>
                <Link href={"#"} className="hover:text-blue-600 transition duration-150 ease-in-out">
                  Home
                </Link>
              </li>
              <li>
                <Link href={"#how-it-works"} className="hover:text-blue-600 transition duration-150 ease-in-out">
                  How it Works
                </Link>
              </li>
              <li>
                <Link href={"#features"} className="hover:text-blue-600 transition duration-150 ease-in-out">
                  Features
                </Link>
              </li>
            </ul>
          </div>

          {/* Our Projects Section */}
          <div>
            <h3 className="text-lg font-semibold text-blue-600 mb-4">Our Projects</h3>
            <ul className="text-gray-600 space-y-2">
            <li><a href="https://nk-codepen-clone.web.app/" target='blank' className="hover:text-blue-600 transition duration-150 ease-in-out">
                Online Coding Platform
              </a> </li>             
              <li><a href="https://nirmalkumarofllll.github.io/Portfolio/IDS.html" target='blank' className="hover:text-blue-600 transition duration-150 ease-in-out">
                IDS
              </a></li> 
              <li> <a href="https://nirmalkumarofllll.github.io/Portfolio/CRS.html" target='blank' className="hover:text-blue-600 transition duration-150 ease-in-out">
                CRS
              </a></li> 
              <li> <a href="https://nirmalkumarofllll.github.io/Portfolio/Chatbot.html" target='blank' className="hover:text-blue-600 transition duration-150 ease-in-out">
                Chatbot
              </a></li> 
              
            </ul>
          </div>

          {/* Social Media Section */}
          <div>
            <h3 className="text-lg font-semibold text-blue-600 mb-4">Follow Us</h3>
            <div className="flex space-x-4">
            <a href="https://mail.google.com/mail/u/0/?fs=1&to=nirmalkumarofllll@gmail.com&tf=cm" target='blank' className="hover:text-blue-600 transition duration-150 ease-in-out">
                <IoMdMailOpen size={24} />
              </a>              
              <a href="https://www.linkedin.com/in/nirmalkumarp-ofllll/" target='blank' className="hover:text-blue-600 transition duration-150 ease-in-out">
                <FaLinkedin size={24} />
              </a>
              <a href="https://github.com/Nirmalkumarofllll" target='blank' className="hover:text-blue-600 transition duration-150 ease-in-out">
                <FaGithub size={24} />
              </a>
              <a href="https://wa.me/8220694842" target='blank' className="hover:text-blue-600 transition duration-150 ease-in-out">
                <FaWhatsapp size={24} />
              </a>
              <a href="https://t.me/Nirmal_offl"  target='blank' className="hover:text-blue-600 transition duration-150 ease-in-out">
                <FaTelegram size={24} />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t pt-6 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} Nirmal Kumar. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
