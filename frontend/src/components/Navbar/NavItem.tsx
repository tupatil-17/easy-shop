import React from 'react';
import { Link } from 'react-router-dom';
import { LucideIcon } from 'lucide-react';

interface NavItemProps {
  to: string;
  icon: LucideIcon;
  label: string;
  badgeCount?: number;
  imageUrl?: string;
  onClick?: () => void;
  className?: string;
}

const NavItem: React.FC<NavItemProps> = ({ 
  to, 
  icon: Icon, 
  label, 
  badgeCount, 
  imageUrl,
  onClick,
  className = "" 
}) => {
  return (
    <Link 
      to={to} 
      onClick={onClick}
      className={`flex flex-col items-center text-gray-700 hover:text-pink-600 transition relative ${className}`}
    >
      {imageUrl ? (
        <div className="w-5 h-5 rounded-full overflow-hidden border border-gray-200">
          <img src={imageUrl} alt={label} className="w-full h-full object-cover" />
        </div>
      ) : (
        <Icon className="w-5 h-5" />
      )}
      <span className="text-xs mt-1">{label}</span>
      {badgeCount !== undefined && badgeCount > 0 && (
        <span className="absolute -top-1 -right-2 bg-pink-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
          {badgeCount}
        </span>
      )}
    </Link>
  );
};

export default React.memo(NavItem);
