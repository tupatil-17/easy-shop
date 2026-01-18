import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-white font-semibold mb-4">ABOUT EASYSHOP</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="hover:text-white transition">About Us</Link></li>
              <li><Link to="/careers" className="hover:text-white transition">Careers</Link></li>
              <li><Link to="/press" className="hover:text-white transition">Press</Link></li>
              <li><Link to="/blog" className="hover:text-white transition">Blog</Link></li>
            </ul>
          </div>

          {/* Help */}
          <div>
            <h3 className="text-white font-semibold mb-4">HELP</h3>
            <ul className="space-y-2">
              <li><Link to="/contact" className="hover:text-white transition">Contact Us</Link></li>
              <li><Link to="/faq" className="hover:text-white transition">FAQ</Link></li>
              <li><Link to="/shipping" className="hover:text-white transition">Shipping</Link></li>
              <li><Link to="/returns" className="hover:text-white transition">Returns</Link></li>
              <li><Link to="/order-tracking" className="hover:text-white transition">Track Order</Link></li>
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h3 className="text-white font-semibold mb-4">POLICIES</h3>
            <ul className="space-y-2">
              <li><Link to="/terms" className="hover:text-white transition">Terms of Use</Link></li>
              <li><Link to="/privacy" className="hover:text-white transition">Privacy Policy</Link></li>
              <li><Link to="/security" className="hover:text-white transition">Security</Link></li>
              <li><Link to="/sitemap" className="hover:text-white transition">Sitemap</Link></li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-white font-semibold mb-4">CONNECT WITH US</h3>
            <div className="flex space-x-4 mb-6">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
                <Twitter className="w-6 h-6" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
                <Youtube className="w-6 h-6" />
              </a>
            </div>
            <div className="mt-6">
              <p className="text-sm mb-2">100% SECURE PAYMENTS</p>
              <div className="flex space-x-2">
                <div className="bg-white px-2 py-1 rounded text-xs text-gray-900 font-semibold">VISA</div>
                <div className="bg-white px-2 py-1 rounded text-xs text-gray-900 font-semibold">MC</div>
                <div className="bg-white px-2 py-1 rounded text-xs text-gray-900 font-semibold">UPI</div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm">&copy; 2026 EasyShop. All rights reserved.</p>
            <p className="text-sm mt-2 md:mt-0">Made with ❤️ in India</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
