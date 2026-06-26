"use client"

import React, { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { usePathname } from 'next/navigation'

export default function AnimationProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  useEffect(() => {
    // Only register on client side
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      // 1. Global Page Transition
      gsap.fromTo('main', 
        { opacity: 0, filter: 'blur(10px)' }, 
        { opacity: 1, filter: 'blur(0px)', duration: 0.8, ease: 'power2.out' }
      )

      // 2. Simple Reveal
      const reveals = gsap.utils.toArray('.reveal')
      reveals.forEach((element: any) => {
        gsap.fromTo(element, 
          { opacity: 0, y: 40 },
          { 
            opacity: 1, 
            y: 0, 
            duration: 1, 
            ease: 'power3.out',
            scrollTrigger: {
              trigger: element,
              start: 'top 85%',
              toggleActions: 'play none none none'
            }
          }
        )
      })

      // 3. Stagger Animations (for service grids, team grids, etc)
      const staggers = gsap.utils.toArray('.stagger-1, .stagger-2, .stagger-3, .stagger-4')
      staggers.forEach((el: any) => {
        // If it's already animated by reveal, skip. We use CSS for simple staggering, or GSAP for complex.
        // Actually, the CSS currently has .stagger-2 etc. Let's let GSAP handle it dynamically if we add .stagger-container
      })

      // 4. Split Type Text Reveal
      if (typeof window !== 'undefined' && (window as any).SplitType) {
        const splits = gsap.utils.toArray('.gsap-split')
        splits.forEach((split: any) => {
          const text = new (window as any).SplitType(split, { types: 'lines, words' })
          gsap.set(split, { visibility: 'visible', opacity: 1 }) // unhide
          gsap.from(text.words, {
            y: 30,
            opacity: 0,
            duration: 1,
            stagger: 0.05,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: split,
              start: 'top 90%'
            }
          })
        })
      }
    })

    return () => ctx.revert()
  }, [pathname])

  return <>{children}</>
}
