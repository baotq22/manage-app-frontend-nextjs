"use client"

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import moment from "moment";
import "./style.css"

gsap.registerPlugin(ScrollTrigger);

const data = [
    {
        name: "D1",
        className: "horizontalSection p-4",
        image: "http://localhost:3001/api/product/img/jiar51k13d7c1.webp",
        release: "Jan 2021",
        description: "Embark on a heartwarming journey through the enchanting world of feline companionship. 'Cat and Friendship' explores the unique bond between a curious cat and its human or animal friends. This tale is a celebration of the joy, loyalty, and warmth that cats bring to our lives, highlighting the profound connections forged through shared moments, playful antics, and the unspoken language of friendship.",
        title: "Cat and Friendship"
    },
    {
        name: "D2",
        className: "horizontalSection p-4",
        image: "http://localhost:3001/api/product/img/9vqmpf5esa8c1.webp",
        release: "June 2022",
        description: "Step into a vibrant and lush oasis where nature takes center stage in 'The Big Garden'. This narrative unfolds within a sprawling garden, teeming with life, colors, and a myriad of flora and fauna. Through the seasons, witness the growth, transformation, and interplay of various elements as the garden becomes a living canvas, offering a visual and emotional feast that captivates the senses and tells a story of nature's resilience and beauty.",
        title: "The Big Garden"
    },
    {
        name: "D3",
        className: "horizontalSection p-4",
        image: "http://localhost:3001/api/product/img/78qcorpu3a8c1.jpeg",
        release: "Mar 2022",
        description: "Venture into the heart of an ever-changing and lively woodland in 'Dynamic Forest'. This immersive experience delves into the intricacies of a thriving ecosystem, where flora and fauna coexist in a delicate dance of life. Explore the dynamic interactions, seasonal shifts, and the interconnected web of life that defines this enchanting forest, illustrating the resilience and adaptability of nature in the face of constant change.",
        title: "Dynamic Forest"
    },
    {
        name: "D4",
        className: "horizontalSection p-4 lastHorizontalSection",
        image: "http://localhost:3001/api/product/img/8n3b56vf3y7c1.webp",
        release: "Aug 2020",
        description: "Brace yourself for an intense and gripping narrative as 'Huge Wildfire' unfolds the dramatic tale of nature's destructive force. This story explores the untamed power of a massive wildfire, detailing its ferocity, impact on the environment, and the challenges faced by those caught in its path. Through vivid descriptions and compelling storytelling, the narrative sheds light on the urgency of understanding and managing these natural disasters, while highlighting the strength and resilience required to overcome their aftermath.",
        title: "Huge Wildfire"
    }
];

const AboutPage = () => {
    const mainRef = useRef(null);
    const verticalScrollRef = useRef(null);
    const containerRef = useRef(null);

    useEffect(() => {
        // gsap for A-D vertical scroll snap
        const firstVerticalContext = gsap.timeline({
            scrollTrigger: {
                trigger: ".first",
                start: "top top",
                endTrigger: ".divD",
                end: "bottom bottom",
                snap: {
                    snapTo: 1 / 3,
                    duration: { min: 0.25, max: 0.75 },
                    delay: 0.125,
                    ease: "power1.inOut"
                }
            }
        });

        // gsap for D1 - D4 horizontal scroll snap
        const horizontalContext = gsap.context(() => {
            const horizontalScrollData = gsap.utils.toArray(".horizontalSection");
            gsap.to(horizontalScrollData, {
                xPercent: -100 * (horizontalScrollData.length - 1),
                ease: "none",
                scrollTrigger: {
                    trigger: containerRef.current,
                    scrub: 1,
                    pin: true,
                    // snap: 1 / (horizontalScrollData.length - 1),
                    snap: {
                        snapTo: 1 / (horizontalScrollData.length - 1),
                        duration: { min: 0.25, max: 0.75 },
                        delay: 0.125,
                        ease: "power1.inOut"
                    },
                    end: () => `+=${containerRef?.current?.offsetWidth}`
                }
            });
        }, mainRef);

        // gsap for D4 to E snap vertical
        const lastVerticalContext = gsap.context(() => {
            gsap.timeline({
                scrollTrigger: {
                    trigger: ".divE",
                    start: "top bottom+=1",
                    // endTrigger: ".divE",
                    end: "bottom bottom",
                    snap: [0, 1]
                }
            });
        }, mainRef);

        return () => {
            firstVerticalContext.revert();
            horizontalContext.revert();
            lastVerticalContext.revert();
        };
    }, []);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        gsap.fromTo(
            ".title",
            {
                opacity: 0,
                ease: "sine.in",
                scrollTrigger: ".title",
            },
            {
                duration: 2,
                opacity: 1,
                y: 40,
            }
        );

        gsap.fromTo(
            ".author",
            {
                opacity: 0,
                ease: "sine.in",
                scrollTrigger: ".author",
            },
            {
                duration: 2,
                delay: 4,
                opacity: 1,
            }
        );

        gsap.fromTo(
            ".purpose",
            {
                opacity: 0,
                ease: "sine.in",
                scrollTrigger: ".purpose",
            },
            {
                duration: 2,
                delay: 10,
                opacity: 1,
            }
        );
    }, []);

    const currentTime = moment().format('LT');
    const currentDay = moment().format("dddd");
    const currentDMY = moment().format("LL");

    return (
        <main ref={mainRef}>
            <div className="vertical-scroll" ref={verticalScrollRef}>
                <section className="sectionA lightblue content-center first">
                    <div className="mx-auto max-w-7xl" >
                        <header style={{ height: "100vh" }}>
                            <div className="mt-auto mr-auto flex title" style={{ paddingLeft: ".3684210526vw", paddingRight: ".3684210526vw", marginTop: "-50px", marginBottom: "150px" }}>
                                <div className="max-w-full px-2">
                                    <div className="overflow-hidden">
                                        <h2 className="text-gray-700 w-full" style={{ fontSize: "calc(4.8rem + 5.22105vw)" }}>
                                            <span>Michael</span>
                                        </h2>
                                    </div>
                                </div>
                            </div>
                            <section className="flex title mb-8">
                                <div className="flex-1 w-1/4">
                                    <div>Hanoi, Vietnam</div>
                                    <div>Local Time → {currentTime}</div>
                                </div>
                                <div className="flex-1 w-1/4">
                                    <div>{currentDay}</div>
                                    <div>{currentDMY}</div>
                                </div>
                                <div className="flex-none w-2/4 text-4xl titleDesc text-justify">
                                    <div>We design disruptive brands for organizations that aspire to have a positive social and environmental impact.</div>
                                </div>
                            </section>
                        </header>
                    </div>
                </section>
                <section className="sectionB lightgreen content-center">
                    <div className="mx-auto max-w-5xl">
                        <div className="flex author">
                            <div className="flex-1 w-1/4">
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
                            <div className="text-xl font-light flex-1 w-3/4">
                                <h2 className="text-black">About</h2>
                                <div className="text-black space-y-3 mt-3 text-justify">
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
                                    <p>
                                        Certainly! Templates are pre-designed formats or layouts that can be used as a starting point for creating documents, presentations, websites, or other types of content. They provide a structure or framework that you can customize according to your specific needs. Templates are widely used in various fields and applications to save time and ensure consistency in design and formatting.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="sectionC lightpurple content-center">
                    <div className="text-xl font-light author">
                        <div className="mx-auto max-w-5xl">
                            <h2 className="text-black">Vision</h2>
                            <div className="text-black space-y-3 mr-3 text-justify">
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
                                <p>
                                    Certainly! Templates are pre-designed formats or layouts that can be used as a starting point for creating documents, presentations, websites, or other types of content. They provide a structure or framework that you can customize according to your specific needs. Templates are widely used in various fields and applications to save time and ensure consistency in design and formatting.
                                </p>
                                <p>
                                    We’ve worked extensively in terms of geography and sector, developing a variety of work — products, services, and experiences — that has taught us that a well-defined visual strategy is key to bring visibility, credibility, and funds to any organization. Starting in 2021, we decided to plant a tree for each client that we work with.
                                </p>
                            </div>
                            <div className="row expanded mt-6" data-v-8e1ea8dc="">
                                <div className="xxlarge-3 medium-6 column statistic flex-1 w-3/4" data-v-8e1ea8dc="">
                                    <h3>5<span> Years</span></h3>
                                    <p>Doing our Best</p>
                                </div>
                                <div className="xxlarge-3 medium-6 column statistic flex-1 w-3/4" data-v-8e1ea8dc="">
                                    <h3>161</h3>
                                    <p>Completed Projects</p>
                                </div>
                                <div className="xxlarge-3 medium-6 column statistic flex-1 w-3/4" data-v-8e1ea8dc="">
                                    <h3>23</h3>
                                    <p>Countries Worldwide</p>
                                </div>
                                <div className="xxlarge-3 medium-6 column statistic flex-1 w-3/4" data-v-8e1ea8dc="">
                                    <h3>28</h3>
                                    <p>Trees Planted</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <div className="divD" ref={containerRef}>
                {data.map((d) => {
                    return (
                        <section key={d.name} className={d.className}>
                            <div className="mx-5 my-5 detailsProduct">
                                <div className="drop-shadow-2xl">
                                    <div className="p-12 mt-12 leading-6 bg-neutral-200">
                                        <div className="container-fliud">
                                            <div className="flex row">
                                                <div className="preview col-md-6">
                                                    <div className="mr-5">
                                                        <div className="w-full active drop-shadow-2xl" id="pic-1"><img src={`${d.image}`} /></div>
                                                    </div>
                                                </div>
                                                <div className="details col-md-6 text-white">
                                                    <h3 className="mt-0 text-2xl text-black">{d?.title}</h3>
                                                    <div className="mb-4">
                                                        <span className="text-black">Release: </span><span className="text-teal-600">{d?.release}</span>
                                                    </div>
                                                    <p className="mb-4 text-black text-justify">Description: {d?.description}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    );
                })}
            </div>
            <div className="divE pink content-center h-100vh">
                <div className="mx-auto max-w-5xl">
                    <div className="flex">
                        <div className="text-xl font-light flex-1 w-1/4 author ml-4 p-3">
                            <h2 className="text-black">Summary</h2>
                            <div className="text-black space-y-3 mt-3 text-justify">
                                <p>
                                    We’ve worked extensively in terms of geography and sector, developing a variety of work — products, services, and experiences — that has taught us that a well-defined visual strategy is key to bring visibility, credibility, and funds to any organization. Starting in 2021, we decided to plant a tree for each client that we work with.
                                </p>
                            </div>
                        </div>
                        <div className="text-xl font-light flex-1 w-3/4 author mr-4 p-3">
                            <h2 className="text-black">Purpose</h2>
                            <div className="text-black space-y-3 mt-3 text-justify">
                                <p>
                                    We’ve worked extensively in terms of geography and sector, developing a variety of work — products, services, and experiences — that has taught us that a well-defined visual strategy is key to bring visibility, credibility, and funds to any organization. Starting in 2021, we decided to plant a tree for each client that we work with.
                                </p>
                                <p>150% growth in applications for Bora Mulheres by Coca Cola - "A disruptive digital presence is key to make your story remarkable, Humana is the key partner to make this happen."</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default AboutPage