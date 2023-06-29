import React from "react";
import "./css/serchSelect.css"
function SearchSelect({ setSearch, month, setMonth }) {
  return (
    <div className="searchSelect">
      
        <input
          type="search"
          placeholder="Search transaction"
          onChange={(e) => setSearch(e.target.value)}
        />
      
      <div>
        <select value={month} onChange={(e) => setMonth(e.target.value)}>
          <option value="">Select Month</option>
          <option value="January">January</option>
          <option value="February">February</option>
          <option value="March">March</option>
          <option value="April">April</option>
          <option value="May">May</option>
          <option value="June">June</option>
          <option value="July">July</option>
          <option value="August">August</option>
          <option value="September">September</option>
          <option value="October">October</option>
          <option value="November">November</option>
          <option value="December">December</option>
        </select>
      </div>
    </div>
  );
}

export default SearchSelect;
