import gsap from "gsap"
import { useEffect } from "react";
import { useRef } from "react"

const Snowflake = () => {
    const ref = useRef(null);

    useEffect(() => {
        const snowflake = ref.current;
        gsap.set(snowflake, {
            x: Math.random() * window.innerWidth,
            y: -50,
        })

        const fall = gsap.to(snowflake, {
            y: window.innerHeight + 50,
            duration: 5,
            repeat: -1,
            ease: 'power1.inOut',
            onComplete: () => {
                gsap.set(snowflake, { x: Math.random() * window.innerWidth, y: -50 });
            },
        });

        return () => {
            fall.kill(); // Kill the animation to avoid memory leaks
        };
    }, []);

    return (
        <>
            <div className="w-2.5 h-2.5 absolute bg-slate-400 rounded-full pointer-events-none" ref={ref}></div>
        </>
    )
}

export default Snowflake