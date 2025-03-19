import React from "react";
import {
  Calendar,
  Clock,
  MapPin,
  PhoneCall,
  Mail,
  Search,
  User,
  ArrowRight,
  Instagram,
  Facebook,
  Twitter,
  Youtube,
} from "lucide-react";
const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="h-10 w-10 bg-blue-600 rounded-full flex items-center justify-center">
                <PhoneCall className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-white">MediBook</h3>
                <p className="text-xs text-gray-400">
                  Your Health, Our Priority
                </p>
              </div>
            </div>
            <p className="text-gray-400 mb-4">
              MediBook is a leading doctor appointment booking platform,
              connecting patients with healthcare professionals.
            </p>
            <div className="flex space-x-4">
              <a className="text-gray-400 hover:text-white">
                <Facebook className="h-5 w-5" />
              </a>
              <a className="text-gray-400 hover:text-white">
                <Twitter className="h-5 w-5" />
              </a>
              <a className="text-gray-400 hover:text-white">
                <Instagram className="h-5 w-5" />
              </a>
              <a className="text-gray-400 hover:text-white">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a className="text-gray-400 hover:text-white">Find Doctors</a>
              </li>
              <li>
                <a className="text-gray-400 hover:text-white">
                  Book Appointment
                </a>
              </li>
              <li>
                <a className="text-gray-400 hover:text-white">Our Services</a>
              </li>
              <li>
                <a className="text-gray-400 hover:text-white">Health Blog</a>
              </li>
              <li>
                <a className="text-gray-400 hover:text-white">About Us</a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-blue-500 mr-2 mt-1" />
                <span className="text-gray-400">
                Koregaon Park
                  <br />
                  Pune, Maharashtra, India, 411001
                </span>
              </li>
              <li className="flex items-center">
                <PhoneCall className="h-5 w-5 text-blue-500 mr-2" />
                <span className="text-gray-400">+91 8149250536</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-blue-500 mr-2" />
                <span className="text-gray-400">shubhambendkhale77@gmail.com</span>
              </li>
              <li className="flex items-center">
                <Clock className="h-5 w-5 text-blue-500 mr-2" />
                <span className="text-gray-400">Mon-Fri: 9AM - 6PM</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-bold mb-4">Stay Updated</h4>
            <p className="text-gray-400 mb-4">
              Subscribe to our newsletter for health tips and updates.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your Email"
                className="px-4 py-2 bg-gray-800 text-white rounded-l-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} MediBook. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a className="text-sm text-gray-400 hover:text-white">
              Privacy Policy
            </a>
            <a className="text-sm text-gray-400 hover:text-white">
              Terms of Service
            </a>
            <a className="text-sm text-gray-400 hover:text-white">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
