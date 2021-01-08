import React, { useState } from "react";

function ItemSearch({ getQuery }) {
  const [text, setText] = useState("");
  const capitalize = (s) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
  }
  const onChange = (q) => {
    setText(capitalize(q));
    getQuery(capitalize(q));
  };
  return (
      <form>
        <input
          type="text"
          className="form-control"
          placeholder="search order eg. Lunch"
          value={text}
          onChange={(e) => {
            onChange(e.target.value);
          }}
          autoFocus
        />
      </form>
  );
}

export default ItemSearch;