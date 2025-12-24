import React, { SetStateAction, Dispatch } from "react";
import { Modal, Form, message } from "antd";

interface DepositModalProps {
  isModalVisible: boolean;
  showModal: () => void;
  handleCancel: () => void;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  setIsModalVisible: Dispatch<SetStateAction<boolean>>;
}

const DepositModal :React.FC<DepositModalProps> = ({isModalVisible, setIsModalVisible, loading, setLoading, showModal, handleCancel}) => {

  const handleSubmit = (values: { amount: number }) => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      message.success(`Deposited: $${values.amount}`);
      setLoading(false);
      setIsModalVisible(false);
    }, 1000);
  };

  return (
    <>
      <Modal
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        centered
      >
        <Form layout="vertical" onFinish={handleSubmit}>
          <div className="flex flex-col mt-8 gap-3">
            <h2 className="font-semibold text-xl">Deposit Amount</h2>
            
            <div>
            <p>Amount <span className=" text-red-600 font-semibold">*</span></p>
            <input type="number" className="h-10 w-full p-1.5 border rounded-md border-purple-500 outline-0" placeholder="Enter amount" />
            </div>
          </div>
          <div className="w-full flex justify-end items-end mt-2">
            <button className="bg-purple-600 text-white px-4 py-2 rounded-xl text-[16px] cursor-pointer w-max">
            Submit
          </button>
          </div>
        </Form>
      </Modal>
    </>
  );
};

export default DepositModal;
