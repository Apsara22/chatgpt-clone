import React, { useEffect, useState } from 'react'
import BackgroundLayout from './components/BackgroundLayout'

const Home = () => {
  const [displayText, setDisplayText] = useState('')
  const fullText = 'Welcome to ChatGpt'
  
  // Array of colors for each letter
  const colors = [
    'text-red-500', 'text-blue-500', 'text-green-500', 'text-yellow-500', 
    'text-purple-500', 'text-pink-500', 'text-indigo-500', 'text-orange-500',
    'text-teal-500', 'text-cyan-500', 'text-rose-500', 'text-emerald-500',
    'text-amber-500', 'text-lime-500', 'text-fuchsia-500', 'text-violet-500',
    'text-sky-500', 'text-stone-500', 'text-neutral-500', 'text-zinc-500'
  ]
  
  useEffect(() => {
    let currentIndex = 0
    const interval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setDisplayText(fullText.slice(0, currentIndex))
        currentIndex++
      } else {
        clearInterval(interval)
      }
    }, 150)
    
    return () => clearInterval(interval)
  }, [])

  return (
    <BackgroundLayout>
      <div className="flex items-center justify-center min-h-screen">
        <h1 className="text-5xl font-light tracking-wide font-mono">
          {displayText.split('').map((char, index) => (
            <span key={index} className={colors[index % colors.length]}>
              {char}
            </span>
          ))}
        </h1>
      </div>
    </BackgroundLayout>
  )
}

export default Home