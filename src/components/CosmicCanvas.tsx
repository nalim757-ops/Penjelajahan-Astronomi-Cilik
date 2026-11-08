import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Play, Pause, RotateCcw, ZoomIn, ZoomOut, Eye, Layers } from 'lucide-react';
import { CelestialBody } from '../data/spaceData';
import { cosmicAudio } from '../utils/audio';

interface CosmicCanvasProps {
  planets: CelestialBody[];
  onSelectBody: (body: CelestialBody) => void;
  selectedBodyId?: string;
}

interface Star {
  x: number;
  y: number;
  radius: number;
  alpha: number;
  twinkleSpeed: number;
}

export const CosmicCanvas: React.FC<CosmicCanvasProps> = ({
  planets,
  onSelectBody,
  selectedBodyId
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [speed, setSpeed] = useState<number>(1);
  const [showOrbits, setShowOrbits] = useState<boolean>(true);
  const [showLabels, setShowLabels] = useState<boolean>(true);
  const [zoom, setZoom] = useState<number>(1);
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [hoveredPlanet, setHoveredPlanet] = useState<CelestialBody | null>(null);

  const isDraggingRef = useRef(false);
  const lastMousePosRef = useRef({ x: 0, y: 0 });
  const anglesRef = useRef<Record<string, number>>({});
  const starsRef = useRef<Star[]>([]);
  const animationFrameRef = useRef<number | null>(null);

  // Initialize random angles and background stars
  useEffect(() => {
    const initialAngles: Record<string, number> = {};
    planets.forEach((p, idx) => {
      initialAngles[p.id] = (idx * Math.PI * 2) / planets.length;
    });
    anglesRef.current = initialAngles;

    // Generate stars
    const starList: Star[] = [];
    for (let i = 0; i < 220; i++) {
      starList.push({
        x: Math.random(),
        y: Math.random(),
        radius: Math.random() * 1.6 + 0.4,
        alpha: Math.random() * 0.7 + 0.3,
        twinkleSpeed: Math.random() * 0.03 + 0.008
      });
    }
    starsRef.current = starList;
  }, [planets]);

  // Main render loop
  const render = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2 + pan.x;
    const centerY = height / 2 + pan.y;

    // Clear background
    ctx.fillStyle = '#03050E';
    ctx.fillRect(0, 0, width, height);

    // Draw background nebula glow
    const nebulaGrad = ctx.createRadialGradient(
      centerX,
      centerY,
      50 * zoom,
      centerX,
      centerY,
      Math.max(width, height) * 0.7
    );
    nebulaGrad.addColorStop(0, 'rgba(125, 42, 232, 0.12)');
    nebulaGrad.addColorStop(0.4, 'rgba(14, 165, 233, 0.06)');
    nebulaGrad.addColorStop(1, 'rgba(3, 5, 14, 0)');
    ctx.fillStyle = nebulaGrad;
    ctx.fillRect(0, 0, width, height);

    // Draw twinkling stars
    starsRef.current.forEach((star) => {
      star.alpha += star.twinkleSpeed;
      if (star.alpha > 1 || star.alpha < 0.2) {
        star.twinkleSpeed = -star.twinkleSpeed;
      }
      ctx.beginPath();
      ctx.arc(star.x * width, star.y * height, star.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(240, 244, 255, ${Math.max(0.1, Math.min(1, star.alpha))})`;
      ctx.fill();
    });

    // Orbital scaling factor for screen fit
    const baseScale = Math.min(width, height) / 720;
    const scale = baseScale * zoom;

    // Draw Sun at center
    const sunBody = planets.find((p) => p.id === 'matahari') || planets[0];
    const sunScreenRadius = Math.max(16, (sunBody?.size || 26) * scale * 1.2);

    // Sun outer aura
    const sunGlow = ctx.createRadialGradient(
      centerX,
      centerY,
      sunScreenRadius * 0.4,
      centerX,
      centerY,
      sunScreenRadius * 2.8
    );
    sunGlow.addColorStop(0, 'rgba(255, 200, 60, 0.9)');
    sunGlow.addColorStop(0.3, 'rgba(249, 115, 22, 0.4)');
    sunGlow.addColorStop(0.8, 'rgba(239, 68, 68, 0.1)');
    sunGlow.addColorStop(1, 'rgba(239, 68, 68, 0)');
    ctx.fillStyle = sunGlow;
    ctx.beginPath();
    ctx.arc(centerX, centerY, sunScreenRadius * 2.8, 0, Math.PI * 2);
    ctx.fill();

    // Sun core
    ctx.fillStyle = '#FBBF24';
    ctx.beginPath();
    ctx.arc(centerX, centerY, sunScreenRadius, 0, Math.PI * 2);
    ctx.fill();

    if (showLabels) {
      ctx.fillStyle = '#FEF08A';
      ctx.font = 'bold 11px system-ui';
      ctx.textAlign = 'center';
      ctx.fillText('Matahari ☀️', centerX, centerY + sunScreenRadius + 14);
    }

    // Filter planets with orbitRadius > 0 (planets revolving around the Sun)
    const orbitingPlanets = planets.filter((p) => p.orbitRadius > 0);

    orbitingPlanets.forEach((planet) => {
      const orbitR = planet.orbitRadius * scale * 1.05;

      // Draw orbit path line
      if (showOrbits) {
        ctx.beginPath();
        ctx.arc(centerX, centerY, orbitR, 0, Math.PI * 2);
        ctx.strokeStyle =
          selectedBodyId === planet.id
            ? 'rgba(56, 189, 248, 0.5)'
            : 'rgba(148, 163, 184, 0.16)';
        ctx.lineWidth = selectedBodyId === planet.id ? 1.5 : 1;
        ctx.setLineDash(selectedBodyId === planet.id ? [4, 3] : [2, 4]);
        ctx.stroke();
        ctx.setLineDash([]);
      }

      // Update angle if playing
      if (isPlaying) {
        anglesRef.current[planet.id] =
          (anglesRef.current[planet.id] || 0) + planet.orbitSpeed * 0.25 * speed;
      }

      const angle = anglesRef.current[planet.id] || 0;
      const px = centerX + Math.cos(angle) * orbitR;
      const py = centerY + Math.sin(angle) * orbitR;

      const pRadius = Math.max(4, (planet.size * scale) / 2);
      const isHovered = hoveredPlanet?.id === planet.id;
      const isSelected = selectedBodyId === planet.id;

      // Highlight halo if hovered or selected
      if (isHovered || isSelected) {
        ctx.beginPath();
        ctx.arc(px, py, pRadius + 8, 0, Math.PI * 2);
        ctx.fillStyle = isSelected
          ? 'rgba(56, 189, 248, 0.35)'
          : 'rgba(250, 204, 21, 0.25)';
        ctx.fill();
        ctx.strokeStyle = isSelected ? '#38BDF8' : '#FACC15';
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      // Saturn Rings
      if (planet.id === 'saturnus') {
        ctx.save();
        ctx.translate(px, py);
        ctx.rotate(-0.4);
        ctx.beginPath();
        ctx.ellipse(0, 0, pRadius * 2.3, pRadius * 0.8, 0, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(253, 224, 71, 0.65)';
        ctx.lineWidth = Math.max(2, pRadius * 0.4);
        ctx.stroke();
        ctx.restore();
      }

      // Draw Planet Sphere
      const planetGrad = ctx.createRadialGradient(
        px - pRadius * 0.3,
        py - pRadius * 0.3,
        pRadius * 0.1,
        px,
        py,
        pRadius
      );
      planetGrad.addColorStop(0, '#FFFFFF');
      planetGrad.addColorStop(0.3, planet.color);
      planetGrad.addColorStop(1, planet.accentColor);

      ctx.beginPath();
      ctx.arc(px, py, pRadius, 0, Math.PI * 2);
      ctx.fillStyle = planetGrad;
      ctx.fill();

      // Earth's atmosphere aura
      if (planet.id === 'bumi') {
        ctx.beginPath();
        ctx.arc(px, py, pRadius + 1.8, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.5)';
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Draw planet label
      if (showLabels || isHovered || isSelected) {
        ctx.fillStyle = isSelected ? '#38BDF8' : isHovered ? '#FACC15' : '#E2E8F0';
        ctx.font = isSelected || isHovered ? 'bold 11px system-ui' : '10px system-ui';
        ctx.textAlign = 'center';
        ctx.fillText(
          `${planet.badgeEmoji} ${planet.name}`,
          px,
          py + pRadius + 12
        );
      }
    });

    animationFrameRef.current = requestAnimationFrame(render);
  }, [
    planets,
    isPlaying,
    speed,
    showOrbits,
    showLabels,
    zoom,
    pan,
    hoveredPlanet,
    selectedBodyId
  ]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (rect) {
        const dpr = window.devicePixelRatio || 1;
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        canvas.style.width = `${rect.width}px`;
        canvas.style.height = `${rect.height}px`;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.scale(dpr, dpr);
        }
      }
    };

    resize();
    window.addEventListener('resize', resize);
    animationFrameRef.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', resize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [render]);

  // Mouse & Touch handling
  const getCanvasMousePos = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  };

  const findPlanetAt = (mouseX: number, mouseY: number): CelestialBody | null => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const rect = canvas.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const centerX = width / 2 + pan.x;
    const centerY = height / 2 + pan.y;
    const baseScale = Math.min(width, height) / 720;
    const scale = baseScale * zoom;

    // Check Sun
    const sunBody = planets.find((p) => p.id === 'matahari') || planets[0];
    const sunRadius = Math.max(16, (sunBody?.size || 26) * scale * 1.2);
    const distToSun = Math.hypot(mouseX - centerX, mouseY - centerY);
    if (distToSun <= sunRadius + 6) {
      return sunBody;
    }

    // Check orbiting planets
    const orbitingPlanets = planets.filter((p) => p.orbitRadius > 0);
    for (const planet of orbitingPlanets) {
      const orbitR = planet.orbitRadius * scale * 1.05;
      const angle = anglesRef.current[planet.id] || 0;
      const px = centerX + Math.cos(angle) * orbitR;
      const py = centerY + Math.sin(angle) * orbitR;
      const pRadius = Math.max(5, (planet.size * scale) / 2);

      const dist = Math.hypot(mouseX - px, mouseY - py);
      if (dist <= pRadius + 10) {
        return planet;
      }
    }

    return null;
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const pos = getCanvasMousePos(e);

    if (isDraggingRef.current) {
      const dx = e.clientX - lastMousePosRef.current.x;
      const dy = e.clientY - lastMousePosRef.current.y;
      setPan((prev) => ({ x: prev.x + dx, y: prev.y + dy }));
      lastMousePosRef.current = { x: e.clientX, y: e.clientY };
      return;
    }

    const hit = findPlanetAt(pos.x, pos.y);
    setHoveredPlanet(hit);
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    isDraggingRef.current = true;
    lastMousePosRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUp = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const wasDraggingLong =
      Math.abs(e.clientX - lastMousePosRef.current.x) > 4 ||
      Math.abs(e.clientY - lastMousePosRef.current.y) > 4;

    isDraggingRef.current = false;

    if (!wasDraggingLong) {
      const pos = getCanvasMousePos(e);
      const hit = findPlanetAt(pos.x, pos.y);
      if (hit) {
        cosmicAudio.playChime(580);
        cosmicAudio.playWhoosh();
        onSelectBody(hit);
      }
    }
  };

  const resetView = () => {
    cosmicAudio.playPop();
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  const handleZoomIn = () => {
    cosmicAudio.playPop();
    setZoom((z) => Math.min(2.5, z + 0.25));
  };

  const handleZoomOut = () => {
    cosmicAudio.playPop();
    setZoom((z) => Math.max(0.6, z - 0.25));
  };

  return (
    <div className="relative w-full h-[520px] md:h-[620px] rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 shadow-2xl flex flex-col">
      {/* Top HUD info strip for kids */}
      <div className="absolute top-3 left-4 right-4 z-20 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
        <div className="flex items-center gap-2 pointer-events-auto bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-800 text-xs text-slate-300">
          <span className="font-semibold text-cyan-400">Peta Tata Surya Kita</span>
          <span aria-hidden="true" className="text-slate-600">·</span>
          <span>Klik planet mana saja untuk mulai menjelajah! 🚀</span>
        </div>

        {/* Orbit speed buttons & pause */}
        <div className="flex items-center gap-1.5 pointer-events-auto bg-slate-900/80 backdrop-blur-md p-1 rounded-lg border border-slate-800 text-xs">
          <button
            onClick={() => {
              cosmicAudio.playPop();
              setIsPlaying(!isPlaying);
            }}
            className="p-1.5 rounded-md text-slate-300 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            title={isPlaying ? 'Jeda Orbit' : 'Lanjutkan Orbit'}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5 text-amber-400" /> : <Play className="w-3.5 h-3.5 text-emerald-400" />}
          </button>

          <span className="text-slate-600">|</span>

          {[0.5, 1, 2].map((s) => (
            <button
              key={s}
              onClick={() => {
                cosmicAudio.playPop();
                setSpeed(s);
              }}
              className={`px-2 py-0.5 rounded text-[11px] font-mono cursor-pointer transition-colors ${
                speed === s
                  ? 'bg-cyan-500/20 text-cyan-300 font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {s}x
            </button>
          ))}
        </div>
      </div>

      {/* Main Canvas */}
      <canvas
        ref={canvasRef}
        onMouseMove={handleMouseMove}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={() => {
          isDraggingRef.current = false;
          setHoveredPlanet(null);
        }}
        className="w-full h-full cursor-grab active:cursor-grabbing block"
      />

      {/* Bottom Floating Control Bar */}
      <div className="absolute bottom-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-none">
        {/* Hovered Planet Quick Pill */}
        <div className="pointer-events-auto">
          {hoveredPlanet ? (
            <button
              onClick={() => {
                cosmicAudio.playChime(620);
                onSelectBody(hoveredPlanet);
              }}
              className="flex items-center gap-2.5 bg-slate-900/95 border border-cyan-500/40 px-3.5 py-2 rounded-xl shadow-lg backdrop-blur-md cursor-pointer hover:border-cyan-400 transition-all"
            >
              <span className="text-xl">{hoveredPlanet.badgeEmoji}</span>
              <div className="text-left">
                <div className="text-xs font-bold text-white flex items-center gap-1.5">
                  <span>{hoveredPlanet.name}</span>
                  <span className="text-[10px] text-cyan-400 font-normal">Ketuk untuk lihat detail! 🔍</span>
                </div>
                <div className="text-[11px] text-slate-300 max-w-xs truncate">
                  {hoveredPlanet.title}
                </div>
              </div>
            </button>
          ) : (
            <div className="text-[11px] text-slate-500 bg-slate-900/60 px-3 py-1.5 rounded-lg border border-slate-800 backdrop-blur-sm">
              💡 Geser peta untuk melihat planet lainnya
            </div>
          )}
        </div>

        {/* Viewport tool buttons */}
        <div className="flex items-center gap-1.5 pointer-events-auto bg-slate-900/90 backdrop-blur-md p-1.5 rounded-xl border border-slate-800 shadow-md">
          <button
            onClick={() => {
              cosmicAudio.playPop();
              setShowOrbits(!showOrbits);
            }}
            className={`p-1.5 rounded-lg text-xs cursor-pointer transition-colors ${
              showOrbits ? 'text-cyan-400 bg-slate-800' : 'text-slate-400 hover:text-white'
            }`}
            title="Tampilkan / Sembunyikan Jalur Orbit"
          >
            <Layers className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => {
              cosmicAudio.playPop();
              setShowLabels(!showLabels);
            }}
            className={`p-1.5 rounded-lg text-xs cursor-pointer transition-colors ${
              showLabels ? 'text-cyan-400 bg-slate-800' : 'text-slate-400 hover:text-white'
            }`}
            title="Tampilkan / Sembunyikan Nama Planet"
          >
            <Eye className="w-3.5 h-3.5" />
          </button>
          <span className="text-slate-700">|</span>
          <button
            onClick={handleZoomOut}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            title="Perkecil (Zoom Out)"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={handleZoomIn}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            title="Perbesar (Zoom In)"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={resetView}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            title="Posisikan Ulang Kamera"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
