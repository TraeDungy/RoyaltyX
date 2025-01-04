import React from 'react';
import { Table, Button, Form } from 'react-bootstrap';
import { Download, FilePdf } from 'react-bootstrap-icons';

const Content = () => {
    // Mock data for uploaded content
    const mockData = [
        { id: 1, name: 'January Expenses', date: '2025-01-01', status: 'Uploaded' },
        { id: 2, name: 'February Payments', date: '2025-02-01', status: 'Uploaded' },
        { id: 3, name: 'March Expenses', date: '2025-03-01', status: 'Uploaded' },
    ];

    return (
        <div className="container px-5">
            <h4 className="bold mb-5">Content</h4>
            <Form>
                <Form.Group controlId="formFile" className="mb-4">
                    <Form.Label>Upload CSV File</Form.Label>
                    <Form.Control type="file" accept=".csv" className='px-3' />
                </Form.Group>
                <Button variant="primary" disabled>
                    Upload
                </Button>
            </Form>

            {/* Table Section */}
            <Table striped bordered hover responsive className="mt-5">
                <thead>
                    <tr>
                        <th className='text-center'>#</th>
                        <th>File Name</th>
                        <th>Upload Date</th>
                        <th>Status</th>
                        <th className='text-center'>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {mockData.map((data) => (
                        <tr key={data.id}>
                            <td className='text-center'>{data.id}</td>
                            <td>{data.name}</td>
                            <td>{data.date}</td>
                            <td>{data.status}</td>
                            <td className='text-center'>
                                <div className='d-flex justify-content-center'>
                                    <div className='px-1'>
                                        <Download className='text-danger pointer' />
                                    </div>
                                    <div className='px-1'>
                                        <FilePdf className='text-danger pointer' />
                                    </div>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default Content;
