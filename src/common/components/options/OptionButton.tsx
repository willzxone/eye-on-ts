 
import GradientBorder from '@/common/components/button/GradientBorder';
import useScreenSize from '@/common/screen/useScreenSize';
import {BLUE_PINK_FILL_BR} from '@/theme/gradientStyle';
import type {CarbonIconType} from '@carbon/icons-react';
import {Loading} from 'react-daisyui';

type Props = {
  variant?: 'default' | 'flat' | 'gradient';
  title: string | React.ReactNode;
  Icon: CarbonIconType;
  isActive?: boolean;
  isDisabled?: boolean;
  loadingProps?: {
    loading: boolean;
    label?: string;
  };
  onClick: () => void;
};

export default function OptionButton({
  variant = 'default',
  title,
  Icon,
  isActive = false,
  isDisabled = false,
  loadingProps,
  onClick,
}: Props) {
  const {isMobile} = useScreenSize();
  const isLoading = loadingProps?.loading === true;

  function handleClick() {
    if (isDisabled) {
      return;
    }
    onClick();
  }

  const ButtonBase = (
    <div
      onClick={handleClick}
      className={`relative rounded-lg h-full flex items-center justify-center 
${variant === 'default' ? 'bg-graydark-700' : ''}
${!isDisabled && 'cursor-pointer'}
${isDisabled ? 'text-gray-300' : ''}
${isActive && BLUE_PINK_FILL_BR}`}>
      <div className="flex gap-2 items-center py-4 md:py-6">
        {isLoading ? (
          <Loading size="md" className="mx-auto mt-1" />
        ) : (
          <Icon
            size={isMobile ? 24 : 28}
            className={`mx-auto ${isDisabled ? 'text-gray-300' : 'text-white'}`}
          />
        )}
        <div className="text-base font-medium text-white">
          {isLoading && loadingProps?.label != null
            ? loadingProps.label
            : title}
        </div>
      </div>
    </div>
  );

  return variant === 'gradient' ? (
    <GradientBorder rounded={false} className={'rounded-lg md:rounded-full'}>
      {ButtonBase}
    </GradientBorder>
  ) : (
    ButtonBase
  );
}
