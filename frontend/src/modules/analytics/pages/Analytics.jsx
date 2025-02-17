import { Doughnut, Line, Bar } from "react-chartjs-2";

function Analytics() {
  const contactData = {
    labels: ["Completed", "Uncompleted"],
    datasets: [
      {
        label: "",
        data: [75, 25],
        backgroundColor: ["#e9a33c", "#E0E0E0"],
        hoverBackgroundColor: ["#e9a33c", "#E0E0E0"],
        borderColor: ["#e9a33c", "#E0E0E0"],
        borderWidth: 0,
      },
    ],
  };

  const taskCompletionData = {
    labels: ["Completed", "Uncompleted"],
    datasets: [
      {
        label: "",
        data: [60, 40],
        backgroundColor: ["#6581e9", "#E0E0E0"],
        hoverBackgroundColor: ["#6581e9", "#E0E0E0"],
        borderColor: ["#6581e9", "#E0E0E0"],
        borderWidth: 0,
      },
    ],
  };

  const lineChartData = {
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    datasets: [
      {
        label: "Monthly Earnings",
        data: [10, 20, 15, 30, 25, 35, 40, 45, 50, 60, 70, 80],
        fill: true,
        backgroundColor: "#627fea22",
        borderColor: "#627fea",
        tension: 0.4,
      },
    ],
  };

  const lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          display: false,
        },
      },
    },
  };

  const barChartData = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: "Monthly Revenue",
        data: [55, 85, 125, 50, 30, 70],
        backgroundColor: [
          "#cf004c",
          "#4D81F1",
          "#20c997",
          "#ff9f00",
          "#6f42c1",
          "#17a2b8",
        ],
        borderRadius: 10,
        barThickness: 10,
      },
    ],
  };

  const barChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          display: false,
        },
      },
    },
  };

  const doughnutOptions = {
    responsive: true,
    cutout: "85%",
    plugins: {
      tooltip: {
        enabled: false,
      },
      legend: {
        display: true,
      },
    },
  };

  const contactOptions = {
    ...doughnutOptions,
  };

  const taskOptions = {
    ...doughnutOptions,
  };

  return (
    <div className="container px-5">
      <div className="mb-3 ps-1">
        <h4 className="bold">Analytics</h4>
      </div>

      <div className="row">
        <div className="col-md-8 p-3">
          <div className="card shadow-sm p-3 rounded d-flex justify-content-center flex-column w-100 h-100 border-0">
            <h5 className="mb-3">Monthly Earnings</h5>
            <div className="m-auto w-100 h-100 d-flex justify-content-center text-center">
              <Line
                data={lineChartData}
                options={lineChartOptions}
                style={{ height: 280 }}
              />
            </div>
          </div>
        </div>
        <div className="col-md-4 p-3">
          <div className="card shadow-sm p-3 rounded d-flex justify-content-center flex-column w-100 h-100 border-0">
            <h5 className="mb-3">Monthly Revenue</h5>
            <h5 className="txt-lighter">14,426$</h5>
            <br />
            <div className="m-auto w-100 d-flex justify-content-center text-center">
              <Bar
                data={barChartData}
                options={barChartOptions}
                style={{ height: 280 }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-4 p-3">
          <div className="card bgc-body shadow-sm p-3 rounded d-flex justify-content-center flex-column w-100 h-100 border-0">
            <h5 className="mb-5">Contact Management</h5>
            <div className="m-auto px-4 pb-3" style={{ maxWidth: 250 }}>
              <Doughnut
                data={contactData}
                options={contactOptions}
                style={{ height: 200 }}
              />
            </div>
          </div>
        </div>
        <div className="col-md-4 p-3">
          <div className="card bgc-body shadow-sm p-3 rounded d-flex justify-content-center flex-column w-100 h-100 border-0">
            <h5 className="mb-5">Task Management</h5>
            <div className="m-auto px-4 pb-3" style={{ maxWidth: 250 }}>
              <Doughnut
                data={taskCompletionData}
                options={taskOptions}
                style={{ height: 200 }}
              />
            </div>
          </div>
        </div>
        <div className="col-md-4 p-3">
          <div className="card bgc-body shadow-sm p-3 rounded d-flex justify-content-center flex-column w-100 h-100 border-0">
            <h5 className="mb-5">Task Management</h5>
            <div className="m-auto px-4 pb-3" style={{ maxWidth: 250 }}>
              <Doughnut
                data={taskCompletionData}
                options={taskOptions}
                style={{ height: 200 }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Analytics;
