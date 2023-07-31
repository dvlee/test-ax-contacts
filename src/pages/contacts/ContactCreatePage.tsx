import { FC } from "react";
import ContactForm from "../../components/ContactForm";

interface Props {}

const ContactCreatePage: FC<Props> = () => {
  return (
    <div className="flex flex-col items-center gap-2 pt-4 sm:gap-4">
      <h1 className="text-4xl text-center">Новый контакт</h1>

      <div className="bg-white p-5 sm:p-10 shadow-md w-full max-w-xl">
        <ContactForm isNew />
      </div>
    </div>
  );
};

export default ContactCreatePage;
