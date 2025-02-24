
function Analytics() {
    return (
        <>
            <div className="mb-3 ps-1">
                <h2 className="bold">Analytics</h2>
            </div>

            <div className="row">
                <div className="col-md-4 p-3">
                    <div className="card d-flex justify-content-center flex-column w-100 h-100">
                        <div className="card-body">
                            <h6 className="mb-2">Total Impressions</h6>
                            <h3 className="bold txt-primary">34634</h3>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 p-3">
                    <div className="card d-flex justify-content-center flex-column w-100 h-100">
                        <div className="card-body">
                            <h6 className="mb-2">Total Sales</h6>
                            <h3 className="bold txt-primary">23737</h3>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 p-3">
                    <div className="card d-flex justify-content-center flex-column w-100 h-100">
                        <div className="card-body">
                            <h6 className="mb-2">Total Royalty Revenue</h6>
                            <h3 className="bold txt-primary">234643 $</h3>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-md-6">
                    <h4 className='bold mt-4 mb-4'>Sales stats</h4>
                    <table className="table table-bordered table-hover">
                        <tbody>
                            <tr>
                                <th>Number of rentals</th>
                                <td className='text-end'>235234</td>
                            </tr>
                            <tr>
                                <th>Number of purchases</th>
                                <td className='text-end'>5</td>
                            </tr>
                            <tr>
                                <th>Earnings from rentals</th>
                                <td className='text-end'>234643 $</td>
                            </tr>
                            <tr>
                                <th>Earnings from purchases</th>
                                <td className='text-end'>242452 $</td>
                            </tr>
                            <tr>
                                <th>Total units purchased</th>
                                <td className='text-end'>24525</td>
                            </tr>
                            <tr>
                                <th>Total units rented</th>
                                <td className='text-end'>24526</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="col-md-6">
                    <h4 className='bold mt-4 mb-4'>General stats</h4>
                    <table className="table table-bordered table-hover">
                        <tbody>
                            <tr>
                                <th>Impressions</th>
                                <td className='text-end'>24524542</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

export default Analytics;
