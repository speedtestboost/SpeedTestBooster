import { motion } from "framer-motion";
import { Wifi, Monitor, Server } from "lucide-react";

interface AnimatedConnectionVisualizationProps {
  phase: "idle" | "ping" | "download" | "upload" | "jitter" | "complete";
  isActive: boolean;
}

export default function AnimatedConnectionVisualization({
  phase,
  isActive
}: AnimatedConnectionVisualizationProps) {
  const getConnectionDirection = () => {
    switch (phase) {
      case "download": return "download";
      case "upload": return "upload";
      case "ping":
      case "jitter": return "bidirectional";
      default: return "none";
    }
  };

  const direction = getConnectionDirection();

  return (
    <div className="flex items-center justify-center space-x-8 py-6">
      {/* Device */}
      <div className="relative">
        <motion.div
          animate={{
            scale: isActive && (direction === "upload" || direction === "bidirectional") ? [1, 1.1, 1] : 1,
          }}
          transition={{ duration: 1, repeat: isActive ? Infinity : 0 }}
        >
          <Monitor className="h-8 w-8 text-blue-400" />
        </motion.div>
        <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-muted-foreground">
          Your Device
        </div>
      </div>

      {/* Connection Lines */}
      <div className="relative flex-1 h-1">
        {/* Base line */}
        <div className="absolute inset-0 bg-gray-700 rounded-full"></div>
        
        {/* Animated data flow - Download */}
        {isActive && direction === "download" && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-green-400 to-transparent rounded-full"
            initial={{ x: "100%" }}
            animate={{ x: "-100%" }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
        )}
        
        {/* Animated data flow - Upload */}
        {isActive && direction === "upload" && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-400 to-transparent rounded-full"
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
        )}
        
        {/* Animated data flow - Bidirectional (ping/jitter) */}
        {isActive && direction === "bidirectional" && (
          <>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-orange-400 to-transparent rounded-full"
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{ duration: 0.8, repeat: Infinity, ease: "linear", delay: 0 }}
            />
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-orange-300 to-transparent rounded-full"
              initial={{ x: "100%" }}
              animate={{ x: "-100%" }}
              transition={{ duration: 0.8, repeat: Infinity, ease: "linear", delay: 0.4 }}
            />
          </>
        )}
      </div>

      {/* WiFi Router */}
      <div className="relative">
        <motion.div
          animate={{
            scale: isActive ? [1, 1.05, 1] : 1,
          }}
          transition={{ duration: 2, repeat: isActive ? Infinity : 0 }}
        >
          <Wifi className="h-8 w-8 text-purple-400" />
        </motion.div>
        <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-muted-foreground">
          Router
        </div>
        
        {/* WiFi signal waves */}
        {isActive && (
          <div className="absolute -top-1 -right-1">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="absolute w-3 h-3 border-2 border-purple-400 rounded-full"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: [0, 0.6, 0], scale: [0, 2, 3] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.6
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Connection Lines to Server */}
      <div className="relative flex-1 h-1">
        <div className="absolute inset-0 bg-gray-700 rounded-full"></div>
        
        {/* Server connection animations */}
        {isActive && direction === "download" && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-green-400 to-transparent rounded-full"
            initial={{ x: "100%" }}
            animate={{ x: "-100%" }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
          />
        )}
        
        {isActive && direction === "upload" && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-400 to-transparent rounded-full"
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
          />
        )}
        
        {isActive && direction === "bidirectional" && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-orange-400 to-transparent rounded-full"
            initial={{ x: "-50%" }}
            animate={{ x: "50%" }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear", repeatType: "reverse" }}
          />
        )}
      </div>

      {/* Server */}
      <div className="relative">
        <motion.div
          animate={{
            scale: isActive && (direction === "download" || direction === "bidirectional") ? [1, 1.1, 1] : 1,
          }}
          transition={{ duration: 1, repeat: isActive ? Infinity : 0 }}
        >
          <Server className="h-8 w-8 text-green-400" />
        </motion.div>
        <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-muted-foreground">
          Test Server
        </div>
      </div>
    </div>
  );
}