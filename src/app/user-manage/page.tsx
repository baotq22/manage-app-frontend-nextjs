"use client"

import Link from "next/link";
import { requestGetAllUser } from "@/api/user";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import PaginationUser from "@/components/pagination/user/paginationUser";
import { DeleteOutlined, EditOutlined, FileTextOutlined, RetweetOutlined } from "@ant-design/icons";
import { setOpenModalAddUser, setOpenModalUpdateUser, setOpenModalDeleteUser, setUserActive, setUserDataFilter } from "@/states/modules/user";
import ModalAddUser from "../../components/modal/user/ModalAddUser"
import ModalUpdateUser from "../../components/modal/user/ModalUpdateUser"
import ModalDeleteUser from "../../components/modal/user/ModalDeleteUser"
import { Modal } from "antd";
import moment from "moment";
import InputSearchUser from "@/components/inputSearch/user/inputSearchUser"

const UserManage = () => {
    const [startIndex, setStartIndex] = useState(0);
    const dispatch = useDispatch();
    const list = useSelector(state => state.user.listUsers);
    const listUsers = list.users;
    const isLoading = useSelector(state => state.user.isLoadingGetAllUser);
    const filter = useSelector(state => state.user.dataFilter);

    const [openImageDetails, setOpenImageDetails] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const showImageModal = () => {
        setOpenImageDetails(true);
    }

    const hideImageModal = () => {
        setOpenImageDetails(false);
    }

    const handleImageClick = (image) => {
        setSelectedImage(image);
        showImageModal();
    }

    useEffect(() => {
        dispatch(requestGetAllUser())
    }, [])

    const handleShowModalAdd = () => {
        dispatch(setOpenModalAddUser(true))
    }

    const handleShowModalUpdate = (item) => {
        dispatch(setUserActive(item));
        dispatch(setOpenModalUpdateUser(true));
    }

    const handleShowModalDelete = (item) => {
        dispatch(setUserActive(item));
        dispatch(setOpenModalDeleteUser(true));
    }

    const handleRefresh = () => {
        dispatch(setUserDataFilter({ ...filter, search: "", page: 1 }))
        dispatch(requestGetAllUser())
    }

    const onSearch = (value, _e, info) => {
        dispatch(setUserDataFilter({ ...filter, number_user: value }))
        dispatch(requestGetAllUser())
    }

    return (
        <>
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                {/* <button type="button"
                    className="bg-slate-300 my-2
                                text-black rounded-lg
                                hover:bg-slate-100 
                                font-medium text-sm 
                                px-5 py-2.5 text-center"
                    onClick={() => handleShowModalAdd()}>
                    Add New Users
                </button> */}
                <InputSearchUser listUsers={list} />
                <button type="button"
                    className="bg-slate-300 my-2 mr-3
                                text-black rounded-lg
                                hover:bg-slate-100 
                                font-bold text-sm 
                                px-3 py-2.5 text-center float-right"
                    onClick={() => handleRefresh()}>
                    <RetweetOutlined />
                </button>
                <div className="relative overflow-x-auto w-full">
                    <table className="w-full text-sm text-left text-gray-500 table-auto">
                        <thead className="text-xs text-gray-700 uppercase bg-stone-200">
                            <tr>
                                <th scope="col" className="px-6 py-3 border-r border-slate-500">
                                    #
                                </th>
                                <th scope="col" className="px-6 py-3 border-r border-slate-500">
                                    Avatar
                                </th>
                                <th scope="col" className="px-6 py-3 border-r border-slate-500 whitespace-nowrap"
                                // onClick={() => handleSort("username")}
                                >
                                    Username
                                    {/* {sortOrder === 'asc' ? <UpOutlined /> : <DownOutlined />} */}
                                </th>
                                <th scope="col" className="px-6 py-3 border-r border-slate-500 whitespace-nowrap"
                                // onClick={() => handleSort("email")}
                                >
                                    Email/eメール
                                    {/* {sortOrder === 'asc' ? <UpOutlined /> : <DownOutlined />} */}
                                </th>
                                <th scope="col" className="px-6 py-3 border-r border-slate-500 whitespace-nowrap"
                                // onClick={() => handleSort("fullname")}
                                >
                                    Fullname/名前
                                    {/* {sortOrder === 'asc' ? <UpOutlined /> : <DownOutlined />} */}
                                </th>
                                <th scope="col" className="px-6 py-3 border-r border-slate-500 whitespace-nowrap">
                                    Phone Number
                                </th>
                                <th scope="col" className="px-6 py-3 border-r border-slate-500 whitespace-nowrap">
                                    Created Date
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                listUsers?.map((item, index) =>
                                    <tr className="bg-white border-b" key={index}>
                                        <td className="px-6 py-4 border-r border-slate-500">
                                            {startIndex + index + 1}
                                        </td>
                                        <td className="px-6 py-4 border-r border-slate-500">
                                            <button
                                                style={{ width: '100%', height: '100%', cursor: 'pointer', padding: 0, border: 'none', background: 'none' }}
                                                onClick={() => handleImageClick(item?.image)}
                                            >
                                                <img className="rounded-full" style={{ width: '70%', height: '70%' }} src={item?.image} />
                                            </button>
                                        </td>
                                        <td scope="row" className="px-6 py-4 border-r border-slate-500 font-medium text-gray-900">
                                            {item?.username}
                                        </td>
                                        <td className="px-6 py-4 border-r border-slate-500 whitespace-nowrap">
                                            {item?.email}
                                        </td>
                                        <td className="px-6 py-4 border-r border-slate-500">
                                            {item?.fullname}
                                        </td>
                                        <td className="px-6 py-4 border-r border-slate-500">
                                            {item?.phone}
                                        </td>
                                        <td className="px-6 py-4 border-r border-slate-500">
                                            {moment(item?.createdAt).format('LT')} at {moment(item?.createdAt).format('DD/MM/YYYY')}
                                        </td>
                                        <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                            <Link href={`user-manage/details/${item?._id}`} className="no-underline">
                                                <button type="button"
                                                    className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2.5 text-center mr-2 mb-2"><FileTextOutlined />
                                                </button>
                                            </Link>
                                            <button type="button"
                                                className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-3 py-2.5 text-center mr-2 mb-2"
                                                onClick={() => handleShowModalUpdate(item)}><EditOutlined />
                                            </button>
                                            <button type="button"
                                                className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-2.5 text-center mr-2 mb-2"
                                                onClick={() => handleShowModalDelete(item)}><DeleteOutlined />
                                            </button>
                                        </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
                <PaginationUser listUsers={list} />
                <ModalAddUser />
                <ModalUpdateUser />
                <ModalDeleteUser />
                <Modal
                    title="View Details Image"
                    visible={openImageDetails}
                    onOk={hideImageModal}
                    okText="Close"
                    footer={(_, { OkBtn }) => (
                        <>
                            <OkBtn />
                        </>
                    )}
                    className="hide-x"
                >
                    <>
                        {selectedImage && (
                            <img style={{ width: '100%', height: '100%' }} src={selectedImage} alt="Selected Image" />
                        )}
                    </>
                </Modal>
            </div>
        </>
    )
}

export default UserManage