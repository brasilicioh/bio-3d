import { OrbitControls, useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
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

export default function Modelo3D({ modelObject }) {
  return (
    <Canvas camera={modelObject.props3d[0]} shadows>
      <ambientLight intensity={modelObject.props3d[1]} />
      <directionalLight
        position={modelObject.props3d[2]}
        intensity={modelObject.props3d[3]}
      />

      <Suspense fallback={null}>
        <Modelo modelUrl={modelObject.modelUrl} />
      </Suspense>

      <OrbitControls enableDamping />
    </Canvas>
  );
}
