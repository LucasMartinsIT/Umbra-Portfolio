import { Suspense, useEffect, useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { ContactShadows, Environment, Lightformer, useAnimations, useGLTF } from '@react-three/drei';
import { Box3, Vector3 } from 'three';
import { getStageLighting } from './stageLighting';

const MODEL_SIZE = 3;
const FLOOR_Y = -MODEL_SIZE / 2 - 0.1;
const SPIN_SPEED = 0.6;
const CLIP_FADE_SECONDS = 0.25;

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function useSpin() {
  const ref = useRef(null);

  useFrame((_, delta) => {
    if (!prefersReducedMotion) ref.current.rotation.y += delta * SPIN_SPEED;
  });

  return ref;
}

function SpinningModel({ file, clip }) {
  const { scene, animations } = useGLTF(file);
  const spinner = useSpin();
  const { actions } = useAnimations(animations, spinner);

  useEffect(() => {
    const action = actions[clip];
    action?.reset().fadeIn(CLIP_FADE_SECONDS).play();
    return () => action?.fadeOut(CLIP_FADE_SECONDS);
  }, [actions, clip]);

  // Models come in at arbitrary sizes and origins: fit and center each one on the stage.
  const { scale, position } = useMemo(() => {
    const box = new Box3().setFromObject(scene);
    const size = box.getSize(new Vector3());
    const center = box.getCenter(new Vector3());
    const fit = MODEL_SIZE / Math.max(size.x, size.y, size.z);
    return { scale: fit, position: center.multiplyScalar(-fit).toArray() };
  }, [scene]);

  return (
    <group ref={spinner}>
      <group position={position} scale={scale}>
        <primitive object={scene} />
      </group>
    </group>
  );
}

function LoadingMesh() {
  const spinner = useSpin();

  return (
    <mesh ref={spinner}>
      <icosahedronGeometry args={[0.8, 1]} />
      <meshBasicMaterial color="#2fd6ff" wireframe />
    </mesh>
  );
}

function ModelCanvas({ file, clip, preload, active, darkHour }) {
  useEffect(() => {
    preload.forEach((url) => useGLTF.preload(url));
  }, [preload]);

  const light = getStageLighting(darkHour);

  return (
    <Canvas
      camera={{ position: [0, 0.6, 8], fov: 30 }}
      dpr={[1, 2]}
      flat
      frameloop={active ? 'always' : 'never'}
    >
      <ambientLight color={light.ambient.color} intensity={light.ambient.intensity} />
      <hemisphereLight color={light.sky.color} groundColor={light.sky.ground} intensity={light.sky.intensity} />
      <directionalLight position={[4, 6, 5]} color={light.key.color} intensity={light.key.intensity} />
      <directionalLight position={[-5, 2, -5]} color={light.rim.color} intensity={light.rim.intensity} />
      <pointLight position={[0, -1.4, 2]} color={light.floor.color} intensity={light.floor.intensity} />

      {/* Built from local light cards so metallic materials have something to reflect */}
      <Environment resolution={128} environmentIntensity={light.reflections}>
        <Lightformer intensity={2.5} position={[0, 5, 5]} scale={[10, 6, 1]} />
        <Lightformer intensity={1.5} position={[-6, 1, 2]} rotation-y={Math.PI / 2} scale={[8, 6, 1]} />
        <Lightformer
          intensity={2}
          color="#2fd6ff"
          position={[6, 1, -4]}
          rotation-y={-Math.PI / 2}
          scale={[8, 6, 1]}
        />
      </Environment>

      <Suspense fallback={<LoadingMesh />}>
        <SpinningModel key={file} file={file} clip={clip} />
      </Suspense>

      <ContactShadows position={[0, FLOOR_Y, 0]} color="#050d24" opacity={0.7} scale={8} blur={2.4} far={3} />
    </Canvas>
  );
}

export default ModelCanvas;
