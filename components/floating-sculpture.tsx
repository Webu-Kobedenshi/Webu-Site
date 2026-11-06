"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { MoveHorizontal, Pause, Play } from "lucide-react";

export function FloatingSculpture() {
  const surfaceRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const motionControl = useRef<((paused: boolean) => void) | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "unavailable">("loading");
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const surface = surfaceRef.current;
    const canvas = canvasRef.current;
    if (!surface || !canvas) return;

    let disposed = false;
    const cleanups: (() => void)[] = [];
    const release = () => cleanups.splice(0).reverse().forEach((cleanup) => cleanup());

    async function initialize() {
      try {
        const [THREE, { RoomEnvironment }, { FontLoader }, { TextGeometry }, { TessellateModifier }, { mergeVertices }, { default: typeface }] = await Promise.all([
          import("three"),
          import("three/addons/environments/RoomEnvironment.js"),
          import("three/addons/loaders/FontLoader.js"),
          import("three/addons/geometries/TextGeometry.js"),
          import("three/addons/modifiers/TessellateModifier.js"),
          import("three/addons/utils/BufferGeometryUtils.js"),
          import("@/lib/fonts/helvetiker-bold-webu.json"),
        ]);
        if (disposed || !canvas || !surface) return;

        const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
        cleanups.push(() => renderer.dispose());
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
        renderer.setClearColor(0x000000, 0);
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 50);
        camera.position.set(0, 0, 8.5);

        const environment = new RoomEnvironment();
        const pmrem = new THREE.PMREMGenerator(renderer);
        const environmentMap = pmrem.fromScene(environment, 0.03);
        scene.environment = environmentMap.texture;
        environment.dispose();
        pmrem.dispose();
        cleanups.push(() => environmentMap.dispose());

        const sculpture = new THREE.Group();
        scene.add(sculpture);
        const chrome = new THREE.MeshPhysicalMaterial({
          color: 0xe5e8e4,
          metalness: 1,
          roughness: 0.16,
          clearcoat: 0.8,
          clearcoatRoughness: 0.14,
          envMapIntensity: 1.5,
        });
        const orange = new THREE.MeshPhysicalMaterial({
          color: 0xd7350c,
          metalness: 0,
          roughness: 0.35,
          clearcoat: 0.4,
          envMapIntensity: 0.3,
        });
        cleanups.push(() => {
          chrome.dispose();
          orange.dispose();
        });

        const font = new FontLoader().parse(typeface);
        const letterLayouts = [
          { character: "W", position: [-0.63, 0.48, -0.12], rotation: [-0.18, -0.38, 0.42] },
          { character: "e", position: [0.66, 0.64, 0.22], rotation: [0.22, 0.2, -0.48] },
          { character: "b", position: [-0.54, -0.65, 0.4], rotation: [0.2, -0.2, -0.48] },
          { character: "u", position: [0.65, -0.54, -0.04], rotation: [-0.23, 0.28, 0.5] },
        ];
        const tessellate = new TessellateModifier(0.15, 5);
        const letters = letterLayouts.map(({ character, position, rotation }) => {
          const textGeometry = new TextGeometry(character, {
            font,
            size: 1.55,
            depth: 0.34,
            curveSegments: 20,
            bevelEnabled: true,
            bevelThickness: 0.16,
            bevelSize: 0.085,
            bevelSegments: 8,
            steps: 4,
          });
          textGeometry.center();
          const bentGeometry = tessellate.modify(textGeometry);
          textGeometry.dispose();
          // Bend the actual letter outlines, preserving their recognizable counters.
          const vertices = bentGeometry.attributes.position;
          for (let index = 0; index < vertices.count; index++) {
            const x = vertices.getX(index);
            const y = vertices.getY(index);
            const z = vertices.getZ(index);
            const twist = y * 0.38;
            vertices.setXYZ(index,
              x * Math.cos(twist) - z * Math.sin(twist),
              y,
              x * Math.sin(twist) + z * Math.cos(twist) + Math.sin(x * 1.8) * 0.1,
            );
          }
          bentGeometry.deleteAttribute("normal");
          bentGeometry.deleteAttribute("uv");
          const geometry = mergeVertices(bentGeometry);
          bentGeometry.dispose();
          cleanups.push(() => geometry.dispose());
          geometry.computeVertexNormals();
          const mesh = new THREE.Mesh(geometry, character === "u" ? orange : chrome);
          mesh.position.set(position[0], position[1], position[2]);
          mesh.rotation.set(rotation[0], rotation[1], rotation[2]);
          sculpture.add(mesh);
          return { mesh, baseY: position[1], baseRotation: rotation[2] };
        });

        const keyLight = new THREE.DirectionalLight(0xffffff, 2);
        keyLight.position.set(-3, 5, 4);
        const rimLight = new THREE.DirectionalLight(0xffffff, 1);
        rimLight.position.set(4, -1, 2);
        scene.add(keyLight, rimLight);

        const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
        let motionPaused = reducedMotion.matches;
        let inView = true;
        let elapsed = 0;
        let lastTime = 0;
        let rotationX = 0;
        let rotationY = 0;
        let targetX = 0;
        let targetY = 0;
        let dragging = false;
        let pointerX = 0;
        let pointerY = 0;
        let hoverX = 0;
        let hoverY = 0;

        const render = (timestamp: number) => {
          const delta = lastTime ? Math.min((timestamp - lastTime) / 1000, 0.05) : 0;
          lastTime = timestamp;
          if (!motionPaused) elapsed += delta;
          const ease = motionPaused ? 1 : 1 - Math.exp(-delta * 8);
          rotationX += (targetX - rotationX) * ease;
          rotationY += (targetY - rotationY) * ease;
          sculpture.rotation.set(rotationX + Math.sin(elapsed * 0.28) * 0.12, rotationY + Math.sin(elapsed * 0.3) * 0.35, Math.sin(elapsed * 0.2) * 0.06);
          sculpture.position.set(hoverX * 0.1, Math.sin(elapsed * 0.85) * 0.16 + hoverY * 0.08, 0);
          letters.forEach(({ mesh, baseY, baseRotation }, index) => {
            mesh.position.y = baseY + Math.sin(elapsed * 0.65 + index * 1.3) * 0.06;
            mesh.rotation.z = baseRotation + Math.sin(elapsed * 0.45 + index) * 0.06;
          });
          renderer.render(scene, camera);
        };

        const syncLoop = () => {
          lastTime = 0;
          renderer.setAnimationLoop(!motionPaused && inView && !document.hidden ? render : null);
          if (inView && !document.hidden) render(performance.now());
        };
        cleanups.push(() => renderer.setAnimationLoop(null));
        motionControl.current = (value) => {
          motionPaused = value;
          syncLoop();
        };
        setPaused(motionPaused);

        const resize = () => {
          const { width, height } = surface.getBoundingClientRect();
          if (!width || !height) return;
          camera.aspect = width / height;
          camera.position.z = camera.aspect < 0.8 ? 10 : 8.5;
          camera.updateProjectionMatrix();
          renderer.setSize(width, height, false);
          render(performance.now());
        };
        const resizeObserver = new ResizeObserver(resize);
        resizeObserver.observe(surface);
        cleanups.push(() => resizeObserver.disconnect());

        const visibilityObserver = new IntersectionObserver(([entry]) => {
          inView = entry.isIntersecting;
          syncLoop();
        }, { threshold: 0.01 });
        visibilityObserver.observe(surface);
        cleanups.push(() => visibilityObserver.disconnect());

        const onMotionChange = () => {
          motionPaused = reducedMotion.matches;
          setPaused(motionPaused);
          syncLoop();
        };
        document.addEventListener("visibilitychange", syncLoop);
        reducedMotion.addEventListener("change", onMotionChange);
        cleanups.push(() => {
          document.removeEventListener("visibilitychange", syncLoop);
          reducedMotion.removeEventListener("change", onMotionChange);
        });

        const onPointerDown = (event: PointerEvent) => {
          if (event.button !== 0) return;
          dragging = true;
          pointerX = event.clientX;
          pointerY = event.clientY;
          canvas.setPointerCapture(event.pointerId);
        };
        const onPointerMove = (event: PointerEvent) => {
          if (dragging) {
            targetY += (event.clientX - pointerX) * 0.008;
            targetX = THREE.MathUtils.clamp(targetX + (event.clientY - pointerY) * 0.006, -0.8, 0.8);
            pointerX = event.clientX;
            pointerY = event.clientY;
          } else if (!motionPaused && event.pointerType === "mouse") {
            const bounds = canvas.getBoundingClientRect();
            hoverX = (event.clientX - bounds.left) / bounds.width - 0.5;
            hoverY = 0.5 - (event.clientY - bounds.top) / bounds.height;
          }
          if (motionPaused) render(performance.now());
        };
        const onPointerEnd = () => { dragging = false; };
        const onPointerLeave = () => { hoverX = 0; hoverY = 0; };
        const onKeyDown = (event: KeyboardEvent) => {
          if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
          event.preventDefault();
          targetY += event.key === "ArrowLeft" ? -0.3 : 0.3;
          if (motionPaused) render(performance.now());
        };
        const onContextLost = () => {
          motionControl.current = null;
          release();
          setStatus("unavailable");
        };
        canvas.addEventListener("pointerdown", onPointerDown);
        canvas.addEventListener("pointermove", onPointerMove);
        canvas.addEventListener("pointerup", onPointerEnd);
        canvas.addEventListener("pointercancel", onPointerEnd);
        canvas.addEventListener("lostpointercapture", onPointerEnd);
        canvas.addEventListener("pointerleave", onPointerLeave);
        canvas.addEventListener("keydown", onKeyDown);
        canvas.addEventListener("webglcontextlost", onContextLost);
        cleanups.push(() => {
          canvas.removeEventListener("pointerdown", onPointerDown);
          canvas.removeEventListener("pointermove", onPointerMove);
          canvas.removeEventListener("pointerup", onPointerEnd);
          canvas.removeEventListener("pointercancel", onPointerEnd);
          canvas.removeEventListener("lostpointercapture", onPointerEnd);
          canvas.removeEventListener("pointerleave", onPointerLeave);
          canvas.removeEventListener("keydown", onKeyDown);
          canvas.removeEventListener("webglcontextlost", onContextLost);
        });

        resize();
        syncLoop();
        setStatus("ready");
      } catch {
        release();
        motionControl.current = null;
        if (!disposed) setStatus("unavailable");
      }
    }

    void initialize();
    return () => {
      disposed = true;
      motionControl.current = null;
      release();
    };
  }, []);

  return (
    <div className="sculpture" data-scene-state={status}>
      <div className="sculpture-surface" ref={surfaceRef}>
        <canvas
          ref={canvasRef}
          tabIndex={status === "ready" ? 0 : -1}
          role="img"
          aria-label="Webuの4文字をねじって重ねた、銀色とオレンジの立体。ドラッグ、または左右の矢印キーで回転できます。"
        />
        {status === "unavailable" && (
          <Image className="sculpture-fallback" src="/webu-workshop.png" alt="学校のアイデアを形にする、ものづくりのイラスト" fill sizes="(max-width: 767px) 100vw, 60vw" />
        )}
      </div>
      {status === "ready" && (
        <div className="sculpture-controls">
          <span><MoveHorizontal size={14} aria-hidden="true" />ドラッグで回す</span>
          <button
            type="button"
            aria-label={paused ? "3Dの動きを再開" : "3Dの動きを止める"}
            aria-pressed={paused}
            onClick={() => {
              const next = !paused;
              setPaused(next);
              motionControl.current?.(next);
            }}
          >
            {paused ? <Play size={13} aria-hidden="true" /> : <Pause size={13} aria-hidden="true" />}
          </button>
        </div>
      )}
    </div>
  );
}
