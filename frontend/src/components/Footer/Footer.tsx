import React from 'react';
import { 
  FOOTER_SECTIONS, 
  SOCIAL_LINKS, 
  PAYMENT_METHODS, 
  COPYRIGHT_YEAR 
} from './footer.data';
import FooterSection from './FooterSection';


const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-auto" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">Footer</h2>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Link Sections */}
          {FOOTER_SECTIONS.map((section) => (
            <FooterSection 
              key={section.title} 
              title={section.title} 
              links={section.links} 
            />
          ))}

          {/* Social and Payments Section */}
          <div>
            <h3 className="text-white font-semibold mb-4 uppercase">CONNECT WITH US</h3>
            <div className="flex space-x-4 mb-6">
              {SOCIAL_LINKS.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-pink-500 rounded-full"
                    aria-label={`Follow us on ${social.label}`}
                  >
                    <Icon className="w-6 h-6" aria-hidden="true" />
                  </a>
                );
              })}
            </div>
            
            <div className="mt-6">
              <p className="text-sm mb-2 uppercase tracking-wider font-medium">100% SECURE PAYMENTS</p>
              <div className="flex space-x-2" role="list" aria-label="Accepted payment methods">
                {PAYMENT_METHODS.map((method) => (
                  <div 
                    key={method.label} 
                    className="bg-white px-2 py-1 rounded text-xs text-gray-900 font-bold select-none"
                    role="listitem"
                  >
                    {method.label}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm">
            <p>&copy; {COPYRIGHT_YEAR} EasyShop. All rights reserved.</p>
            <p className="mt-2 md:mt-0 flex items-center">
              Made with <span className="mx-1 text-pink-500" aria-label="love">❤️</span> in India
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default React.memo(Footer);
