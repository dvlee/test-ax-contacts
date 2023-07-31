import { FC } from "react";

interface Props {}

const HomePage: FC<Props> = () => {
  return (
    <div className="pt-10 flex flex-col gap-4 p-4">
      <h1 className="text-4xl">Добро пожаловать в vContact</h1>

      <p>
        <strong>vContact</strong> - веб приложение для управления контактами. Из
        основных возможностей создание, редактирование, удаление и фильтрация
        контактов. Также есть возможность регистрации и авторизации.
      </p>

      <p>
        Реализовано с помощью React.js, Typescript, Tailwind CSS, Firebase,
        React Router и RTK Query.
      </p>

      <div className="flex flex-col">
        <p>Можно авторизоваться с помощью следующих учетных записей:</p>
        <code>email: demo@demo.demo</code>
        <code>password: demodemo</code>
        <p>или зарегистрироваться со своими данными</p>
      </div>
    </div>
  );
};

export default HomePage;
