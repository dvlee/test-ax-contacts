import {
  ChevronLeftIcon,
  EnvelopeIcon,
  PhoneIcon,
} from "@heroicons/react/24/outline";
import { FC } from "react";
import { Link } from "react-router-dom";
import { Contact } from "../types/contact";

interface Props {
  data?: Contact;
}

const ContactDetails: FC<Props> = ({ data }) => {
  if (!data) return null;

  return (
    <div className="flex flex-col max-w-lg mx-auto shadow-lg">
      <div className="relative w-full">
        <img
          src={data.photoURL}
          alt={data.name}
          width={500}
          height={500}
          className="max-w-full"
        />
        <div className="absolute bottom-0 w-full z-10 pb-3  flex flex-col items-center justify-center bg-slate-400 bg-opacity-50 backdrop-blur-md text-white gap-3">
          <h2 className="text-4xl font-semibold">{data.name}</h2>
          <div className="flex gap-2 justify-center">
            <a
              href={`tel:${data.phone}`}
              className="p-2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg text-center flex flex-col items-center w-28"
            >
              <PhoneIcon height={24} />
              Позвонить
            </a>
            <a
              href={`mailto:${data.email}`}
              className="p-2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg text-center flex flex-col items-center w-28"
            >
              <EnvelopeIcon height={24} />
              <span>Написать</span>
            </a>
          </div>
        </div>
        <Link to="edit">
          <div className="absolute top-4 right-4 bg-gray-500 bg-opacity-50 text-white px-3 py-0.5 rounded-3xl">
            Править
          </div>
        </Link>
        <Link to="..">
          <div className="absolute top-4 left-4 bg-gray-500 bg-opacity-50 text-white p-1   rounded-3xl">
            <ChevronLeftIcon height={24} />
          </div>
        </Link>
      </div>
      <div className="p-4 flex flex-col text-2xl gap-2">
        <div className="p-3 rounded-2xl bg-white">
          <div className="text-base">Электронная почта</div>
          <a href={`mailto:${data.email}`}>{data.email}</a>
        </div>
        <div className="p-3 rounded-2xl bg-white">
          <div className="text-base">Телефон</div>
          <a href={`tel:${data.phone}`}>{data.phone}</a>
        </div>
      </div>
    </div>
  );
};

export default ContactDetails;
