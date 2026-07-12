import { cn } from '@/utils'

// const variants = {
//   primary:
//     'bg-accent-500 hover:bg-accent-600 dark:hover:bg-accent-400 text-neutral-50 dark:text-neutral-950',
//   dangerGhost: 'hover:bg-red-500/25 hover:text-red-600 dark:hover:text-red-400',
//   ghost: 'hover:bg-neutral-200',
// }

// export default function Button({ children, className, variant = 'primary', icon, ...rest }) {
//   return (
//     <button
//       className={cn(
//         'group relative flex cursor-pointer items-center gap-2 rounded-xl px-4 py-3 font-medium text-neutral-950 capitalize disabled:pointer-events-none disabled:opacity-50',
//         variants[variant],
//         icon && 'p-2',
//         className,
//       )}
//       {...rest}
//     >
//       {children}
//     </button>
//   )
// }




// import { cn } from "../../../utils";

const variants = {
  primary:
    "bg-blue-600 text-white hover:bg-blue-700",

  secondary:
    "bg-gray-200 text-gray-900 hover:bg-gray-300",

  danger:
    "bg-red-600 text-white hover:bg-red-700",

  outline:
    "border border-gray-300 hover:bg-gray-100",
};

const sizes = {
  sm: "px-3 py-1 text-sm",
  md: "px-4 py-2",
  lg: "px-6 py-3 text-lg",
};

function Button({
  children,
  variant = "primary",
  size = "md",
  className,
  disabled = false,
  ...props
}) {
  return (
    <button
      className={cn(
        "rounded-lg font-medium transition duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed",
        variants[variant],
        sizes[size],
        className
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
