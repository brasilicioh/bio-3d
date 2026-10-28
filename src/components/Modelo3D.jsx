import { OrbitControls, useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import modelUrl from "@models/red_blood_cells_erythrocytes.glb?url";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

function Modelo({ modelUrl }) {
  const grupo = useRef();
  const { scene } = useGLTF(modelUrl);

  useFrame((state, delta) => {
    if (!grupo.current) return;

    grupo.current.rotation.y += delta * 0.12;
    grupo.current.position.y = Math.sin(state.clock.elapsedTime * 0.6) * 0.04;
  });

  return (
    <group ref={grupo}>
      <primitive object={scene} />
    </group>
  );
}

export default function Modelo3D() {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
      <ambientLight intensity={1.5} />
      <directionalLight position={[3, 5, 5]} intensity={2} />

      <Suspense fallback={null}>
        {/* TODO: change 3d */}
        <Modelo modelUrl={modelUrl} />
      </Suspense>

      <OrbitControls enableDamping />
    </Canvas>
  );
}
