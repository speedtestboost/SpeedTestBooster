import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface AnimatedCircularProgressProps {
  progress: number;
  size?: number;
  strokeWidth?: number;
  phase: "idle" | "ping" | "download" | "upload" | "jitter" | "complete";
  currentValue?: number;
  unit?: string;
  label?: string;
}

export default function AnimatedCircularProgress({
  progress,
  size = 200,
  strokeWidth = 8,
  phase,
  currentValue,
  unit = "",
  label = ""
}: AnimatedCircularProgressProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (progress / 100) * circumference;

  // Animate the displayed value
  useEffect(() => {
    if (currentValue !== undefined) {
      const startValue = displayValue;
      const endValue = currentValue;
      const duration = 800;
      const startTime = Date.now();

      const animate = () => {
        const now = Date.now();
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function for smooth animation
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const newValue = startValue + (endValue - startValue) * easeOut;
        
        setDisplayValue(newValue);
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      
      requestAnimationFrame(animate);
    }
  }, [currentValue]);

  const getPhaseColor = () => {
    switch (phase) {
      case "ping": return "rgb(249, 115, 22)"; // Orange
      case "download": return "rgb(34, 197, 94)"; // Green
      case "upload": return "rgb(59, 130, 246)"; // Blue
      case "jitter": return "rgb(168, 85, 247)"; // Purple
      case "complete": return "rgb(34, 197, 94)"; // Green
      default: return "rgb(107, 114, 126)"; // Gray
    }
  };

  const getGlowIntensity = () => {
    return phase !== "idle" ? "drop-shadow(0 0 8px currentColor)" : "none";
  };

  return (
    <div className="relative flex items-center justify-center">
      <svg
        width={size}
        height={size}
        className="transform -rotate-90"
        style={{ filter: getGlowIntensity() }}
      >
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke="rgb(55, 65, 81)"
          strokeWidth={strokeWidth}
          className="opacity-20"
        />
        
        {/* Animated progress circle */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke={getPhaseColor()}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          style={{ color: getPhaseColor() }}
        />

        {/* Pulsing effect for active phases */}
        <AnimatePresence>
          {phase !== "idle" && phase !== "complete" && (
            <motion.circle
              cx={size / 2}
              cy={size / 2}
              r={radius + 4}
              fill="transparent"
              stroke={getPhaseColor()}
              strokeWidth={2}
              strokeOpacity={0.3}
              initial={{ r: radius, strokeOpacity: 0.6 }}
              animate={{ 
                r: radius + 8, 
                strokeOpacity: 0,
                transition: { 
                  duration: 2, 
                  repeat: Infinity, 
                  ease: "easeOut" 
                }
              }}
            />
          )}
        </AnimatePresence>
      </svg>
      
      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${phase}-${label}`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center"
          >
            {currentValue !== undefined ? (
              <>
                <div className="text-3xl font-bold mb-1" style={{ color: getPhaseColor() }}>
                  {phase === "ping" || phase === "jitter" ? 
                    Math.round(displayValue) : 
                    displayValue.toFixed(1)
                  }
                </div>
                <div className="text-sm text-muted-foreground">{unit}</div>
              </>
            ) : (
              <>
                <div className="text-2xl font-bold mb-1" style={{ color: getPhaseColor() }}>
                  {Math.round(progress)}%
                </div>
                <div className="text-xs text-muted-foreground uppercase tracking-wide">
                  {label}
                </div>
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}