import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface AnimatedSpeedIndicatorProps {
  currentSpeed: number;
  maxSpeed: number;
  label: string;
  color: string;
  unit: string;
  isActive: boolean;
  icon: React.ReactNode;
}

export default function AnimatedSpeedIndicator({
  currentSpeed,
  maxSpeed,
  label,
  color,
  unit,
  isActive,
  icon
}: AnimatedSpeedIndicatorProps) {
  const [displaySpeed, setDisplaySpeed] = useState(0);

  // Animate the speed counter
  useEffect(() => {
    if (isActive) {
      const startSpeed = displaySpeed;
      const endSpeed = currentSpeed;
      const duration = 500;
      const startTime = Date.now();

      const animate = () => {
        const now = Date.now();
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const easeOut = 1 - Math.pow(1 - progress, 2);
        const newSpeed = startSpeed + (endSpeed - startSpeed) * easeOut;
        
        setDisplaySpeed(newSpeed);
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      
      requestAnimationFrame(animate);
    } else {
      setDisplaySpeed(0);
    }
  }, [currentSpeed, isActive]);

  const speedPercentage = Math.min((displaySpeed / maxSpeed) * 100, 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden rounded-lg bg-card border p-4"
    >
      {/* Background glow effect when active */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 rounded-lg"
            style={{ backgroundColor: color }}
          />
        )}
      </AnimatePresence>

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <motion.div
              animate={{
                rotate: isActive ? [0, 360] : 0,
                scale: isActive ? [1, 1.1, 1] : 1
              }}
              transition={{
                rotate: { duration: 2, repeat: isActive ? Infinity : 0, ease: "linear" },
                scale: { duration: 1, repeat: isActive ? Infinity : 0 }
              }}
              style={{ color }}
            >
              {icon}
            </motion.div>
            <span className="text-sm font-medium text-muted-foreground">{label}</span>
          </div>
          
          {isActive && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: color }}
            />
          )}
        </div>

        {/* Speed display */}
        <div className="mb-3">
          <motion.div
            className="text-2xl font-bold"
            style={{ color: isActive ? color : 'rgb(107, 114, 126)' }}
          >
            {displaySpeed.toFixed(1)}
          </motion.div>
          <div className="text-xs text-muted-foreground">{unit}</div>
        </div>

        {/* Progress bar */}
        <div className="relative h-2 bg-gray-700 rounded-full overflow-hidden">
          <motion.div
            className="absolute inset-y-0 left-0 rounded-full"
            style={{ backgroundColor: color }}
            initial={{ width: 0 }}
            animate={{ width: `${speedPercentage}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
          
          {/* Shimmer effect when active */}
          {isActive && (
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              initial={{ x: "-100%" }}
              animate={{ x: "200%" }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          )}
        </div>

        {/* Max speed indicator */}
        {isActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xs text-muted-foreground mt-1"
          >
            Peak: {maxSpeed.toFixed(1)} {unit}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}