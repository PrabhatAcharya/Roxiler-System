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
      .get(`${URL}/api/transactions?page=${page}`)
      .catch((err) => {
        console.error(err);
      });

    const data = await res.data;
    return data;
  };
  useEffect(() => {
    sendRequest().then((data) => setTransactions(data.docs));
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
          {transactions.map((transaction) => (
            <tr>
              <td>{transaction.id}</td>
              <td>{transaction.title}</td>
              <td>
                {transaction.description?.length <= 50
                  ? transaction.description
                  : (transaction.description
                      ? transaction.description?.substring(0, 50)
                      : "") + (transaction.description ? "..." : "")}
              </td>
              <td>{transaction.price}</td>
              <td>{transaction.category}</td>
              <td>{transaction.sold}</td>
              <td>
                <img src={transaction.image} alt={transaction.title} />
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
