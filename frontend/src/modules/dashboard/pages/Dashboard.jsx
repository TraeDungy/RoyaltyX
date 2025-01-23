import React, { useState } from 'react';
import { Bell, Envelope, File, Git, GraphUpArrow, Search, ShieldCheck } from 'react-bootstrap-icons';

function Dashboard() {

    return (
        <div className="container px-5">


            <div className='mb-3 ps-1'>
                <h3 className='bold'>Explore Features</h3>
            </div>

            <div className="row">
                <div className="col-md-3 pb-4">
                    <div className="card" style={{ background: "linear-gradient(135deg,rgba(107, 17, 203, 0.50),rgba(37, 116, 252, 0.5))", color: "#fff" }}>
                        <div className='card-body d-flex flex-column justify-content-between'>
                            <div className=''>
                                <Search className='h3 mb-3' />
                                <h6>Smart search</h6>
                                <p className='medium'>Use advanced algorithms to find specific information.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-3 pb-4">
                    <div className="card" style={{ background: "linear-gradient(135deg,rgba(255, 126, 180, 0.5),rgba(255, 117, 140, 0.5))", color: "#fff" }}>
                        <div className='card-body d-flex flex-column justify-content-between'>
                            <div className=''>
                                <Git className='h3 mb-3' />
                                <h6>Updated reporting</h6>
                                <p className='medium'>Keep track of versions to ensure data integrity.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-3 pb-4">
                    <div className="card" style={{ background: "linear-gradient(135deg,rgba(17, 153, 142, 0.5),rgba(56, 239, 126, 0.5))", color: "#fff" }}>
                        <div className='card-body d-flex flex-column justify-content-between'>
                            <div className=''>
                                <GraphUpArrow className='h3 mb-3' />
                                <h6>Custom analytics</h6>
                                <p className='medium'>Access your notes across all your work apps.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-3 pb-4">
                    <div className="card" style={{ background: "linear-gradient(135deg,rgba(255, 65, 109, 0.5),rgba(255, 75, 43, 0.5))", color: "#fff" }}>
                        <div className='card-body d-flex flex-column justify-content-between'>
                            <div className=''>
                                <Envelope className='h3 mb-3' />
                                <h6>Email and share reports</h6>
                                <p className='medium'>Embed images, links and files to create more dynamic notes.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 pb-4">
                    <div className="card" style={{ background: "linear-gradient(135deg,rgba(252, 75, 26, 0.5),rgba(247, 182, 51, 0.5))", color: "#fff" }}>
                        <div className='card-body d-flex flex-column justify-content-between'>
                            <div className=''>
                                <Bell className='h3 mb-3' />
                                <h6>Reminders & alerts</h6>
                                <p className='medium'>Sets reminders and alerts for upcoming deadlines or tasks.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 pb-4">
                    <div className="card" style={{ background: "linear-gradient(135deg,rgba(5, 118, 230, 0.5),rgba(0, 242, 97, 0.5))", color: "#fff" }}>
                        <div className='card-body d-flex flex-column justify-content-between'>
                            <div className=''>
                                <ShieldCheck className='h3 mb-3' />
                                <h6>Encryption</h6>
                                <p className='medium'>Implements end-to-end encryption for robust security.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>



            <div className='my-3 ps-1'>
                <h3 className='bold'>Products</h3>
            </div>

            <div className="row">
                <div className="col-md-4 pb-4">
                    <div className="card bg-transparent">
                        <img className='img-fluid rounded w-100' style={{ height: 200, objectFit: 'cover' }} src='https://vhx.imgix.net/filmplug/assets/eb2f9876-a8d7-498c-8ea8-79be97d7b423.png?auto=format%2Ccompress&fit=crop&h=720&w=1280' />
                        <div className="py-3">
                            <h5>Philly Uncut I</h5>
                            <p className='txt-lighter medium'>Lorem ipsum dolor sit amet consect...</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 pb-4">
                    <div className="card bg-transparent">
                        <img className='img-fluid rounded w-100' style={{ height: 200, objectFit: 'cover' }} src='https://vhx.imgix.net/filmplug/assets/25c180d8-da4b-4266-915e-d9c5200e8354?auto=format%2Ccompress&fit=crop&h=360&w=640' />
                        <div className="py-3">
                            <h5>PHILLY UNCUT 2 TRAILER</h5>
                            <p className='txt-lighter medium'>Lorem ipsum dolor sit amet consect...</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 pb-4">
                    <div className="card bg-transparent">
                        <img className='img-fluid rounded w-100' style={{ height: 200, objectFit: 'cover' }} src='https://vhx.imgix.net/filmplug/assets/e9c16300-0e8b-4276-9011-92bc42bf215a?auto=format%2Ccompress&fit=crop&h=360&w=640' />
                        <div className="py-3">
                            <h5>Philly UNCUT 2</h5>
                            <p className='txt-lighter medium'>Lorem ipsum dolor sit amet consect...</p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Dashboard;
