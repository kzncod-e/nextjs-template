import React, { useState, useEffect } from "react";

const LoadingScreen = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    { icon: "🔍", text: "Start the action..." },
    { icon: "📡", text: "Connecting to server..." },
    { icon: "🧠", text: "Processing request..." },
    { icon: "✨", text: "Finalizing response..." },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => {
        if (prev < steps.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, 15000);

    return () => clearInterval(interval);
  }, []);
  const Activity = () => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
    </svg>
  );
  return (
    <div className=" h-full w-full flex z-40   justify-center to-white p-8">
      <div className="w-full flex-col  flex items-center justify-center max-w-md">
        {/* Main container */}
        <div className="bg-white/10 rounded-3xl w-[30rem] shadow-lg p-10 border border-gray-100">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex p-4 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl mb-4">
              <div
                className="w-8 h-8 text-white"
                style={{
                  animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
                }}
              >
                <Activity />
              </div>
            </div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-1">
              AI Agent Running
            </h2>
            <p className="text-sm text-gray-500">
              Please wait while we process your request
            </p>
          </div>

          {/* Status messages */}
          <div className="space-y-5 mb-8">
            {steps.map((step, index) => {
              const isActive = index === activeStep;
              const isPast = index < activeStep;
              const isFuture = index > activeStep;

              return (
                <div
                  key={index}
                  className="flex items-center gap-3 transition-all duration-500 ease-out"
                  style={{
                    opacity: isFuture ? 0 : isPast ? 0.35 : 1,
                    transform: isFuture ? "translateY(10px)" : "translateY(0)",
                  }}
                >
                  <span className="text-2xl">{step.icon}</span>
                  <span
                    className={`text-base transition-all duration-300 ${
                      isActive
                        ? "font-semibold text-gray-900"
                        : "font-normal text-gray-700"
                    }`}
                  >
                    {step.text}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Animated indicator */}
          <div className="flex justify-center items-center h-8">
            <div className="flex gap-1.5">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-500 to-indigo-600"
                  style={{
                    animation: `pulse 1.4s ease-in-out ${i * 0.2}s infinite`,
                  }}
                />
              ))}
            </div>
          </div>

          {/* Progress bar */}
          <div className="mt-8">
            <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full transition-all duration-1000 ease-out"
                style={{
                  width: `${((activeStep + 1) / steps.length) * 100}%`,
                }}
              />
            </div>
          </div>
        </div>

        {/* Footer text */}
        <p className="text-center text-xs text-gray-400 mt-6">
          This may take a few moments
        </p>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 0.3;
            transform: scale(0.8);
          }
          50% {
            opacity: 1;
            transform: scale(1.1);
          }
        }
        
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        
        * {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }
      `}</style>
    </div>
  );
};

export default LoadingScreen;
