import axios from '@/config/axiosconfig';
import { RootState } from '@/Global/store';
import { InvestmentPlan } from '@/pages/(components)/Dashboard/InvestmentPage';
import { Button, Form, Input, Modal, Select } from 'antd';
import { Option } from 'antd/es/mentions';
import { isAxiosError } from 'axios';
import { BluetoothConnected } from 'lucide-react';
import { useRouter } from 'next/router';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

interface DepositModalProps {
  isModalVisible: boolean;
  showModal: () => void;
  handleCancel: () => void;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  setIsModalVisible: Dispatch<SetStateAction<boolean>>;
  plan:InvestmentPlan[] | null
}

const InvestmentModal :React.FC<DepositModalProps> = ({isModalVisible, plan, setIsModalVisible, loading, setLoading, showModal, handleCancel}) => {
      const [selectedPlanUid, setSelectedPlanUid] = useState<string | null>(null);

        const selectedPlan = plan?.find((p) => p.uid === selectedPlanUid);

  const [form] = Form.useForm();
  

  return (
    <>
      <Modal
        open = {isModalVisible}
        onCancel={handleCancel}
        centered
        footer={[
          <button className="bg-purple-600 text-white px-4 py-2 rounded-xl text-[16px] cursor-pointer w-max">
            Invest Now
          </button>
        ]}
      >
        <Form form={form} layout="vertical">
          <div className="flex flex-col mt-8 gap-3">
            <h2 className="font-bold text-xl">Invest in</h2>
            
            <div className='mb-3'>
            <p className='font-semibold mb-1'>Amount <span className=" text-red-600 font-semibold">*</span></p>
            <input type="number" className="h-10 w-full p-1.5 border rounded-md border-purple-500 outline-0" placeholder="Enter amount"/>
            </div>
          </div>

          <div>
            <p className='font-semibold mb-1'>Plan name <span className=" text-red-600 font-semibold">*</span></p>
            <Select placeholder="Select a plan" className='outline-purple-500 w-full h-10 border-purple-500' onChange={(value) => setSelectedPlanUid(value)}>
                <Option value="">Select a plan</Option>
              {
                plan?.map((plan)=>(
                    <Option value={plan.name}>{plan.name} plan</Option>
                ))
              }
            </Select>
          </div>
          {
            selectedPlan && (
                <div>
            <div className='mb-3'>
            <p className='font-semibold mb-1'>Minimum Amount <span className=" text-red-600 font-semibold">*</span></p>
            <input type="number" className="h-10 w-full p-1.5 border rounded-md border-purple-500 outline-0" placeholder="Enter amount"/>
            </div>
            <div className='mb-3'>
            <p className='font-semibold mb-1'>Maximum Amount <span className=" text-red-600 font-semibold">*</span></p>
            <input type="number" className="h-10 w-full p-1.5 border rounded-md border-purple-500 outline-0" placeholder="Enter amount"/>
            </div>
            <div className='mb-3'>
            <p className='font-semibold mb-1'>Returns (%) <span className=" text-red-600 font-semibold">*</span></p>
            <input type="number" className="h-10 w-full p-1.5 border rounded-md border-purple-500 outline-0" placeholder="Enter amount"/>
            </div>
            <div className='mb-3'>
            <p className='font-semibold mb-1'>Duration (Days) <span className=" text-red-600 font-semibold">*</span></p>
            <input type="number" className="h-10 w-full p-1.5 border rounded-md border-purple-500 outline-0" placeholder="Enter amount"/>
            </div>  
          </div>
            )
          }
        </Form>
      </Modal>
    </>
  );
};

export default InvestmentModal
