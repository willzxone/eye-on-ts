 
import {spacing} from '@/theme/tokens.stylex';
import stylex from '@stylexjs/stylex';
import {PropsWithChildren} from 'react';

const styles = stylex.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: {
      default: spacing[2],
      '@media screen and (max-width: 768px)': spacing[4],
    },
    paddingBottom: spacing[6],
    paddingHorizontal: spacing[6],
  },
});

export default function ToolbarBottomActionsWrapper({
  children,
}: PropsWithChildren) {
  return <div {...stylex.props(styles.container)}>{children}</div>;
}
