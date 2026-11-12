"use client";

import Image from "next/image";
import { createPortal } from "react-dom";
import { useEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import { MoveHorizontal, Pause, Play } from "lucide-react";

type Vector3 = [number, number, number];
type ScenePose = {
  camera: Vector3;
  lookAt: Vector3;
  rotation: Vector3;
  light: Vector3;
  scale: number;
  frameX: number;
  frameY?: number;
  opacity: number;
};

const desktopPoses: Record<string, ScenePose> = {
  hero: { camera: [0.5, 0.7, 12], lookAt: [0, 0, 0], rotation: [-0.08, -0.24, -0.04], light: [-3, 5, 4], frameX: -0.27, scale: 0.76, opacity: 1 },
  about: { camera: [1, 0.8, 8.8], lookAt: [0, 0.1, 0], rotation: [-0.12, 0.25, 0], light: [-1.5, 4.5, 3], frameX: -0.29, scale: 0.76, opacity: 1 },
  learning: { camera: [-0.6, 0.5, 10.5], lookAt: [0, 0.1, 0], rotation: [-0.1, 0.05, -0.05], light: [-1, 4, 3], frameX: 0.32, scale: 0.76, opacity: 1 },
  photos: { camera: [0, 0.3, 7], lookAt: [0, 0, 0], rotation: [0.1, 0, 0.15], light: [0, 4, 4], frameX: 0, scale: 0.76, opacity: 0.45 },
  activity: { camera: [0.8, 0.8, 10], lookAt: [0, 0.1, 0], rotation: [-0.08, 0.1, 0.05], light: [-1.5, 4.5, 3], frameX: -0.29, scale: 0.76, opacity: 1 },
  links: { camera: [0, 0.4, 10.5], lookAt: [0, -1, 0], rotation: [-0.06, -0.12, -0.04], light: [-3, 5, 4], frameX: -0.24, scale: 0.76, opacity: 1 },
  exit: { camera: [0, 0.4, 10.5], lookAt: [0, -1, 0], rotation: [-0.06, -0.12, -0.04], light: [-3, 5, 4], frameX: -0.24, scale: 0.76, opacity: 1 },
};

const compactPoses: Record<string, ScenePose> = {
  hero: { camera: [0.35, 0.85, 4.1], lookAt: [0.08, -0.05, 0], rotation: [-0.08, -0.4, -0.12], light: [-3, 5, 4], frameX: 0, frameY: 0.25, scale: 0.56, opacity: 1 },
  about: { camera: [0.9, 0.5, 3.6], lookAt: [0, 0, 0], rotation: [-0.1, 0.35, 0.06], light: [-1.5, 4.5, 3], frameX: -0.16, frameY: -0.22, scale: 0.56, opacity: 0.24 },
  learning: { camera: [-0.6, 0.3, 3.4], lookAt: [0, 0, 0], rotation: [-0.1, -0.3, -0.08], light: [-1, 4, 3], frameX: 0.18, frameY: 0.04, scale: 0.56, opacity: 0.18 },
  photos: { camera: [0, 0.2, 3.2], lookAt: [0, 0, 0], rotation: [0.08, -0.1, 0.12], light: [0, 4, 4], frameX: 0, frameY: 0, scale: 0.56, opacity: 0.12 },
  activity: { camera: [0.6, 0.6, 3.5], lookAt: [0, 0, 0], rotation: [-0.06, 0.25, 0.04], light: [-1.5, 4.5, 3], frameX: -0.16, frameY: -0.2, scale: 0.56, opacity: 0.24 },
  links: { camera: [0.1, 0.4, 4.0], lookAt: [0, 0, 0], rotation: [-0.04, -0.15, -0.04], light: [-3, 5, 4], frameX: 0, frameY: 0.24, scale: 0.56, opacity: 0.32 },
  exit: { camera: [0.1, 0.4, 4.0], lookAt: [0, 0, 0], rotation: [-0.04, -0.15, -0.04], light: [-3, 5, 4], frameX: 0, frameY: 0.24, scale: 0.56, opacity: 0.32 },
};

const stopNames = ["hero", "about", "learning", "photos", "activity", "links", "exit"] as const;

function clonePose(pose: ScenePose): ScenePose {
  return {
    camera: [...pose.camera],
    lookAt: [...pose.lookAt],
    rotation: [...pose.rotation],
    light: [...pose.light],
    scale: pose.scale,
    frameX: pose.frameX,
    frameY: pose.frameY ?? 0,
    opacity: pose.opacity,
  };
}

function toCameraOrbit(position: Vector3): Vector3 {
  return [Math.atan2(position[0], position[2]), Math.atan2(position[1], Math.hypot(position[0], position[2])), Math.hypot(...position)];
}

function toCameraPosition([yaw, pitch, radius]: Vector3): Vector3 {
  return [radius * Math.cos(pitch) * Math.sin(yaw), radius * Math.sin(pitch), radius * Math.cos(pitch) * Math.cos(yaw)];
}

function nearestAngle(from: number, to: number) {
  return from + Math.atan2(Math.sin(to - from), Math.cos(to - from));
}

function interpolatePose(from: ScenePose, to: ScenePose, amount: number): ScenePose {
  const mix = (a: Vector3, b: Vector3): Vector3 => [
    a[0] + (b[0] - a[0]) * amount,
    a[1] + (b[1] - a[1]) * amount,
    a[2] + (b[2] - a[2]) * amount,
  ];
  const fromOrbit = toCameraOrbit(from.camera);
  const toOrbit = toCameraOrbit(to.camera);
  toOrbit[0] = nearestAngle(fromOrbit[0], toOrbit[0]);
  return {
    camera: toCameraPosition(mix(fromOrbit, toOrbit)),
    lookAt: mix(from.lookAt, to.lookAt),
    rotation: mix(from.rotation, to.rotation),
    light: mix(from.light, to.light),
    scale: from.scale + (to.scale - from.scale) * amount,
    frameX: from.frameX + (to.frameX - from.frameX) * amount,
    frameY: (from.frameY ?? 0) + ((to.frameY ?? 0) - (from.frameY ?? 0)) * amount,
    opacity: from.opacity + (to.opacity - from.opacity) * amount,
  };
}

export function FloatingSculpture() {
  const surfaceRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const motionControl = useRef<((paused: boolean) => void) | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "unavailable">("loading");
  const [paused, setPaused] = useState(false);
  const [heroVisible, setHeroVisible] = useState(true);
  const [gestureActive, setGestureActive] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [portalTarget, setPortalTarget] = useState<HTMLElement | null>(null);
  const pointerLight = useRef({ x: 0, y: 0 });
  const userRotation = useRef({ x: 0, y: 0, vx: 0, vy: 0, keyboardY: 0, dragging: false });

  useEffect(() => { setPortalTarget(document.querySelector<HTMLElement>("[data-scene-controls]")); }, []);

  useEffect(() => {
    const surface = surfaceRef.current;
    const canvas = canvasRef.current;
    const experience = surface?.closest<HTMLElement>("[data-home-experience]");
    if (!surface || !canvas || !experience) return;
    const sceneSurface = surface;
    const sceneCanvas = canvas;
    const homeExperience = experience;

    let disposed = false;
    let motionPaused = false;
    let manuallyPaused = false;
    let inView = true;
    let lastTime = 0;
    let rootObserver: IntersectionObserver | null = null;
    let resizeObserver: ResizeObserver | null = null;
    let markers: Array<{ name: string; element: HTMLElement }> = [];
    let stops: Array<{ position: number; pose: ScenePose }> = [];
    let compact = false;
    let previousGestureActive = true;
    let previousOverPhotos = false;
    let photoRange = { start: Number.POSITIVE_INFINITY, end: Number.POSITIVE_INFINITY };
    let currentPose = clonePose(desktopPoses.hero);
    let cameraOrbit = toCameraOrbit(currentPose.camera);
    let poseVelocity: ScenePose = {
      camera: [0, 0, 0], lookAt: [0, 0, 0], rotation: [0, 0, 0], light: [0, 0, 0], scale: 0, frameX: 0, frameY: 0, opacity: 0,
    };
    const cleanups: (() => void)[] = [];
    const release = () => cleanups.splice(0).reverse().forEach((cleanup) => cleanup());

    async function initialize() {
      try {
        const [THREE, { FontLoader }, { TextGeometry }, { default: typeface }] = await Promise.all([
          import("three"),
          import("three/addons/loaders/FontLoader.js"),
          import("three/addons/geometries/TextGeometry.js"),
          import("@/lib/fonts/helvetiker-bold-webu.json"),
        ]);
        if (disposed) return;

        const renderer = new THREE.WebGLRenderer({ canvas: sceneCanvas, alpha: true, antialias: true });
        cleanups.push(() => {
          renderer.setAnimationLoop(null);
          renderer.dispose();
          renderer.forceContextLoss();
        });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
        renderer.setClearColor(0x000000, 0);
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.05;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 60);
        camera.position.set(...currentPose.camera);
        camera.lookAt(...currentPose.lookAt);

        const environment = new THREE.Scene();
        environment.background = new THREE.Color(0x393b3d);
        const panelGeometry = new THREE.PlaneGeometry(1, 1);
        const panelMaterial = new THREE.MeshBasicMaterial({ color: new THREE.Color(2.5, 2.5, 2.5), side: THREE.DoubleSide });
        for (const [x, y, z, width, height] of [[-4, 3, 4, 3, 8], [4, 2, 1, 2, 6], [0, 6, -2, 8, 3]]) {
          const panel = new THREE.Mesh(panelGeometry, panelMaterial);
          panel.position.set(x, y, z);
          panel.scale.set(width, height, 1);
          panel.lookAt(0, 0, 0);
          environment.add(panel);
        }
        const pmrem = new THREE.PMREMGenerator(renderer);
        const environmentMap = pmrem.fromScene(environment, 0.03);
        scene.environment = environmentMap.texture;
        panelGeometry.dispose();
        panelMaterial.dispose();
        pmrem.dispose();
        cleanups.push(() => environmentMap.dispose());

        const sculpture = new THREE.Group();
        scene.add(sculpture);
        const chrome = new THREE.MeshPhysicalMaterial({
          color: 0xc7cacb,
          metalness: 0.86,
          roughness: 0.34,
          clearcoat: 0.25,
          clearcoatRoughness: 0.1,
          envMapIntensity: 1.1,
          transparent: true,
        });
        const orange = new THREE.MeshPhysicalMaterial({
          color: 0xb66b45,
          metalness: 0.18,
          roughness: 0.42,
          clearcoat: 0.2,
          clearcoatRoughness: 0.16,
          envMapIntensity: 0.4,
          transparent: true,
        });
        cleanups.push(() => {
          chrome.dispose();
          orange.dispose();
        });

        const font = new FontLoader().parse(typeface);
        const geometry = new TextGeometry("Webu", {
          font, size: 1.35, depth: 0.24, curveSegments: 48,
          bevelEnabled: true, bevelThickness: 0.035, bevelSize: 0.025,
          bevelSegments: 8, steps: 1,
        });
        geometry.center();
        geometry.computeBoundingBox();
        const wordmark = new THREE.Mesh(geometry, chrome);
        sculpture.add(wordmark);
        const dotGeometry = new THREE.SphereGeometry(0.095, 32, 24);
        const dot = new THREE.Mesh(dotGeometry, orange);
        dot.position.set((geometry.boundingBox?.max.x ?? 2.2) + 0.19, -0.44, 0);
        sculpture.add(dot);
        cleanups.push(() => { geometry.dispose(); dotGeometry.dispose(); });

        const shadowGeometry = new THREE.PlaneGeometry(9, 7);
        const shadowMaterial = new THREE.ShaderMaterial({
          transparent: true, depthWrite: false,
          uniforms: { opacity: { value: 0.2 } },
          vertexShader: `varying vec2 vUv; void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`,
          fragmentShader: `varying vec2 vUv; uniform float opacity; void main(){vec2 p=(vUv-.5)*vec2(2.,3.);float a=exp(-dot(p,p)*7.)*opacity;gl_FragColor=vec4(.16,.19,.14,a);}`,
        });
        const shadow = new THREE.Mesh(shadowGeometry, shadowMaterial);
        shadow.rotation.x = -Math.PI / 2;
        shadow.position.y = -0.95;
        scene.add(shadow);
        cleanups.push(() => { shadowGeometry.dispose(); shadowMaterial.dispose(); });

        const keyLight = new THREE.DirectionalLight(0xffffff, 2.3);
        keyLight.position.set(...currentPose.light);
        const rimLight = new THREE.DirectionalLight(0xe1e4e7, 0.75);
        rimLight.position.set(4, -1, 2);
        const fillLight = new THREE.AmbientLight(0xffffff, 0.58);
        scene.add(keyLight, rimLight, fillLight);

        const springVector = (value: Vector3, velocity: Vector3, target: Vector3, delta: number) => {
          const omega = 10;
          for (let index = 0; index < 3; index++) {
            const acceleration = omega * omega * (target[index] - value[index]) - 2 * omega * velocity[index];
            velocity[index] += acceleration * delta;
            value[index] += velocity[index] * delta;
          }
        };
        const springScalar = (value: number, velocity: number, target: number, delta: number) => {
          const omega = 10;
          const nextVelocity = velocity + (omega * omega * (target - value) - 2 * omega * velocity) * delta;
          return [value + nextVelocity * delta, nextVelocity] as const;
        };

        const buildStops = () => {
          const rootBounds = homeExperience.getBoundingClientRect();
          const rootStart = rootBounds.top + window.scrollY;
          const maxProgress = Math.max(0, document.documentElement.scrollHeight - window.innerHeight - rootStart);
          const nextCompact = window.matchMedia("(max-width: 1023px)").matches;
          compact = nextCompact;
          const poses = compact ? compactPoses : desktopPoses;
          const nextStops: Array<{ position: number; pose: ScenePose }> = [];
          const headerHeight = window.innerWidth < 768 ? 66 : 76;
          const railHeight = 0;
          const scrollOffset = headerHeight + railHeight;
          for (const name of stopNames.slice(0, -1)) {
            const marker = markers.find((item) => item.name === name)?.element;
            if (!marker) continue;
            const bounds = marker.getBoundingClientRect();
            const anchorPosition = Math.max(0, bounds.top - rootBounds.top - scrollOffset);
            const position = name === "hero"
              ? 0
              : name === "links"
                ? Math.min(anchorPosition, maxProgress)
                : anchorPosition;
            nextStops.push({ position, pose: clonePose(poses[name]) });
          }
          nextStops.sort((a, b) => a.position - b.position);
          const photos = markers.find((marker) => marker.name === "photos")?.element;
          if (photos) {
            const bounds = photos.getBoundingClientRect();
            const railBottom = (window.innerWidth < 768 ? 66 : 76) + (compact ? 0 : Math.min(112, Math.max(80, window.innerHeight * 0.15)));
            photoRange = { start: bounds.top - rootBounds.top - railBottom, end: bounds.bottom - rootBounds.top - railBottom };
          }
          const lastStop = nextStops[nextStops.length - 1]?.position ?? 0;
          const exitPosition = Math.min(
            lastStop + Math.max(120, window.innerHeight * 0.22),
            maxProgress,
          );
          nextStops.push({ position: exitPosition, pose: clonePose(poses.exit) });
          stops = nextStops;
        };

        markers = Array.from(homeExperience.querySelectorAll<HTMLElement>("[data-scene-stop]")).map((element) => ({
          name: element.dataset.sceneStop ?? "",
          element,
        }));
        buildStops();

        let renderWidth = 0;
        let renderHeight = 0;
        const fitCamera = () => {
          if (!renderWidth || !renderHeight) return;
          camera.aspect = renderWidth / renderHeight;
          // On tall phone canvases keep the horizontal field of view so the wordmark fits the width.
          const baseTan = Math.tan(THREE.MathUtils.degToRad(18));
          const tan = compact ? Math.max(baseTan, 0.41 / camera.aspect) : baseTan;
          camera.fov = THREE.MathUtils.radToDeg(2 * Math.atan(tan));
          camera.updateProjectionMatrix();
        };
        const resize = () => {
          const { width, height } = sceneSurface.querySelector<HTMLElement>(".sculpture-surface")!.getBoundingClientRect();
          renderWidth = width;
          renderHeight = height;
          if (!width || !height) return;
          buildStops();
          fitCamera();
          renderer.setSize(width, height, false);
          if (motionPaused) setHeroPose();
          else render(performance.now());
        };

        const applyPose = () => {
          camera.position.set(...currentPose.camera);
          camera.lookAt(...currentPose.lookAt);
          camera.setViewOffset(renderWidth, renderHeight, renderWidth * currentPose.frameX, renderHeight * (currentPose.frameY ?? 0), renderWidth, renderHeight);
          const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
          const distToBottom = maxScroll - window.scrollY;
          const suctionDamping = THREE.MathUtils.clamp(distToBottom / 180, 0, 1);
          const idleTime = compact && !motionPaused ? performance.now() / 1000 : 0;
          const idleX = idleTime ? Math.sin(idleTime * 0.8) * 0.035 * suctionDamping : 0;
          const idleY = idleTime ? Math.sin(idleTime * 0.55) * 0.09 * suctionDamping : 0;
          sculpture.position.y = idleTime ? Math.sin(idleTime * 1.1) * 0.035 * suctionDamping : 0;
          sculpture.rotation.set(
            currentPose.rotation[0] + userRotation.current.x + idleX,
            currentPose.rotation[1] + userRotation.current.y + userRotation.current.keyboardY + idleY,
            currentPose.rotation[2],
          );
          sculpture.scale.setScalar(currentPose.scale);
          const readingSide = Math.max(-1, Math.min(1, currentPose.frameX / 0.27));
          sceneCanvas.style.setProperty("--scene-crossing-opacity", String(0.28 + 0.72 * Math.min(1, Math.abs(currentPose.frameX) / 0.2)));
          sceneCanvas.style.setProperty("--scene-mask-left", `${(Math.max(0, -readingSide) * 60).toFixed(2)}%`);
          sceneCanvas.style.setProperty("--scene-mask-right", `${(Math.max(0, readingSide) * 64).toFixed(2)}%`);
          keyLight.position.set(...currentPose.light);
          keyLight.intensity = 1.9 + currentPose.opacity * 0.45;
          chrome.opacity = currentPose.opacity;
          orange.opacity = currentPose.opacity;
          sculpture.visible = currentPose.opacity > 0.005;
          shadow.visible = (!compact || renderHeight > 150) && sculpture.visible;
          shadow.position.y = compact ? -0.8 : -0.95;
          shadow.scale.setScalar(compact ? 0.6 : currentPose.scale * 1.1);
          shadowMaterial.uniforms.opacity.value = currentPose.opacity * 0.24;
          camera.updateProjectionMatrix();
        };

        const setHeroPose = () => {
          currentPose = clonePose((compact ? compactPoses : desktopPoses).hero);
          cameraOrbit = toCameraOrbit(currentPose.camera);
          poseVelocity = {
            camera: [0, 0, 0], lookAt: [0, 0, 0], rotation: [0, 0, 0], light: [0, 0, 0], scale: 0, frameX: 0, frameY: 0, opacity: 0,
          };
          userRotation.current.x = 0;
          userRotation.current.y = 0;
          userRotation.current.vx = 0;
          userRotation.current.vy = 0;
          applyPose();
          renderer.render(scene, camera);
        };

        const render = (timestamp: number) => {
          if (disposed) return;
          const delta = lastTime ? Math.min((timestamp - lastTime) / 1000, 0.05) : 0;
          lastTime = timestamp;
          const rootBounds = homeExperience.getBoundingClientRect();
          const progress = Math.max(0, -rootBounds.top);
          const nextOverPhotos = progress >= photoRange.start && progress < photoRange.end;
          if (nextOverPhotos !== previousOverPhotos) {
            previousOverPhotos = nextOverPhotos;
            sceneSurface.dataset.overPhotos = String(nextOverPhotos);
          }
          const nextGestureActive = progress < Math.max(150, window.innerHeight * 0.24);
          if (nextGestureActive !== previousGestureActive) {
            previousGestureActive = nextGestureActive;
            setGestureActive(nextGestureActive);
          }

          const frame = stops[stops.length - 1];
          let target = frame?.pose ?? clonePose(desktopPoses.hero);
          if (stops.length > 1 && progress <= (frame?.position ?? 0)) {
            let index = 0;
            while (index < stops.length - 1 && progress > stops[index + 1].position) index++;
            const from = stops[index];
            const to = stops[Math.min(index + 1, stops.length - 1)];
            const distance = Math.max(1, to.position - from.position);
            const raw = THREE.MathUtils.clamp((progress - from.position) / distance, 0, 1);
            const eased = raw * raw * (3 - 2 * raw);
            target = interpolatePose(from.pose, to.pose, eased);
          }

          // Realtime suction into footer wordmark as page reaches the bottom
          const footerWordmark = document.querySelector<HTMLElement>(".footer-wordmark");
          if (footerWordmark && renderWidth > 0 && renderHeight > 0) {
            const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
            const remainingToBottom = maxScroll - window.scrollY;
            const suctionRange = compact ? 280 : 360;
            const suctionT = THREE.MathUtils.clamp(1 - remainingToBottom / suctionRange, 0, 1);

            if (suctionT > 0) {
              const easedSuction = suctionT * suctionT * (3 - 2 * suctionT);
              const fRect = footerWordmark.getBoundingClientRect();
              const headerH = window.innerWidth < 768 ? 66 : 76;
              const footerCenterX = fRect.left + fRect.width * 0.48;
              const footerCenterY = (fRect.top - headerH) + fRect.height * 0.44;

              const targetFrameX = -(footerCenterX - renderWidth / 2) / renderWidth;
              const targetFrameY = -(footerCenterY - renderHeight / 2) / renderHeight;

              const baseTan = Math.tan(THREE.MathUtils.degToRad(18));
              const tan = compact ? Math.max(baseTan, 0.41 / (renderWidth / renderHeight)) : baseTan;
              const targetScale = THREE.MathUtils.clamp(
                (fRect.width / renderHeight) * (2 * 4.0 * tan) / 4.5,
                compact ? 0.20 : 0.28,
                compact ? 0.32 : 0.45
              );

              // As it gets within 30px of the bottom, it fully dissolves into the 2D logo
              const fadeRatio = THREE.MathUtils.clamp((remainingToBottom - 20) / 140, 0, 1);

              const footerAbsorbPose: ScenePose = {
                camera: [0, 0, 4.0],
                lookAt: [0, 0, 0],
                rotation: [0, 0, 0],
                light: [-1.5, 4.5, 3],
                frameX: targetFrameX,
                frameY: targetFrameY,
                scale: targetScale,
                opacity: fadeRatio * 0.85,
              };

              target = interpolatePose(target, footerAbsorbPose, easedSuction);
            }

            const isAbsorbed = remainingToBottom < 28;
            if (footerWordmark.dataset.absorbed !== String(isAbsorbed)) {
              footerWordmark.dataset.absorbed = String(isAbsorbed);
            }
          }
          if (delta > 0) {
            const targetOrbit = toCameraOrbit(target.camera);
            targetOrbit[0] = nearestAngle(cameraOrbit[0], targetOrbit[0]);
            springVector(cameraOrbit, poseVelocity.camera, targetOrbit, delta);
            currentPose.camera = toCameraPosition(cameraOrbit);
            springVector(currentPose.lookAt, poseVelocity.lookAt, target.lookAt, delta);
            springVector(currentPose.rotation, poseVelocity.rotation, target.rotation, delta);
            const lightTarget: Vector3 = [target.light[0] + (nextGestureActive ? pointerLight.current.x * 2 : 0), target.light[1] + (nextGestureActive ? pointerLight.current.y : 0), target.light[2]];
            springVector(currentPose.light, poseVelocity.light, lightTarget, delta);
            [currentPose.frameX, poseVelocity.frameX] = springScalar(currentPose.frameX, poseVelocity.frameX, target.frameX, delta);
            const frameY = springScalar(currentPose.frameY ?? 0, poseVelocity.frameY ?? 0, target.frameY ?? 0, delta);
            currentPose.frameY = frameY[0];
            poseVelocity.frameY = frameY[1];
            [currentPose.scale, poseVelocity.scale] = springScalar(currentPose.scale, poseVelocity.scale, target.scale, delta);
            [currentPose.opacity, poseVelocity.opacity] = springScalar(currentPose.opacity, poseVelocity.opacity, target.opacity, delta);

            if (!userRotation.current.dragging) {
              const drag = userRotation.current;
              const omega = 9;
              const ax = -omega * omega * drag.x - 2 * omega * drag.vx;
              const ay = -omega * omega * drag.y - 2 * omega * drag.vy;
              drag.vx += ax * delta;
              drag.vy += ay * delta;
              drag.x += drag.vx * delta;
              drag.y += drag.vy * delta;
              if (Math.abs(drag.x) + Math.abs(drag.y) < 0.0001) {
                drag.x = 0;
                drag.y = 0;
                drag.vx = 0;
                drag.vy = 0;
              }
            }
          }
          applyPose();
          renderer.render(scene, camera);
        };

        const syncLoop = () => {
          lastTime = 0;
          const shouldRender = inView && !document.hidden;
          renderer.setAnimationLoop(!motionPaused && shouldRender ? render : null);
          if (shouldRender) {
            if (motionPaused) setHeroPose();
            else render(performance.now());
          }
        };

        resizeObserver = new ResizeObserver(resize);
        resizeObserver.observe(sceneSurface);
        resizeObserver.observe(homeExperience);
        markers.forEach(({ element }) => resizeObserver?.observe(element));
        cleanups.push(() => resizeObserver?.disconnect());

        const visibilityObserver = new IntersectionObserver(([entry]) => {
          inView = entry.isIntersecting;
          syncLoop();
        }, { threshold: 0.001 });
        visibilityObserver.observe(homeExperience);
        rootObserver = visibilityObserver;
        cleanups.push(() => visibilityObserver.disconnect());

        const hero = homeExperience.querySelector<HTMLElement>(".hero-stage");
        const heroObserver = hero ? new IntersectionObserver(([entry]) => {
          setHeroVisible(entry.isIntersecting);
        }, { threshold: 0 }) : null;
        if (hero) heroObserver?.observe(hero);
        cleanups.push(() => heroObserver?.disconnect());

        const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
        setReducedMotion(reducedMotionQuery.matches);
        motionPaused = reducedMotionQuery.matches;
        setPaused(motionPaused);
        const onMotionChange = () => {
          motionPaused = reducedMotionQuery.matches || manuallyPaused;
          setReducedMotion(reducedMotionQuery.matches);
          setPaused(motionPaused);
          syncLoop();
        };
        const onResize = () => resize();
        const onVisibility = () => syncLoop();
        document.addEventListener("visibilitychange", onVisibility);
        window.addEventListener("resize", onResize);
        reducedMotionQuery.addEventListener("change", onMotionChange);
        cleanups.push(() => {
          document.removeEventListener("visibilitychange", onVisibility);
          window.removeEventListener("resize", onResize);
          reducedMotionQuery.removeEventListener("change", onMotionChange);
        });

        motionControl.current = (value) => {
          manuallyPaused = value;
          motionPaused = reducedMotionQuery.matches || manuallyPaused;
          setPaused(motionPaused);
          syncLoop();
        };

        const onContextLost = (event: Event) => {
          event.preventDefault();
          motionControl.current = null;
          release();
          setStatus("unavailable");
        };
        sceneCanvas.addEventListener("webglcontextlost", onContextLost);
        cleanups.push(() => sceneCanvas.removeEventListener("webglcontextlost", onContextLost));

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
      rootObserver?.disconnect();
      release();
    };
  }, []);

  const dragStart = (event: PointerEvent<HTMLDivElement>) => {
    if (paused || event.button !== 0) return;
    userRotation.current.dragging = true;
    userRotation.current.vx = 0;
    userRotation.current.vy = 0;
    event.currentTarget.setPointerCapture(event.pointerId);
    (event.currentTarget as HTMLDivElement).dataset.pointerX = String(event.clientX);
    (event.currentTarget as HTMLDivElement).dataset.pointerY = String(event.clientY);
    (event.currentTarget as HTMLDivElement).dataset.pointerTime = String(performance.now());
  };

  const dragMove = (event: PointerEvent<HTMLDivElement>) => {
    const element = event.currentTarget;
    const bounds = element.getBoundingClientRect();
    pointerLight.current.x = (event.clientX - bounds.left) / bounds.width - 0.5;
    pointerLight.current.y = 0.5 - (event.clientY - bounds.top) / bounds.height;
    if (!userRotation.current.dragging || paused) return;
    const lastX = Number(element.dataset.pointerX ?? event.clientX);
    const lastY = Number(element.dataset.pointerY ?? event.clientY);
    const lastTime = Number(element.dataset.pointerTime ?? performance.now());
    const deltaTime = Math.max(0.008, (performance.now() - lastTime) / 1000);
    const deltaX = event.clientX - lastX;
    const deltaY = event.clientY - lastY;
    userRotation.current.y += deltaX * 0.008;
    userRotation.current.x = Math.max(-0.8, Math.min(0.8, userRotation.current.x + deltaY * 0.006));
    userRotation.current.vy = deltaX * 0.008 / deltaTime;
    userRotation.current.vx = deltaY * 0.006 / deltaTime;
    element.dataset.pointerX = String(event.clientX);
    element.dataset.pointerY = String(event.clientY);
    element.dataset.pointerTime = String(performance.now());
  };

  const dragEnd = () => { userRotation.current.dragging = false; };
  const onInteractionKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (paused || (event.key !== "ArrowLeft" && event.key !== "ArrowRight")) return;
    event.preventDefault();
    userRotation.current.keyboardY = Math.max(-1.8, Math.min(1.8,
      userRotation.current.keyboardY + (event.key === "ArrowLeft" ? -0.3 : 0.3),
    ));
  };

  return (
    <div
      className="sculpture"
      ref={surfaceRef}
      data-scene-state={status}
      data-scene-exited="false"
      data-motion-paused={paused}
      data-at-hero={heroVisible}
      data-gesture-active={gestureActive}
    >
      <div className="sculpture-surface">
        <canvas ref={canvasRef} aria-hidden="true" />
        <Image className="sculpture-poster" src="/webu-wordmark-poster.webp" alt="" aria-hidden="true" fill sizes="100vw" loading="eager" />
      </div>
      {portalTarget && createPortal(
        <>
          <div
            className="sculpture-gesture"
            data-scene-state={status}
            data-motion-paused={paused}
            data-gesture-active={gestureActive}
            role="group"
            aria-label="Webuの立体。ドラッグ、または左右の矢印キーで回転できます。"
            aria-keyshortcuts="ArrowLeft ArrowRight"
            tabIndex={status === "ready" && !paused && gestureActive ? 0 : -1}
            onPointerDown={dragStart}
            onPointerMove={dragMove}
            onPointerLeave={() => { pointerLight.current.x = 0; pointerLight.current.y = 0; }}
            onPointerUp={dragEnd}
            onPointerCancel={dragEnd}
            onLostPointerCapture={dragEnd}
            onKeyDown={onInteractionKeyDown}
          />
          {status === "ready" && !reducedMotion && (
            <div className="sculpture-controls">
              {gestureActive && <span><MoveHorizontal size={14} aria-hidden="true" />ドラッグで回す</span>}
              <button
                type="button"
                aria-label={paused ? "3Dの動きを再開" : "3Dの動きを止める"}
                aria-pressed={paused}
                onClick={() => motionControl.current?.(!paused)}
              >
                {paused ? <Play size={13} aria-hidden="true" /> : <Pause size={13} aria-hidden="true" />}
              </button>
            </div>
          )}
        </>,
        portalTarget,
      )}
    </div>
  );
}
