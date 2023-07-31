import { FC } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header.tsx";

interface Props {}

const LayoutRoot: FC<Props> = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />

      <div className="flex flex-col flex-grow w-full max-w-6xl mx-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default LayoutRoot;
