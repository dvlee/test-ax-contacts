import { FC } from "react";

interface Props {
  total: number;
  page: number;
  limit: number;
  onPageChange: (page: number) => void;
  onLimitChange: (limit: number) => void;
}

const Pagination: FC<Props> = ({
  total,
  page,
  limit,
  onPageChange,
  onLimitChange,
}) => {
  const totalPages = Math.ceil(total / limit);
  const nextPage = () => onPageChange(page + 1);
  const previousPage = () => onPageChange(page - 1);

  const handleLimitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onLimitChange(+e.target.value);
    onPageChange(0);
  };

  return (
    <div className="flex gap-2 items-center flex-wrap flex-reverse justify-center sm:justify-between mt-4 p-3">
      <div className="flex items-center gap-2">
        Показывать по
        <select
          title="limit"
          name="limit"
          className="bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded"
          value={limit}
          onChange={handleLimitChange}
        >
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
        </select>
      </div>
      <div className="flex gap-2">
        <button
          className="bg-slate-400 hover:bg-slate-500 text-white px-2 py-1 rounded disabled:bg-gray-300"
          onClick={previousPage}
          disabled={page === 0}
        >
          Предыдущая
        </button>
        <button
          className="bg-slate-400 hover:bg-slate-500 text-white px-2 py-1 rounded disabled:bg-gray-300"
          onClick={nextPage}
          disabled={page === totalPages - 1}
        >
          Следующая
        </button>
      </div>
    </div>
  );
};

export default Pagination;
