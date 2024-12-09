 
import {right, top} from '@/theme/tokens.stylex';
import stylex from '@stylexjs/stylex';

const styles = stylex.create({
  variantBadge: {
    position: 'absolute',
    top: top[1],
    right: right[1],
    backgroundColor: '#280578',
    color: '#D2D2FF',
    fontVariantNumeric: 'tabular-nums',
    paddingHorizontal: 4,
    paddingVertical: 1,
    fontSize: 9,
    borderRadius: 6,
    fontWeight: 'bold',
  },
});

type Props = {
  label: string;
};

export default function VariantBadge({label}: Props) {
  return <div {...stylex.props(styles.variantBadge)}>{label}</div>;
}
