import React, { useState, useEffect } from "react";
import "./css/statistics.css";
import axios from "axios";
function Statistics({ month }) {
  const URL = "http://localhost:8000";
  const [statistics, setStatistics] = useState({
    totalSaleAmount: 0,
    totalSoldItems: 0,
    totalUnsoldItems: 0,
  });
  const sendRequest = async () => {
    const res = await axios
      .get(`${URL}/api/statistics?month=${month}`)
      .catch((err) => {
        console.error(err);
      });

    const data = await res.data;
    return data;
  };

  useEffect(() => {
    sendRequest().then((data) => setStatistics(data));
  }, [month]);
  return (
    <div className="statistics">
      <h1>Statistics - {month}</h1>
      <table>
        <tr>
          <td>Total sale</td>
          <td>{statistics.totalSaleAmount}</td>
        </tr>
        <tr>
          <td>Total sold items</td>
          <td>{statistics.totalSoldItems}</td>
        </tr>
        <tr>
          <td>Total unsold items</td>
          <td>{statistics.totalUnsoldItems}</td>
        </tr>
      </table>
    </div>
  );
}

export default Statistics;
