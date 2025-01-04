import React, { useState, useEffect, useRef } from 'react';
import { CurrencyDollar, Person, Stripe } from 'react-bootstrap-icons';

function Dashboard() {

    const [stats, setStats] = useState({
        total_number_of_users: 0,
        total_earnings: 0,
        number_of_subscribed_users: 0,
        number_of_standard_subscribed_users: 0,
        number_of_pro_subscribed_users: 0,
    });

    const [lineChartData, setLineChartData] = useState({
        labels: [],
        datasets: [
            {
                label: 'Monthly Earnings',
                data: [],
                fill: true,
                backgroundColor: '#791f9055',
                borderColor: '#791f90',
                tension: 0.4,
            },
        ],
    });

    const subscriptionData = {
        labels: ['Standard Plan', 'Pro Enterprise'],
        datasets: [
            {
                label: '',
                data: [
                    Math.floor(stats.number_of_standard_subscribed_users * 100),
                    Math.floor(stats.number_of_pro_subscribed_users * 100),
                ],
                backgroundColor: ['#cf004c', '#4D81F1'],
                borderColor: ['#cf004c', '#4D81F1'],
                backgroundColor: ['#791f9055', '#ffc10755'],
                borderColor: ['#791f90', '#ffc107'],
                borderWidth: 1,
            },
        ],
    };


    function generateSmoothData(base, variation) {
        return Array.from({ length: 12 }, (_, i) => base + (Math.sin(i) * variation));
    }

    const options = {
        scales: {
            x: {
                grid: {
                    display: false,
                },
            },
        },
        maintainAspectRatio: false,
    };

    return (

        <div className="container">

            <h3 className='mt-4 mb-3 ps-2'>Dashboard</h3>

            <div className="row">
                <div className="col-md-4 p-3">
                    <div className="card p-3 rounded">
                        <div className='d-flex align-items-center justify-content-between pb-2'>
                            <span className="medium fw-500">Total users</span>
                            <Person className='txt-lighter' />
                        </div>
                        <div className="d-flex align-items-center">
                            <h2 className="m-0 pe-2">{stats.total_number_of_users}</h2>
                        </div>

                        <div className='pt-1'>
                            <span className='small'><span className='text-success'>+00.0%</span> from last period</span>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 p-3">
                    <div className="card p-3 rounded">
                        <div className='d-flex align-items-center justify-content-between pb-2'>
                            <span className="medium fw-500">Active users</span>
                            <CurrencyDollar className='txt-lighter' />
                        </div>
                        <div className="d-flex align-items-center">
                            <h2 className="m-0 pe-2">{stats.total_earnings}</h2>
                        </div>

                        <div className='pt-1'>
                            <span className='small'><span className='text-success'>+00.0%</span> from last period</span>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 p-3">
                    <div className="card p-3 rounded">
                        <div className='d-flex align-items-center justify-content-between pb-2'>
                            <span className="medium fw-500">Subscriptions</span>
                            <Stripe className='txt-lighter' />
                        </div>
                        <div className="d-flex align-items-center">
                            <h2 className="m-0 pe-2">{stats.number_of_subscribed_users}</h2>
                        </div>

                        <div className='pt-1'>
                            <span className='small'><span className='text-success'>+00.0%</span> from last period</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className='d-flex justify-content-center mt-5 pt-5'>
                <span>A place for other statistics to be placed</span>
            </div>
            
        </div>

    );
}

export default Dashboard;