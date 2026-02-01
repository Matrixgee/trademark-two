import React, { SetStateAction, Dispatch, useState } from "react";
import { Modal, Form } from "antd";
// import { useDepositContext } from "@/context/DepositContext";
import { useRouter } from "next/router";

interface DepositModalProps {
  isModalVisible: boolean;
  showModal: () => void;
  handleCancel: () => void;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  setIsModalVisible: Dispatch<SetStateAction<boolean>>;
}

const DepositModal: React.FC<DepositModalProps> = ({
  isModalVisible,
  // setIsModalVisible,
  // loading,
  // setLoading,
  // showModal,
  handleCancel,
}) => {
  // const { amount, setAmount } = useDepositContext();

  const [amount, setAmount] = useState<string>("");

  const router = useRouter();
  return (
    <>
      <Modal
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        centered
      >
        <Form
          layout="vertical"
          onFinish={() => router.push("/user/payment-info")}
        >
          <div className="flex flex-col mt-8 gap-3">
            <h2 className="font-semibold text-xl">Deposit Amount</h2>

            <div>
              <p>
                Amount <span className=" text-red-600 font-semibold">*</span>
              </p>
              <input
                value={amount}
                className="h-10 w-full p-1.5 border rounded-md border-purple-500 outline-0"
                placeholder="Enter amount"
                onChange={(e) => {
                  const raw = e.target.value.replace(/,/g, "");

                  if (!/^\d*$/.test(raw)) return;

                  setAmount(raw); // 👈 keep it as string
                }}
              />
            </div>
          </div>
          <div className="w-full flex justify-end items-end mt-2">
            <button className="bg-purple-600 text-white px-4 py-2 rounded-xl text-[16px] cursor-pointer w-max">
              Deposit Now
            </button>
          </div>
        </Form>
      </Modal>
    </>
  );
};

export default DepositModal;
