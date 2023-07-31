import { FC } from "react";
import { Navigate } from "react-router-dom";
import { ROUTES } from "../constants/routes.ts";
import useAuth from "../hooks/useAuth.ts";

interface Props {}

const LogoutPage: FC<Props> = () => {
  const { logout } = useAuth();

  logout();

  return <Navigate to={ROUTES.HOME} />;
};

export default LogoutPage;
