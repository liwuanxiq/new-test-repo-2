import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage, Float } from '@react-three/drei';
import { Suspense, useState } from 'react';
import { motion } from 'framer-motion';

interface Product3DViewerProps {
  modelUrl?: string;
  images?: string[];
  name: string;
}

export function Product3DViewer({ modelUrl, images, name }: Product3DViewerProps) {
  const [viewMode, setViewMode] = useState<'3d' | 'image'>('3d');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  return (
    <div className="relative w-full h-[500px] bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl overflow-hidden">
      {/* View Mode Toggle */}
      <div className="absolute top-4 right-4 z-10 flex gap-2">
        <button
          onClick={() => setViewMode('3d')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            viewMode === '3d'
              ? 'bg-aura-500 text-white shadow-lg'
              : 'bg-white/80 text-slate-600 hover:bg-white'
          }`}
        >
          3D View
        </button>
        {images && images.length > 0 && (
          <button
            onClick={() => setViewMode('image')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              viewMode === 'image'
                ? 'bg-aura-500 text-white shadow-lg'
                : 'bg-white/80 text-slate-600 hover:bg-white'
            }`}
          >
            Images
          </button>
        )}
      </div>

      {viewMode === '3d' && modelUrl ? (
        <Canvas shadows camera={{ position: [0, 0, 5], fov: 50 }}>
          <Suspense fallback={null}>
            <Stage environment="city" intensity={0.6} contactShadow={false}>
              <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                {/* Placeholder geometry - replace with actual GLTF model */}
                <mesh castShadow receiveShadow>
                  <boxGeometry args={[2, 2, 2]} />
                  <meshStandardMaterial color="#0ea5e9" metalness={0.3} roughness={0.4} />
                </mesh>
              </Float>
            </Stage>
            <OrbitControls 
              enablePan={false} 
              enableZoom={true}
              minDistance={3}
              maxDistance={10}
              autoRotate
              autoRotateSpeed={0.5}
            />
          </Suspense>
        </Canvas>
      ) : viewMode === '3d' ? (
        <div className="w-full h-full flex items-center justify-center">
          <div className="text-center">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-aura-100 flex items-center justify-center animate-pulse">
              <span className="text-3xl">🎨</span>
            </div>
            <p className="text-slate-500 font-medium">3D Model Coming Soon</p>
            <p className="text-slate-400 text-sm mt-1">Interactive preview will be available</p>
          </div>
        </div>
      ) : (
        <div className="w-full h-full relative">
          {images && images.length > 0 ? (
            <>
              <img
                src={images[currentImageIndex]}
                alt={name}
                className="w-full h-full object-cover"
              />
              {images.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === currentImageIndex
                          ? 'bg-white w-6'
                          : 'bg-white/50 hover:bg-white/70'
                      }`}
                    />
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-slate-200">
              <span className="text-slate-400">No image available</span>
            </div>
          )}
        </div>
      )}

      {/* Interactive hints */}
      {viewMode === '3d' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute bottom-4 left-4 px-3 py-1.5 bg-black/50 backdrop-blur-sm rounded-full text-white text-xs"
        >
          🖱️ Drag to rotate • Scroll to zoom
        </motion.div>
      )}
    </div>
  );
}
