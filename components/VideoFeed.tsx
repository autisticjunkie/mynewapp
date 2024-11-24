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
  },
  {
    id: '4',
    username: 'NotMe',
    description: 'My pumpfun coins immediately after i sell 🍳 #rekt #pump',
    songName: 'One last rug - Me',
    likes: 666,
    comments: 666,
    shares: 666,
    videoUrl: '/video4.mp4',
  },
  {
    id: '5',
    username: 'The Dodge Father',
    description: 'The one who pump our bags. 🍳 #pump #pump',
    songName: 'PumpIt - Elon',
    likes: 666,
    comments: 666,
    shares: 666,
    videoUrl: '/video5.mp4',
  },
  {
    id: '6',
    username: 'Gary Gensler',
    description: 'I aint deserve this shit fuck trump. 🍳 #fucktrump #fuckthatnigga',
    songName: 'fuckthatnigga - Gary Gensler',
    likes: 666,
    comments: 666,
    shares: 666,
    videoUrl: '/video6.mp4',
  },
  {
     id: '7',
    username: 'why is it dumping?',
    description: 'ahhhhhhhhhhhhhhhhhhh. 🍳 #moodeng #cutehippo',
    songName: 'dumpoooo - moodeng',
    likes: 666,
    comments: 666,
    shares: 666,
    videoUrl: '/video7.mp4',
  },
  {
     id: '8',
    username: 'Andrew Tate',
    description: 'Ansem come suck this dick boy!!. 🍳 #topG #matrix',
    songName: 'fuckAnsem - Tate',
    likes: 666,
    comments: 666,
    shares: 666,
    videoUrl: '/video8.mp4',
  },
  {
     id: '9',
    username: 'Donald Trump',
    description: 'RIP real nigga. 🍳 #trump #pump',
    songName: 'RIP - BigT',
    likes: 666,
    comments: 666,
    shares: 666,
    videoUrl: '/video9.mp4',
  },
  {
     id: '10',
    username: 'Andrew Tate',
    description: 'Ansem lied, he didnt use a condom. 🍳 #fuckansem #fuckthatnigga',
    songName: 'fuckthatnigga - tate',
    likes: 666,
    comments: 666,
    shares: 666,
    videoUrl: '/video10.mp4',
  },

  {
     id: '11',
    username: 'Me',
    description: 'when i didnt break even bc i thought it was a reversal. 🍳 #fuckme #sigh',
    songName: 'riptomybags - me',
    likes: 666,
    comments: 666,
    shares: 666,
    videoUrl: '/video11.mp4',
  },
  {
     id: '12',
    username: 'Vibin',
    description: 'Vibin. 🍳 #vibin #vibin',
    songName: 'vibin - Puss in boot',
    likes: 666,
    comments: 666,
    shares: 666,
    videoUrl: '/video12.mp4',
  },
  {
     id: '13',
    username: 'We so back',
    description: 'We so back. 🍳 #pumpit #chartsoerect',
    songName: 'we so back - degens',
    likes: 666,
    comments: 666,
    shares: 666,
    videoUrl: '/video13.mp4',
  },
  {
     id: '14',
    username: 'Your Favorite KOL',
    description: 'Just rugged ct on a NFA. 🍳 #lfg #wegetmoney',
    songName: 'realniggashit - Kol',
    likes: 666,
    comments: 666,
    shares: 666,
    videoUrl: '/video14.mp4',
  },
  {
     id: '15',
    username: 'Moodeng',
    description: 'Nigga leave me tf alone.. 🍳 #fuckoff #stupidassnigga',
    songName: 'leave me alone - Moodeng',
    likes: 666,
    comments: 666,
    shares: 666,
    videoUrl: '/video15.mp4',
  },
  {
     id: '16',
    username: 'Andrew Tate',
    description: 'Just had to do a quick kickboxing practice on this deaf bitch. 🍳 #fuckbitches #topG',
    songName: 'fuckthatstupidBitch - topG',
    likes: 666,
    comments: 666,
    shares: 666,
    videoUrl: '/video16.mp4',
  },
  {
     id: '17',
    username: 'Solana Memecoins',
    description: 'Such a good day to wake and fuck normies with dreams of leaving the trenches. 🍳 #rekt #nuked',
    songName: 'nuking everychart - dumbo',
    likes: 666,
    comments: 666,
    shares: 666,
    videoUrl: '/video17.mp4',
  },
  {
     id: '18',
    username: 'Stupid White Bitch',
    description: 'Another stupid white bitch fucks up a good coin. 🍳 #rekt #nuked',
    songName: 'why you sell? - trump',
    likes: 666,
    comments: 666,
    shares: 666,
    videoUrl: '/video18.mp4',
  },
  {
    id: '19',
    username: 'Dog Man',
    description: 'Man turns into a dog and begs for solamis. 🍳 #dog #pumpfunlive',
    songName: 'Buy please - Dog',
    likes: 666,
    comments: 666,
    shares: 666,
    videoUrl: '/video19.mp4',
  },
  {
    id: '20',
    username: 'Normie',
    description: 'Hey guys, i wanted to start trading today but after entering the link i am confused, is this pumpfun or pornhub?. 🍳 #Normie #pornhub',
    songName: 'wtf is this - Normie',
    likes: 666,
    comments: 666,
    shares: 666,
    videoUrl: '/video20.mp4',
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

