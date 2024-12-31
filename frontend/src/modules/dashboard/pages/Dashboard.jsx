import React, { useState } from 'react';
import { CurrencyDollar, Person, Stripe } from 'react-bootstrap-icons';
import { Doughnut, Line, Bar } from 'react-chartjs-2';
import { Chart } from 'chart.js/auto';

function Dashboard() {
    const [stats] = useState({
        contactCount: Math.floor(Math.random() * 100),
        leadCount: Math.floor(Math.random() * 100),
        taskCount: Math.floor(Math.random() * 100),
        todoTasksCount: Math.floor(Math.random() * 100),
        inProgressTasksCount: Math.floor(Math.random() * 100),
        doneTasksCount: Math.floor(Math.random() * 100),
    });

    const contactData = {
        labels: ['Completed', 'Uncompleted'],
        datasets: [
            {
                label: '',
                data: [75, 25],
                backgroundColor: ['#e9a33c', '#E0E0E0'],
                hoverBackgroundColor: ['#e9a33c', '#E0E0E0'],
                borderColor: ['#e9a33c', '#E0E0E0'],
                borderWidth: 0,
            },
        ],
    };

    const taskCompletionData = {
        labels: ['Completed', 'Uncompleted'],
        datasets: [
            {
                label: '',
                data: [60, 40], // Example percentage
                backgroundColor: ['#6581e9', '#E0E0E0'],
                hoverBackgroundColor: ['#6581e9', '#E0E0E0'],
                borderColor: ['#6581e9', '#E0E0E0'],
                borderWidth: 0, // Removes borders
            },
        ],
    };

    const lineChartData = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        datasets: [
            {
                label: 'Monthly Earnings',
                data: [10, 20, 15, 30, 25, 35, 40, 45, 50, 60, 70, 80],
                fill: true,
                backgroundColor: 'rgba(0,158,253, 0.2)',
                borderColor: 'rgb(0,158,253)',
                tension: 0.4,
            },
        ],
    };

    const lineChartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
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
        labels: ['January', 'February', 'March', 'April', 'May', 'June'],
        datasets: [
            {
                label: 'Monthly Revenue',
                data: [55, 85, 125, 50, 30, 70],
                backgroundColor: ['#cf004c', '#4D81F1', '#20c997', '#ff9f00', '#6f42c1', '#17a2b8'],
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
                display: false,
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
        cutout: '85%',
        plugins: {
            tooltip: {
                enabled: false,
            },
            legend: {
                display: false,
            },
        },
    };

    const doughnutContactPlugin = {
        id: 'centerTextContact',
        beforeDraw: (chart) => {
            const { width, height, ctx } = chart;
            const dataset = chart.data.datasets[0];
            const percentage = dataset.data[0];

            ctx.restore();
            const fontSize = (height / 5).toFixed(2);
            ctx.font = `${fontSize}px Arial`;
            ctx.textBaseline = 'middle';
            ctx.fillStyle = '#fff';

            const text = `${percentage}%`;
            const textX = Math.round((width - ctx.measureText(text).width) / 2);
            const textY = height / 2;

            ctx.fillText(text, textX, textY);
            ctx.save();
        },
    };

    const doughnutTaskPlugin = {
        id: 'centerTextTask',
        beforeDraw: (chart) => {
            const { width, height, ctx } = chart;
            const dataset = chart.data.datasets[0];
            const percentage = dataset.data[0];

            ctx.restore();
            const fontSize = (height / 5).toFixed(2);
            ctx.font = `${fontSize}px Arial`;
            ctx.textBaseline = 'middle';
            ctx.fillStyle = '#fff';

            const text = `${percentage}%`;
            const textX = Math.round((width - ctx.measureText(text).width) / 2);
            const textY = height / 2;

            ctx.fillText(text, textX, textY);
            ctx.save();
        },
    };

    const contactOptions = {
        ...doughnutOptions,
        plugins: {
            ...doughnutOptions.plugins,
            centerTextContact: doughnutContactPlugin,
        },
    };

    const taskOptions = {
        ...doughnutOptions,
        plugins: {
            ...doughnutOptions.plugins,
            centerTextTask: doughnutTaskPlugin,
        },
    };


    return (
        <div className="container px-5">
            <h2 className='mb-3 ps-1 bold'>Dashboard</h2>

            <div className="row">
                <div className="col-md-8 p-3">
                    <div className="card power-contrast shadow p-3 rounded d-flex justify-content-center flex-column w-100 h-100 border-0">
                        <h5 className="mb-3">Monthly Earnings</h5>
                        <div className="m-auto w-100 h-100 d-flex justify-content-center text-center">
                            <Line data={lineChartData} options={lineChartOptions} style={{ height: 280 }} />
                        </div>
                    </div>
                </div>
                <div className="col-md-4 p-3">
                    <div className="card power-contrast shadow p-3 rounded d-flex justify-content-center flex-column w-100 h-100 border-0">
                        <h5 className="mb-3">Monthly Revenue</h5>
                        <h5 className='txt-lighter'>14,426$</h5>
                        <br />
                        <div className="m-auto w-100 d-flex justify-content-center text-center">
                            <Bar data={barChartData} options={barChartOptions} style={{ height: 280 }} />
                        </div>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-md-4 p-3">
                    <div className="card power-contrast shadow p-3 rounded d-flex justify-content-center flex-column w-100 h-100 border-0">
                        <h5 className="mb-5">Contact Management</h5>
                        <div className="m-auto px-4 pb-3" style={{ maxWidth: 250 }}>
                            <Doughnut data={contactData} options={contactOptions} plugins={[doughnutContactPlugin]} style={{ height: 200 }} />
                        </div>
                    </div>
                </div>
                <div className="col-md-4 p-3">
                    <div className="card power-contrast shadow p-3 rounded d-flex justify-content-center flex-column w-100 h-100 border-0">
                        <h5 className="mb-5">Task Management</h5>
                        <div className="m-auto px-4 pb-3" style={{ maxWidth: 250 }}>
                            <Doughnut data={taskCompletionData} options={taskOptions} plugins={[doughnutTaskPlugin]} style={{ height: 200 }} />
                        </div>
                    </div>
                </div>
                <div className="col-md-4 p-3">
                    <div className="card power-contrast shadow p-3 rounded d-flex justify-content-center flex-column w-100 h-100 border-0">
                        <h5 className="mb-5">Task Management</h5>
                        <div className="m-auto px-4 pb-3" style={{ maxWidth: 250 }}>
                            <Doughnut data={taskCompletionData} options={taskOptions} plugins={[doughnutTaskPlugin]} style={{ height: 200 }} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
