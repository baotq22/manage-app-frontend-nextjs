"use client"

import { requestGetAllProduct } from "@/api/product";
import PaginationProduct from "@/components/pagination/product/paginationProduct";
import { setProductActive, setOpenModalDeleteProduct, setOpenModalAddProduct, setOpenModalUpdateProduct, setProductDataFilter } from "@/states/modules/product";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ModalDeleteProduct from "../../components/modal/product/modalDeleteProduct"
import ModalAddProduct from "../../components/modal/product/modalAddProduct"
import ModalUpdateProduct from "../../components/modal/product/modalUpdateProduct"
import { DeleteOutlined, EditOutlined, FileTextOutlined, RetweetOutlined } from "@ant-design/icons";
import InputSearchProduct from "@/components/inputSearch/product/inputSearchProduct"
import SpinComponent from "@/components/spin";
import { Modal, Tooltip } from "antd";
import moment from "moment";
import gsap from "gsap";
import { Flip } from "gsap/all";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const ProductsManage = () => {
    const [startIndex, setStartIndex] = useState(0);
    const dispatch = useDispatch();
    const list = useSelector(state => state.product.listProducts);
    const listProducts = list.products;
    const isLoading = useSelector(state => state.product.isLoadingGetAllProduct);
    const filter = useSelector(state => state.product.dataFilter);

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
        dispatch(requestGetAllProduct())
    }, [])

    const handleShowModalAdd = () => {
        dispatch(setOpenModalAddProduct(true))
    }

    const handleShowModalUpdate = (item) => {
        dispatch(setProductActive(item));
        dispatch(setOpenModalUpdateProduct(true))
    }

    const handleShowModalDelete = (item) => {
        dispatch(setProductActive(item));
        dispatch(setOpenModalDeleteProduct(true));
    }

    const handleRefresh = () => {
        dispatch(setProductDataFilter({ ...filter, search: "", page: 1 }))
        dispatch(requestGetAllProduct())
    }

    const onSearch = (value, _e, info) => {
        dispatch(setProductDataFilter({ ...filter, number_product: value }))
        dispatch(requestGetAllProduct())
    }

    function DotPrice({ number }) {
        const formattedNumber = number.toLocaleString('en-US', { useGrouping: true });

        return (
            <>
                {formattedNumber}
            </>
        )
    }

    function CollapsibleText({ text, maxChars }) {
        const [isCollapsed, setIsCollapsed] = useState(true);

        const toggleCollapse = () => {
            setIsCollapsed(!isCollapsed);
        };

        return (
            <>
                {isCollapsed ? (
                    <div className="whitespace-nowrap">
                        <div>
                            {text.length > maxChars ? text.slice(0, maxChars) : text}...
                            <Tooltip title="View More">
                                <button className="py-3"><span onClick={toggleCollapse} className="px-3 py-1 text-blue-600 hover:cursor-pointer hover:underline">More</span></button>
                            </Tooltip>
                        </div>
                    </div>
                ) : (
                    <div>
                        {text}
                        <Tooltip title="View Less">
                            <p><button className="py-3"><span onClick={toggleCollapse} className="px-3 py-1 text-blue-600 hover:cursor-pointer hover:underline">Less</span></button></p>
                        </Tooltip>
                    </div>
                )}
            </>
        );
    }

    const ref = useRef(null);
    gsap.registerPlugin(ScrollTrigger);

    useEffect(() => {
        gsap.fromTo(".allProducts",
            {
                opacity: 0,
                scrollTrigger: {
                    trigger: ".allProducts"
                }
            },
            {
                duration: 3,
                ease: "elastic.out(1,1)",
                opacity: 1,
            }
        )
    })

    return (
        <>
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8" ref={ref}>
                <button type="button"
                    className="bg-slate-300 my-2
                                text-black rounded-lg
                                hover:bg-slate-100 
                                font-medium text-sm 
                                px-5 py-2.5 text-center"
                    onClick={() => handleShowModalAdd()}>
                    Add New Product
                </button>
                <InputSearchProduct listProducts={list} />
                <button type="button"
                    className="bg-slate-300 my-2 mr-3
                                text-black rounded-lg
                                hover:bg-slate-100 
                                font-bold text-sm 
                                px-3 py-2.5 text-center float-right"
                    onClick={() => handleRefresh()}>
                    <RetweetOutlined />
                </button>
                {!isLoading ?
                    <div className="relative overflow-x-auto w-full">
                        <table className="w-full text-sm text-left text-gray-500 table-auto">
                            <thead className="text-xs text-gray-700 uppercase bg-stone-200 allProducts">
                                <tr className="allProducts">
                                    <th scope="col" className="px-6 py-3 border-r border-slate-500">
                                        #
                                    </th>
                                    <th scope="col" className="px-6 py-3 border-r border-slate-500"
                                    // onClick={() => handleSort("productName")}
                                    >
                                        Product Name
                                        {/* <span className="float-right">{sortOrder === 'asc' ? <UpOutlined /> : <DownOutlined />}</span> */}
                                    </th>
                                    <th scope="col" className="px-6 py-3 border-r border-slate-500">
                                        Price
                                    </th>
                                    <th scope="col" className="px-6 py-3 border-r border-slate-500 whitespace-nowrap">
                                        Rating Point
                                    </th>
                                    <th scope="col" className="px-6 py-3 border-r border-slate-500">
                                        Quantity
                                    </th>
                                    <th scope="col" className="px-6 py-3 border-r border-slate-500 whitespace-nowrap">
                                        Sold Quantity
                                    </th>
                                    <th scope="col" className="px-6 py-3 border-r border-slate-500 whitespace-nowrap">
                                        % Discount
                                    </th>
                                    <th scope="col" className="px-6 py-3 border-r border-slate-500">
                                        Special
                                    </th>
                                    <th scope="col" className="px-6 py-3 border-r border-slate-500">
                                        Image
                                    </th>
                                    <th scope="col" className="px-3 py-3 border-r border-slate-500 whitespace-nowrap"
                                    // onClick={() => handleSort("description")}
                                    >
                                        Description &nbsp;&nbsp;
                                        {/* <span className="float-right">{sortOrder === 'asc' ? <UpOutlined /> : <DownOutlined />}</span> &nbsp;&nbsp;&nbsp;&nbsp; */}
                                    </th>
                                    <th scope="col" className="px-6 py-3 border-r border-slate-500 whitespace-nowrap">
                                        Created Date
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="allProducts">
                                {
                                    listProducts?.map((item, index) =>
                                        <tr className="bg-white border-b allProducts" key={index}>
                                            <td className="px-6 py-4 border-r border-slate-500">
                                                {startIndex + index + 1}
                                            </td>
                                            <td scope="row" className="whitespace-pre-line px-6 py-4 border-r border-slate-500 font-medium text-gray-900 whitespace-nowrap">
                                                {item?.productName}
                                            </td>
                                            <td className="px-6 py-4 border-r border-slate-500 text-center">
                                                <DotPrice number={item?.price} />₫
                                            </td>
                                            <td className="px-6 py-4 border-r border-slate-500 text-center">
                                                {item?.ratingPoint}
                                            </td>
                                            <td className="px-6 py-4 border-r border-slate-500 text-center">
                                                {item?.quantity}
                                            </td>
                                            <td className="px-6 py-4 border-r border-slate-500 text-center">
                                                {item?.soldQuantity}
                                            </td>
                                            <td className="px-6 py-4 border-r border-slate-500 text-center">
                                                {item?.discount}
                                            </td>
                                            <td className="px-2 py-4 border-r border-slate-500 text-center">
                                                {item?.special}% of pay
                                            </td>
                                            <td className="px-2 py-4 border-r border-slate-500">
                                                <button
                                                    style={{ width: '100%', height: '100%', cursor: 'pointer', padding: 0, border: 'none', background: 'none' }}
                                                    onClick={() => handleImageClick(item?.image)}
                                                >
                                                    <img style={{ width: '100%', height: '100%' }} src={item?.image} alt="Product Image" />
                                                </button>
                                            </td>
                                            <td className="px-3 py-4 border-r border-slate-500">
                                                <CollapsibleText text={item?.description} maxChars={5} />
                                            </td>
                                            <td className="px-6 py-4 border-r border-slate-500">
                                                {moment(item?.createdAt).format('LT')} at {moment(item?.createdAt).format('DD/MM/YYYY')}
                                            </td>
                                            <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                                <Tooltip title="View Details">
                                                    <Link href={`products-manage/details/${item?._id}`} className="no-underline">
                                                        <button type="button"
                                                            className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-3 py-2.5 text-center mr-2 mb-2"><FileTextOutlined />
                                                        </button>
                                                    </Link>
                                                </Tooltip>
                                                <Tooltip title="Edit Product Information">
                                                    <button type="button"
                                                        className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-3 py-2.5 text-center mr-2 mb-2"
                                                        onClick={() => handleShowModalUpdate(item)}><EditOutlined />
                                                    </button>
                                                </Tooltip>
                                                <Tooltip title="Delete Product">
                                                    <button
                                                        type="button"
                                                        className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-3 py-2.5 text-center mr-2 mb-2"
                                                        onClick={() => handleShowModalDelete(item)}
                                                    >
                                                        <DeleteOutlined />
                                                    </button>
                                                </Tooltip>
                                            </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
                    </div> : <SpinComponent />}
                <PaginationProduct listProducts={list} />
                <ModalAddProduct />
                <ModalUpdateProduct />
                <ModalDeleteProduct />
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

export default ProductsManage