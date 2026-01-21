import React from 'react';
import { Link } from 'react-router-dom';
import { FooterSectionData } from './footer.data';

/**
 * Reusable Footer Section component for rendering link lists.
 */
const FooterSection: React.FC<FooterSectionData> = ({ title, links }) => {
  return (
    <div>
      <h3 className="text-white font-semibold mb-4 uppercase">{title}</h3>
      <ul className="space-y-2">
        {links.map((link) => (
          <li key={link.href}>
            <Link 
              to={link.href} 
              className="hover:text-white transition-colors duration-200 focus:outline-none focus:underline"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default React.memo(FooterSection);
