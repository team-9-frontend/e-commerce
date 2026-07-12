// import ReactSkeleton from 'react-loading-skeleton'

// import { cn } from '@/utils'

// import 'react-loading-skeleton/dist/skeleton.css'

// export default function Skeleton({ className, color = 'neutral', ...props }) {
//   return (
//     <ReactSkeleton
//       className={cn(
//         `bg-${color}-500/15! after:bg-linear-to-r! after:from-${color}-500/15! after:via-${color}-500/25! after:to-${color}-500/15! after:from-0%! after:via-50%! after:to-100%! after:blur-md!`,
//         className,
//       )}
//       {...props}
//     />
//   )
// }




import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function CustomSkeleton({
  width,
  height,
  count = 1,
  circle = false,
}) {
  return (
    <Skeleton
      width={width}
      height={height}
      count={count}
      circle={circle}
    />
  );
}

export default CustomSkeleton;