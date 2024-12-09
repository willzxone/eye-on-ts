 
import useScreenSize from '@/common/screen/useScreenSize';
import type {ReactNode} from 'react';
import type {ButtonProps} from 'react-daisyui';
import {Button} from 'react-daisyui';

type Props = ButtonProps & {startIcon: ReactNode};

export default function ResponsiveButton(props: Props) {
  const {isMobile} = useScreenSize();

  return <Button {...props}>{!isMobile && props.children}</Button>;
}
