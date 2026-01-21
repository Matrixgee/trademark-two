/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Modal, Form, Select, Input } from "antd";

interface DepositModalProps {
  isModalVisible: boolean;
  handleInvestment: (planId: string) => void;
  amount: string;
  setAmount: (amount: string) => void;
  plan?: Array<{
    id: string;
    name: string;
    minAmount: number;
    maxAmount: number;
    returns: number;
    duration: number;
    uid: string; // ✅ comes from API
    user: any | null; // ✅ null = global plan
  }>;
  selectedCoin?: string;
  handleCancel: () => void;
  userId: string; // ✅ current user UID
}

const InvestmentModal: React.FC<DepositModalProps> = ({
  isModalVisible,
  handleInvestment,
  amount,
  setAmount,
  plan,
  selectedCoin,
  handleCancel,
  userId,
}) => {
  const [selectedPlanId, setSelectedPlanId] = useState<string>("");

  // 🔹 Check if this user has a personal plan
  const hasPersonalPlan = plan?.some((p) => p.uid && p.uid === userId);

  // 🔹 Decide which plans to show
  const visiblePlans = plan?.filter((p) => {
    if (hasPersonalPlan) {
      // User HAS a personal plan → show ONLY their plan(s)
      return p.uid === userId;
    }

    // User has NO personal plan → show ONLY global plans
    return !p.uid || p.user === null;
  });

  const selectedPlan = visiblePlans?.find((p) => p.id === selectedPlanId);

  return (
    <Modal
      open={isModalVisible}
      onCancel={handleCancel}
      centered
      footer={[
        <button
          key="invest"
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

        {/* Amount */}
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

        {/* Plan Select */}
        <div>
          <p className="font-semibold mb-1">
            Plan <span className="text-red-600">*</span>
          </p>
          <Select
            placeholder="Select a plan"
            className="w-full h-10 border-purple-500 outline-0"
            value={selectedPlanId}
            onChange={(value: string) => setSelectedPlanId(value)}
          >
            {visiblePlans?.map((p) => (
              <Select.Option key={p.id} value={p.id}>
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
