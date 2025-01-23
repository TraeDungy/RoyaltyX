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
            <h2 className="bold mb-5">Content</h2>
            
            <p>This is a page where you will be able to see content specific to this product/asset</p>

        </div>
    );
};

export default Content;
