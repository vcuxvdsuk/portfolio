import { useEffect, useState } from "react";

export default function Navbar() {
    const [bg, setBg] = useState("bg-transparent");
    const [textColor, setTextColor] = useState("text-black"); // default text color

    useEffect(() => {
        const sections = Array.from(
            document.querySelectorAll("section"),
        ) as HTMLElement[];

        const handleScroll = () => {
            const scrollY = window.scrollY;

            let current = sections[0];

            for (const sec of sections) {
                if (sec.offsetTop - 80 <= scrollY) {
                    current = sec;
                }
            }

            setBg(current.dataset.color ?? "bg-transparent");
            setTextColor(current.dataset.textColor ?? "text-black");
        };

        handleScroll();
        window.addEventListener("scroll", handleScroll, { passive: true });

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav
            className={`fixed top-0 left-0 w-full h-12 z-50 backdrop-blur-md ${bg}/30 transition-colors duration-300`}
        >
            <div className="flex h-full w-full justify-between items-center px-6">
                <span
                    className={`font-bold text-xl ${textColor} transition-colors duration-300`}
                >
                    Ori Baruch
                </span>

                <div className="w-1/3 flex justify-around">
                    <a
                        href="#projects"
                        className={`hover:opacity-70 transition ${textColor}`}
                    >
                        Projects
                    </a>
                    <a
                        href="#skills"
                        className={`hover:opacity-70 transition ${textColor}`}
                    >
                        Skills
                    </a>
                    <a
                        href="#contact"
                        className={`hover:opacity-70 transition ${textColor}`}
                    >
                        Contact
                    </a>
                </div>
            </div>
        </nav>
    );
}
