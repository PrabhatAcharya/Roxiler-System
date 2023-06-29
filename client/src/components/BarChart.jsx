import { useState,useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { URL } from "../constant";
const BarChart = ({month}) => {
  const [chartData, setChartData] = useState({});
let fetchData = async () => {
  try {
    // Fetch data from the API
    const response = await fetch(`${URL}/api/pricerange?month=${month}`);
    const responseData = await response.json();
//  console.log(responseData)
    if (Array.isArray(responseData)) {
      // Process the fetched data and format it for the chart
      const chartLabels = responseData&&responseData.map((item) => {
        console.log(item);
        return `${item.range.from}-${item.range.to}`;
      });
      const chartValues =
        responseData && responseData.map((item) => item.count);

      // Set the chart data state
      setChartData({
        labels: chartLabels,
        datasets: [
          {
            label: 'Data',
            data: chartValues,
            backgroundColor: 'rgba(75, 192, 192, 0.6)', // Customize the bar color
          },
        ],
      });
    } else {
      console.log('Invalid data format:', responseData);
    }
  } catch (error) {
    console.log('Error fetching data:', error);
  }
};
 
  useEffect(() => {
    fetchData();
  }, [month]);
  return (
    <div>
      <Bar data={chartData} />
    </div>
  );
};

export default BarChart;
