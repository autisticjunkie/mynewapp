'use client'

import { useState, useRef, useEffect } from 'react'
import VideoPost from './VideoPost'

const SAMPLE_POSTS = [
  {
    id: '1',
    username: 'Dumbo',
    description: '13 year old flex on live after hiting a big rug #dance #rug',
    songName: 'Thanks for the 20bands - Dumbo',
    likes: 666,
    comments: 666,
    shares: 666,
    videoUrl: '/video1.mp4',
  },
  {
    id: '2',
    username: 'Incest Family',
    description: 'Mom tries to use her inflated boobs to inflate coin price 🍳 #incest #pump',
    songName: 'shake it - Chef Maria',
    likes: 666,
    comments: 666,
    shares: 666,
    videoUrl: '/video2.mp4',
  },
  {
    id: '3',
    username: 'High Dev',
    description: 'Dev passes out from being too high while trying to get the price high 🍳 #meth #breakinggood',
    songName: 'one last hit - Dev',
    likes: 666,
    comments: 666,
    shares: 666,
    videoUrl: '/video3.mp4',
  }
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

