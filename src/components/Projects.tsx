import { Canvas } from "@react-three/fiber";
import { projects } from "../data/projects";
import type { ShapeType } from "./ProjectScene";
import ProjectScene from "./ProjectScene";

export default function Projects() {
    return (
        <section
            id="projects"
            className="snap-y snap-mandatory scroll-smooth"
            data-color="bg-black"
            data-text-color="text-white"
        >
            {projects.map((p, i) => (
                <div
                    key={p.title}
                    className={`h-screen snap-start relative overflow-hidden ${p.bgColor}`}
                    data-color={p.bgColor}
                >
                    {/* Canvas behind */}
                    <div className="absolute inset-0 pointer-events-none">
                        <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
                            <ambientLight intensity={0.7} />
                            <directionalLight
                                position={[5, 5, 5]}
                                intensity={1.2}
                            />
                            <ProjectScene
                                shapes={p.shapes as ShapeType[]}
                                seed={i + 1}
                            />
                        </Canvas>
                    </div>

                    {/* Centered text + button */}
                    <div className="absolute inset-0 z-10 flex flex-col justify-center items-center text-center px-6">
                        <h3 className="text-4xl font-bold mb-4 text-white">
                            {p.title}
                        </h3>
                        <p className="text-lg mb-2 text-white">
                            {p.description}
                        </p>
                        <p className="text-sm text-gray-200 mb-6">{p.tech}</p>

                        {/* Button inside text block */}
                        <a
                            href={p.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-6 py-3 bg-white bg-opacity-80 hover:bg-opacity-100 text-black rounded-lg shadow-md transition"
                        >
                            View Project
                        </a>
                    </div>
                </div>
            ))}
        </section>
    );
}
