 
import {spacing} from '@/theme/tokens.stylex';
import stylex from '@stylexjs/stylex';

const styles = stylex.create({
  container: {
    position: 'absolute',
    width: '100%',
    height: spacing[8],
    pointerEvents: 'none',
  },
});

type CarouselContainerShadowProps = {
  isTop: boolean;
};

const edgeColor = 'rgba(55, 62, 65, 1)';
const transitionColor = 'rgba(55, 62, 65, 0.2)';

export function CarouselContainerShadow({isTop}: CarouselContainerShadowProps) {
  return (
    <div
      {...stylex.props(styles.container)}
      style={{
        background: `linear-gradient(${isTop ? `${edgeColor}, ${transitionColor}` : `${transitionColor}, ${edgeColor}`})`,
        top: isTop ? 0 : undefined,
        bottom: isTop ? undefined : 0,
      }}
    />
  );
}
