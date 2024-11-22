'use client'

import { useState, useRef, useEffect } from 'react'
import VideoPost from './VideoPost'

const SAMPLE_POSTS = [
  {
    id: '1',
    username: '@healthyliving',
    description: 'Quick morning workout routine 💪 #fitness #health',
    songName: 'Workout Mix - Trainer Joe',
    likes: 1234,
    comments: 123,
    shares: 45,
    videoUrl: '/video1.mp4',
  },
  {
    id: '2',
    username: '@foodlover',
    description: 'Easy 5-minute recipe for busy days 🍳 #quickmeals #cooking',
    songName: 'Kitchen Beats - Chef Maria',
    likes: 5678,
    comments: 456,
    shares: 89,
    videoUrl: '/video2.mp4',
  },
]

export default function VideoFeed() {
  const [currentPostIndex, setCurrentPostIndex] = useState(0)
  const feedRef = useRef<HTMLDivElement>(null)

  const handleSwipe = (direction: 'up' | 'down') => {
    if (direction === 'up' && currentPostIndex < SAMPLE_POSTS.length - 1) {
      setCurrentPostIndex(currentPostIndex + 1)
    } else if (direction === 'down' && currentPostIndex > 0) {
      setCurrentPostIndex(currentPostIndex - 1)
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      if (feedRef.current) {
        const scrollPosition = feedRef.current.scrollTop
        const postHeight = feedRef.current.clientHeight
        const newIndex = Math.round(scrollPosition / postHeight)
        if (newIndex !== currentPostIndex) {
          setCurrentPostIndex(newIndex)
        }
      }
    }

    feedRef.current?.addEventListener('scroll', handleScroll)
    return () => feedRef.current?.removeEventListener('scroll', handleScroll)
  }, [currentPostIndex])

  return (
    <div ref={feedRef} className="h-[calc(100vh-8rem)] overflow-y-scroll snap-y snap-mandatory">
      {SAMPLE_POSTS.map((post, index) => (
        <div key={post.id} className="snap-start">
          <VideoPost
            post={post}
            onSwipe={handleSwipe}
            isVisible={index === currentPostIndex}
          />
        </div>
      ))}
    </div>
  )
}
