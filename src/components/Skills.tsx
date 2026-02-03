import { motion } from "framer-motion";
import { Brain, Monitor, Server, Wrench } from "lucide-react";

const groups = [
    {
        title: "Backend Systems",
        icon: Server,
        skills: [
            "Node.js",
            "Express",
            "TypeScript",
            "PostgreSQL",
            "Redis",
            "MongoDB",
            "GraphQL",
            "Prisma",
        ],
    },
    {
        title: "Machine Learning & AI",
        icon: Brain,
        skills: [
            "Python",
            "PyTorch",
            "TensorFlow",
            "SpeechBrain",
            "Clustering",
            "EER Evaluation",
            "Data Processing",
            "Model Deployment",
        ],
    },
    {
        title: "Frontend",
        icon: Monitor,
        skills: [
            "React",
            "Next.js",
            "TailwindCSS",
            "Framer Motion",
            "Vite",
            "TypeScript",
            "Responsive Design",
        ],
    },
    {
        title: "DevOps & Tools",
        icon: Wrench,
        skills: [
            "Docker",
            "Git",
            "Linux",
            "CI/CD",
            "Vercel",
            "AWS",
            "Redis",
            "PostgreSQL",
        ],
    },
];
export default function Skills() {
    return (
        <section
            className="min-h-screen flex flex-col justify-center items-center px-6 py-4 bg-white"
            id="skills"
            data-color="bg-white"
            data-text-color="text-black"
        >
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center mb-20"
            >
                <h1 className="text-5xl font-bold mb-4 text-black">
                    Technical Stack
                </h1>
                <p className="text-gray-600 text-lg max-w-xl mx-auto">
                    I design scalable backend systems, build ML pipelines, and
                    craft clean frontend experiences. Here’s the tech I use to
                    ship production-ready software.
                </p>
            </motion.div>

            {/* Grid */}
            <div className="grid md:grid-cols-2 gap-10 w-full max-w-5xl">
                {groups.map((group, i) => {
                    const Icon = group.icon;

                    return (
                        <motion.div
                            key={group.title}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.15 }}
                            whileHover={{ scale: 1.05 }}
                            className="relative bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-lg overflow-hidden"
                        >
                            {/* Title + Icon */}
                            <div className="flex items-center gap-3 mb-4 justify-center">
                                <Icon className="w-6 h-6 text-gray-500" />
                                <h3 className="text-xl font-semibold text-black">
                                    {group.title}
                                </h3>
                            </div>

                            {/* Skills */}
                            <div className="flex flex-wrap gap-2 justify-center">
                                {group.skills.map((skill) => (
                                    <span
                                        key={skill}
                                        className="px-3 py-1 text-sm rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 transition"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </section>
    );
}
