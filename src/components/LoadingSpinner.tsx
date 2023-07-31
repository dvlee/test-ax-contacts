import { FC } from "react";

interface Props {}

const LoadingSpinner: FC<Props> = () => {
  return (
    <div className="flex justify-center items-center py-10">
      <div className="animate-spin rounded-full h-24 w-24 border-t-2  border-gray-900"></div>
    </div>
  );
};

export default LoadingSpinner;
