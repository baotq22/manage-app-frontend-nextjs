"use client"

import { requestGetDetailsUser } from "@/api/user";
import SpinComponent from "@/components/spin";
import { useParams } from "next/navigation";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import gsap from "gsap";
import { Flip } from "gsap/all";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const DetailUserPage = () => {
    const dispatch = useDispatch();

    const router = useParams()
    const { id } = router;

    const detailsUser = useSelector(state => state.user.detailsUser)
    const isLoading = useSelector(state => state.user.isLoadingGetDetailUser)
    useEffect(() => {
        dispatch(requestGetDetailsUser(id));
    }, [id])

    function ConvertDate({ date }) {
        const inputDate = date;
        const dateObj = new Date(inputDate);
        const formattedDate = dateObj.toLocaleString("en-GB", { timeZone: "UTC" });

        return (
            <>
                {formattedDate}
            </>
        )
    }

    const ref = useRef(null);
    gsap.registerPlugin(ScrollTrigger);

    useEffect(() => {
        gsap.fromTo(".cover",
            {
                opacity: 0,
                ease: "bounce",
                scrollTrigger: {
                    trigger: ".cover"
                }
            },
            {
                duration: 2,
                opacity: 1,
            }
        )

        gsap.fromTo(".fullInfo",
            {
                opacity: 0,
                ease: "sine.in",
                scrollTrigger: {
                    trigger: ".fullInfo"
                }
            },
            {
                duration: 2,
                delay: 2,
                opacity: 1,
                y: -50,
            }
        )
    })

    return (
        <>
            <div className="mx-auto my-5 max-w-7xl" ref={ref}>
                <div className="drop-shadow-2xl">
                    <div className="flex justify-center items-center overflow-hidden cover">
                        <img src={`http://localhost:3001/api/product/img/${detailsUser?.imageMain}`} className="shrink-0 min-w-full" style={{ maxHeight: "350px", objectFit: "cover" }} />
                    </div>
                    <div className="p-6 flex leading-6 bg-neutral-200 fullInfo">
                        <div className="p-5 text-black" style={{ flex: '30%', maxWidth: '30%' }}>
                            <div className="mb-6">
                                <img src={`http://localhost:3001/api/product/img/${detailsUser?.image}`} className="rounded-full" alt="User-Profile-Image" />
                            </div>
                            <h3 className="text-xl font-bold">Username: </h3><h5>{detailsUser?.username}</h5>
                            <h3 className="text-xl font-bold">Fullname: </h3><h5>{detailsUser?.fullname}</h5>
                        </div>
                        <div className="p-5 text-black mt-12" style={{ flex: '70%', maxWidth: '70%' }}>
                            <h6 className="pb-1.5 mb-3 text-4xl font-extrabold border border-solid border-b-black">Information</h6>
                            <div className="flex">
                                <div className="mr-8">
                                    <p className="font-bold f-w-600">Email</p>
                                    <h6 className="f-w-400">{detailsUser?.email}</h6>
                                </div>
                                <div className="mr-8">
                                    <p className="font-bold f-w-600">Phone</p>
                                    <h6 className="f-w-400">{detailsUser?.phone}</h6>
                                </div>
                                <div className="mr-8">
                                    <p className="font-bold f-w-600">Created Date</p>
                                    <h6 className="f-w-400"><ConvertDate date={detailsUser?.createdAt} /></h6>
                                </div>
                            </div>
                            <div className="flex mt-5">
                                <div className="mr-5">
                                    <p className="font-bold f-w-600">Description</p>
                                    <h6 className="f-w-400">{detailsUser?.description}</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DetailUserPage