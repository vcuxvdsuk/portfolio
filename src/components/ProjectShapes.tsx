import { useMemo } from "react";

/* deterministic random generator */
function seededRandom(seed: number) {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
}

export default function ProjectShapes() {
    const shapes = useMemo(() => {
        return Array.from({ length: 6 }).map((_, i) => {
            const r1 = seededRandom(i * 3);
            const r2 = seededRandom(i * 7);
            const r3 = seededRandom(i * 11);

            return {
                id: i,
                size: 120 + r1 * 200,
                top: r2 * 80,
                left: r3 * 80,
                delay: r1 * 6,
            };
        });
    }, []);

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {shapes.map((s) => (
                <div
                    key={s.id}
                    className="absolute rounded-full bg-white/10 blur-3xl animate-float"
                    style={{
                        width: s.size,
                        height: s.size,
                        top: `${s.top}%`,
                        left: `${s.left}%`,
                        animationDelay: `${s.delay}s`,
                    }}
                />
            ))}
        </div>
    );
}
