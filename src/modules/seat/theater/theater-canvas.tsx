import { Canvas, useFrame, useThree } from '@react-three/fiber';
import React from 'react';
import * as THREE from 'three';
import { buildTheater } from './build-scene';
import { OVERVIEW, TheaterController } from './camera-controller';

interface Props {
  controller: TheaterController;
  filmFrame?: string; // image shown on the cinema screen
  taken: ReadonlySet<string>;
  mine: ReadonlySet<string>;
  onLookStart?: () => void;
}

function Theater({
  controller,
  filmFrame,
  taken,
  mine,
}: Omit<Props, 'onLookStart'>) {
  const theater = React.useMemo(() => buildTheater(), []);
  const camera = useThree((s) => s.camera) as THREE.PerspectiveCamera;
  const size = useThree((s) => s.size);

  React.useEffect(() => () => theater.dispose(), [theater]);

  React.useEffect(() => {
    if (!filmFrame) return;
    let cancelled = false;
    const loader = new THREE.TextureLoader();
    loader.setCrossOrigin('anonymous');
    loader.load(
      filmFrame,
      (t) => {
        if (!cancelled) theater.setFilmFrame(t);
      },
      undefined,
      () => {}, // keep the plain screen if the frame can't load
    );
    return () => {
      cancelled = true;
    };
  }, [filmFrame, theater]);

  React.useEffect(
    () => theater.paintSeats(taken, mine),
    [taken, mine, theater],
  );

  useFrame(() => {
    const now = performance.now();
    controller.step(now, camera, size);
    theater.tick(now);
  });

  return <primitive object={theater.group} />;
}

// WebGL view of the auditorium. Drag to look around from the current seat.
export default function TheaterCanvas({
  controller,
  filmFrame,
  taken,
  mine,
  onLookStart,
}: Props) {
  const last = React.useRef<{ x: number; y: number } | null>(null);

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        cursor: 'grab',
        touchAction: 'none',
      }}
      onPointerDown={(e) => {
        last.current = { x: e.clientX, y: e.clientY };
        e.currentTarget.setPointerCapture(e.pointerId);
        e.currentTarget.style.cursor = 'grabbing';
        onLookStart?.();
      }}
      onPointerMove={(e) => {
        if (!last.current) return;
        controller.drag(e.clientX - last.current.x, e.clientY - last.current.y);
        last.current = { x: e.clientX, y: e.clientY };
      }}
      onPointerUp={(e) => {
        last.current = null;
        e.currentTarget.style.cursor = 'grab';
      }}
    >
      <Canvas
        dpr={[1, 2]}
        camera={{
          fov: 60,
          near: 0.05,
          far: 90,
          position: [OVERVIEW.pos.x, OVERVIEW.pos.y, OVERVIEW.pos.z],
        }}
        gl={{ antialias: true }}
        onCreated={({ gl, scene }) => {
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 1.05;
          scene.background = new THREE.Color(0x060507);
          scene.fog = new THREE.Fog(0x060507, 20, 42);
        }}
      >
        <Theater
          controller={controller}
          filmFrame={filmFrame}
          taken={taken}
          mine={mine}
        />
      </Canvas>
    </div>
  );
}
