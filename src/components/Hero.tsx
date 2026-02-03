import { useState } from "react";
import Bubble from "./Bubble";

export default function Hero() {
    const [popped, setPopped] = useState(false);

    return (
        <section
            id="Hero"
            className="relative h-screen overflow-hidden bg-gradient-to-b from-black via-purple-400 to-white"
            data-color="bg-black"
            data-text-color="text-white"
        >
            {/* Bubble */}
            <Bubble onPop={() => setPopped(true)} />

            {/* Text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center z-10 text-white text-center pointer-events-none">
                <h1 className="text-6xl font-bold mb-4">Ori Baruch</h1>
                <p className="text-xl">
                    Software Engineer | ML & AI | Full-Stack Developer
                </p>
            </div>

            {/* Button */}
            <button
                className={`
                    absolute
                    left-1/2
                    top-[65%]
                    -translate-x-1/2
                    z-20
                    px-8 py-3
                    rounded-full
                    bg-gradient-to-br from-white via-gray-200 to-gray-400
                    transition-all duration-500

                    ${
                        popped
                            ? "opacity-100 scale-100 pointer-events-auto"
                            : "opacity-0 scale-75 pointer-events-none"
                    }
                `}
            >
                <a className="w-full h-full" href="#contact">
                    Contact
                </a>
            </button>
        </section>
    );
}
