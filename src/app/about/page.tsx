"use client"

import gsap from "gsap";
import { Flip } from "gsap/all";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import moment from "moment";
import Snowfall from "@/components/snowfall/snowfall";

const AboutPage = () => {
    const ref = useRef(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        gsap.fromTo(
            ".title",
            {
                opacity: 0,
                ease: "sine.in",
                scrollTrigger: {
                    trigger: ".title",
                },
            },
            {
                duration: 2,
                opacity: 1,
                y: 40,
            }
        );

        gsap.fromTo(
            ".note",
            {
                opacity: 0,
                ease: "sine.in",
                scrollTrigger: {
                    trigger: ".title",
                },
            },
            {
                duration: 2,
                delay: 2,
                opacity: 1,
                y: -20,
            }
        );

        gsap.fromTo(
            ".author",
            {
                opacity: 0,
                ease: "sine.in",
                scrollTrigger: ".about",
            },
            {
                duration: 2,
                delay: 4,
                opacity: 1,
                x: -30,
            }
        );

        gsap.fromTo(
            ".bio",
            {
                opacity: 0,
                ease: "sine.in",
                scrollTrigger: ".about",
            },
            {
                duration: 2,
                delay: 4,
                opacity: 1,
                x: 30,
            }
        );

        gsap.fromTo(
            ".gallery",
            {
                opacity: 0,
                ease: "sine.in",
                scrollTrigger: ".gallery",
            },
            {
                duration: 2,
                delay: 8,
                opacity: 1,
                y: 50,
            }
        );

        
    }, []);

    const currentTime = moment().format('LT');
    const currentDay = moment().format("dddd");
    const currentDMY = moment().format("LL");

    return (
        <>
            <div className="mx-auto max-w-7xl px-8 py-12 lg:pt-24" ref={ref}>
                <header>
                    <div className="mt-auto mr-auto flex title" style={{ paddingLeft: ".3684210526vw", paddingRight: ".3684210526vw", marginTop: "-50px", marginBottom: "150px" }}>
                        <div className="max-w-full px-2">
                            <div className="overflow-hidden">
                                <h2 className="text-gray-700 w-full" style={{ fontSize: "calc(4.8rem + 5.22105vw)" }}>
                                    <span>Michael</span>
                                </h2>
                            </div>
                        </div>
                    </div>
                </header>
                <Snowfall numberOfSnowflakes={100} />
                <section className="flex note mb-8">
                    <div className="flex-1 w-1/4">
                        <div>Hanoi, Vietnam</div>
                        <div>Local Time → {currentTime}</div>
                    </div>
                    <div className="flex-1 w-1/4">
                        <div>{currentDay}</div>
                        <div>{currentDMY}</div>
                    </div>
                    <div className="flex-none w-2/4 text-6xl">
                        <div>We design disruptive brands for organizations that aspire to have a positive social and environmental impact.</div>
                    </div>
                </section>
                <div className="mt-7 about">
                    <h1 className="mb-8 about">About</h1>
                    <div className="mx-auto max-w-5xl">
                        <div className="flex">
                            <div className="flex-1 w-1/4 author">
                                <div className="flex items-center space-x-5">
                                    <div className="flex-shrink-0">
                                        <div className="relative avatar">
                                            <img
                                                className="h-16 w-16 lg:h-24 lg:w-24 rounded-full border border-white/10"
                                                src="/images/309431756_799936498003792_6138006382387941828_n.jpg"
                                                alt="image"
                                            />
                                            <span
                                                className="absolute inset-0 rounded-full shadow-inner"
                                                aria-hidden="true"></span>
                                        </div>
                                    </div>
                                    <div className="pt-1.5 info">
                                        <h1 className="lg:text-xl text-black">
                                            ✺ Michael Alexander Andreuzza
                                        </h1>
                                        <p className="text-sm font-light text-neutral-500">
                                            Software Engineer in Seattle
                                        </p>
                                        <p>
                                            <a
                                                className="text-xs underline no-underline duration-200"
                                                href="#">michaelandreuzza.com
                                            </a>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="text-xl font-light bio flex-1 w-3/4">
                                <p className="text-black">About</p>
                                <div className="text-black space-y-3 mt-3">
                                    <p>
                                        For the past 15 years, I have been a hands-on and adaptable
                                        problem solver, collaborating with start-ups, e-commerce
                                        businesses, agencies, and consulting firms.
                                    </p>
                                    <p>
                                        specialize in front-end development, but also have experience with
                                        back-end development and cloud infrastructure.
                                    </p>
                                    <p>
                                        I am skilled in leading software projects and have the ability to
                                        manage, mentor, and hire software engineers.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <section style={{ marginBottom: '2vw', overflow: 'hidden', marginTop: '80px' }} className="gallery">
                <h1 className="mb-8">My Gallery</h1>
                    <div className="z-auto float-none block relative" style={{ order: '0', placeSelf: 'auto', gridArea: 'auto', flexShrink: '1', margin: '0px', inset: 'auto', flexBasis: 'auto', overflow: 'visible', boxSizing: 'border-box', width: '1695px' }}>
                        <div style={{ transform: 'translate(0px, 0px)', inset: '0px auto auto 0px', margin: '0px', maxWidth: '1695.45px', width: '1695.45px', maxHeight: '533.679px', height: '533.679px', padding: '0px' }}>
                            <div className="flex" style={{ flexFlow: 'row' }}>
                                <div style={{ transform: 'translate(0px, 0px)', opacity: '1', flex: '0 0 25%', maxWidth: '25%' }} className="px-2">
                                    <div className="cursor-pointer" style={{ pointerEvents: 'all' }}>
                                        <p className="relative overflow-hidden will-change-transform pointer-events-none" style={{ marginBottom: '1.3157894737vw' }}>
                                            Cat and Friendship
                                        </p>
                                        <div className="relative pointer-events-none rounded-s-2xl" style={{ height: '50vh', minHeight: '400px' }}>
                                            <div className="absolute z-0 w-full h-full" style={{ left: '0', top: '0' }}>
                                                <img src="http://localhost:3001/api/product/img/jiar51k13d7c1.webp" className="relative block w-full h-full" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div style={{ transform: 'translate(0px, 0px)', opacity: '1', flex: '0 0 25%', maxWidth: '25%' }} className="px-2">
                                    <div className="cursor-pointer" style={{ pointerEvents: 'all' }}>
                                        <p className="relative overflow-hidden will-change-transform pointer-events-none" style={{ marginBottom: '1.3157894737vw' }}>
                                            The Big Garden
                                        </p>
                                        <div className="relative pointer-events-none rounded-s-2xl" style={{ height: '50vh', minHeight: '400px' }}>
                                            <div className="absolute z-0 w-full h-full" style={{ left: '0', top: '0' }}>
                                                <img src="http://localhost:3001/api/product/img/9vqmpf5esa8c1.webp" className="relative block w-full h-full" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div style={{ transform: 'translate(0px, 0px)', opacity: '1', flex: '0 0 25%', maxWidth: '25%' }} className="px-2">
                                    <div className="cursor-pointer" style={{ pointerEvents: 'all' }}>
                                        <p className="relative overflow-hidden will-change-transform pointer-events-none" style={{ marginBottom: '1.3157894737vw' }}>
                                            Dynamic Forest
                                        </p>
                                        <div className="relative pointer-events-none rounded-s-2xl" style={{ height: '50vh', minHeight: '400px' }}>
                                            <div className="absolute z-0 w-full h-full" style={{ left: '0', top: '0' }}>
                                                <img src="http://localhost:3001/api/product/img/78qcorpu3a8c1.jpeg" className="relative block w-full h-full" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section >
            </div >
        </>
    )
}

export default AboutPage