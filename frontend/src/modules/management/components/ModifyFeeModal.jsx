import { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const ModifyFeeModal = ({ showModifyFeeModal, handleClose, handleSaveFee }) => {
    const [fee, setFee] = useState(null);

    const handleSave = () => {
        handleSaveFee(fee);
        handleClose();
    };

    return (
        <Modal show={showModifyFeeModal} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Set Producer Fee</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="feeInput">
                        <Form.Label>Fee (0 - 100)%</Form.Label>
                        <Form.Control
                            type="number"
                            min={0}
                            max={100}
                            value={fee}
                            onChange={(e) => setFee(Number(e.target.value))}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" className='fw-500' onClick={handleSave}>
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModifyFeeModal;
