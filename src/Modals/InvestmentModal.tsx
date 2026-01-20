/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable react/jsx-key */

import { InvestmentPlan } from "@/pages/(components)/Dashboard/InvestmentPage";
import { Form, Input, Modal, Select } from "antd";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";

interface DepositModalProps {
  handleInvestment: (id: string) => void;
  isModalVisible: boolean;
  showModal: () => void;
  handleCancel: () => void;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  setIsModalVisible: Dispatch<SetStateAction<boolean>>;
  plan: InvestmentPlan[] | null;
  selectedCoin: string;
  amount: string;
  setAmount: Dispatch<SetStateAction<string>>;
  getPlans: () => void;
}

const InvestmentModal: React.FC<DepositModalProps> = ({
  isModalVisible,

  handleInvestment,
  amount,
  setAmount,
  plan,
  selectedCoin,

  handleCancel,
}) => {
  const [selectedPlanUid, setSelectedPlanUid] = useState<string>("");
  const [selectedPlanId, setSelectedPlanId] = useState<string>("");
  const [storedPlans, setStoredPlans] = useState<InvestmentPlan[]>([]);

  useEffect(() => {
    // Load from localStorage first
    const saved = localStorage.getItem("InvestmentPlan");
    if (saved) setStoredPlans(JSON.parse(saved));

    // Fetch fresh plans
    const fetchPlans = async () => {
      if (plan) {
        setStoredPlans(plan);
        localStorage.setItem("InvestmentPlan", JSON.stringify(plan));
      }
    };
    fetchPlans();
  }, [plan]);

  const selectedPlan = storedPlans.find((p) => p.uid === selectedPlanUid);

  return (
    <Modal
      open={isModalVisible}
      onCancel={handleCancel}
      centered
      footer={[
        <button
          disabled={!selectedPlanId || !amount}
          onClick={() => handleInvestment(selectedPlanId)}
          className="bg-purple-600 text-white px-4 py-2 rounded-xl text-[16px] cursor-pointer w-max disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Invest Now
        </button>,
      ]}
    >
      <Form layout="vertical">
        <h2 className="font-bold text-xl">Invest in {selectedCoin}</h2>

        {/* Amount Input */}
        <div className="mb-3">
          <p className="font-semibold mb-1">
            Amount <span className="text-red-600">*</span>
          </p>
          <input
            type="text"
            value={amount}
            placeholder="Enter amount"
            className="h-10 w-full p-1.5 border rounded-md border-purple-500 outline-0"
            onChange={(e) => {
              const raw = e.target.value.replace(/,/g, "");
              if (!/^\d*$/.test(raw)) return;
              setAmount(raw);
            }}
          />
        </div>

        {/* Plan Selection */}
        <div>
          <p className="font-semibold mb-1">
            Plan <span className="text-red-600">*</span>
          </p>
          <Select
            placeholder="Select a plan"
            className="w-full h-10 border-purple-500 outline-0"
            value={selectedPlanUid}
            onChange={(value: string) => {
              setSelectedPlanUid(value);
              const plan = storedPlans.find((p) => p.uid === value);
              if (plan) setSelectedPlanId(plan.id); // Make sure this is `id` from API
            }}
          >
            {storedPlans.map((p) => (
              <Select.Option key={p.uid} value={p.uid}>
                {p.name} Plan
              </Select.Option>
            ))}
          </Select>
        </div>

        {/* Plan Details */}
        {selectedPlan && (
          <div className="mt-4 space-y-3">
            <Form.Item label="Minimum Amount">
              <Input value={selectedPlan.minAmount} disabled />
            </Form.Item>
            <Form.Item label="Maximum Amount">
              <Input value={selectedPlan.maxAmount} disabled />
            </Form.Item>
            <Form.Item label="Returns (%)">
              <Input value={selectedPlan.returns} disabled />
            </Form.Item>
            <Form.Item label="Duration (Days)">
              <Input value={selectedPlan.duration} disabled />
            </Form.Item>
          </div>
        )}
      </Form>
    </Modal>
  );
};

export default InvestmentModal;
