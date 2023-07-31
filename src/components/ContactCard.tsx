import { FC } from "react";
import { Tags } from "../constants/enums";
import { Contact, ContactTag } from "../types/contact";

interface Props {
  contact: Contact;
}

const ContactCard: FC<Props> = ({ contact }) => {
  return (
    <div className="flex gap-5 p-5 shadow-md bg-white rounded-md hover:shadow-lg transition-shadow">
      <img
        src={contact.photoURL}
        alt={contact.name}
        className="bg-gray-600 object-cover"
        width={108}
      />
      <div className="flex flex-col gap-1 break-all">
        <div>{contact.name}</div>
        <div>{contact.email}</div>
        <div>{contact.phone}</div>
        <div className="flex gap-2">
          {Object.keys(contact.tags)
            .filter((key) => contact.tags[key as ContactTag] === true)
            .map((key) => (
              <span
                className="px-1.5 bg-gray-400 text-white rounded-md"
                key={key}
              >
                {Tags[key as ContactTag]}
              </span>
            ))}
        </div>
        {/* <div>{contact.tags?.join(", ")}</div> */}
      </div>
    </div>
  );
};

export default ContactCard;
