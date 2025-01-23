import React from 'react';
import 'datatables.net-bs5/css/dataTables.bootstrap5.min.css';
import 'datatables.net-bs5';
import ExampleDataTable from '../components/ExampleDataTable';

const Reports = () => {
    return (
        <div className='container px-5 py-3'>
            <h4 className='bold mb-3'>Reports</h4>

            <p>This is a page where you will be able to see reports specific to this product</p>

            {/* <ExampleDataTable /> */}

        </div>
    );
}

export default Reports;
