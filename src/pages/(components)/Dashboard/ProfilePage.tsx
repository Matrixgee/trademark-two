"use-client"

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Edit2, Save, X, Camera, ArrowLeft } from 'lucide-react'
import { Flex, Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import { isAxiosError } from 'axios'
import axios from '@/config/axiosconfig'
import { useSelector } from 'react-redux'
import { RootState } from '@/Global/store'
import { useRouter } from 'next/router'

export interface UserProfile {
  name: string
  username: string
  email: string
  phoneNumber: string
  dob: string
  profilePic: string
  uid: string
  Token: string
  bitcoin: string
  sol: string
  ethereum: string
}

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false)
  const [loading, setLoading] = useState(false)
  const [updating, setUpdating] = useState(false)
  const [userInfo, setUserInfo] = useState<Partial<UserProfile> | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    phoneNumber: '',
    dob: '',
    profilePic:'',
      bitcoin: '',
      sol:'',
  ethereum: "",
  })

  const handleEditClick = () => {
    if (!userInfo) return
    setFormData({
      name: userInfo?.name ?? '',
      username: userInfo?.username ?? '',
      email: userInfo?.email ?? '',
      phoneNumber: userInfo?.phoneNumber ?? '',
      dob: userInfo?.dob ?? '',
      profilePic: userInfo?.profilePic ?? '',
      bitcoin:userInfo?.bitcoin ?? "",
      ethereum:userInfo?.ethereum ?? "",  
      sol:userInfo?.sol ?? ""
    })
    setIsEditing(true)
  }

  const handleCancel = () => {
    setIsEditing(false)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          profilePic: reader.result as string
        }))
      }
      reader.readAsDataURL(file)
    }
  }
  const user = useSelector((state: RootState) => state?.user);

    const getProfileInfo =async()=>{
    setLoading(true)
    try {
        const res = await axios.get("user/profile", {
            headers:{
                Authorization: `Bearer ${user?.Token}`
            }
        })
        setUserInfo(res?.data?.data)
        console.log(res?.data?.data, "tht")
    } catch (error) {
        if (isAxiosError(error)) {
            console.log(error)
        }
    }finally{
        setLoading(false)
    }
  }


  useEffect(()=>{
getProfileInfo()
  },[])
  const handleSave = () => {
  if (!userInfo) return;
  updateProfileInfo()

  setIsEditing(false);
}
const handleUpload = async ()=>{
    try {
        const res = await axios.post("/image/upload-single", userInfo?.profilePic, {
            headers:{
                Authorization: `Bearer ${user?.Token}`
            }
        })
        // setUserInfo(res?.data?.data)
        console.log(res?.data, "tht") 
    } catch (error) {
        if (isAxiosError(error)) {
            console.log(error)
        }
    }

}

    const updateProfileInfo =async()=>{
    setUpdating(true)
    try {
        
        const res = await axios.patch("user/profile", {
            userInfo
        }, {
            headers:{
                Authorization: `Bearer ${user?.Token}`
            }
        })
        // setUserInfo(res?.data?.data)
        console.log(res?.data, "tht") 
    } catch (error) {
        if (isAxiosError(error)) {
            console.log(error)
        }
    }finally{
        setUpdating(false)
    }
  }


  if (loading) {
    return (
      <div className='bg-gradient-to-br from-slate-50 via-white to-slate-50 min-h-screen w-full flex items-center justify-center'>
        <Flex align="center" gap="middle">
          <Spin indicator={<LoadingOutlined spin />} size="large" />
        </Flex>
      </div>
    )
  }

  const router = useRouter()

  return (
    <div className='bg-gradient-to-br from-slate-50 via-white to-slate-50 min-h-screen w-full p-4'>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" onClick={()=>router.back()}>
              <ArrowLeft className="w-6 h-6 text-gray-700" />
            </button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
            </div>
          </div>
          {!isEditing && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleEditClick}
              className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-xl transition-all shadow-lg"
            >
              <Edit2 className='w-4 h-4' /> Edit Profile
            </motion.button>
          )}
        </div>
      </motion.div>

      <div className="max-w-2xl mx-auto">
        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8"
        >
          {/* Profile Image Section */}
          <div className="flex flex-col items-center mb-8">
            <div className="relative mb-6">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="w-32 h-32 bg-gradient-to-br from-purple-600 to-indigo-700 rounded-full flex items-center justify-center text-white shadow-lg border-4 border-white overflow-hidden"
              >
                {formData.profilePic || userInfo?.profilePic ? (
                  <img
                    src={formData.profilePic || userInfo?.profilePic}
                    alt="profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-4xl font-bold">
                    {userInfo?.name?.charAt(0).toUpperCase()}
                  </div>
                )}
              </motion.div>
              {isEditing && (
                <label className="absolute bottom-0 right-0 bg-purple-600 hover:bg-purple-700 text-white p-3 rounded-full cursor-pointer shadow-lg transition-colors">
                  <Camera className='w-5 h-5' />
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                </label>
              )}
            </div>
          </div>

          {/* Form Fields */}
          <div className="space-y-6">
            {/* Account Name */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Account Name
              </label>
              {isEditing ? (
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border border-purple-400  focus:border-purple-600 focus:outline-none transition-colors bg-gray-50 focus:bg-white"
                  placeholder="Enter your name"
                />
              ) : (
                <div className='p-2 px-3 border border-gray-300 rounded-md'>
                  <p className="text-gray-900 font-semibold">{userInfo?.name}</p>
                </div>
              )}
            </div>

            {/* Username */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Username
              </label>
              {isEditing ? (
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border border-purple-400 focus:border-purple-600 focus:outline-none transition-colors bg-gray-50 focus:bg-white"
                  placeholder="Enter your username"
                />
              ) : (
                <div className='p-2 px-3 border border-gray-300 rounded-md'>
                  <p className="text-gray-900 font-semibold">@{userInfo?.username}</p>
                </div>
              )}
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Phone Number
              </label>
              {isEditing ? (
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border border-purple-400 focus:border-purple-600 focus:outline-none transition-colors bg-gray-50 focus:bg-white"
                  placeholder="Enter your phone number"
                />
              ) : (
                <div className='p-2 px-3 border border-gray-300 rounded-md'>
                  <p className="text-gray-900 font-semibold">{userInfo?.phoneNumber}</p>
                </div>
              )}
            </div>

            {/* Email Address */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Email Address
              </label>
              {isEditing ? (
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border border-purple-400 focus:border-purple-600 focus:outline-none transition-colors bg-gray-50 focus:bg-white"
                  placeholder="Enter your email"
                />
              ) : (
                <div className='p-2 px-3 border border-gray-300 rounded-md'>
                  <p className="text-gray-900 font-semibold">{userInfo?.email}</p>
                </div>
              )}
            </div>

            {/* Date of Birth */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Date of Birth
              </label>
              {isEditing ? (
                <input
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border border-purple-400 focus:border-purple-600 focus:outline-none transition-colors bg-gray-50 focus:bg-white"
                />
              ) : (
                <div className='p-2 px-3 border border-gray-300 rounded-md'>
                  <p className="text-gray-900 font-semibold">{userInfo?.dob || 'Not set'}</p>
                </div>
                
              )}
            </div>
          </div>

          {/* Action Buttons */}
          {isEditing && (
            <div className="flex gap-3 pt-8 mt-8 border-t border-gray-100">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSave}
                disabled={updating}
                className="flex-1 flex items-center cursor-pointer justify-center gap-2 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 text-white font-bold py-3 rounded-xl transition-all"
              >
                {updating ? (
                  <>
                    <Spin size="small" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className='w-5 h-5' /> Save Changes
                  </>
                )}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleCancel}
                className="flex-1 flex cursor-pointer items-center justify-center gap-2 border-2 border-gray-300 hover:border-gray-300 text-gray-600 font-bold py-3 rounded-xl transition-all"
              >
                <X className='w-5 h-5' /> Cancel
              </motion.button>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}

export default ProfilePage