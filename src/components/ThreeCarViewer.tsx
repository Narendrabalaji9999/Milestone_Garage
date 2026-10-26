import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { HotspotInfo, WHATSAPP_PHONE_NUMBER, createWhatsAppUrl } from '../types';
import { CAR_HOTSPOTS } from '../data/carData';
import {
  Rotate3d,
  Layers,
  Eye,
  ChevronUp,
  ChevronDown,
  Wrench,
  MessageCircle,
  X,
  Sparkles
} from 'lucide-react';

interface ColorFinish {
  name: string;
  color: string;
  metalness: number;
  roughness: number;
  clearcoat: number;
}

// Strictly Blue and White Paint Finishes
const COLOR_FINISHES: ColorFinish[] = [
  { name: 'Milestone Royal Blue', color: '#1D4ED8', metalness: 0.88, roughness: 0.22, clearcoat: 0.95 },
  { name: 'Glacier Pearl White', color: '#FFFFFF', metalness: 0.35, roughness: 0.25, clearcoat: 1.0 },
  { name: 'Deep Navy Metallic', color: '#0F2C59', metalness: 0.9, roughness: 0.2, clearcoat: 0.9 },
  { name: 'Sky Blue Metallic', color: '#38BDF8', metalness: 0.85, roughness: 0.25, clearcoat: 0.9 },
  { name: 'Arctic Platinum Silver', color: '#CBD5E1', metalness: 0.95, roughness: 0.15, clearcoat: 1.0 },
];

interface ThreeCarViewerProps {
  onSelectHotspotService?: (hotspot: HotspotInfo) => void;
  onBookDoorstep?: (serviceId?: string) => void;
}

export const ThreeCarViewer: React.FC<ThreeCarViewerProps> = ({
  onSelectHotspotService,
  onBookDoorstep,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [selectedColor, setSelectedColor] = useState<ColorFinish>(COLOR_FINISHES[0]);
  const [activeHotspot, setActiveHotspot] = useState<HotspotInfo | null>(CAR_HOTSPOTS[0]);
  const [isExploded, setIsExploded] = useState(false);
  const [isHoodOpen, setIsHoodOpen] = useState(false);
  const [isWireframe, setIsWireframe] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);
  const [isDockCollapsed, setIsDockCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState<'inspect' | 'paint' | 'camera'>('inspect');
  const [hotspotScreenPositions, setHotspotScreenPositions] = useState<
    Array<{ id: string; x: number; y: number; visible: boolean }>
  >([]);

  const stateRef = useRef({
    carBodyMaterial: null as THREE.MeshPhysicalMaterial | null,
    carParts: [] as THREE.Mesh[],
    explodedComponents: {
      hood: null as THREE.Group | null,
      wheelFL: null as THREE.Group | null,
      wheelFR: null as THREE.Group | null,
      wheelRL: null as THREE.Group | null,
      wheelRR: null as THREE.Group | null,
      engine: null as THREE.Group | null,
    },
    camera: null as THREE.PerspectiveCamera | null,
    controls: null as OrbitControls | null,
    renderer: null as THREE.WebGLRenderer | null,
    scene: null as THREE.Scene | null,
    targetCameraPos: new THREE.Vector3(4.2, 2.0, 4.6),
    targetLookAt: new THREE.Vector3(0, 0.4, 0),
    explodedProgress: 0,
    hoodProgress: 0,
  });

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Detect software GL
    const isSoftwareGl = (() => {
      const gl = document.createElement('canvas').getContext('webgl2');
      if (!gl) return true;
      const ext = gl.getExtension('WEBGL_debug_renderer_info');
      const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
      const gpu = String(gl.getParameter(param));
      gl.getExtension('WEBGL_lose_context')?.loseContext();
      return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
    })();

    const scene = new THREE.Scene();
    // Clean White / Ice Blue Studio Background
    scene.background = new THREE.Color(0xf8faff);
    scene.fog = new THREE.FogExp2(0xf8faff, 0.04);

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || 620;

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(4.2, 2.0, 4.6);
    stateRef.current.camera = camera;
    stateRef.current.scene = scene;

    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      powerPreference: 'high-performance',
      alpha: false,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    renderer.shadowMap.enabled = !isSoftwareGl;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.innerHTML = '';
    container.appendChild(renderer.domElement);
    stateRef.current.renderer = renderer;

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxPolarAngle = Math.PI / 2 - 0.02;
    controls.minDistance = 2.5;
    controls.maxDistance = 10;
    controls.target.set(0, 0.4, 0);
    controls.autoRotate = autoRotate;
    controls.autoRotateSpeed = 0.8;
    stateRef.current.controls = controls;

    // Studio Environment reflection using RoomEnvironment
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    pmremGenerator.dispose();

    // Lighting rig for pure White & Blue studio
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.8);
    keyLight.position.set(5, 7, 5);
    keyLight.castShadow = !isSoftwareGl;
    if (!isSoftwareGl) {
      keyLight.shadow.mapSize.width = 1024;
      keyLight.shadow.mapSize.height = 1024;
      keyLight.shadow.bias = -0.0005;
      keyLight.shadow.normalBias = 0.02;
    }
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xbfdbfe, 1.6);
    fillLight.position.set(-5, 4, -4);
    scene.add(fillLight);

    const hemiLight = new THREE.HemisphereLight(0xffffff, 0xdbeafe, 0.9);
    scene.add(hemiLight);

    const rimLight = new THREE.DirectionalLight(0x60a5fa, 1.8);
    rimLight.position.set(0, 4, -6);
    scene.add(rimLight);

    // Clean white floor with subtle blue tint
    const floorGeo = new THREE.PlaneGeometry(24, 24);
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0xf1f5f9,
      roughness: 0.8,
      metalness: 0.1,
    });
    const floorMesh = new THREE.Mesh(floorGeo, floorMat);
    floorMesh.rotation.x = -Math.PI / 2;
    floorMesh.position.y = -0.001;
    floorMesh.receiveShadow = !isSoftwareGl;
    scene.add(floorMesh);

    // Radial contact shadow
    const shadowGeo = new THREE.PlaneGeometry(5.2, 3.2);
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const grad = ctx.createRadialGradient(128, 128, 20, 128, 128, 120);
      grad.addColorStop(0, 'rgba(15, 23, 42, 0.55)');
      grad.addColorStop(0.5, 'rgba(15, 23, 42, 0.25)');
      grad.addColorStop(1, 'rgba(15, 23, 42, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 256, 256);
    }
    const shadowTexture = new THREE.CanvasTexture(canvas);
    shadowTexture.colorSpace = THREE.SRGBColorSpace;
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTexture,
      transparent: true,
      opacity: 0.85,
      depthWrite: false,
    });
    const contactShadow = new THREE.Mesh(shadowGeo, shadowMat);
    contactShadow.rotation.x = -Math.PI / 2;
    contactShadow.position.y = 0.005;
    scene.add(contactShadow);

    // Blue showroom ring marking
    const ringGeo = new THREE.RingGeometry(2.8, 2.84, 64);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x93c5fd,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.7,
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = -Math.PI / 2;
    ringMesh.position.y = 0.004;
    scene.add(ringMesh);

    // ==========================================
    // PROCEDURAL 3D CAR HIERARCHICAL MODEL
    // ==========================================
    const carRoot = new THREE.Group();
    scene.add(carRoot);

    const bodyMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(selectedColor.color),
      metalness: selectedColor.metalness,
      roughness: selectedColor.roughness,
      clearcoat: selectedColor.clearcoat,
      clearcoatRoughness: 0.1,
    });
    stateRef.current.carBodyMaterial = bodyMat;

    const darkAccentMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      roughness: 0.4,
      metalness: 0.3,
    });

    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0xdbeafe,
      metalness: 0.1,
      roughness: 0.05,
      transmission: isSoftwareGl ? 0 : 0.9,
      transparent: true,
      opacity: isSoftwareGl ? 0.35 : 1.0,
      ior: 1.5,
    });

    const chromeMat = new THREE.MeshStandardMaterial({
      color: 0xf8fafc,
      metalness: 0.95,
      roughness: 0.1,
    });

    const brakeRotorMat = new THREE.MeshStandardMaterial({
      color: 0x94a3b8,
      metalness: 0.88,
      roughness: 0.25,
    });

    // Milestone Blue Calipers
    const milestoneBlueMat = new THREE.MeshStandardMaterial({
      color: 0x1d4ed8,
      metalness: 0.5,
      roughness: 0.25,
    });

    const rubberMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      roughness: 0.85,
      metalness: 0.05,
    });

    const headlightMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      emissive: 0x60a5fa,
      emissiveIntensity: 0.6,
      roughness: 0.1,
    });

    const taillightMat = new THREE.MeshStandardMaterial({
      color: 0x2563eb,
      emissive: 0x1d4ed8,
      emissiveIntensity: 0.8,
      roughness: 0.2,
    });

    // 1. Lower Chassis
    const chassisGeo = new THREE.BoxGeometry(1.68, 0.18, 4.0);
    const chassis = new THREE.Mesh(chassisGeo, darkAccentMat);
    chassis.position.set(0, 0.26, 0);
    chassis.castShadow = !isSoftwareGl;
    chassis.receiveShadow = !isSoftwareGl;
    carRoot.add(chassis);

    // 2. Main Body Base
    const mainBodyGroup = new THREE.Group();
    carRoot.add(mainBodyGroup);

    const bodyLowerGeo = new THREE.BoxGeometry(1.72, 0.44, 3.8);
    const bodyLower = new THREE.Mesh(bodyLowerGeo, bodyMat);
    bodyLower.position.set(0, 0.46, 0);
    bodyLower.castShadow = !isSoftwareGl;
    bodyLower.receiveShadow = !isSoftwareGl;
    mainBodyGroup.add(bodyLower);
    stateRef.current.carParts.push(bodyLower);

    // Front Bumper
    const frontBumperGeo = new THREE.BoxGeometry(1.7, 0.38, 0.6);
    const frontBumper = new THREE.Mesh(frontBumperGeo, bodyMat);
    frontBumper.position.set(0, 0.42, 2.05);
    frontBumper.castShadow = !isSoftwareGl;
    mainBodyGroup.add(frontBumper);
    stateRef.current.carParts.push(frontBumper);

    // Lower Front Splitter
    const splitterGeo = new THREE.BoxGeometry(1.74, 0.06, 0.7);
    const splitter = new THREE.Mesh(splitterGeo, darkAccentMat);
    splitter.position.set(0, 0.22, 2.15);
    mainBodyGroup.add(splitter);

    // Front Grille Mesh
    const grilleGeo = new THREE.BoxGeometry(1.1, 0.18, 0.06);
    const grille = new THREE.Mesh(grilleGeo, darkAccentMat);
    grille.position.set(0, 0.38, 2.36);
    mainBodyGroup.add(grille);

    // Rear Bumper
    const rearBumperGeo = new THREE.BoxGeometry(1.7, 0.44, 0.5);
    const rearBumper = new THREE.Mesh(rearBumperGeo, bodyMat);
    rearBumper.position.set(0, 0.46, -2.05);
    rearBumper.castShadow = !isSoftwareGl;
    mainBodyGroup.add(rearBumper);
    stateRef.current.carParts.push(rearBumper);

    // 3. Cabin & Glass Roof Canopy
    const cabinGroup = new THREE.Group();
    carRoot.add(cabinGroup);

    const cabinRoofGeo = new THREE.BoxGeometry(1.36, 0.42, 1.85);
    const cabinRoof = new THREE.Mesh(cabinRoofGeo, bodyMat);
    cabinRoof.position.set(0, 0.86, -0.15);
    cabinRoof.castShadow = !isSoftwareGl;
    cabinGroup.add(cabinRoof);
    stateRef.current.carParts.push(cabinRoof);

    // Windshield & Windows
    const windshieldGeo = new THREE.BoxGeometry(1.32, 0.42, 0.06);
    const windshield = new THREE.Mesh(windshieldGeo, glassMat);
    windshield.position.set(0, 0.78, 0.88);
    windshield.rotation.x = -Math.PI / 5.2;
    cabinGroup.add(windshield);

    const rearGlassGeo = new THREE.BoxGeometry(1.3, 0.4, 0.06);
    const rearGlass = new THREE.Mesh(rearGlassGeo, glassMat);
    rearGlass.position.set(0, 0.78, -1.18);
    rearGlass.rotation.x = Math.PI / 5.0;
    cabinGroup.add(rearGlass);

    // Side Windows
    const sideGlassLGeo = new THREE.BoxGeometry(0.04, 0.32, 1.6);
    const sideGlassL = new THREE.Mesh(sideGlassLGeo, glassMat);
    sideGlassL.position.set(-0.68, 0.84, -0.15);
    cabinGroup.add(sideGlassL);
    const sideGlassR = sideGlassL.clone();
    sideGlassR.position.x = 0.68;
    cabinGroup.add(sideGlassR);

    // Headlights (LED strips)
    const headlightGeo = new THREE.BoxGeometry(0.36, 0.1, 0.1);
    const headlightL = new THREE.Mesh(headlightGeo, headlightMat);
    headlightL.position.set(-0.62, 0.54, 2.26);
    mainBodyGroup.add(headlightL);
    const headlightR = headlightL.clone();
    headlightR.position.x = 0.62;
    mainBodyGroup.add(headlightR);

    // Taillight bar
    const taillightGeo = new THREE.BoxGeometry(1.48, 0.08, 0.08);
    const taillight = new THREE.Mesh(taillightGeo, taillightMat);
    taillight.position.set(0, 0.6, -2.26);
    mainBodyGroup.add(taillight);

    // 4. ANIMATED HOOD
    const hoodGroup = new THREE.Group();
    hoodGroup.position.set(0, 0.68, 0.9);
    carRoot.add(hoodGroup);
    stateRef.current.explodedComponents.hood = hoodGroup;

    const hoodMeshGeo = new THREE.BoxGeometry(1.5, 0.06, 1.25);
    const hoodMesh = new THREE.Mesh(hoodMeshGeo, bodyMat);
    hoodMesh.position.set(0, 0, 0.6);
    hoodMesh.castShadow = !isSoftwareGl;
    hoodGroup.add(hoodMesh);
    stateRef.current.carParts.push(hoodMesh);

    // 5. ENGINE BAY MECHANICALS
    const engineGroup = new THREE.Group();
    engineGroup.position.set(0, 0.46, 1.4);
    carRoot.add(engineGroup);
    stateRef.current.explodedComponents.engine = engineGroup;

    const engineBlockGeo = new THREE.BoxGeometry(0.75, 0.35, 0.7);
    const engineBlockMat = new THREE.MeshStandardMaterial({
      color: 0x334155,
      roughness: 0.4,
      metalness: 0.7,
    });
    const engineBlock = new THREE.Mesh(engineBlockGeo, engineBlockMat);
    engineGroup.add(engineBlock);

    // Cylinder Head Cover in Milestone Royal Blue
    const headCoverGeo = new THREE.BoxGeometry(0.7, 0.08, 0.6);
    const headCover = new THREE.Mesh(headCoverGeo, milestoneBlueMat);
    headCover.position.set(0, 0.21, 0);
    engineGroup.add(headCover);

    // Chrome intake runners
    for (let i = -0.22; i <= 0.22; i += 0.14) {
      const runnerGeo = new THREE.CylinderGeometry(0.028, 0.028, 0.22, 12);
      const runner = new THREE.Mesh(runnerGeo, chromeMat);
      runner.rotation.x = Math.PI / 4;
      runner.position.set(i, 0.24, -0.16);
      engineGroup.add(runner);
    }

    // Battery Unit
    const batteryGeo = new THREE.BoxGeometry(0.32, 0.26, 0.28);
    const batteryMat = new THREE.MeshStandardMaterial({ color: 0x1e3a8a, roughness: 0.5 });
    const battery = new THREE.Mesh(batteryGeo, batteryMat);
    battery.position.set(0.55, 0.1, -0.15);
    engineGroup.add(battery);

    // 6. WHEELS WITH MILESTONE BLUE CALIPERS
    const createWheel = (isLeft: boolean) => {
      const wheelGroup = new THREE.Group();

      const tireGeo = new THREE.CylinderGeometry(0.36, 0.36, 0.26, 28);
      const tire = new THREE.Mesh(tireGeo, rubberMat);
      tire.rotation.z = Math.PI / 2;
      tire.castShadow = !isSoftwareGl;
      wheelGroup.add(tire);

      const rimRimGeo = new THREE.CylinderGeometry(0.26, 0.26, 0.27, 24, 1, true);
      const rimRim = new THREE.Mesh(rimRimGeo, chromeMat);
      rimRim.rotation.z = Math.PI / 2;
      wheelGroup.add(rimRim);

      for (let s = 0; s < 5; s++) {
        const angle = (s * Math.PI * 2) / 5;
        const spokeGeo = new THREE.BoxGeometry(0.035, 0.22, 0.035);
        const spoke = new THREE.Mesh(spokeGeo, chromeMat);
        spoke.position.set(isLeft ? -0.13 : 0.13, Math.sin(angle) * 0.12, Math.cos(angle) * 0.12);
        spoke.rotation.x = -angle;
        wheelGroup.add(spoke);
      }

      const rotorGeo = new THREE.CylinderGeometry(0.23, 0.23, 0.03, 24);
      const rotor = new THREE.Mesh(rotorGeo, brakeRotorMat);
      rotor.rotation.z = Math.PI / 2;
      rotor.position.x = isLeft ? 0.05 : -0.05;
      wheelGroup.add(rotor);

      const caliperGeo = new THREE.BoxGeometry(0.08, 0.14, 0.08);
      const caliper = new THREE.Mesh(caliperGeo, milestoneBlueMat);
      caliper.position.set(isLeft ? 0.05 : -0.05, 0.14, 0.02);
      wheelGroup.add(caliper);

      return wheelGroup;
    };

    const wheelFL = createWheel(true);
    wheelFL.position.set(-0.88, 0.36, 1.35);
    carRoot.add(wheelFL);
    stateRef.current.explodedComponents.wheelFL = wheelFL;

    const wheelFR = createWheel(false);
    wheelFR.position.set(0.88, 0.36, 1.35);
    carRoot.add(wheelFR);
    stateRef.current.explodedComponents.wheelFR = wheelFR;

    const wheelRL = createWheel(true);
    wheelRL.position.set(-0.88, 0.36, -1.35);
    carRoot.add(wheelRL);
    stateRef.current.explodedComponents.wheelRL = wheelRL;

    const wheelRR = createWheel(false);
    wheelRR.position.set(0.88, 0.36, -1.35);
    carRoot.add(wheelRR);
    stateRef.current.explodedComponents.wheelRR = wheelRR;

    if (!isSoftwareGl) {
      renderer.compile(scene, camera);
    }

    let frameId = 0;
    const tempVec = new THREE.Vector3();

    const tick = () => {
      camera.position.lerp(stateRef.current.targetCameraPos, 0.05);
      controls.target.lerp(stateRef.current.targetLookAt, 0.05);
      controls.update();

      const targetExploded = isExploded ? 1.0 : 0.0;
      stateRef.current.explodedProgress = THREE.MathUtils.damp(
        stateRef.current.explodedProgress,
        targetExploded,
        5.0,
        0.016
      );

      const ep = stateRef.current.explodedProgress;
      wheelFL.position.x = -0.88 - ep * 0.7;
      wheelFR.position.x = 0.88 + ep * 0.7;
      wheelRL.position.x = -0.88 - ep * 0.7;
      wheelRR.position.x = 0.88 + ep * 0.7;
      engineGroup.position.y = 0.46 + ep * 0.45;

      const targetHood = isHoodOpen || isExploded ? 1.0 : 0.0;
      stateRef.current.hoodProgress = THREE.MathUtils.damp(
        stateRef.current.hoodProgress,
        targetHood,
        4.0,
        0.016
      );
      hoodGroup.rotation.x = -stateRef.current.hoodProgress * (Math.PI / 4.5);

      renderer.render(scene, camera);

      if (container) {
        const rect = container.getBoundingClientRect();
        const positions = CAR_HOTSPOTS.map((h) => {
          tempVec.set(h.position[0], h.position[1], h.position[2]);
          if (h.id === 'engine-bay' || h.id === 'battery-system') {
            tempVec.y += ep * 0.45;
          } else if (h.id === 'front-brakes') {
            tempVec.x -= ep * 0.7;
          }

          tempVec.project(camera);
          const isBehind = tempVec.z > 1.0;
          const x = (tempVec.x * 0.5 + 0.5) * rect.width;
          const y = (-(tempVec.y * 0.5) + 0.5) * rect.height;

          return {
            id: h.id,
            x,
            y,
            visible: !isBehind && x > 20 && x < rect.width - 20 && y > 20 && y < rect.height - 20,
          };
        });
        setHotspotScreenPositions(positions);
      }

      frameId = requestAnimationFrame(tick);
    };

    tick();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      scene.clear();
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  useEffect(() => {
    if (stateRef.current.carBodyMaterial) {
      stateRef.current.carBodyMaterial.color.set(selectedColor.color);
      stateRef.current.carBodyMaterial.metalness = selectedColor.metalness;
      stateRef.current.carBodyMaterial.roughness = selectedColor.roughness;
      stateRef.current.carBodyMaterial.clearcoat = selectedColor.clearcoat;
    }
  }, [selectedColor]);

  useEffect(() => {
    stateRef.current.carParts.forEach((part) => {
      if (part.material instanceof THREE.Material) {
        (part.material as any).wireframe = isWireframe;
      }
    });
  }, [isWireframe]);

  useEffect(() => {
    if (stateRef.current.controls) {
      stateRef.current.controls.autoRotate = autoRotate;
    }
  }, [autoRotate]);

  const setCameraPreset = (view: 'orbit' | 'engine' | 'brakes' | 'rear' | 'top') => {
    if (!stateRef.current.camera || !stateRef.current.controls) return;
    setAutoRotate(false);

    switch (view) {
      case 'orbit':
        stateRef.current.targetCameraPos.set(4.2, 2.0, 4.6);
        stateRef.current.targetLookAt.set(0, 0.4, 0);
        setIsHoodOpen(false);
        break;
      case 'engine':
        stateRef.current.targetCameraPos.set(0.0, 2.4, 2.8);
        stateRef.current.targetLookAt.set(0, 0.5, 1.4);
        setIsHoodOpen(true);
        break;
      case 'brakes':
        stateRef.current.targetCameraPos.set(-2.4, 0.6, 1.8);
        stateRef.current.targetLookAt.set(-0.9, 0.35, 1.35);
        break;
      case 'rear':
        stateRef.current.targetCameraPos.set(0.0, 1.4, -4.2);
        stateRef.current.targetLookAt.set(0, 0.4, -1.5);
        break;
      case 'top':
        stateRef.current.targetCameraPos.set(0.1, 6.2, 0.1);
        stateRef.current.targetLookAt.set(0, 0.4, 0);
        break;
    }
  };

  const handleSelectHotspot = (hotspot: HotspotInfo) => {
    setActiveHotspot(hotspot);
    setAutoRotate(false);

    if (hotspot.id === 'engine-bay' || hotspot.id === 'battery-system') {
      setIsHoodOpen(true);
      stateRef.current.targetCameraPos.set(0.2, 2.2, 2.9);
      stateRef.current.targetLookAt.set(hotspot.position[0], hotspot.position[1], hotspot.position[2]);
    } else if (hotspot.id === 'front-brakes') {
      stateRef.current.targetCameraPos.set(-2.5, 0.7, 1.9);
      stateRef.current.targetLookAt.set(-0.9, 0.35, 1.35);
    } else if (hotspot.id === 'exhaust-system') {
      stateRef.current.targetCameraPos.set(0.2, 1.2, -3.8);
      stateRef.current.targetLookAt.set(0, 0.4, -1.9);
    } else {
      stateRef.current.targetLookAt.set(hotspot.position[0], hotspot.position[1], hotspot.position[2]);
    }
  };

  return (
    <div className="relative w-full h-[600px] md:h-[660px] bg-slate-50 overflow-hidden rounded-2xl border-2 border-blue-200 shadow-xl select-none">
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Top Bar HUD (Pure Blue & White) */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none z-10">
        <div className="pointer-events-auto bg-white/95 border border-blue-200 rounded-xl px-4 py-2.5 shadow-md">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-xs sm:text-sm text-blue-950">
              3D Vehicle Diagnostic Twin
            </span>
            <span className="text-blue-300">·</span>
            <span className="text-xs text-blue-600 font-bold">Madhura Nagar Garage</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-0.5">
            Click any mechanical point to inspect health and view Hyderabad service pricing
          </p>
        </div>

        <div className="pointer-events-auto flex items-center gap-2 bg-white/95 border border-blue-200 rounded-xl p-1.5 shadow-md">
          <button
            onClick={() => setAutoRotate(!autoRotate)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
              autoRotate ? 'bg-blue-600 text-white' : 'text-slate-600 hover:text-blue-600'
            }`}
          >
            <Rotate3d className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">360° Spin</span>
          </button>
          <button
            onClick={() => {
              setIsHoodOpen(!isHoodOpen);
              if (!isHoodOpen) setCameraPreset('engine');
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
              isHoodOpen ? 'bg-blue-600 text-white' : 'text-slate-600 hover:text-blue-600'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Hood {isHoodOpen ? 'Open' : 'Closed'}</span>
          </button>
          <button
            onClick={() => setIsExploded(!isExploded)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
              isExploded ? 'bg-blue-600 text-white' : 'text-slate-600 hover:text-blue-600'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Exploded View</span>
          </button>
        </div>
      </div>

      {/* 3D Hotspot Badges (Blue and White) */}
      {hotspotScreenPositions.map((pos) => {
        if (!pos.visible) return null;
        const hotspot = CAR_HOTSPOTS.find((h) => h.id === pos.id);
        if (!hotspot) return null;
        const isSelected = activeHotspot?.id === hotspot.id;

        return (
          <div
            key={pos.id}
            style={{
              position: 'absolute',
              left: `${pos.x}px`,
              top: `${pos.y}px`,
              transform: 'translate(-50%, -50%)',
            }}
            className="pointer-events-auto z-10 transition-transform hover:scale-105"
          >
            <button
              onClick={() => handleSelectHotspot(hotspot)}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold shadow-lg transition-all ${
                isSelected
                  ? 'bg-blue-600 text-white ring-4 ring-blue-200'
                  : 'bg-white border-2 border-blue-400 text-blue-950 hover:border-blue-600'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-blue-600" />
              <span className="whitespace-nowrap">{hotspot.title}</span>
              <span className="font-mono text-[10px] opacity-90">{hotspot.health}%</span>
            </button>
          </div>
        );
      })}

      {/* Active Hotspot Inspector Card (Blue and White) */}
      {activeHotspot && (
        <div className="absolute top-20 right-4 w-80 sm:w-96 bg-white border-2 border-blue-200 rounded-2xl p-5 shadow-2xl z-20 pointer-events-auto">
          <div className="flex items-start justify-between gap-3 pb-3 border-b border-blue-100">
            <div>
              <div className="flex items-center gap-2 text-[11px] text-blue-600 font-bold uppercase tracking-wider">
                <span>{activeHotspot.system}</span>
                <span>·</span>
                <span>Diagnostics Point</span>
              </div>
              <h4 className="text-base font-black text-blue-950 mt-0.5">{activeHotspot.partName}</h4>
            </div>
            <button
              onClick={() => setActiveHotspot(null)}
              className="text-slate-400 hover:text-slate-700 p-1 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="mt-3 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-500 font-medium">Estimated Health:</span>
              <span className="font-mono font-bold text-blue-700">
                {activeHotspot.health}% - {activeHotspot.health > 75 ? 'Good' : 'Checkup Advised'}
              </span>
            </div>
            <div className="w-full h-2 bg-blue-100 rounded-full overflow-hidden">
              <div className="h-full bg-blue-600" style={{ width: `${activeHotspot.health}%` }} />
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">{activeHotspot.description}</p>

            {/* Price Box */}
            <div className="p-3 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-blue-700 font-bold uppercase block">
                  Milestone Hyderabad Service
                </span>
                <span className="text-xs font-bold text-blue-950">{activeHotspot.doorstepService}</span>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-slate-500 block">Starts From</span>
                <span className="text-sm font-extrabold text-blue-700 font-mono">
                  ₹{activeHotspot.servicePrice}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              <a
                href={createWhatsAppUrl(
                  `Hello Milestone Garage! I am inspecting your 3D Car model and want to book service for: ${activeHotspot.partName} (${activeHotspot.doorstepService}). My phone is WhatsApp.`
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 px-3 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp Us</span>
              </a>

              <button
                onClick={() => {
                  if (onBookDoorstep) onBookDoorstep(activeHotspot.servicePackageId);
                }}
                className="flex items-center justify-center gap-1.5 px-3 py-2.5 border-2 border-blue-600 text-blue-600 hover:bg-blue-50 rounded-xl text-xs font-bold transition-colors"
              >
                <Wrench className="w-3.5 h-3.5" />
                <span>Book Service</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Ergonomic Bottom Dock (Blue & White) */}
      <div
        className={`absolute bottom-4 left-1/2 -translate-x-1/2 w-[94%] max-w-4xl z-20 transition-transform duration-300 pointer-events-auto ${
          isDockCollapsed ? 'translate-y-[calc(100%-38px)]' : 'translate-y-0'
        }`}
      >
        <div className="bg-white/95 border-2 border-blue-200 rounded-2xl shadow-xl overflow-hidden backdrop-blur-md">
          <div className="flex items-center justify-between px-4 py-2 border-b border-blue-100 bg-blue-50/50">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab('inspect')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors ${
                  activeTab === 'inspect' ? 'bg-blue-600 text-white' : 'text-slate-600 hover:text-blue-600'
                }`}
              >
                Inspection Points
              </button>
              <button
                onClick={() => setActiveTab('paint')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors ${
                  activeTab === 'paint' ? 'bg-blue-600 text-white' : 'text-slate-600 hover:text-blue-600'
                }`}
              >
                Blue &amp; White Finishes
              </button>
              <button
                onClick={() => setActiveTab('camera')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors ${
                  activeTab === 'camera' ? 'bg-blue-600 text-white' : 'text-slate-600 hover:text-blue-600'
                }`}
              >
                Camera Angles
              </button>
            </div>

            <button
              onClick={() => setIsDockCollapsed(!isDockCollapsed)}
              className="flex items-center gap-1 text-xs text-slate-500 hover:text-blue-600 transition-colors px-2 py-1"
            >
              {isDockCollapsed ? (
                <>
                  <ChevronUp className="w-3.5 h-3.5" />
                  <span>Show Controls</span>
                </>
              ) : (
                <>
                  <ChevronDown className="w-3.5 h-3.5" />
                  <span>Hide Controls</span>
                </>
              )}
            </button>
          </div>

          <div className="p-3">
            {activeTab === 'inspect' && (
              <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
                {CAR_HOTSPOTS.map((h) => {
                  const isSelected = activeHotspot?.id === h.id;
                  return (
                    <button
                      key={h.id}
                      onClick={() => handleSelectHotspot(h)}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-all ${
                        isSelected
                          ? 'bg-blue-600 text-white shadow-sm'
                          : 'bg-blue-50 border border-blue-200 text-blue-950 hover:border-blue-400'
                      }`}
                    >
                      <span className="w-2 h-2 rounded-full bg-blue-600" />
                      <span>{h.title}</span>
                      <span className="text-[10px] font-mono opacity-80">₹{h.servicePrice}</span>
                    </button>
                  );
                })}
              </div>
            )}

            {activeTab === 'paint' && (
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2 overflow-x-auto pb-1">
                  {COLOR_FINISHES.map((finish) => {
                    const isSelected = selectedColor.name === finish.name;
                    return (
                      <button
                        key={finish.name}
                        onClick={() => setSelectedColor(finish)}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-all ${
                          isSelected
                            ? 'bg-blue-50 border-2 border-blue-600 text-blue-950'
                            : 'bg-white border border-blue-200 text-slate-600 hover:text-blue-600'
                        }`}
                      >
                        <span
                          className="w-3.5 h-3.5 rounded-full border border-slate-300 shadow-inner"
                          style={{ backgroundColor: finish.color }}
                        />
                        <span>{finish.name}</span>
                      </button>
                    );
                  })}
                </div>

                <button
                  onClick={() => setIsWireframe(!isWireframe)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors shrink-0 ${
                    isWireframe ? 'bg-blue-600 text-white' : 'bg-blue-50 text-blue-800'
                  }`}
                >
                  X-Ray Wireframe
                </button>
              </div>
            )}

            {activeTab === 'camera' && (
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                <button
                  onClick={() => setCameraPreset('orbit')}
                  className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-900 border border-blue-200 rounded-xl text-xs font-bold transition-colors shrink-0"
                >
                  360° Studio Orbit
                </button>
                <button
                  onClick={() => setCameraPreset('engine')}
                  className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-900 border border-blue-200 rounded-xl text-xs font-bold transition-colors shrink-0"
                >
                  Front Engine Bay
                </button>
                <button
                  onClick={() => setCameraPreset('brakes')}
                  className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-900 border border-blue-200 rounded-xl text-xs font-bold transition-colors shrink-0"
                >
                  Front Brakes &amp; Wheels
                </button>
                <button
                  onClick={() => setCameraPreset('rear')}
                  className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-900 border border-blue-200 rounded-xl text-xs font-bold transition-colors shrink-0"
                >
                  Rear &amp; Exhaust
                </button>
                <button
                  onClick={() => setCameraPreset('top')}
                  className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-900 border border-blue-200 rounded-xl text-xs font-bold transition-colors shrink-0"
                >
                  Top-Down
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
