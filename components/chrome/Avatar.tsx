type Props = {
  name: string;
  color: string;
  size?: number;
  outline?: boolean;
};

export default function Avatar({ name, color, size = 28, outline }: Props) {
  const initial = name.replace(/^Anonymous\s+/, "").charAt(0).toUpperCase();
  return (
    <div
      title={name}
      className="inline-flex items-center justify-center rounded-full font-semibold text-white select-none"
      style={{
        width: size,
        height: size,
        background: color,
        fontSize: size * 0.4,
        boxShadow: outline ? "0 0 0 2px #fff, 0 0 0 3px " + color : undefined,
      }}
    >
      {initial}
    </div>
  );
}
