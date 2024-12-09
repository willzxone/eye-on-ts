 
import {spacing} from '@/theme/tokens.stylex';
import stylex from '@stylexjs/stylex';
import {PropsWithChildren} from 'react';

type Props = PropsWithChildren;

const styles = stylex.create({
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'stretch',
    alignItems: 'stretch',
    gap: spacing[12],
    paddingHorizontal: spacing[12],
    paddingVertical: spacing[4],
    '@media screen and (max-width: 768px)': {
      display: 'flex',
      flexDirection: 'column-reverse',
      gap: 0,
      marginTop: spacing[0],
      marginBottom: spacing[0],
      paddingHorizontal: spacing[0],
      paddingBottom: spacing[0],
    },
  },
});

export default function DemoPageLayout({children}: Props) {
  return <div {...stylex.props(styles.container)}>{children}</div>;
}
