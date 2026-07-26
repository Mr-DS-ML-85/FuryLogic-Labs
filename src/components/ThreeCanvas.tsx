import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RotateCcw, Eye, Layers, Sparkles, Monitor } from 'lucide-react';

interface ThreeCanvasProps {
  modelType?: 'hero' | 'strikedb' | 'chimera' | 'mips' | 'vugva' | 'polyglot' | 'opusedge' | 'rtl8188fu';
  accentColor?: string;
  interactive?: boolean;
  className?: string;
  showControls?: boolean;
}

export const ThreeCanvas: React.FC<ThreeCanvasProps> = ({
  modelType = 'hero',
  accentColor = '#00f3ff',
  interactive = true,
  className = 'h-96 w-full',
  showControls = true
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const canvas2dRef = useRef<HTMLCanvasElement>(null);

  const [wireframe, setWireframe] = useState<boolean>(false);
  const [exploded, setExploded] = useState<boolean>(false);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [activePreset, setActivePreset] = useState<string>(modelType);
  const [isWebGlSupported, setIsWebGlSupported] = useState<boolean>(true);

  const sceneRef = useRef<THREE.Scene | null>(null);
  const mainGroupRef = useRef<THREE.Group | null>(null);
  const particlesGroupRef = useRef<THREE.Points | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);

  // Fallback 2D angle tracking
  const rotation2D = useRef({ x: 0.3, y: 0.5 });
  const isDragging2D = useRef(false);
  const prevMouse2D = useRef({ x: 0, y: 0 });

  useEffect(() => {
    setActivePreset(modelType);
  }, [modelType]);

  // Attempt WebGL Initialization with Graceful Fallback to 2D Canvas
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let renderer: THREE.WebGLRenderer | null = null;
    let isWebGlOk = true;

    // First check if WebGL is supported by the browser/environment quietly without triggering Three.js errors
    const checkWebGL = (): boolean => {
      try {
        const testCanvas = document.createElement('canvas');
        const gl = testCanvas.getContext('webgl') || testCanvas.getContext('experimental-webgl') || testCanvas.getContext('webgl2');
        return !!(window.WebGLRenderingContext && gl);
      } catch (e) {
        return false;
      }
    };

    if (!checkWebGL()) {
      setIsWebGlSupported(false);
      return;
    }

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 400;

    // Check if WebGL context can be created
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: false,
        alpha: true,
        failIfMajorPerformanceCaveat: false,
        precision: 'mediump'
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      rendererRef.current = renderer;
    } catch (err) {
      console.warn('WebGL context creation failed. Switching to 2D Vector Canvas simulation mode.', err);
      isWebGlOk = false;
      setIsWebGlSupported(false);
    }

    if (!isWebGlOk || !renderer) {
      return;
    }

    setIsWebGlSupported(true);

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.fog = new THREE.FogExp2(0x060810, 0.03);

    // Camera setup
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 2, 8);
    camera.lookAt(0, 0, 0);

    // Clear previous elements
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    container.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 2.5);
    dirLight1.position.set(5, 10, 7);
    scene.add(dirLight1);

    const pointLight = new THREE.PointLight(new THREE.Color(accentColor), 4, 20);
    pointLight.position.set(0, 0, 0);
    scene.add(pointLight);

    const pointLight2 = new THREE.PointLight(0xa855f7, 3, 15);
    pointLight2.position.set(-4, -2, 3);
    scene.add(pointLight2);

    // Group for 3D Geometry
    const mainGroup = new THREE.Group();
    mainGroupRef.current = mainGroup;
    scene.add(mainGroup);

    // Build model geometry based on activePreset
    buildModelGeometry(mainGroup, activePreset, accentColor, wireframe, exploded);

    // Background Cyber Grid Floor
    const gridHelper = new THREE.GridHelper(30, 30, 0x00f3ff, 0x1e293b);
    gridHelper.position.y = -2.5;
    if (gridHelper.material instanceof THREE.Material) {
      gridHelper.material.opacity = 0.25;
      gridHelper.material.transparent = true;
    }
    scene.add(gridHelper);

    // Background Stars / Data Particles
    const particlesCount = 300;
    const positions = new Float32Array(particlesCount * 3);
    const colors = new Float32Array(particlesCount * 3);

    const colorObj = new THREE.Color(accentColor);

    for (let i = 0; i < particlesCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 15;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;

      colors[i * 3] = colorObj.r * (0.5 + Math.random() * 0.5);
      colors[i * 3 + 1] = colorObj.g * (0.5 + Math.random() * 0.5);
      colors[i * 3 + 2] = colorObj.b * (0.5 + Math.random() * 0.5);
    }

    const particlesGeo = new THREE.BufferGeometry();
    particlesGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particlesGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particlesMat = new THREE.PointsMaterial({
      size: 0.08,
      vertexColors: true,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending
    });

    const particles = new THREE.Points(particlesGeo, particlesMat);
    particlesGroupRef.current = particles;
    scene.add(particles);

    // Interaction mouse drag variables
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };

    const onMouseDown = (e: MouseEvent) => {
      if (!interactive) return;
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging || !mainGroupRef.current) return;

      const deltaMove = {
        x: e.clientX - previousMousePosition.x,
        y: e.clientY - previousMousePosition.y
      };

      mainGroupRef.current.rotation.y += deltaMove.x * 0.008;
      mainGroupRef.current.rotation.x += deltaMove.y * 0.008;

      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    const domElem = renderer.domElement;
    domElem.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    // Touch support
    let touchStart = { x: 0, y: 0 };
    const onTouchStart = (e: TouchEvent) => {
      if (!interactive || e.touches.length === 0) return;
      touchStart = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!interactive || e.touches.length === 0 || !mainGroupRef.current) return;
      const deltaX = e.touches[0].clientX - touchStart.x;
      const deltaY = e.touches[0].clientY - touchStart.y;

      mainGroupRef.current.rotation.y += deltaX * 0.008;
      mainGroupRef.current.rotation.x += deltaY * 0.008;

      touchStart = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };

    domElem.addEventListener('touchstart', onTouchStart, { passive: true });
    domElem.addEventListener('touchmove', onTouchMove, { passive: true });

    // Handle Resize
    const handleResize = () => {
      if (!container || !renderer) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };

    const resizeObserver = new ResizeObserver(() => handleResize());
    resizeObserver.observe(container);

    // Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      if (mainGroupRef.current) {
        if (autoRotate && !isDragging) {
          mainGroupRef.current.rotation.y += 0.006;
        }
        mainGroupRef.current.position.y = Math.sin(elapsedTime * 1.5) * 0.15;
      }

      if (particlesGroupRef.current) {
        particlesGroupRef.current.rotation.y = elapsedTime * 0.02;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      domElem.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      domElem.removeEventListener('touchstart', onTouchStart);
      domElem.removeEventListener('touchmove', onTouchMove);

      if (renderer && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      if (renderer) {
        renderer.dispose();
      }
    };
  }, [activePreset, accentColor, wireframe, exploded, autoRotate, interactive]);

  // 2D Vector Canvas Animation Render Loop (Fallback when WebGL is unavailable)
  useEffect(() => {
    if (isWebGlSupported) return;

    const canvas = canvas2dRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let time = 0;

    // Generate 2D fallback particles
    const particles2D = Array.from({ length: 60 }, () => ({
      x: (Math.random() - 0.5) * 400,
      y: (Math.random() - 0.5) * 300,
      z: (Math.random() - 0.5) * 400,
      size: Math.random() * 2 + 1
    }));

    const handleResize = () => {
      if (!canvas.parentElement) return;
      canvas.width = canvas.parentElement.clientWidth;
      canvas.height = canvas.parentElement.clientHeight;
    };
    handleResize();

    const resizeObs = new ResizeObserver(handleResize);
    if (canvas.parentElement) resizeObs.observe(canvas.parentElement);

    // Mouse handlers for 2D Canvas
    const onMouseDown = (e: MouseEvent) => {
      if (!interactive) return;
      isDragging2D.current = true;
      prevMouse2D.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging2D.current) return;
      const dx = e.clientX - prevMouse2D.current.x;
      const dy = e.clientY - prevMouse2D.current.y;
      rotation2D.current.y += dx * 0.01;
      rotation2D.current.x += dy * 0.01;
      prevMouse2D.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      isDragging2D.current = false;
    };

    canvas.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    const render2D = () => {
      time += 0.015;
      if (autoRotate && !isDragging2D.current) {
        rotation2D.current.y += 0.008;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      const rotX = rotation2D.current.x;
      const rotY = rotation2D.current.y;

      // Draw background grid
      ctx.strokeStyle = 'rgba(0, 243, 255, 0.08)';
      ctx.lineWidth = 1;
      const gridGap = 30;
      for (let x = 0; x < canvas.width; x += gridGap) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += gridGap) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Draw particle starfield
      particles2D.forEach((p) => {
        // Rotate particle
        const x1 = p.x * Math.cos(rotY) - p.z * Math.sin(rotY);
        const z1 = p.x * Math.sin(rotY) + p.z * Math.cos(rotY);
        const y2 = p.y * Math.cos(rotX) - z1 * Math.sin(rotX);
        const z2 = p.y * Math.sin(rotX) + z1 * Math.cos(rotX);

        const scale = 300 / (z2 + 400);
        const px = cx + x1 * scale;
        const py = cy + y2 * scale;

        ctx.fillStyle = accentColor;
        ctx.globalAlpha = Math.max(0.2, Math.min(0.8, scale));
        ctx.beginPath();
        ctx.arc(px, py, p.size * scale, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalAlpha = 1.0;

      // Projection helper
      const project = (x: number, y: number, z: number) => {
        const x1 = x * Math.cos(rotY) - z * Math.sin(rotY);
        const z1 = x * Math.sin(rotY) + z * Math.cos(rotY);
        const y2 = y * Math.cos(rotX) - z1 * Math.sin(rotX);
        const z2 = y * Math.sin(rotX) + z1 * Math.cos(rotX);
        const floatY = y2 + Math.sin(time * 2) * 10;
        const scale = 320 / (z2 + 350);
        return { x: cx + x1 * scale, y: cy + floatY * scale, scale, z: z2 };
      };

      // Get model vertices and edges
      const { vertices, edges } = get2DModelData(activePreset, exploded);

      // Render model edges
      ctx.strokeStyle = wireframe ? '#38bdf8' : accentColor;
      ctx.lineWidth = wireframe ? 1 : 2;
      ctx.shadowColor = accentColor;
      ctx.shadowBlur = wireframe ? 2 : 10;

      edges.forEach(([i, j]) => {
        const v1 = vertices[i];
        const v2 = vertices[j];
        if (!v1 || !v2) return;

        const p1 = project(v1.x, v1.y, v1.z);
        const p2 = project(v2.x, v2.y, v2.z);

        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
      });

      // Render vertex nodes
      vertices.forEach((v) => {
        const p = project(v.x, v.y, v.z);
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(p.x, p.y, wireframe ? 2 : 4, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.shadowBlur = 0;

      animId = requestAnimationFrame(render2D);
    };

    render2D();

    return () => {
      cancelAnimationFrame(animId);
      resizeObs.disconnect();
      canvas.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, [isWebGlSupported, activePreset, accentColor, wireframe, exploded, autoRotate, interactive]);

  return (
    <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-b from-[#0b0f19] via-[#080a10] to-[#040508] border border-cyan-500/20 shadow-2xl ${className}`}>
      {/* 3D WebGL Canvas Mount OR 2D Fallback Canvas */}
      {isWebGlSupported ? (
        <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />
      ) : (
        <canvas ref={canvas2dRef} className="w-full h-full cursor-grab active:cursor-grabbing block" />
      )}

      {/* Top Left Badge & Preset Switcher */}
      {showControls && (
        <div className="absolute top-3 left-3 flex items-center gap-2 z-10 bg-slate-900/80 backdrop-blur-md p-1.5 rounded-xl border border-white/10 text-xs">
          <span className={`w-2 h-2 rounded-full ${isWebGlSupported ? 'bg-cyan-400 animate-pulse' : 'bg-amber-400'}`} />
          <span className="font-mono text-cyan-300 font-semibold uppercase tracking-wider text-[11px] flex items-center gap-1.5">
            {!isWebGlSupported && <Monitor className="w-3.5 h-3.5 text-amber-400 inline" />}
            {activePreset} {isWebGlSupported ? '3D SIMULATION' : '2D VECTOR SIMULATION'}
          </span>
        </div>
      )}

      {/* Interactive Controls Overlay */}
      {showControls && (
        <div className="absolute top-3 right-3 flex items-center gap-1.5 z-10 bg-slate-900/80 backdrop-blur-md p-1.5 rounded-xl border border-white/10 text-xs text-slate-300">
          <button
            onClick={() => setWireframe(!wireframe)}
            title="Toggle Wireframe Matrix"
            className={`p-1.5 rounded-lg transition-all ${wireframe ? 'bg-cyan-500/30 text-cyan-300 border border-cyan-500/50' : 'hover:bg-slate-800 text-slate-400'}`}
          >
            <Eye className="w-4 h-4" />
          </button>
          <button
            onClick={() => setExploded(!exploded)}
            title="Exploded Assembly View"
            className={`p-1.5 rounded-lg transition-all ${exploded ? 'bg-purple-500/30 text-purple-300 border border-purple-500/50' : 'hover:bg-slate-800 text-slate-400'}`}
          >
            <Layers className="w-4 h-4" />
          </button>
          <button
            onClick={() => setAutoRotate(!autoRotate)}
            title="Toggle Auto Orbit"
            className={`p-1.5 rounded-lg transition-all ${autoRotate ? 'bg-emerald-500/30 text-emerald-300 border border-emerald-500/50' : 'hover:bg-slate-800 text-slate-400'}`}
          >
            <Sparkles className="w-4 h-4" />
          </button>
          <button
            onClick={() => {
              if (mainGroupRef.current) {
                mainGroupRef.current.rotation.set(0, 0, 0);
              }
              rotation2D.current = { x: 0.3, y: 0.5 };
            }}
            title="Reset Camera View"
            className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 transition-all"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Footer Instruction Label */}
      {interactive && (
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[10px] font-mono text-slate-500 bg-slate-950/70 backdrop-blur-sm px-3 py-1 rounded-full border border-slate-800/80 pointer-events-none">
          Click & Drag to Rotate • Toggle Views via Top Controls
        </div>
      )}
    </div>
  );
};

// 2D Vector Model Generator (used in 2D canvas fallback mode)
function get2DModelData(type: string, exploded: boolean) {
  const gap = exploded ? 40 : 0;

  const createCube = (cx: number, cy: number, cz: number, size: number) => {
    const s = size / 2;
    const vertices = [
      { x: cx - s, y: cy - s, z: cz - s },
      { x: cx + s, y: cy - s, z: cz - s },
      { x: cx + s, y: cy + s, z: cz - s },
      { x: cx - s, y: cy + s, z: cz - s },
      { x: cx - s, y: cy - s, z: cz + s },
      { x: cx + s, y: cy - s, z: cz + s },
      { x: cx + s, y: cy + s, z: cz + s },
      { x: cx - s, y: cy + s, z: cz + s }
    ];
    const edges = [
      [0, 1], [1, 2], [2, 3], [3, 0],
      [4, 5], [5, 6], [6, 7], [7, 4],
      [0, 4], [1, 5], [2, 6], [3, 7]
    ];
    return { vertices, edges };
  };

  const createOctahedron = (cx: number, cy: number, cz: number, radius: number) => {
    const vertices = [
      { x: cx, y: cy - radius, z: cz },
      { x: cx + radius, y: cy, z: cz },
      { x: cx, y: cy, z: cz + radius },
      { x: cx - radius, y: cy, z: cz },
      { x: cx, y: cy, z: cz - radius },
      { x: cx, y: cy + radius, z: cz }
    ];
    const edges = [
      [0, 1], [0, 2], [0, 3], [0, 4],
      [5, 1], [5, 2], [5, 3], [5, 4],
      [1, 2], [2, 3], [3, 4], [4, 1]
    ];
    return { vertices, edges };
  };

  const createRing = (radius: number, segments: number, cy: number = 0) => {
    const vertices = [];
    const edges = [];
    for (let i = 0; i < segments; i++) {
      const angle = (i / segments) * Math.PI * 2;
      vertices.push({ x: Math.cos(angle) * radius, y: cy, z: Math.sin(angle) * radius });
      edges.push([i, (i + 1) % segments]);
    }
    return { vertices, edges };
  };

  switch (type) {
    case 'strikedb': {
      // 3D Grid of Database Cubes
      const allVerts: { x: number; y: number; z: number }[] = [];
      const allEdges: [number, number][] = [];
      let offset = 0;

      for (let x of [-40, 40]) {
        for (let y of [-40, 40]) {
          for (let z of [-40, 40]) {
            const cube = createCube(x * (1 + gap * 0.01), y * (1 + gap * 0.01), z * (1 + gap * 0.01), 30);
            cube.vertices.forEach((v) => allVerts.push(v));
            cube.edges.forEach(([i, j]) => allEdges.push([i + offset, j + offset]));
            offset += cube.vertices.length;
          }
        }
      }
      return { vertices: allVerts, edges: allEdges };
    }

    case 'chimera': {
      const ring1 = createRing(100 + gap, 16, 0);
      const ring2 = createRing(70, 16, 0);
      const core = createOctahedron(0, 0, 0, 45 + gap * 0.5);

      const allVerts = [...ring1.vertices, ...ring2.vertices, ...core.vertices];
      const allEdges = [
        ...ring1.edges,
        ...ring2.edges.map(([i, j]) => [i + ring1.vertices.length, j + ring1.vertices.length] as [number, number]),
        ...core.edges.map(([i, j]) => [i + ring1.vertices.length + ring2.vertices.length, j + ring1.vertices.length + ring2.vertices.length] as [number, number])
      ];
      return { vertices: allVerts, edges: allEdges };
    }

    case 'mips': {
      const die = createCube(0, 0, 0, 110 + gap);
      const core = createCube(0, -15, 0, 50);
      const allVerts = [...die.vertices, ...core.vertices];
      const allEdges = [
        ...die.edges,
        ...core.edges.map(([i, j]) => [i + die.vertices.length, j + die.vertices.length] as [number, number])
      ];
      return { vertices: allVerts, edges: allEdges };
    }

    case 'vugva': {
      // 3 GPU cards + DMA ring + data flow dots
      const allVerts: { x: number; y: number; z: number }[] = [];
      const allEdges: [number, number][] = [];

      // 3 GPU cards as flat cubes
      for (let i = -1; i <= 1; i++) {
        const card = createCube(i * (60 + gap * 0.5), 0, 0, 40);
        card.vertices.forEach((v) => allVerts.push(v));
        const base = allVerts.length - card.vertices.length;
        card.edges.forEach(([a, b]) => allEdges.push([a + base, b + base]));
      }

      // DMA ring connecting them
      const ringSegs = 20;
      const ringR = 80 + gap * 0.5;
      const ringStart = allVerts.length;
      for (let i = 0; i < ringSegs; i++) {
        const angle = (i / ringSegs) * Math.PI * 2;
        allVerts.push({ x: Math.cos(angle) * ringR, y: Math.sin(angle) * 0.3, z: Math.sin(angle) * ringR });
        allEdges.push([ringStart + i, ringStart + (i + 1) % ringSegs]);
      }

      return { vertices: allVerts, edges: allEdges };
    }

    case 'polyglot': {
      // Shield shape (triangle) + scan bars + ML node
      const allVerts: { x: number; y: number; z: number }[] = [];
      const allEdges: [number, number][] = [];

      // Shield outline (hexagonal)
      const shieldR = 70 + gap * 0.3;
      const shieldStart = allVerts.length;
      for (let i = 0; i < 6; i++) {
        const angle = (i / 6) * Math.PI * 2 - Math.PI / 2;
        allVerts.push({ x: Math.cos(angle) * shieldR * 0.7, y: Math.sin(angle) * shieldR, z: 0 });
        allEdges.push([shieldStart + i, shieldStart + (i + 1) % 6]);
      }

      // Detection ring
      const ringStart = allVerts.length;
      for (let i = 0; i < 16; i++) {
        const angle = (i / 16) * Math.PI * 2;
        allVerts.push({ x: Math.cos(angle) * 45, y: Math.sin(angle) * 45, z: 0 });
        allEdges.push([ringStart + i, ringStart + (i + 1) % 16]);
      }

      // 3 scan bars
      for (let i = 0; i < 3; i++) {
        const base = allVerts.length;
        const w = 30 - i * 8;
        allVerts.push({ x: -w, y: -30 + i * 20, z: 0 });
        allVerts.push({ x: w, y: -30 + i * 20, z: 0 });
        allEdges.push([base, base + 1]);
      }

      return { vertices: allVerts, edges: allEdges };
    }

    case 'opusedge': {
      // Transformer block + KV slots (some evicted) + Δ signal arrow
      const allVerts: { x: number; y: number; z: number }[] = [];
      const allEdges: [number, number][] = [];

      // Main block
      const block = createCube(0, 0, 0, 80 + gap);
      block.vertices.forEach((v) => allVerts.push(v));
      block.edges.forEach(([a, b]) => allEdges.push([a, b]));

      // KV slots (top row — 6 evicted, 2 kept)
      for (let i = 0; i < 8; i++) {
        const base = allVerts.length;
        const x = -60 + i * 17;
        const isKept = i >= 6;
        const h = isKept ? 25 : 10;
        allVerts.push({ x: x - 5, y: 50, z: -5 });
        allVerts.push({ x: x + 5, y: 50, z: -5 });
        allVerts.push({ x: x + 5, y: 50 + h, z: -5 });
        allVerts.push({ x: x - 5, y: 50 + h, z: -5 });
        allEdges.push([base, base + 1], [base + 1, base + 2], [base + 2, base + 3], [base + 3, base]);
      }

      // Δ signal arrow (left side)
      const arrowBase = allVerts.length;
      allVerts.push({ x: -100 - gap * 0.5, y: 0, z: 0 });
      allVerts.push({ x: -80 - gap * 0.5, y: 10, z: 0 });
      allVerts.push({ x: -80 - gap * 0.5, y: -10, z: 0 });
      allEdges.push([arrowBase, arrowBase + 1], [arrowBase, arrowBase + 2]);

      return { vertices: allVerts, edges: allEdges };
    }

    case 'rtl8188fu': {
      // USB dongle body + plug + antenna + signal waves
      const allVerts: { x: number; y: number; z: number }[] = [];
      const allEdges: [number, number][] = [];

      // USB body
      const body = createCube(0, 0, 0, 50);
      body.vertices.forEach((v) => allVerts.push(v));
      body.edges.forEach(([a, b]) => allEdges.push([a, b]));

      // USB plug
      const plug = createCube(0, 0, 35 + gap * 0.5, 25);
      const plugBase = allVerts.length;
      plug.vertices.forEach((v) => allVerts.push(v));
      plug.edges.forEach(([a, b]) => allEdges.push([a + plugBase, b + plugBase]));

      // Antenna line
      const antBase = allVerts.length;
      allVerts.push({ x: 15, y: 10, z: -10 });
      allVerts.push({ x: 15, y: 40, z: -15 });
      allEdges.push([antBase, antBase + 1]);

      // Signal waves (3 arcs from antenna)
      for (let w = 1; w <= 3; w++) {
        const waveStart = allVerts.length;
        const r = w * 15 + gap * 0.3;
        for (let i = 0; i < 8; i++) {
          const angle = (i / 8) * Math.PI * 0.8 - Math.PI * 0.4;
          allVerts.push({ x: 15 + Math.cos(angle) * r, y: 40 + Math.sin(angle) * r, z: -15 });
        }
        for (let i = 0; i < 7; i++) {
          allEdges.push([waveStart + i, waveStart + i + 1]);
        }
      }

      return { vertices: allVerts, edges: allEdges };
    }

    case 'hero':
    default: {
      const octa = createOctahedron(0, 0, 0, 85 + gap);
      const ring = createRing(120 + gap, 20, 0);
      const allVerts = [...octa.vertices, ...ring.vertices];
      const allEdges = [
        ...octa.edges,
        ...ring.edges.map(([i, j]) => [i + octa.vertices.length, j + octa.vertices.length] as [number, number])
      ];
      return { vertices: allVerts, edges: allEdges };
    }
  }
}

// Helper function to build 3D geometry procedural meshes for Three.js WebGL
function buildModelGeometry(
  group: THREE.Group,
  type: string,
  accentHex: string,
  wireframe: boolean,
  exploded: boolean
) {
  const mainColor = new THREE.Color(accentHex);
  const secondaryColor = new THREE.Color('#38bdf8');
  const accentGold = new THREE.Color('#f59e0b');

  const gap = exploded ? 1.2 : 0.0;

  switch (type) {
    case 'strikedb': {
      const mat = new THREE.MeshStandardMaterial({
        color: mainColor,
        wireframe,
        roughness: 0.2,
        metalness: 0.8,
        emissive: mainColor,
        emissiveIntensity: 0.3
      });

      for (let x = -1; x <= 1; x++) {
        for (let y = -1; y <= 1; y++) {
          for (let z = -1; z <= 1; z++) {
            const geo = new THREE.BoxGeometry(0.5, 0.5, 0.5);
            const mesh = new THREE.Mesh(geo, mat);
            mesh.position.set(x * (0.6 + gap), y * (0.6 + gap), z * (0.6 + gap));
            group.add(mesh);
          }
        }
      }
      break;
    }

    case 'chimera': {
      const ringGeo = new THREE.TorusGeometry(1.6 + gap, 0.15, 16, 100);
      const ringMat = new THREE.MeshStandardMaterial({
        color: mainColor,
        wireframe,
        roughness: 0.1,
        metalness: 0.9,
        emissive: mainColor,
        emissiveIntensity: 0.5
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      group.add(ringMesh);

      const innerRingGeo = new THREE.TorusGeometry(1.1, 0.08, 16, 80);
      const innerRingMat = new THREE.MeshBasicMaterial({ color: secondaryColor, wireframe });
      const innerRing = new THREE.Mesh(innerRingGeo, innerRingMat);
      innerRing.rotation.x = Math.PI / 2;
      group.add(innerRing);

      const coreGeo = new THREE.IcosahedronGeometry(0.6 + gap * 0.5, 2);
      const coreMat = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        wireframe,
        emissive: mainColor,
        emissiveIntensity: 0.8
      });
      const core = new THREE.Mesh(coreGeo, coreMat);
      group.add(core);
      break;
    }

    case 'mips': {
      const dieGeo = new THREE.BoxGeometry(2.4, 0.2, 2.4);
      const dieMat = new THREE.MeshStandardMaterial({ color: 0x111827, metalness: 0.9, roughness: 0.2 });
      const die = new THREE.Mesh(dieGeo, dieMat);
      group.add(die);

      const coreGeo = new THREE.BoxGeometry(1.2 + gap, 0.15, 1.2 + gap);
      const coreMat = new THREE.MeshStandardMaterial({
        color: mainColor,
        wireframe,
        emissive: mainColor,
        emissiveIntensity: 0.4
      });
      const cpuCore = new THREE.Mesh(coreGeo, coreMat);
      cpuCore.position.y = 0.2;
      group.add(cpuCore);

      const pinMat = new THREE.MeshStandardMaterial({ color: accentGold, metalness: 1.0, roughness: 0.1 });
      for (let i = -1.0; i <= 1.0; i += 0.3) {
        const pinGeo = new THREE.BoxGeometry(0.08, 0.08, 0.3);
        const pin1 = new THREE.Mesh(pinGeo, pinMat);
        pin1.position.set(i, -0.1, 1.35 + gap);
        group.add(pin1);

        const pin2 = new THREE.Mesh(pinGeo, pinMat);
        pin2.position.set(i, -0.1, -1.35 - gap);
        group.add(pin2);
      }
      break;
    }

    case 'vugva': {
      // Multiple GPU cards connected by DMA ring — VRAM virtualization
      const cardMat = new THREE.MeshStandardMaterial({
        color: mainColor,
        wireframe,
        roughness: 0.2,
        metalness: 0.8,
        emissive: mainColor,
        emissiveIntensity: 0.3
      });

      // 3 GPU cards
      for (let i = 0; i < 3; i++) {
        const cardGeo = new THREE.BoxGeometry(0.9, 0.08, 1.4);
        const card = new THREE.Mesh(cardGeo, cardMat);
        card.position.set((i - 1) * (1.2 + gap), 0, 0);
        group.add(card);

        // VRAM chip on each card
        const chipGeo = new THREE.BoxGeometry(0.5, 0.12, 0.3);
        const chipMat = new THREE.MeshStandardMaterial({ color: 0x1f2937, metalness: 0.9 });
        const chip = new THREE.Mesh(chipGeo, chipMat);
        chip.position.set((i - 1) * (1.2 + gap), 0.1, 0);
        group.add(chip);
      }

      // DMA descriptor ring connecting all cards
      const ringGeo = new THREE.TorusGeometry(2.0 + gap * 0.5, 0.06, 8, 64);
      const ringMat = new THREE.MeshBasicMaterial({ color: accentGold });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = Math.PI / 2;
      group.add(ring);

      // Data flow particles along ring (small spheres)
      for (let i = 0; i < 6; i++) {
        const angle = (i / 6) * Math.PI * 2;
        const dotGeo = new THREE.SphereGeometry(0.06, 8, 8);
        const dotMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
        const dot = new THREE.Mesh(dotGeo, dotMat);
        dot.position.set(Math.cos(angle) * 2.0, 0.3, Math.sin(angle) * 2.0);
        group.add(dot);
      }
      break;
    }

    case 'polyglot': {
      // Shield shape with layered scan lines — defensive security scanner
      // Outer shield body
      const shieldGeo = new THREE.CylinderGeometry(0, 1.2 + gap * 0.3, 1.8, 6);
      const shieldMat = new THREE.MeshStandardMaterial({
        color: mainColor,
        wireframe,
        roughness: 0.3,
        metalness: 0.7,
        emissive: mainColor,
        emissiveIntensity: 0.3
      });
      const shield = new THREE.Mesh(shieldGeo, shieldMat);
      shield.rotation.x = Math.PI;
      group.add(shield);

      // Inner detection ring
      const scanGeo = new THREE.TorusGeometry(0.9, 0.08, 8, 32);
      const scanMat = new THREE.MeshBasicMaterial({ color: secondaryColor });
      const scan = new THREE.Mesh(scanGeo, scanMat);
      scan.rotation.x = Math.PI / 2;
      scan.position.y = 0.2;
      group.add(scan);

      // YARA rule indicator bars (3 horizontal bars)
      for (let i = 0; i < 3; i++) {
        const barGeo = new THREE.BoxGeometry(0.8 - i * 0.2, 0.06, 0.06);
        const barMat = new THREE.MeshStandardMaterial({ color: accentGold, emissive: accentGold, emissiveIntensity: 0.5 });
        const bar = new THREE.Mesh(barGeo, barMat);
        bar.position.set(0, -0.3 + i * 0.25, 0.5);
        group.add(bar);
      }

      // ML detection node
      const mlGeo = new THREE.OctahedronGeometry(0.25, 0);
      const mlMat = new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: mainColor, emissiveIntensity: 0.8 });
      const ml = new THREE.Mesh(mlGeo, mlMat);
      ml.position.y = 0.6;
      group.add(ml);
      break;
    }

    case 'opusedge': {
      // Transformer block with Δ signal flowing through — KV cache eviction visualization
      // Main transformer block
      const blockGeo = new THREE.BoxGeometry(1.6 + gap, 0.8, 1.0);
      const blockMat = new THREE.MeshStandardMaterial({
        color: mainColor,
        wireframe,
        roughness: 0.2,
        metalness: 0.8,
        emissive: mainColor,
        emissiveIntensity: 0.3
      });
      const block = new THREE.Mesh(blockGeo, blockMat);
      group.add(block);

      // KV cache slots (top row — some evicted)
      for (let i = 0; i < 8; i++) {
        const slotGeo = new THREE.BoxGeometry(0.14, 0.3, 0.14);
        const isEvicted = i < 6; // 75% evicted
        const slotMat = new THREE.MeshStandardMaterial({
          color: isEvicted ? 0x374151 : mainColor,
          wireframe,
          emissive: isEvicted ? 0x000000 : mainColor,
          emissiveIntensity: isEvicted ? 0 : 0.6
        });
        const slot = new THREE.Mesh(slotGeo, slotMat);
        slot.position.set(-0.63 + i * 0.18, 0.55, 0);
        group.add(slot);
      }

      // Δ signal flowing in (arrow from left)
      const arrowGeo = new THREE.ConeGeometry(0.12, 0.4, 8);
      const arrowMat = new THREE.MeshBasicMaterial({ color: accentGold });
      const arrow = new THREE.Mesh(arrowGeo, arrowMat);
      arrow.position.set(-1.3 - gap * 0.5, 0, 0);
      arrow.rotation.z = -Math.PI / 2;
      group.add(arrow);

      // Signal line
      const lineGeo = new THREE.CylinderGeometry(0.02, 0.02, 0.6, 8);
      const lineMat = new THREE.MeshBasicMaterial({ color: accentGold });
      const line = new THREE.Mesh(lineGeo, lineMat);
      line.position.set(-1.0 - gap * 0.5, 0, 0);
      line.rotation.z = Math.PI / 2;
      group.add(line);

      // Output reduced cache (right side)
      const outGeo = new THREE.BoxGeometry(0.3, 0.5, 0.3);
      const outMat = new THREE.MeshStandardMaterial({ color: 0x10b981, wireframe, emissive: 0x10b981, emissiveIntensity: 0.5 });
      const out = new THREE.Mesh(outGeo, outMat);
      out.position.set(1.3 + gap * 0.5, 0, 0);
      group.add(out);
      break;
    }

    case 'rtl8188fu': {
      // USB WiFi adapter with antenna and signal waves
      // USB dongle body
      const bodyGeo = new THREE.BoxGeometry(0.5, 0.2, 1.2);
      const bodyMat = new THREE.MeshStandardMaterial({ color: 0x1f2937, metalness: 0.8, roughness: 0.3 });
      const body = new THREE.Mesh(bodyGeo, bodyMat);
      group.add(body);

      // USB connector
      const plugGeo = new THREE.BoxGeometry(0.35, 0.14, 0.4);
      const plugMat = new THREE.MeshStandardMaterial({ color: 0xe5e7eb, metalness: 1.0, roughness: 0.1 });
      const plug = new THREE.Mesh(plugGeo, plugMat);
      plug.position.z = 0.8 + gap;
      group.add(plug);

      // Antenna nub
      const antGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.6, 8);
      const antMat = new THREE.MeshStandardMaterial({ color: mainColor, metalness: 0.9 });
      const ant = new THREE.Mesh(antGeo, antMat);
      ant.position.set(0.15, 0.4, -0.2);
      ant.rotation.z = -0.3;
      group.add(ant);

      // WiFi signal waves (3 arcs)
      for (let i = 1; i <= 3; i++) {
        const waveGeo = new THREE.TorusGeometry(i * 0.35 + gap * 0.3, 0.03, 8, 24, Math.PI);
        const waveMat = new THREE.MeshBasicMaterial({ color: mainColor });
        const wave = new THREE.Mesh(waveGeo, waveMat);
        wave.position.set(0.15, 0.7, -0.2);
        wave.rotation.z = Math.PI / 4;
        group.add(wave);
      }

      // Status LED
      const ledGeo = new THREE.SphereGeometry(0.04, 8, 8);
      const ledMat = new THREE.MeshBasicMaterial({ color: 0x22c55e });
      const led = new THREE.Mesh(ledGeo, ledMat);
      led.position.set(-0.2, 0.12, 0.3);
      group.add(led);
      break;
    }

    case 'hero':
    default: {
      const outerIcosa = new THREE.IcosahedronGeometry(1.5 + gap * 0.5, 1);
      const outerMat = new THREE.MeshStandardMaterial({
        color: mainColor,
        wireframe: true,
        emissive: mainColor,
        emissiveIntensity: 0.5
      });
      const outerMesh = new THREE.Mesh(outerIcosa, outerMat);
      group.add(outerMesh);

      const innerOcta = new THREE.OctahedronGeometry(0.9, 0);
      const innerMat = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        roughness: 0.1,
        metalness: 0.9,
        emissive: secondaryColor,
        emissiveIntensity: 0.8
      });
      const innerMesh = new THREE.Mesh(innerOcta, innerMat);
      group.add(innerMesh);

      const ringGeo = new THREE.TorusGeometry(2.2 + gap, 0.05, 16, 100);
      const ringMat = new THREE.MeshBasicMaterial({ color: accentGold });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.rotation.x = Math.PI / 3;
      group.add(ringMesh);
      break;
    }
  }
}
