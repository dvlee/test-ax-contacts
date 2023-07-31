import { PlusIcon } from "@heroicons/react/24/outline";
import { FC, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useFetchContactsQuery } from "../../app/api/contactsApi.ts";
import ContactCard from "../../components/ContactCard.tsx";
import LoadingSpinner from "../../components/LoadingSpinner.tsx";
import Pagination from "../../components/Pagination.tsx";
import { Tags } from "../../constants/enums.ts";
import useAuth from "../../hooks/useAuth.ts";
import { ContactTag } from "../../types/contact";

interface Props {}

const ContactListPage: FC<Props> = () => {
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const [tag, setTag] = useState<ContactTag | null>(null);

  const { user } = useAuth();

  const { data, isFetching } = useFetchContactsQuery(user?.uid as string, {
    skip: !user,
  });

  const filteredContacts = useMemo(() => {
    if (data) {
      return data.items
        .filter((contact: any) => {
          if (tag) {
            return contact.tags[tag] === true;
          }
          return true;
        })
        .filter(
          (contact: any) =>
            contact.name.toLowerCase().includes(search.toLowerCase()) ||
            contact.phone.toLowerCase().includes(search.toLowerCase()) ||
            contact.email.toLowerCase().includes(search.toLowerCase())
        );
    }
  }, [data, tag, search]);

  const contacts = useMemo(() => {
    if (filteredContacts) {
      return filteredContacts.slice(page * limit, (page + 1) * limit);
    } else {
      return [];
    }
  }, [filteredContacts, page, limit]);

  return (
    <div className="flex flex-col gap-2 pb-20 w-full">
      <div className="flex justify-between items-center flex-wrap gap-3 p-3 xl:px-0">
        <h1 className="text-4xl">Контакты</h1>

        <Link to="/contacts/new">
          <button className="bg-blue-500 hover:bg-blue-700 text-white  py-2 px-4 rounded flex gap-2 items-center">
            <PlusIcon height={24} />
            <span className="hidden md:inline-block">Добавить контакт</span>
          </button>
        </Link>
      </div>

      <div className="flex flex-col-reverse gap-3 justify-between">
        <div className="order-1 w-full sm:order-none sm:w-60 lg:w-80">
          <input
            type="text"
            placeholder="Поиск"
            onChange={(e) => setSearch(e.target.value)}
            className="w-full p-2 border border-gray-300"
          />
        </div>
        <div className="flex flex-col items-center" role="group">
          <span className="mr-2">Фильтрация по тегу</span>
          <div className="flex">
            {Object.keys(Tags).map((key) => (
              <button
                key={key}
                type="button"
                className={`px-4 py-2 text-sm font-medium border border-gray-200 ${
                  tag === key
                    ? "bg-blue-500 text-white hover:bg-blue-700"
                    : "bg-white text-gray-900 hover:bg-gray-100"
                }`}
                onClick={() =>
                  setTag((prev) => (prev === key ? null : (key as ContactTag)))
                }
              >
                {Tags[key as ContactTag]}
              </button>
            ))}
          </div>
        </div>
      </div>

      {isFetching && <LoadingSpinner />}
      {!isFetching && contacts?.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {contacts?.map((contact: any) => (
            <Link to={`/contacts/${contact.id}`} key={contact.id}>
              <ContactCard contact={contact} />
            </Link>
          ))}
        </div>
      )}
      {!isFetching && contacts?.length === 0 && (
        <div className="flex flex-col items-center gap-2 pt-4 sm:gap-4">
          <h1 className="text-4xl text-center">Контакты не найдены</h1>
          <Link to="/contacts/new">
            <button className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2">
              Добавить контакт
            </button>
          </Link>
        </div>
      )}

      <Pagination
        total={filteredContacts?.length ?? 0}
        page={+page}
        limit={+limit}
        onPageChange={setPage}
        onLimitChange={setLimit}
      />
    </div>
  );
};

export default ContactListPage;
