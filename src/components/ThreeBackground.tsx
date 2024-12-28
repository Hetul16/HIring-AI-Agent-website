import React, { useEffect, useRef } from 'react';

interface Sphere {
  x: number;
  y: number;
  z: number;
  radius: number;
  rotationX: number;
  rotationY: number;
}

export function ThreeBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const spheres: Sphere[] = [];
    const sphereCount = 8;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createSphere = (): Sphere => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      z: Math.random() * 500,
      radius: Math.random() * 50 + 20,
      rotationX: Math.random() * 0.02 - 0.01,
      rotationY: Math.random() * 0.02 - 0.01,
    });

    const initSpheres = () => {
      for (let i = 0; i < sphereCount; i++) {
        spheres.push(createSphere());
      }
    };

    const drawSphere = (sphere: Sphere) => {
      if (!ctx) return;
      
      const scale = 1 + (sphere.z / 1000);
      const size = sphere.radius * scale;
      
      // Create gradient for 3D effect
      const gradient = ctx.createRadialGradient(
        sphere.x, sphere.y, 0,
        sphere.x, sphere.y, size
      );
      
      gradient.addColorStop(0, 'rgba(236, 72, 153, 0.3)'); // pink
      gradient.addColorStop(0.5, 'rgba(67, 56, 202, 0.2)'); // indigo
      gradient.addColorStop(1, 'rgba(17, 24, 39, 0)'); // transparent

      ctx.beginPath();
      ctx.arc(sphere.x, sphere.y, size, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();
    };

    const updateSphere = (sphere: Sphere) => {
      sphere.z += Math.sin(sphere.rotationX) * 5;
      sphere.x += Math.cos(sphere.rotationY) * 2;
      sphere.y += Math.sin(sphere.rotationX) * 2;

      if (sphere.x < -100) sphere.x = canvas.width + 100;
      if (sphere.x > canvas.width + 100) sphere.x = -100;
      if (sphere.y < -100) sphere.y = canvas.height + 100;
      if (sphere.y > canvas.height + 100) sphere.y = -100;
      if (sphere.z < 0) sphere.z = 500;
      if (sphere.z > 500) sphere.z = 0;
    };

    const animate = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      spheres.forEach(sphere => {
        drawSphere(sphere);
        updateSphere(sphere);
      });

      requestAnimationFrame(animate);
    };

    resizeCanvas();
    initSpheres();
    animate();

    window.addEventListener('resize', resizeCanvas);
    return () => window.removeEventListener('resize', resizeCanvas);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 bg-transparent pointer-events-none"
      style={{ 
        background: 'radial-gradient(circle at center, #0f172a 0%, #020617 100%)'
      }}
    />
  );
}