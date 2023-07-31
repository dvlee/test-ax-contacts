import { FC } from "react";
import { Link, useParams } from "react-router-dom";
import { useFetchSingleContactQuery } from "../../app/api/contactsApi";
import ContactForm from "../../components/ContactForm";
import LoadingSpinner from "../../components/LoadingSpinner";

interface Props {}

const ContactUpdatePage: FC<Props> = () => {
  const { id } = useParams();
  const { data, isFetching, isError, error }: any =
    useFetchSingleContactQuery(id);

  if (isError)
    return (
      <div className="flex flex-col items-center gap-2 pt-4 sm:gap-4">
        <h1 className="text-4xl text-center">{error.message}</h1>
        <Link to="/contacts">
          <button className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2">
            Вернуться к списку
          </button>
        </Link>
      </div>
    );

  return (
    <div className="flex flex-col items-center gap-2 pt-4 sm:gap-4">
      <h1 className="text-4xl text-center">Редактирование</h1>

      <div className="bg-white p-5 sm:p-10 shadow-md w-full max-w-xl">
        {isFetching && <LoadingSpinner />}
        {!isFetching && <ContactForm data={data} />}
      </div>
    </div>
  );
};

export default ContactUpdatePage;
