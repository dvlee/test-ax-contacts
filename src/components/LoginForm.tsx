import { useFormik } from "formik";
import { FC } from "react";
import { object, string } from "yup";
import useAuth from "../hooks/useAuth.ts";

interface Props {}

const LoginForm: FC<Props> = () => {
  const { login } = useAuth();

  const formik = useFormik({
    initialValues: {
      email: "demo@demo.demo",
      password: "demodemo",
    },
    validationSchema: object().shape({
      email: string().email().required("Email обязателен"),
      password: string().required("Пароль обязателен"),
    }),
    onSubmit: (values) => {
      login(values);
    },
  });

  return (
    <form
      className="space-y-4 md:space-y-6"
      action="#"
      onSubmit={formik.handleSubmit}
    >
      <div>
        <label
          htmlFor="email"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Электронная почта
        </label>
        <input
          type="email"
          id="email"
          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
          placeholder="name@company.com"
          required
          {...formik.getFieldProps("email")}
        />
      </div>

      <div>
        <label
          htmlFor="password"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Пароль
        </label>
        <input
          type="password"
          id="password"
          placeholder="••••••••"
          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
          required
          {...formik.getFieldProps("password")}
        />
      </div>

      <button
        type="submit"
        className="w-full text-white hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:hover:bg-primary-700 dark:focus:ring-primary-800 bg-blue-500"
      >
        Войти
      </button>
    </form>
  );
};

export default LoginForm;
