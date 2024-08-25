import { useContext, useState } from "react";
import { FilteredSeatIdsContext } from "../contexts/filteredSeatIds/FilteredSeatIdsContext";

export const SearchBox = () => {
  const [, filterSeatIds] = useContext(FilteredSeatIdsContext);

  const [text, setText] = useState("");

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.currentTarget.value);
  };

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    filterSeatIds(text);
  };

  return (
    <form onSubmit={handleOnSubmit}>
      <input
        type="text"
        value={text}
        onChange={handleOnChange}
        placeholder="検索"
        className="w-80 rounded-full border border-gray-200 px-5 py-2 focus-visible:shadow focus-visible:outline-none"
      />
    </form>
  );
};
