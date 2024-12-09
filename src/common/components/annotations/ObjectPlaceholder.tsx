 
import {BLUE_PINK_FILL_BR} from '@/theme/gradientStyle';

type Props = {
  showPlus?: boolean;
  onClick?: () => void;
};

export default function ObjectPlaceholder({showPlus = true, onClick}: Props) {
  return (
    <div
      className={`relative ${BLUE_PINK_FILL_BR} h-12 w-12 md:h-20 md:w-20 shrink-0 rounded-lg`}
      onClick={onClick}>
      {showPlus && (
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none">
            <path
              d="M16 7H9V0H7V7H0V9H7V16H9V9H16V7Z"
              fill="#667788"
              fillOpacity={1}
            />
          </svg>
        </div>
      )}
    </div>
  );
}
