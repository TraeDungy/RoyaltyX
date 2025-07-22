import { useEffect, useState } from "react";
import PageHeader from "../../common/components/PageHeader";
import { getFeeTypes, createFeeType, getFeeRules, createFeeRule } from "../api/fees";

const Fees = () => {
  const [types, setTypes] = useState([]);
  const [rules, setRules] = useState([]);
  const [typeName, setTypeName] = useState("");
  const [ruleRate, setRuleRate] = useState("");
  const [selectedType, setSelectedType] = useState("");

  const fetchData = async () => {
    const [t, r] = await Promise.all([getFeeTypes(), getFeeRules()]);
    setTypes(t || []);
    setRules(r || []);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreateType = async () => {
    if (!typeName) return;
    await createFeeType({ name: typeName });
    setTypeName("");
    fetchData();
  };

  const handleCreateRule = async () => {
    if (!selectedType || !ruleRate) return;
    await createFeeRule({ fee_type: selectedType, rate: ruleRate });
    setRuleRate("");
    fetchData();
  };

  return (
    <div className="py-3">
      <PageHeader title="Fee Management" description="Manage fee types and rules." />

      <div className="mt-3">
        <h5>Create Fee Type</h5>
        <input value={typeName} onChange={(e) => setTypeName(e.target.value)} placeholder="Name" />
        <button onClick={handleCreateType} className="btn btn-basic ms-2">Add</button>
      </div>

      <h6 className="mt-4">Fee Types</h6>
      <ul>
        {types.map((t) => (
          <li key={t.id}>{t.name}</li>
        ))}
      </ul>

      <div className="mt-4">
        <h5>Create Fee Rule</h5>
        <select value={selectedType} onChange={(e) => setSelectedType(e.target.value)}>
          <option value="">Select type</option>
          {types.map((t) => (
            <option key={t.id} value={t.id}>{t.name}</option>
          ))}
        </select>
        <input
          type="number"
          value={ruleRate}
          onChange={(e) => setRuleRate(e.target.value)}
          placeholder="Rate %"
          className="ms-2"
        />
        <button onClick={handleCreateRule} className="btn btn-basic ms-2">Add</button>
      </div>

      <h6 className="mt-4">Fee Rules</h6>
      <ul>
        {rules.map((r) => (
          <li key={r.id}>{r.name || "Rule"} - {r.fee_type} - {r.rate}%</li>
        ))}
      </ul>
    </div>
  );
};

export default Fees;
