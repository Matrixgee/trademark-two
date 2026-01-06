
import { InvestmentPlan } from '@/pages/(components)/Dashboard/InvestmentPage';
import { Form, Input, Modal, Select } from 'antd';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'

interface DepositModalProps {
  handleInvestment: (id:string)=>void
  isModalVisible: boolean;
  showModal: () => void;
  handleCancel: () => void;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  setIsModalVisible: Dispatch<SetStateAction<boolean>>;
  plan:InvestmentPlan[] | null
  selectedCoin: string
  amount:string
  setAmount:Dispatch<SetStateAction<string>>
  getPlans: ()=>void
}


const InvestmentModal :React.FC<DepositModalProps> = ({isModalVisible,getPlans, handleInvestment,amount, setAmount ,plan,selectedCoin, setIsModalVisible, loading, setLoading, showModal, handleCancel}) => {
      const [selectedPlanUid, setSelectedPlanUid] = useState<string>("");
      const [selectedPlanId, setSelectedPlanId] = useState<string>("");
      const [storedPlans, setStoredPlans] = useState<InvestmentPlan[]>([]);
useEffect(() => {
  const saved = localStorage.getItem("InvestmentPlan");

  if (saved) {
    const plans = JSON.parse(saved);
    setStoredPlans(plans);
  }
  getPlans()
}, []);

console.log(storedPlans)
        const selectedPlan = storedPlans?.find((p) => p.uid === selectedPlanUid);

  const [form] = Form.useForm();


  return (
    <>
      <Modal
        open = {isModalVisible}
        onCancel={handleCancel}
        centered
        footer={[
          <button onClick={()=>handleInvestment(selectedPlanId)} className="bg-purple-600 text-white px-4 py-2 rounded-xl text-[16px] cursor-pointer w-max">
            Invest Now
          </button>
        ]}
      >
        <Form form={form} layout="vertical">
          <div className="flex flex-col mt-8 gap-3">
            <h2 className="font-bold text-xl">Invest in {selectedCoin}</h2>
            
            <div className='mb-3'>
            <p className='font-semibold mb-1'>Amount <span className=" text-red-600 font-semibold">*</span></p>
            <input
  type="text"
  value={amount}
  className="h-10 w-full p-1.5 border rounded-md border-purple-500 outline-0"
  placeholder="Enter amount"
  onChange={(e) => {
    const raw = e.target.value.replace(/,/g, "");
    if (!/^\d*$/.test(raw)) return;

    setAmount(raw);
  }}

            />
            </div>
          </div>

<div>
  <p className="font-semibold mb-1">
    Plan name <span className="text-red-600 font-semibold">*</span>
  </p>
<Select
  placeholder="Select a plan"
  className="w-full h-10 border-purple-500 outline-0"
  value={selectedPlanUid}
  onChange={(value: string) => {
    setSelectedPlanUid(value);

    const selectedPlan = storedPlans?.find(p => p.uid === value);
    if (selectedPlan) {
      setSelectedPlanId(selectedPlan.id);
    }
  }}
>
  {storedPlans?.map((p) => (
    <Select.Option key={p.uid} value={p.uid}>
      {p.name} plan
    </Select.Option>
  ))}
</Select>


</div>
{selectedPlan && (
  <div className="mt-4 space-y-3">
    <Form.Item label="Minimum Amount">
      <Input value={selectedPlan.minAmount} className='h-10 border-purple-500 outline-0' disabled />
    </Form.Item>

    <Form.Item label="Maximum Amount">
      <Input value={selectedPlan.maxAmount} className='h-10 border-purple-500 outline-0' disabled />
    </Form.Item>

    <Form.Item label="Returns (%)">
      <Input value={selectedPlan.returns} className='h-10 border-purple-500 outline-0' disabled />
    </Form.Item>

    <Form.Item label="Duration (Days)">
      <Input value={selectedPlan.duration} className='h-10 border-purple-500 outline-0' disabled />
    </Form.Item>
  </div>
)}

        </Form>
      </Modal>
    </>
  );
};

export default InvestmentModal
