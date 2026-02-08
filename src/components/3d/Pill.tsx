'use client';

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';

interface PillProps {
    sliderValue: number; // 0 to 1
}

export default function Pill({ sliderValue }: PillProps) {
    const meshRef = useRef<THREE.Mesh>(null);

    // Create colors for interpolation
    const valueColor = new THREE.Color('#ffffff'); // Generic White
    const brandColor = new THREE.Color('#3b82f6'); // Brand Blue

    useFrame((state, delta) => {
        if (meshRef.current) {
            // Rotate based on scroll is handled by Scene presumably, or we add self-rotation
            meshRef.current.rotation.y += delta * 0.2;
            meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;

            // Color Interpolation
            const material = meshRef.current.material as THREE.MeshPhysicalMaterial;
            material.color.lerpColors(valueColor, brandColor, sliderValue);

            // Roughness/Metalness interpolation for texture feel
            material.roughness = THREE.MathUtils.lerp(0.8, 0.2, sliderValue);
            material.metalness = THREE.MathUtils.lerp(0.0, 0.1, sliderValue);
        }
    });

    return (
        <Float rotationIntensity={0.5} floatIntensity={0.5} floatingRange={[-0.1, 0.1]}>
            <mesh ref={meshRef} castShadow receiveShadow scale={1.2}>
                <capsuleGeometry args={[0.8, 2.2, 32, 64]} />
                <meshPhysicalMaterial
                    color="#ffffff"
                    roughness={0.1}
                    metalness={0.1}
                    clearcoat={0.5}
                    clearcoatRoughness={0.1}
                />
            </mesh>
        </Float>
    );
}
