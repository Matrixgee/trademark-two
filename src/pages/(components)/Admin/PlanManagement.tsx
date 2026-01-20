/* eslint-disable react-hooks/exhaustive-deps */
// components/admin/PlanManagement.tsx

import React, { useEffect, useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import axios from "@/config/axiosconfig";
import { isAxiosError } from "axios";
import { useSelector } from "react-redux";
import { RootState } from "@/Global/store";
import toast from "react-hot-toast";
import { User } from "./AllUsers";

interface Plan {
  id: string;
  name: string;
  returns: string;
  minAmount: string;
  maxAmount: string;
  duration: string;
  uid: string;
}

const PlanManagement = () => {
  const [plans, setPlans] = useState<Plan[]>([]);

  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState<Partial<Plan>>({
    name: "",
    minAmount: "",
    maxAmount: "",
    returns: "",
    duration: "",
    uid: "",
  });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [users, setUsers] = useState<User[] | null>(null);
  const token = useSelector((state: RootState) => state?.admin?.token);
  const getPlans = async () => {
    const loadingId = toast.loading("Fetching plans, Please wait...");
    try {
      const res = await axios.get(`/plan/all`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Plans succesfully fetched");
      setPlans(res?.data?.data);
      console.log(res);
    } catch (error) {
      if (isAxiosError(error)) {
        console.log(error);
        toast.error("Error fetching plans");
      }
    } finally {
      toast.dismiss(loadingId);
    }
  };

  useEffect(() => {
    getPlans();
  }, []);

  const handleOpenModal = (plan?: Plan) => {
    if (plan) {
      setFormData(plan);
      setEditingId(plan.name);
    } else {
      setFormData({
        name: "",
        minAmount: "",
        maxAmount: "",
        returns: "",
        duration: "",
        uid: "",
      });
      setEditingId(null);
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingId(null);
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const getAllUsers = async () => {
    try {
      const response = await axios.get("/admin/users", {
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      });
      setUsers(response?.data?.data);
      console.log(response?.data?.data);
    } catch (error) {
      if (isAxiosError(error)) {
        console.log(error);
      }
    } finally {
    }
  };
  useEffect(() => {
    getAllUsers();
  }, []);

  const handleDeletePlan = async (id: string) => {
    const loadingId = toast.loading("Deleting, Please wait...");
    try {
      const response = await axios.delete(`/admin/plans/${id}`, {
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      });
      toast.success(response?.data?.message || "Plan deleted successfully");
      console.log(response);
      setTimeout(() => {
        getPlans();
      }, 1000);
    } catch (error) {
      console.log(error);
    } finally {
      toast.dismiss(loadingId);
    }
  };

  const adminToken = useSelector((state: RootState) => state?.admin?.token);
  const createPlan = async () => {
    const loadingId = toast.loading("Creating plan...");
    try {
      const response = await axios.post("/admin/plans", formData, {
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      });
      console.log(response);
      toast.success(response?.data?.message || "Plan created successfully");
      setFormData({
        name: "",
        minAmount: "",
        maxAmount: "",
        returns: "",
        duration: "",
        uid: "",
      });
      handleCloseModal();
      setTimeout(() => {
        getPlans();
      }, 1000);
    } catch (error) {
      if (isAxiosError(error)) {
        console.log(error);
      }
    } finally {
      toast.dismiss(loadingId);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Plans Management
          </h1>
          <p className="text-gray-600">Create and manage investment plans</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-medium"
        >
          <Plus size={20} /> Create New Plan
        </button>
      </div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
                {/* <p className="text-sm text-gray-500 mt-1">{plan.description}</p> */}
              </div>
              {/* <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                plan.status === 'Active'
                  ? 'bg-green-100 text-green-700'
                  : 'bg-gray-100 text-gray-700'
              }`}>
                {plan.status}
              </span> */}
            </div>

            <div className="space-y-3 mb-6 py-4 border-t border-b border-gray-200">
              <div className="flex justify-between">
                <span className="text-gray-600">Min Investment:</span>
                <span className="font-semibold text-gray-900">
                  ${plan.minAmount}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Max Investment:</span>
                <span className="font-semibold text-gray-900">
                  ${plan.maxAmount}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Return Rate:</span>
                <span className="font-semibold text-green-600">
                  {plan.returns}%
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Duration:</span>
                <span className="font-semibold text-gray-900">
                  {plan.duration}
                </span>
              </div>
            </div>

            <div className="flex gap-2">
              {/* <button
                onClick={() => handleOpenModal(plan)}
                className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition border border-blue-200"
              >
                <Edit2 size={16} /> Edit
              </button> */}
              <button
                onClick={() => handleDeletePlan(plan.id)}
                className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition border border-red-200"
              >
                <Trash2 size={16} /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Create/Edit Plan Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">
              {editingId ? "Edit Plan" : "Create New Plan"}
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Plan Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name || ""}
                  onChange={handleInputChange}
                  placeholder="e.g., Starter, Professional, Elite"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Minimum Investment ($)
                  </label>
                  <input
                    type="number"
                    name="minAmount"
                    value={formData.minAmount}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Maximum Investment ($)
                  </label>
                  <input
                    type="number"
                    name="maxAmount"
                    value={formData.maxAmount}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Return Rate (%)
                  </label>
                  <input
                    type="number"
                    name="returns"
                    value={formData.returns}
                    onChange={handleInputChange}
                    step="0.1"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Duration(In days)
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      name="duration"
                      value={formData.duration}
                      onChange={handleInputChange}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  User (optional)
                </label>
                <select
                  name="uid"
                  value={formData.uid || ""}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="">Select a user</option>
                  {users?.map(
                    (user: { id: string; uid: string; name: string }) => (
                      <option key={user.id} value={user.uid}>
                        {user.name}
                      </option>
                    ),
                  )}
                </select>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={createPlan}
                className="flex-1 px-4 py-3 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition"
              >
                {editingId ? "Update Plan" : "Create Plan"}
              </button>
              <button
                onClick={handleCloseModal}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlanManagement;
