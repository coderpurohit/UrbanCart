"use client";

export default function CategoryItem({
  name,
  image,
  onClick,
}: {
  name: string;
  image: string;
  onClick?: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className="flex flex-col items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
    >
      <div className="w-20 h-20 rounded-2xl bg-secondary/40 flex-shrink-0">
        <img
          src={image}
          alt={name}
          width={80}
          height={80}
          className="w-full h-full object-cover rounded-2xl"
          loading="lazy"
        />
      </div>
      <span className="text-xs font-semibold text-gray-300 text-center">{name}</span>
    </div>
  );
}
