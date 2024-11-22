'use client'

import { useState, useRef, useEffect } from 'react'
import { Heart, MessageCircle, Share, Music, VolumeX, Volume2 } from 'lucide-react'

interface VideoPostProps {
  post: {
    id: string
    username: string
    description: string
    songName: string
    likes: number
    comments: number
    shares: number
    videoUrl: string
  }
  onSwipe: (direction: 'up' | 'down') => void
  isVisible: boolean
}

export default function VideoPost({ post, onSwipe, isVisible }: VideoPostProps) {
  const [isLiked, setIsLiked] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)
  const touchStartY = useRef<number | null>(null)

  useEffect(() => {
    if (videoRef.current) {
      if (isVisible) {
        videoRef.current.play().catch(error => console.error('Error playing video:', error))
      } else {
        videoRef.current.pause()
        videoRef.current.currentTime = 0
      }
    }
  }, [isVisible])

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted
    }
  }, [isMuted])

  const handleLike = () => {
    setIsLiked(!isLiked)
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartY.current === null) return
    const touchEndY = e.changedTouches[0].clientY
    const diff = touchStartY.current - touchEndY

    if (Math.abs(diff) > 50) {
      onSwipe(diff > 0 ? 'up' : 'down')
    }

    touchStartY.current = null
  }

  return (
    <div
      className="relative h-[calc(100vh-8rem)] w-full bg-gray-900"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <video
        ref={videoRef}
        className="h-full w-full object-cover"
        src={post.videoUrl}
        loop
        playsInline
        muted={isMuted}
      />
      <div className="absolute bottom-0 left-0 p-4 w-full bg-gradient-to-t from-black/60 to-transparent">
        <div className="max-w-[80%]">
          <h2 className="text-white font-semibold">{post.username}</h2>
          <p className="text-white text-sm">{post.description}</p>
          <div className="flex items-center text-white text-xs mt-2">
            <Music className="w-4 h-4 mr-2" />
            <span>{post.songName}</span>
          </div>
        </div>
      </div>
      <div className="absolute right-4 bottom-20 flex flex-col items-center gap-6">
        <button onClick={handleLike} className="flex flex-col items-center">
          <div className="w-12 h-12 bg-gray-800/60 rounded-full flex items-center justify-center">
            <Heart className={`w-6 h-6 ${isLiked ? 'text-red-500 fill-current' : 'text-white'}`} />
          </div>
          <span className="text-white text-xs mt-1">{post.likes}</span>
        </button>
        <button className="flex flex-col items-center">
          <div className="w-12 h-12 bg-gray-800/60 rounded-full flex items-center justify-center">
            <MessageCircle className="w-6 h-6 text-white" />
          </div>
          <span className="text-white text-xs mt-1">{post.comments}</span>
        </button>
        <button className="flex flex-col items-center">
          <div className="w-12 h-12 bg-gray-800/60 rounded-full flex items-center justify-center">
            <Share className="w-6 h-6 text-white" />
          </div>
          <span className="text-white text-xs mt-1">{post.shares}</span>
        </button>
        <button onClick={toggleMute} className="flex flex-col items-center">
          <div className="w-12 h-12 bg-gray-800/60 rounded-full flex items-center justify-center">
            {isMuted ? <VolumeX className="w-6 h-6 text-white" /> : <Volume2 className="w-6 h-6 text-white" />}
          </div>
          <span className="text-white text-xs mt-1">{isMuted ? 'Unmute' : 'Mute'}</span>
        </button>
      </div>
    </div>
  )
}

