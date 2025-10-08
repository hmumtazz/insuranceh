interface DividerProps {
  text?: string;
  className?: string;
}

export default function Divider({ text, className = '' }: DividerProps) {
  if (!text) {
    return <hr className={`border-gray-200 ${className}`} />;
  }

  return (
    <div className={`relative ${className}`}>
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-gray-200" />
      </div>
      <div className="relative flex justify-center text-sm">
        <span className="bg-white px-4 text-gray-500">{text}</span>
      </div>
    </div>
  );
}
