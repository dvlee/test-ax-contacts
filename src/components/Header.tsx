import { Bars3Icon } from "@heroicons/react/24/outline";
import { FC, useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

interface Props {}

const Header: FC<Props> = () => {
  const [open, setOpen] = useState(false);
  const { isAuthorized, user } = useAuth();

  const handleOpen = () => {
    setOpen((prev) => !prev);
  };

  return (
    <div className=" bg-gray-800 text-gray-200 sticky top-0">
      <div className="max-w-6xl mx-auto flex flex-wrap items-center p-4 xl:px-0">
        <h1 className="text-4xl font-semibold">vContact</h1>
        <button onClick={handleOpen} className="ml-auto inline-block sm:hidden">
          <Bars3Icon height={30} />
          {}
        </button>

        <div
          className={`ml-auto gap-4 w-full sm:w-auto justify-end pt-3 ${
            open ? "flex" : "hidden"
          } sm:flex md:pt-0`}
        >
          <Link to="/" onClick={handleOpen}>
            Главная
          </Link>
          {isAuthorized ? (
            <>
              <Link to="/contacts" onClick={handleOpen}>
                Контакты
              </Link>
              <Link to="/auth/logout" onClick={handleOpen}>
                Выйти ({user?.email})
              </Link>
            </>
          ) : (
            <>
              <Link to="/auth/registration" onClick={handleOpen}>
                Регистрация
              </Link>
              <Link to="/auth/login" onClick={handleOpen}>
                Войти
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
