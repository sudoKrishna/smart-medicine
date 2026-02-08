'use client';

import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, PresentationControls } from '@react-three/drei';
import Pill from './Pill';

interface SceneProps {
    sliderValue: number;
}

export default function Scene({ sliderValue }: SceneProps) {
    return (
        <div className="w-full h-full absolute inset-0 z-0">
            <Canvas shadows camera={{ position: [0, 0, 8], fov: 35 }} gl={{ antialias: true, alpha: true }}>
                <ambientLight intensity={0.5} />
                <spotLight
                    position={[10, 10, 10]}
                    angle={0.15}
                    penumbra={1}
                    intensity={1}
                    castShadow
                />
                <pointLight position={[-10, -10, -10]} intensity={0.5} color="blue" />

                <Environment preset="city" />

                <PresentationControls
                    global

                    snap={true}
                    rotation={[0, 0.3, 0]}
                    polar={[-Math.PI / 3, Math.PI / 3]}
                    azimuth={[-Math.PI / 1.4, Math.PI / 2]}
                >
                    <Pill sliderValue={sliderValue} />
                </PresentationControls>
            </Canvas>
        </div>
    );
}
