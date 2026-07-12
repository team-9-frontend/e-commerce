import { cn } from "../../utils/index";

function Input({
  type = "text",
  className,
  ...props
}) {
  return (
    <input
      type={type}
      className={cn(
        "w-full rounded-lg border border-gray-300 px-3 py-2 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200",
        "disabled:cursor-not-allowed disabled:bg-gray-100",
        className
      )}
      {...props}
    />
  );
}

export default Input;