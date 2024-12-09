 
import stylex from '@stylexjs/stylex';

import {gradients} from '@/theme/tokens.stylex';

enum GradientTypes {
  fullGradient = 'fullGradient',
  bluePinkGradient = 'bluePinkGradient',
}

type Props = {
  gradientType?: GradientTypes;
  disabled?: boolean;
  rounded?: boolean;
  className?: string;
} & React.DOMAttributes<HTMLDivElement>;

const styles = stylex.create({
  animationHover: {
    ':hover': {
      backgroundPosition: '300% 100%',
    },
  },

  fullGradient: {
    border: '2px solid transparent',
    background: gradients['rainbow'],
    backgroundSize: '100% 400%',
    transition: 'background 0.35s ease-in-out',
  },

  bluePinkGradient: {
    border: '2px solid transparent',
    background: gradients['rainbow'],
  },
});

export default function GradientBorder({
  gradientType = GradientTypes.fullGradient,
  disabled,
  rounded = true,
  className = '',
  children,
}: Props) {
  const gradient = (name: GradientTypes) => {
    if (name === GradientTypes.fullGradient) {
      return styles.fullGradient;
    } else if (name === GradientTypes.bluePinkGradient) {
      return styles.bluePinkGradient;
    }
  };

  return (
    <div
      className={`${stylex(gradient(gradientType), !disabled && styles.animationHover)} ${disabled && 'opacity-30'} ${rounded && 'rounded-full'} ${className}`}>
      {children}
    </div>
  );
}
