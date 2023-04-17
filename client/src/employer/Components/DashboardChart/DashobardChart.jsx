import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";


const DashboardChart = (props) => {

  var labels = ["January", "February", "March", "April", "May", "June"];

  if(props.timeRange ==2) {
    labels = ["January", "February"];
  }else if(props.timeRange ==3) {
    labels = ["January", "February", "March"];
  }else if(props.timeRange ==1) {
    labels = ["Today",];
  }

const data = {
  labels: labels,
  datasets: [
    {
      label: "Posted Job",
      backgroundColor: "#1967d2",
      borderColor: "#1967d2",
      data: [0, 10, 5, 2, 20, 30, 45],
    },
    {
        label: "Application",
        backgroundColor: "#d93025",
        borderColor: "#d93025",
        data: [1, 6, 5, 11, 20, 16, 60],
      },
      {
        label: "Messages",
        backgroundColor: "#f9ab00",
        borderColor: "#f9ab00",
        data: [6, 12, 5, 2, 20, 34, 50],
      },
      {
        label: "ShortList",
        backgroundColor: "#34a853",
        borderColor: "#34a853",
        data: [10, 15, 16, 8, 9, 7, 8],
      },
  ],
};

  console.log(props.timeRange)
  return (
    <div>
      <Line data={data} />
    </div>
  );
};

export default DashboardChart;
