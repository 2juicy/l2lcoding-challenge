import "./Searchbar.css";

export default function Searchbar({
  placeholder,
  value,
  handleSearch,
  handleInput,
}: {
  placeholder: string;
  value: string;
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleInput: () => void;
}) {
  return (
    <header id="header-component">
      <a href="#0">Link to Learn</a>
      <input
        className="searchbar"
        placeholder={placeholder}
        value={value}
        onChange={e => handleSearch(e)}
        onKeyUp={handleInput}
      />
    </header>
  );
}
