"use client"

import { requestGetDetailsProduct } from "@/api/product";
import SpinComponent from "@/components/spin";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"

function DotPrice({ number }) {
    const formattedNumber = number ? number.toLocaleString('en-US', { useGrouping: true }) : '';

    return (
        <>
            {formattedNumber}
        </>
    )
}

const DetailProductPage = () => {
    const dispatch = useDispatch();

    const router = useParams();
    const { id } = router;

    const detailsProduct = useSelector(state => state.product.detailsProduct);
    console.log(detailsProduct)
    const isLoading = useSelector(state => state.product.isLoadingGetDetailProduct);
    useEffect(() => {
        dispatch(requestGetDetailsProduct(id));
    }, [id])

    const afterDiscount = detailsProduct?.price * (1 - (detailsProduct?.discount * 0.01))

    return (
        <>
            {!isLoading ? (
                <div className="mx-5 my-5">
                    <div className="drop-shadow-2xl">
                        <div className="p-12 mt-12 leading-6 bg-neutral-200">
                            <div className="container-fliud">
                                <div className="flex row">
                                    <div className="preview col-md-6">
                                        <div className="mr-5">
                                            <div className="w-full active drop-shadow-2xl" id="pic-1"><img src={`${detailsProduct?.image}`} /></div>
                                        </div>
                                    </div>
                                    <div className="details col-md-6 text-white">
                                        <small className="products__sale
                                                  text-white
                                                  py-1.5 px-2.5 top-0 right-0
                                                  rounded-ee-xl
                                                  bg-lime-500">{detailsProduct?.discount}% DISCOUNT</small>
                                        <h3 className="mt-0 text-2xl text-black">{detailsProduct?.productName}</h3>
                                        <div className="mb-4">
                                            <span className="text-black">Rating points: </span><span className="text-teal-600">{detailsProduct?.ratingPoint}</span>
                                        </div>
                                        <p className="mb-4 text-black">{detailsProduct?.description}</p>
                                        <h4 className=" uppercase text-black">current price:</h4>
                                        <span className="text-4xl text-emerald-600 mr-4"><DotPrice number={afterDiscount} />₫</span>
                                        <span className="text-3xl text-red-600 line-through"><DotPrice number={detailsProduct?.price} />₫</span>
                                        <h2 className="mb-4 mt-4 text-black"><strong>{detailsProduct?.soldQuantity}</strong> of buyers enjoyed this product! <strong>({detailsProduct?.quantity} in Stock)</strong></h2>
                                        <h2 className="mb-4">
                                            <strong className="text-black">Special offers?</strong>
                                            <p className="mb-4"><small className="py-0.5 px-2.5 top-0 right-0
                                                         text-base
                                                         bg-emerald-600">{detailsProduct?.special}% protion pay</small></p>
                                        </h2>
                                        <div className="action">
                                            <button className="py-3 px-6
                                                       border-none
                                                       uppercase
                                                       font-bold text-white
                                                       bg-indigo-500
                                                       hover:bg-indigo-800"
                                            >add to cart</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>)
                : <SpinComponent />}
        </>
    )
}

export default DetailProductPage