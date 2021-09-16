import { useRef } from "react";
import "./Searchbar.css";

interface Searchbar {
  placeholder: string;
  name: string;
  handleForm: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Searchbar({
  placeholder,
  name,
  handleForm,
}: Searchbar) {
  const searchRef = useRef<HTMLInputElement>(null);

  return (
    <input
      ref={searchRef}
      value={searchRef.current?.value}
      placeholder={placeholder}
      name={name}
      onChange={e => handleForm(e)}
    />
  );
}
