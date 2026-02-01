import { Search } from "lucide-react";
import { memo } from "react";

function BooksPageControls({
  search,
  setSearch,
  setFilterOption,
  filterOption,
  categories,
}) {
  return (
    <section className="books-page__controls">
      <div className="search-bar">
        <Search className="search-bar__icon" size={20} />
        <input
          className="search-bar__input"
          placeholder="Search books..."
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <select
        className="btn--secondary filter-toggle"
        onChange={(e) => {
          setFilterOption(e.target.value);
        }}
        value={filterOption}
      >
        {categories.map((category) => (
          <option value={category} key={category}>
            {category}
          </option>
        ))}
      </select>
    </section>
  );
}

export default memo(BooksPageControls);
