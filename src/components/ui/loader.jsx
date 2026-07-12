function Loader({ size = "md" }) {
  const sizes = {
    sm: "w-5 h-5 border-2",
    md: "w-8 h-8 border-4",
    lg: "w-12 h-12 border-4",
  };

  return (
    <div
      className={`animate-spin rounded-full border-blue-600 border-t-transparent ${sizes[size]}`}
    />
  );
}

export default Loader;