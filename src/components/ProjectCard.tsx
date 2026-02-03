type Props = {
    title: string;
    description: string;
    tech: string;
    link: string;
};
export default function ProjectCard({ title, description, tech, link }: Props) {
    return (
        <a
            href={link}
            target="_blank"
            className="backdrop-blur-xl bg-white/10 border border-white/20 
                       text-white p-10 rounded-3xl shadow-2xl 
                       hover:scale-105 transition max-w-xl"
        >
            <h3 className="text-3xl font-bold">{title}</h3>
            <p className="my-4 opacity-80">{description}</p>
            <p className="text-sm opacity-60">{tech}</p>
        </a>
    );
}
