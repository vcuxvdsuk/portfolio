import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

export type ShapeType = "sphere" | "box" | "cone" | "cylinder" | "torus";

type Props = {
    shapes: ShapeType[];
    seed: number; // deterministic seed
};

// Deterministic pseudo-random generator
function deterministicRandom(seed: number) {
    const x = Math.sin(seed * 12.9898) * 43758.5453;
    return x - Math.floor(x);
}

// Create a deterministic bump map
function createBumpMap(seed: number, size = 32) {
    const data = new Uint8Array(size * size);
    for (let i = 0; i < size * size; i++) {
        data[i] = Math.floor(deterministicRandom(seed + i) * 255);
    }
    const texture = new THREE.DataTexture(data, size, size, THREE.RedFormat);
    texture.needsUpdate = true;
    return texture;
}

export default function ProjectScene({ shapes, seed }: Props) {
    const groupRef = useRef<THREE.Group>(null);

    const shapeData = useMemo(() => {
        return shapes.map((shape, i) => {
            const s = seed + i * 13;

            const scaleX = deterministicRandom(s + 6) * 1.7 + 0.1;
            const scaleY = deterministicRandom(s + 7) * 1.7 + 0.1;
            const scaleZ = deterministicRandom(s + 8) * 1.7 + 0.1;

            return {
                type: shape,
                position: [
                    deterministicRandom(s) * 4 - 2,
                    deterministicRandom(s + 1) * 4 - 2,
                    deterministicRandom(s + 2) * 4 - 2,
                ] as [number, number, number],
                rotation: [
                    deterministicRandom(s + 3) * Math.PI,
                    deterministicRandom(s + 4) * Math.PI,
                    deterministicRandom(s + 5) * Math.PI,
                ] as [number, number, number],
                scale: [scaleX, scaleY, scaleZ] as [number, number, number],
                color: new THREE.Color(
                    deterministicRandom(s + 9),
                    deterministicRandom(s + 10),
                    deterministicRandom(s + 11),
                ),
                metalness: 0.5 + deterministicRandom(s + 12) * 0.5,
                roughness: 0.2 + deterministicRandom(s + 13) * 0.4,
                bumpMap: createBumpMap(s + 20),
            };
        });
    }, [shapes, seed]);

    useFrame(() => {
        if (!groupRef.current) return;
        groupRef.current.rotation.y += 0.002;
        groupRef.current.rotation.x += 0.001;
    });

    return (
        <group ref={groupRef}>
            {shapeData.map((s, i) => {
                let geometry: THREE.BufferGeometry;
                switch (s.type) {
                    case "sphere":
                        geometry = new THREE.SphereGeometry(
                            0.5 * s.scale[0],
                            32,
                            32,
                        );
                        break;
                    case "box":
                        geometry = new THREE.BoxGeometry(
                            0.5 * s.scale[0],
                            0.5 * s.scale[1],
                            0.5 * s.scale[2],
                        );
                        break;
                    case "cone":
                        geometry = new THREE.ConeGeometry(
                            0.4 * s.scale[0],
                            0.8 * s.scale[1],
                            32,
                        );
                        break;
                    case "cylinder":
                        geometry = new THREE.CylinderGeometry(
                            0.3 * s.scale[0],
                            0.3 * s.scale[1],
                            0.8 * s.scale[2],
                            32,
                        );
                        break;
                    case "torus":
                        geometry = new THREE.TorusGeometry(
                            0.3 * s.scale[0],
                            0.1 * s.scale[1],
                            16,
                            32,
                        );
                        break;
                    default:
                        geometry = new THREE.SphereGeometry(
                            0.5 * s.scale[0],
                            32,
                            32,
                        );
                }

                return (
                    <mesh
                        key={i}
                        position={s.position}
                        rotation={s.rotation}
                        scale={[1, 1, 1]} // scale baked into geometry
                    >
                        <meshStandardMaterial
                            color={s.color}
                            metalness={s.metalness}
                            roughness={s.roughness}
                            bumpMap={s.bumpMap}
                        />
                        <primitive object={geometry} />
                    </mesh>
                );
            })}
        </group>
    );
}
