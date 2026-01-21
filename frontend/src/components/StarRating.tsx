import React, { useCallback, useMemo } from 'react';
import { Star } from 'lucide-react';

type RatingSize = 'sm' | 'md' | 'lg';

interface StarRatingProps {
  rating: number;
  onRatingChange?: (rating: number) => void;
  readonly?: boolean;
  size?: RatingSize;
  maxStars?: number;
}

/**
 * Size mapping for the stars.
 * Centralized for easier maintenance.
 */
const SIZE_MAP: Record<RatingSize, string> = {
  sm: 'w-4 h-4',
  md: 'w-5 h-5',
  lg: 'w-6 h-6'
};

/**
 * Production-ready StarRating component.
 * Features: Accessibility, performance optimization, and strong typing.
 */
const StarRating: React.FC<StarRatingProps> = ({ 
  rating, 
  onRatingChange, 
  readonly = false, 
  size = 'md',
  maxStars = 5
}) => {
  
  // Memoize stars array to avoid recreation on every render
  const stars = useMemo(() => Array.from({ length: maxStars }, (_, i) => i + 1), [maxStars]);

  const handleStarClick = useCallback((starRating: number) => {
    if (!readonly && onRatingChange) {
      onRatingChange(starRating);
    }
  }, [readonly, onRatingChange]);

  return (
    <div 
      className="flex items-center space-x-1" 
      role="radiogroup" 
      aria-label={`Rating: ${rating} out of ${maxStars} stars`}
    >
      {stars.map((star) => {
        const isActive = star <= rating;
        
        return (
          <button
            key={star}
            type="button"
            onClick={() => handleStarClick(star)}
            disabled={readonly}
            className={`
              transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 rounded-sm
              ${readonly ? 'cursor-default' : 'cursor-pointer hover:scale-110 active:scale-95'}
            `}
            role="radio"
            aria-checked={isActive}
            aria-label={`Rate ${star} star${star > 1 ? 's' : ''}`}
          >
            <Star
              className={`
                ${SIZE_MAP[size]} 
                transition-colors duration-200
                ${isActive 
                  ? 'fill-yellow-400 text-yellow-400' 
                  : 'text-gray-300'
                }
              `}
              aria-hidden="true"
            />
          </button>
        );
      })}
    </div>
  );
};

export default React.memo(StarRating);
