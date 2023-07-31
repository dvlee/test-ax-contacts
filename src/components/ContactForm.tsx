import { TrashIcon } from "@heroicons/react/24/outline";
import { useFormik } from "formik";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { object, string } from "yup";
import {
  useDeleteContactMutation,
  useSaveContactMutation,
  useUpdateContactMutation,
} from "../app/api/contactsApi";
import { ROUTES } from "../constants/routes";
import { getFormikError } from "../helpers/form";
import FormInput from "./FormInput";

interface Props {
  data?: any;
  isNew?: boolean;
}

const ContactForm: FC<Props> = ({ data, isNew = false }) => {
  const navigate = useNavigate();
  const query = isNew ? useSaveContactMutation : useUpdateContactMutation;

  const [save, { isLoading }] = query();
  const [deleteContact, { isLoading: isDeleting }] = useDeleteContactMutation();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      photoURL: "",
      tags: {
        family: false,
        friends: false,
        work: false,
        other: false,
      },
      ...data,
    },
    validationSchema: object().shape({
      name: string().required("Имя обязательно"),
      email: string().required("Email обязателен"),
      phone: string().required("Номер телефона обязателен"),
      photoURL: string().required("URL фотографии обязателен"),
    }),
    onSubmit: async (values) => {
      save(values)
        .unwrap()
        .then((_res) => {
          toast.success("Контакт успешно сохранен");
          navigate(ROUTES.CONTACT_LIST);
        })
        .catch((err) => {
          console.error(err);
          toast.error("Ошибка при сохранении контакта");
        });
    },
  });

  const handleDelete = () => {
    if (confirm(`Вы уверены, что хотите удалить контакт ${data.name}?`)) {
      deleteContact(data.id)
        .unwrap()
        .then((res) => {
          toast.success(res?.message);
          navigate(ROUTES.CONTACT_LIST);
        })
        .catch((err) => {
          console.error(err);
          toast.error(err.message);
        });
    }
  };

  const handleGoBack = () => {
    navigate(ROUTES.CONTACT_LIST);
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={formik.handleSubmit}>
      <FormInput
        label="Имя"
        type="text"
        {...formik.getFieldProps("name")}
        error={getFormikError(formik, "name")}
      />
      <FormInput
        label="Электронная почта"
        type="email"
        {...formik.getFieldProps("email")}
        error={getFormikError(formik, "email")}
      />
      <FormInput
        label="Номер телефона"
        type="text"
        {...formik.getFieldProps("phone")}
        error={getFormikError(formik, "phone")}
      />
      <FormInput
        label="URL фотографии"
        type="text"
        {...formik.getFieldProps("photoURL")}
        error={getFormikError(formik, "photoURL")}
      />

      <div>
        <label className="block w-full">Теги</label>
        <div className="grid grid-cols-4">
          <label className="flex gap-2 items-center">
            <input
              type="checkbox"
              {...formik.getFieldProps("tags.family")}
              checked={formik.values.tags.family}
            />
            <span>Семья</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              {...formik.getFieldProps("tags.friends")}
              checked={formik.values.tags.friends}
            />
            <span>Друзья</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              {...formik.getFieldProps("tags.work")}
              checked={formik.values.tags.work}
            />
            <span>Коллеги</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              {...formik.getFieldProps("tags.other")}
              checked={formik.values.tags.other}
            />
            <span>Другое</span>
          </label>
        </div>
      </div>

      <div className="flex  gap-2">
        <button
          className="p-2 bg-gray-500 hover:bg-gray-700 disabled:bg-gray-400 mt-2 text-white text-xl"
          disabled={isLoading || isDeleting}
          onClick={handleGoBack}
        >
          Назад
        </button>

        {!isNew && (
          <button
            type="button"
            className="p-2 text-red-500 disabled:text-gray-400 mt-2 active:bg-red-100 transition"
            disabled={isLoading || isDeleting}
            onClick={handleDelete}
            title="Удалить контакт"
          >
            <TrashIcon height={24} />
          </button>
        )}

        <button
          type="submit"
          className="p-2 bg-blue-500 hover:bg-blue-700 disabled:bg-gray-400 mt-2 text-white text-xl ml-auto"
          disabled={!formik.isValid || isLoading || isDeleting}
        >
          {isNew ? "Сохранить" : "Обновить"}
        </button>
      </div>
    </form>
  );
};

export default ContactForm;
