import React, { useEffect, useState } from "react";
import axios from "axios";
import "./css/transactions.css";
function Transactions({ search, month }) {
  const URL = "http://localhost:8000";
  const [transactions, setTransactions] = useState([]);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const sendRequest = async () => {
    const res = await axios
      .get(`${URL}/api/transactions?page=${page}&perPage=${perPage}&search=${search}&month=${month}`)
      .catch((err) => {
        console.error(err);
      });

    const data = await res.data;
    return data;
  };
  useEffect(() => {
    sendRequest().then((data) => setTransactions(data));
  }, [search, month, page, perPage]);
  return (
    <>
      <table className="transactions">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Price</th>
            <th>Category</th>
            <th>Sold</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((ele, i) => (
            <tr key={i}>
              <td>{ele.id}</td>
              <td>{ele.title}</td>
              <td>
                {ele.description?.length <= 50
                  ? ele.description
                  : (ele.description ? ele.description?.substring(0, 50) : "") +
                    (ele.description ? "..." : "")}
              </td>
              <td>{ele.price}</td>
              <td>{ele.category}</td>
              <td>{ele.sold}</td>
              <td>
                <img src={ele.image} alt={ele.title} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <p>Page No: {page}</p>
        <p>
          <span onClick={() => page > 1 && setPage(page - 1)}>Previous</span> -{" "}
          <span onClick={() => setPage(page + 1)}>Next</span>
        </p>
        <p>Per Page: {perPage}</p>
      </div>
    </>
  );
}

export default Transactions;
