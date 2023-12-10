const AboutPage = () => {
    return (
        <>
            <section>
                <div className="mx-auto max-w-7xl px-8 py-12 lg:pt-24">
                    <div className="mx-auto max-w-xl">
                        <div>
                            <div className="md:flex md:items-center md:justify-between md:space-x-5">
                                <div className="flex items-center space-x-5">
                                    <div className="flex-shrink-0">
                                        <div className="relative">
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

                                    <div className="pt-1.5">
                                        <h1 className="lg:text-xl text-black">
                                            ✺ Michael Alexander Andreuzza
                                        </h1>
                                        <p className="text-sm font-light text-neutral-500">
                                            Software Engineer in Seattle
                                        </p>
                                        <p>
                                            <a
                                                className="text-xs underline no-underline duration-200"
                                                href="#">michaelandreuzza.com</a
                                            >
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-6 text-xl font-light">
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
            </section>

        </>
    )
}

export default AboutPage