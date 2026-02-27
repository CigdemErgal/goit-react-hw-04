import { useState } from "react";
import { toast } from "react-hot-toast";
import css from "./SearchBar.module.css";

// KULLANICIDAN ARAMA METNI ALIR VE BOS GIRISTE UYARI GOSTERIR.
const SearchBar = ({ onSubmit }) => {
  const [input, setInput] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (input.trim() === "") {
      toast.error("Please enter a search term.");
      return;
    }

    onSubmit(input);
    setInput("");
  };

  return (
    <header className={css.header}>
      <form className={css.form} onSubmit={handleSubmit}>
        <input
          className={css.input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button className={css.button} type="submit">
          Search
        </button>
      </form>
    </header>
  );
};

export default SearchBar;
