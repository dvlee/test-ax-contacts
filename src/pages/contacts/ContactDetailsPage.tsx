import { FC } from "react";
import { Link, useParams } from "react-router-dom";
import { useFetchSingleContactQuery } from "../../app/api/contactsApi";
import ContactDetails from "../../components/ContactDetails";
import LoadingSpinner from "../../components/LoadingSpinner";

interface Props {}

const ContactDetailsPage: FC<Props> = () => {
  const { id } = useParams();

  const { data, isFetching, isError, error }: any =
    useFetchSingleContactQuery(id);

  console.log("error", error, error instanceof Error);

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

  if (isFetching) return <LoadingSpinner />;

  return <ContactDetails data={data} />;
};

export default ContactDetailsPage;
