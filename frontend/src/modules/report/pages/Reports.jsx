import React from 'react';
import 'datatables.net-bs5/css/dataTables.bootstrap5.min.css';
import 'datatables.net-bs5';
import ExampleDataTable from '../components/ExampleDataTable';

const Reports = () => {
    return (
        <div className='container px-5 py-3'>
            <h4 className='bold mb-3'>Reports</h4>

            <ExampleDataTable />

        </div>
    );
}

export default Reports;
