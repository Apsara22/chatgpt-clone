import React from 'react'

const BackgroundLayout = ({ children }) => {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background with 50%, 30%, and 10% transitions using 3 colors */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-400/50 via-pink-400/30 to-blue-400/10 animate-gradient" />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>

      <style jsx>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 15s ease infinite;
        }
      `}</style>
    </div>
  )
}

export default BackgroundLayout