import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

const COUNT = 400;
const BUBBLE_RADIUS = 1.7;

type BubbleProps = {
    onPop: () => void;
};

function Sphere({ onPop }: BubbleProps) {
    const mesh = useRef<THREE.Mesh>(null);
    const points = useRef<THREE.Points>(null);
    const [hovered, setHovered] = useState(false);
    const [popped, setPopped] = useState(false);
    const lightRef = useRef<THREE.DirectionalLight>(null);

    // Particle positions & velocities
    const { positions, velocities } = useMemo(() => {
        const pos = new Float32Array(COUNT * 3);
        const vel = new Float32Array(COUNT * 3);
        for (let i = 0; i < COUNT; i++) {
            pos.set([0, 0, 0], i * 3); // center
            const dir = new THREE.Vector3()
                .randomDirection()
                .multiplyScalar(0.12);
            vel.set([dir.x, dir.y, dir.z], i * 3);
        }
        return { positions: pos, velocities: vel };
    }, []);

    const scrollY = useRef(0);

    useEffect(() => {
        const onScroll = () => {
            scrollY.current = window.scrollY;
        };

        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useFrame(() => {
        if (!lightRef.current) return;

        const t = scrollY.current * 0.01;

        lightRef.current.position.x = Math.sin(t) * 4;
        lightRef.current.position.y = 2 + Math.cos(t) * 2;
        lightRef.current.position.z = 3;
    });
    const positionsRef = useRef(Float32Array.from(positions));
    const velocitiesRef = useRef(Float32Array.from(velocities));
    const bumpMap = useMemo(() => {
        const size = 128;
        const data = new Uint8Array(size * size);
        for (let i = 0; i < size * size; i++) {
            data[i] = (Math.sin(i * 12.9898) * 43758.5453) % 255; // deterministic noise
        }
        const texture = new THREE.DataTexture(
            data,
            size,
            size,
            THREE.RedFormat,
        );
        texture.needsUpdate = true;
        return texture;
    }, []);
    useFrame(() => {
        if (!points.current) return;

        const attr = points.current.geometry.attributes
            .position as THREE.BufferAttribute;

        for (let i = 0; i < COUNT; i++) {
            const idx = i * 3;

            if (hovered) {
                // explode
                positionsRef.current[idx] += velocitiesRef.current[idx];
                positionsRef.current[idx + 1] += velocitiesRef.current[idx + 1];
                positionsRef.current[idx + 2] += velocitiesRef.current[idx + 2];
                velocitiesRef.current[idx + 1] -= 0.001; // gravity
            } else {
                // merge back smoothly
                positionsRef.current[idx] +=
                    (positions[idx] - positionsRef.current[idx]) * 0.08;
                positionsRef.current[idx + 1] +=
                    (positions[idx + 1] - positionsRef.current[idx + 1]) * 0.08;
                positionsRef.current[idx + 2] +=
                    (positions[idx + 2] - positionsRef.current[idx + 2]) * 0.08;

                velocitiesRef.current[idx] +=
                    (velocities[idx] - velocitiesRef.current[idx]) * 0.08;
                velocitiesRef.current[idx + 1] +=
                    (velocities[idx + 1] - velocitiesRef.current[idx + 1]) *
                    0.08;
                velocitiesRef.current[idx + 2] +=
                    (velocities[idx + 2] - velocitiesRef.current[idx + 2]) *
                    0.08;
            }
        }

        attr.array.set(positionsRef.current);
        attr.needsUpdate = true;

        // Update points opacity
        const mat = points.current.material as THREE.PointsMaterial;
        mat.opacity = hovered ? 1 : Math.min(mat.opacity + 0.02, 1);
    });

    return (
        <>
            {/* Points always rendered, control visibility via opacity */}
            <points ref={points}>
                <bufferGeometry>
                    <bufferAttribute
                        attach="attributes-position"
                        args={[positions, 3]}
                    />
                </bufferGeometry>
                <pointsMaterial
                    size={0.04}
                    color="#8b5cf6"
                    transparent
                    opacity={popped ? 1 : 0}
                />
            </points>

            {/* Visible mesh bubble */}
            {!popped && (
                <mesh
                    ref={mesh}
                    onPointerOver={() => {
                        setHovered(true);
                        setPopped(true);
                        onPop?.();
                    }}
                    onPointerOut={() => setHovered(false)}
                >
                    <meshPhysicalMaterial
                        color="#8b5cf6"
                        metalness={0.85}
                        roughness={0.35}
                        bumpMap={bumpMap ?? undefined}
                        bumpScale={0.03}
                        clearcoat={0.7}
                        clearcoatRoughness={0.15}
                        envMapIntensity={1.5}
                        transparent
                        opacity={0.95}
                    />
                    <ambientLight intensity={0.4} />
                    <directionalLight position={[3, 3, 3]} intensity={1.5} />
                    <pointLight position={[-3, 2, 2]} intensity={1} />
                    <directionalLight ref={lightRef} intensity={1.5} />
                    <sphereGeometry args={[BUBBLE_RADIUS, 128, 128]} />
                </mesh>
            )}
        </>
    );
}

export default function Bubble({ onPop }: BubbleProps) {
    return (
        <Canvas
            camera={{ position: [0, 0, 5], fov: 50 }}
            className="absolute inset-0 w-full h-full"
        >
            <ambientLight intensity={0.7} />
            <directionalLight position={[3, 3, 3]} />
            <Sphere onPop={onPop} />
        </Canvas>
    );
}
