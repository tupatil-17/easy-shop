import React from 'react';
import { Link } from 'react-router-dom';
import { LucideIcon } from 'lucide-react';

interface MobileNavItemProps {
  to: string;
  icon: LucideIcon;
  label: string;
  badgeCount?: number;
  onClick: () => void;
}

const MobileNavItem: React.FC<MobileNavItemProps> = ({ 
  to, 
  icon: Icon, 
  label, 
  badgeCount, 
  onClick 
}) => {
  return (
    <Link
      to={to}
      onClick={onClick}
      className="flex items-center space-x-3 text-gray-700 hover:text-pink-600 py-2"
    >
      <Icon className="w-5 h-5" />
      <span>
        {label}
        {badgeCount !== undefined && badgeCount > 0 && ` (${badgeCount})`}
      </span>
    </Link>
  );
};

export default React.memo(MobileNavItem);
