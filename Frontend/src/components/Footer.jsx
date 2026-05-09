import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-2 md:col-span-1">
            <h3 className="text-2xl font-bold text-orange-500 mb-2">
              VeloxEats
            </h3>
            <p className="text-gray-400 text-sm">
              © 2026 VeloxEats Technologies Pvt. Ltd
            </p>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/about"
                  className="hover:text-orange-400 transition-colors duration-200"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/careers"
                  className="hover:text-orange-400 transition-colors duration-200"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  to="/team"
                  className="hover:text-orange-400 transition-colors duration-200"
                >
                  Team
                </Link>
              </li>
            </ul>
          </div>

          {/* Help & Legal */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Help & Legal
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/contact"
                  className="hover:text-orange-400 transition-colors duration-200"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy"
                  className="hover:text-orange-400 transition-colors duration-200"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="hover:text-orange-400 transition-colors duration-200"
                >
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Social Links
            </h3>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-orange-400 transition-colors duration-200"
              >
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-orange-400 transition-colors duration-200"
              >
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.71v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-orange-400 transition-colors duration-200"
              >
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.011 3.585-.069 4.85c-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07s-3.585-.012-4.85-.07c-3.252-.148-4.771-1.691-4.919-4.919-.058-1.265-.07-1.645-.07-4.85s.011-3.585.07-4.85c.149-3.225 1.664-4.771 4.919-4.919C8.415 2.175 8.796 2.163 12 2.163zm0 1.802c-3.116 0-3.472.011-4.695.068-2.638.12-3.957 1.442-4.078 4.078-.057 1.223-.068 1.578-.068 4.695s.011 3.472.068 4.695c.12 2.638 1.442 3.957 4.078 4.078 1.223.057 1.578.068 4.695.068s3.472-.011 4.695-.068c2.638-.12 3.957-1.442 4.078-4.078.057-1.223.068-1.578.068-4.695s-.011-3.472-.068-4.695c-.12-2.638-1.442-3.957-4.078-4.078-1.223-.057-1.578-.068-4.695-.068zM12 6.837a5.163 5.163 0 100 10.326 5.163 5.163 0 000-10.326zm0 8.526a3.363 3.363 0 110-6.726 3.363 3.363 0 010 6.726zM18.404 6.87a1.232 1.232 0 100-2.464 1.232 1.232 0 000 2.464z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
