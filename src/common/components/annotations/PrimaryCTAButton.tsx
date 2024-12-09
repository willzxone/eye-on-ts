 
import GradientBorder from '@/common/components/button/GradientBorder';
import type {ReactNode} from 'react';

type Props = {
  disabled?: boolean;
  endIcon?: ReactNode;
} & React.DOMAttributes<HTMLButtonElement>;

export default function PrimaryCTAButton({
  children,
  disabled,
  endIcon,
  ...props
}: Props) {
  return (
    <GradientBorder disabled={disabled}>
      <button
        className={`btn ${disabled && 'btn-disabled'} !rounded-full !bg-black !text-white !border-none`}
        {...props}>
        {children}
        {endIcon != null && endIcon}
      </button>
    </GradientBorder>
  );
}
