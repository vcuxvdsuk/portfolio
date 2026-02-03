import About from "./components/About";
import Contact from "./components/Contact";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Projects from "./components/Projects";
import Skills from "./components/Skills";

export default function App() {
    return (
        <div className="w-screen-full h-screen-full bg-gray-50 text-gray-800 scroll-smooth">
            <Navbar />
            <Hero />
            <About />
            <Projects />
            <Skills />
            <Contact />
        </div>
    );
}
