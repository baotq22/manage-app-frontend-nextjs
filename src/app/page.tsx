'use client'

import { requestGetAllProduct } from '../api/product/index'
import { requestGetAllUser } from "@/api/user/index";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, Col, Row, Statistic } from "antd";
import { ShoppingOutlined, UserOutlined } from "@ant-design/icons";
import Link from "next/link";
import '../../public/css/homepage.css'
import PaginationProduct from "@/components/pagination/product/paginationProduct";
import { setProductDataFilter } from "@/states/modules/product";
import AppBanner from "@/components/banner/app.banner";
import SpinComponent from "@/components/spin";
import { Modal } from "antd";
import PaginationHome from "@/components/pagination/home/paginationHome";
import gsap from "gsap";
import { Flip } from "gsap/all";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Home() {
  const dispatch = useDispatch();
  const list = useSelector(state => state.product.listProducts);
  const listProducts = list.products;
  const listU = useSelector(state => state.user.listUsers);
  const isLoading = useSelector(state => state.product.isLoadingGetAllProduct);
  const filter = useSelector(state => state.product.dataFilter)

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

  useEffect(() => {
    dispatch(requestGetAllProduct())
  }, [])

  const handleRefresh = () => {
    dispatch(setProductDataFilter({ ...filter, search: "", page: 1 }))
    dispatch(requestGetAllProduct());
  }

  const onSearch = (value, _e, info) => {
    dispatch(setProductDataFilter({ ...filter, number_book: value }))
    dispatch(requestGetAllProduct());
  };

  function DotPrice({ number }) {
    const formattedNumber = number.toLocaleString('en-US', { useGrouping: true });

    return (
      <>
        {formattedNumber}
      </>
    )
  }

  const ref = useRef(null);
  gsap.registerPlugin(ScrollTrigger);

  useEffect(() => {
    gsap.fromTo(".container",
      {
        opacity: 0,
        ease: "bounce",
        scrollTrigger: {
          trigger: ".container"
        }
      },
      {
        duration: 2,
        opacity: 1,
      }
    )

    gsap.fromTo(".product__list",
      {
        opacity: 0,
        ease: "fade",
        scrollTrigger: {
          trigger: ".product__list"
        }
      },
      {
        duration: 6,
        opacity: 1,
        ease: "rough"
      }
    );
  }, []);

  return (
    <>
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 first">
        <div className="lg:items-center lg:justify-between">
          <div className="min-w-0 flex-1">
            <h2 className="text-2xl font-bold leading-7 text-gray-900 mt-3 sm:truncate sm:text-3xl sm:tracking-tight">Homepage</h2>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mb-5">
          <div className="container">
            <Row gutter={[16, 24]} className="rowClass">
              <Col span={12} className="drop-shadow-xl">
                <Card className="cardBody" style={{ backgroundImage: "linear-gradient(to right, #fff 30%, #C779D0)" }}>
                  <ShoppingOutlined style={{ float: "right", fontSize: '40px', color: "#fff" }} />
                  <Statistic
                    title="Total Products"
                    value={list?.total}
                    valueStyle={{ color: '#000' }}
                  />
                </Card>
              </Col>
              <Col span={12} className="drop-shadow-xl">
                <Card className="cardBody" style={{ backgroundImage: "linear-gradient(to right, #fff 30%, #26d0ce)" }}>
                  <UserOutlined style={{ float: "right", fontSize: '40px', color: "#fff" }} />
                  <Statistic
                    title="Total Users"
                    value={listU?.total}
                    valueStyle={{ color: '#000' }}
                  />
                </Card>
              </Col>
            </Row>
          </div>
        </div>
        <AppBanner />
        <div className="max-w-7xl mx-auto my-0 product__list" ref={ref}>
          <h3 className="my-5 text-3xl">BEST SELLER</h3>
          {!isLoading ?
            <div className="products__list flex flex-wrap">
              {
                listProducts?.map((item, index) => {
                  return (
                    <div className="products__item drop-shadow-xl
                                rounded-e-xl rounded-es-xl
                                p-3 mx-3.5 mb-8 mt-0
                                bg-neutral-100" key={index}>
                      <small className="text-white py-1.5 px-2.5
                                    rounded-ee-xl bg-indigo-500">Portion pay {item?.special}%</small>
                      <div className="products__img my-1.5">
                        <div className="my-1.5 flex items-center justify-center h-64">
                          <button
                            style={{ width: '100%', height: '100%', cursor: 'pointer', padding: 0, border: 'none', background: 'none' }}
                            onClick={() => handleImageClick(item?.image)}
                          >
                            <img className="max-w-full inline-block" width={300} height={300} src={item?.image} alt="" />
                          </button>
                        </div>
                      </div>
                      <Link href={`products-manage/details/${item?._id}`} className="no-underline">
                        <p className="products__title text-lg text-center text-blacke mb-4">{item?.productName}</p>
                        <p className="text-center text-base">
                          <span className="text-red-600"><DotPrice number={item?.price} />₫</span>
                          <span className="bg-slate-300 ml-2 text-red-600 text-base p-1 rounded-md pl-2.5">-{item?.discount}% SALE</span>
                        </p>
                        <div className="text-center text-black">
                          <span className="text-sm p-1">{item?.ratingPoint} points</span>
                          <span className="text-sm p-1">({item?.quantity} sold)</span>
                        </div>
                      </Link>
                    </div>
                  )
                })
              }
            </div> : <SpinComponent />}
          <PaginationHome listProducts={list} />
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
      </div>
    </>
  )
}

