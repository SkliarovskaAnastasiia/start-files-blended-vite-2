import { FiSearch } from 'react-icons/fi';
import style from './Form.module.css';
import { useState } from 'react';

const Form = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const handleInputChange = e => {
    setQuery(e.target.value.trim());
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (query === '') return alert('Write your request');
    onSubmit(query);

    setQuery('');
  };

  return (
    <form className={style.form} onSubmit={handleSubmit}>
      <button className={style.button} type="submit">
        <FiSearch size="16px" />
      </button>

      <input
        className={style.input}
        placeholder="What do you want to write?"
        name="search"
        required
        autoFocus
        value={query}
        onChange={handleInputChange}
      />
    </form>
  );
};

export default Form;
