import type React from "react";
import type { ShapeType } from "../components/ProjectScene"; // export type from ProjectScene

export const projects: {
    title: string;
    description: string;
    tech: string;
    link: string;
    bgColor: React.CSSProperties["backgroundColor"];
    textColor?: React.CSSProperties["color"];
    filterEffect?: React.CSSProperties["filter"];
    shapes: ShapeType[];
}[] = [
    {
        title: "Speaker Verification Research Project",
        description:
            "Built a speaker verification system using ECAPA-TDNN with PyTorch and SpeechBrain. Implemented unsupervised clustering, few-shot adaptation, and evaluation with EER and silhouette scores. Designed scalable data pipelines and tracked experiments with Weights & Biases.",
        tech: "Python, PyTorch, SpeechBrain, NumPy, Scikit-learn, Weights & Biases",
        link: "https://github.com/vcuxvdsuk/graduation-project",
        bgColor: "bg-gradient-to-b from-white via-red-500 to-black",
        textColor: "text-white",
        filterEffect: "drop-shadow(0 4px 6px rgba(0,0,0,0.1))",
        shapes: ["sphere", "box", "cylinder"],
    },
    {
        title: "web tic tac toe",
        description:
            "Developed a full-stack web application with real-time multiplayer support. Implemented server-authoritative game logic, RESTful APIs, and state synchronization for multiple concurrent sessions.",
        tech: "React (TypeScript), Node.js, Express, Prisma, Swagger",
        link: "https://github.com/vcuxvdsuk/web_tic_tac_toe",
        bgColor: "bg-gradient-to-b from-black via-green-300 to-[#eee]",
        textColor: "text-black",
        filterEffect: "drop-shadow(0 4px 6px rgba(0,0,0,0.1))",
        shapes: ["cone", "cylinder"],
    },
    {
        title: "Redis Microservice",
        description:
            "Built a reactive Spring Boot microservice to manage teams and HR workflows using mongoDB. Features include employee creation, login, hierarchical queries, filtering, and real-time data updates, ensuring scalable and responsive operations.",
        tech: "Java, Spring Boot, mongoDB, REST APIs, Docker",
        link: "https://github.com/vcuxvdsuk/Reactive_Micro_service_to_manage_teams_HR",
        bgColor: "bg-gradient-to-b from-[#eee] via-blue-300 to-black",
        textColor: "text-black",
        filterEffect: "drop-shadow(0 4px 6px rgba(0,0,0,0.1))",
        shapes: ["sphere", "torus", "box"],
    },
    {
        title: "Embedded Real-Time Fighting Game on Basys MX3",
        description:
            "Developed a real-time fighting game on the Basys MX3 FPGA board using embedded C/C++, implementing responsive input handling via ADC, timer-driven game loop, collision detection, and custom character rendering on an LCD.",
        tech: "Basys MX3 FPGA, Embedded C, Timer Interrupts, LCD Graphics",
        link: "https://github.com/vcuxvdsuk/Embedded_Real-Time_Fighting_Game_on_Basys_MX3",
        bgColor: "bg-gradient-to-b from-black via-orange-300 to-white",
        textColor: "text-black",
        filterEffect: "drop-shadow(0 4px 6px rgb(252, 154, 26))",
        shapes: ["sphere", "torus"],
    },
];
