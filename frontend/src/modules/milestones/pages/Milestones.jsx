import { useEffect, useState } from "react";
import { getMilestones, createMilestone } from "../api/milestones";
import {
  Container,
  Form,
  Button,
  Table,
  Spinner,
} from "react-bootstrap";
import Confetti from "react-confetti";

const metrics = [
  { value: "impressions", label: "Impressions" },
  { value: "sales", label: "Sales" },
  { value: "rentals", label: "Rentals" },
  { value: "views", label: "Views" },
  { value: "downloads", label: "Downloads" },
  { value: "royalty_revenue", label: "Royalty Revenue" },
  { value: "impression_revenue", label: "Impression Revenue" },
];

function Milestones() {
  const [milestones, setMilestones] = useState(null);
  const [form, setForm] = useState({ metric: "sales", threshold: "" });
  const [celebrate, setCelebrate] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getMilestones();
      setMilestones(data);
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const created = await createMilestone({ ...form, notify_email: true });
    if (created.id) {
      setMilestones([created, ...(milestones || [])]);
      setForm({ metric: "sales", threshold: "" });
    }
  };

  if (!milestones) {
    return (
      <Container className="d-flex justify-content-center mt-5">
        <Spinner animation="border" />
      </Container>
    );
  }

  return (
    <Container>
      {celebrate && <Confetti recycle={false} numberOfPieces={400} />}
      <h2 className="mb-3">Milestones</h2>
      <Form onSubmit={handleSubmit} className="mb-4">
        <Form.Group className="mb-2">
          <Form.Label>Metric</Form.Label>
          <Form.Select
            value={form.metric}
            onChange={(e) => setForm({ ...form, metric: e.target.value })}
          >
            {metrics.map((m) => (
              <option key={m.value} value={m.value}>
                {m.label}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label>Threshold</Form.Label>
          <Form.Control
            type="number"
            value={form.threshold}
            onChange={(e) => setForm({ ...form, threshold: e.target.value })}
            required
          />
        </Form.Group>
        <Button type="submit">Add Milestone</Button>
      </Form>
      <Table striped>
        <thead>
          <tr>
            <th>Metric</th>
            <th>Threshold</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {milestones.map((m) => (
            <tr key={m.id}>
              <td>{m.metric}</td>
              <td>{m.threshold}</td>
              <td>{m.is_achieved ? "Achieved" : "Pending"}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default Milestones;
