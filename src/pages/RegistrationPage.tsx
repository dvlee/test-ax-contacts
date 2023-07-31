import { FC } from "react";
import { useNavigate } from "react-router-dom";
import RegistrationForm from "../components/RegistrationForm";
import { ROUTES } from "../constants/routes";
import useAuth from "../hooks/useAuth";

interface Props {}

const RegistrationPage: FC<Props> = () => {
  const navigate = useNavigate();

  const { isAuthorized } = useAuth();

  if (isAuthorized) {
    navigate(ROUTES.HOME);
  }

  return (
    <div className="flex flex-col items-center justify-center pt-20">
      <h2 className="text-4xl mb-2">Регистрация</h2>
      <div className="w-80 p-8 border rounded-lg border-gray-500">
        <RegistrationForm />
      </div>
    </div>
  );
};

export default RegistrationPage;
