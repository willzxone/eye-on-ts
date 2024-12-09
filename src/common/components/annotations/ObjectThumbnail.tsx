 
type Props = {
  thumbnail: string | null;
  color: string;
  onClick?: () => void;
};

export default function ObjectThumbnail({thumbnail, color, onClick}: Props) {
  return (
    <div
      className="relative h-12 w-12 md:w-20 md:h-20 shrink-0 p-2 rounded-lg bg-contain bg-no-repeat bg-center"
      style={{
        backgroundColor: color,
      }}
      onClick={onClick}>
      <div
        className="w-full h-full bg-contain bg-no-repeat bg-center"
        style={{
          backgroundImage: thumbnail == null ? 'none' : `url(${thumbnail})`,
        }}></div>
    </div>
  );
}
