export const ProgressBar = ({ percentage, height = 1 }) => {
  return (
    <div className={`relative rounded w-full h-${height} bg-gray-200`}>
      <div
        style={{
          width: `${percentage * 100}%`,
          backgroundColor: "#B83B5E",
        }}
        className="rounded absolute h-full"
      />
    </div>
  );
};
