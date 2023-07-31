import { FC } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "../components/LoginForm.tsx";
import { ROUTES } from "../constants/routes.ts";
import useAuth from "../hooks/useAuth.ts";

interface Props {}

const LoginPage: FC<Props> = () => {
  const navigate = useNavigate();

  const { isAuthorized } = useAuth();

  if (isAuthorized) {
    navigate(ROUTES.HOME);
  }

  return (
    <div className="flex flex-col items-center justify-center pt-20">
      <h2 className="text-4xl mb-2">Авторизация</h2>
      <div className="w-80 p-8 border rounded-lg border-gray-500">
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
