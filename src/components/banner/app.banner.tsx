import Image from "next/image"

const AppBanner = () => {
    return (
        <>
            <div className="max-w-7xl my-0 mx-auto">
                <Image
                    className="w-full"
                    src="/images/2.jpg"
                    alt="banner"
                    width="1166"
                    height="572"
                />
            </div>
            <div className="max-w-7xl my-3 mx-auto">
                <div className="w-full">
                    <h3 className="text-3xl mt-5">BIG SALE TODAY</h3>
                        <Image
                            className="mt-2 w-full"
                            src="/images/promote.png"
                            alt="banner"
                            width="1200"
                            height="150"
                        />
                </div>
            </div>
        </>
    )
}

export default AppBanner