"use client"

import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { usePathname } from 'next/navigation'

interface AnimationProviderProps {
  children: React.ReactNode
}

export default function AnimationProvider({ children }: AnimationProviderProps) {
  const pathname = usePathname()
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Check for prefers-reduced-motion
    if (typeof window === 'undefined') return
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger)

    // Context for easy clean-up on route change / unmount
    const ctx = gsap.context(() => {
      // 1. Smooth Page Transition
      gsap.fromTo(
        '#main-content',
        { opacity: 0.65, y: 10 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: 'power2.out',
          clearProps: 'transform,opacity'
        }
      )

      // 2. Hero entrance sequencing (Homepage & subpages)
      const heroContent = document.querySelector('.hero-content, #about-hero, .team .section-head')
      if (heroContent) {
        const heroBadge = heroContent.querySelector('.eyebrow, [style*="border-radius: 999px"]')
        const heroH1 = heroContent.querySelector('h1')
        const heroTagline = heroContent.querySelector('p[style*="var(--display)"], h2')
        const heroLead = heroContent.querySelector('.lead, p:not(.eyebrow)')
        const heroBtns = heroContent.querySelector('.btn-row, a.btn')

        const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } })

        if (heroBadge) {
          heroTl.fromTo(
            heroBadge,
            { opacity: 0, y: -16, scale: 0.95 },
            { opacity: 1, y: 0, scale: 1, duration: 0.6 }
          )
        }
        if (heroH1) {
          heroTl.fromTo(
            heroH1,
            { opacity: 0, y: 24 },
            { opacity: 1, y: 0, duration: 0.75 },
            '-=0.35'
          )
        }
        if (heroTagline) {
          heroTl.fromTo(
            heroTagline,
            { opacity: 0, y: 18 },
            { opacity: 1, y: 0, duration: 0.65 },
            '-=0.45'
          )
        }
        if (heroLead) {
          heroTl.fromTo(
            heroLead,
            { opacity: 0, y: 16 },
            { opacity: 1, y: 0, duration: 0.65 },
            '-=0.4'
          )
        }
        if (heroBtns) {
          heroTl.fromTo(
            heroBtns,
            { opacity: 0, y: 14 },
            { opacity: 1, y: 0, duration: 0.55 },
            '-=0.35'
          )
        }
      }

      // 3. Section Heads (H2 and intro paragraphs)
      const sectionHeads = gsap.utils.toArray<HTMLElement>('.section-head')
      sectionHeads.forEach((head) => {
        // Skip if already in hero
        if (head.closest('.hero')) return

        const eyebrow = head.querySelector('.eyebrow')
        const title = head.querySelector('h1, h2, h3')
        const desc = head.querySelector('p:not(.eyebrow)')

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: head,
            start: 'top 88%',
            toggleActions: 'play none none none'
          }
        })

        if (eyebrow) {
          tl.fromTo(
            eyebrow,
            { opacity: 0, y: 12 },
            { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
          )
        }
        if (title) {
          tl.fromTo(
            title,
            { opacity: 0, y: 22 },
            { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' },
            eyebrow ? '-=0.3' : '0'
          )
        }
        if (desc) {
          tl.fromTo(
            desc,
            { opacity: 0, y: 18 },
            { opacity: 1, y: 0, duration: 0.65, ease: 'power2.out' },
            '-=0.4'
          )
        }
      })

      // 4. Staggered Service Cards Grid
      const serviceGrids = gsap.utils.toArray<HTMLElement>('.services-cards-grid, .services-grid')
      serviceGrids.forEach((grid) => {
        const cards = grid.children
        if (!cards || cards.length === 0) return

        gsap.fromTo(
          cards,
          { opacity: 0, y: 35, scale: 0.98 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.75,
            stagger: 0.09,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: grid,
              start: 'top 85%',
              toggleActions: 'play none none none'
            }
          }
        )
      })

      // 5. Staggered Project Cards
      const projectGrids = gsap.utils.toArray<HTMLElement>('.project-card')
      if (projectGrids.length > 0) {
        ScrollTrigger.batch(projectGrids, {
          start: 'top 88%',
          onEnter: (batch) => {
            gsap.fromTo(
              batch,
              { opacity: 0, y: 32, scale: 0.98 },
              {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.7,
                stagger: 0.1,
                ease: 'power3.out',
                overwrite: 'auto'
              }
            )
          }
        })
      }

      // 6. Why Choose Us Grid Animation
      const whyGrids = gsap.utils.toArray<HTMLElement>('.why-grid')
      whyGrids.forEach((grid) => {
        const visual = grid.querySelector('.why-visual')
        const content = grid.querySelector('.why-visual ~ div')
        const items = grid.querySelectorAll('.why-item')

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: grid,
            start: 'top 82%',
            toggleActions: 'play none none none'
          }
        })

        if (visual) {
          tl.fromTo(
            visual,
            { opacity: 0, x: -30, scale: 0.97 },
            { opacity: 1, x: 0, scale: 1, duration: 0.85, ease: 'power3.out' }
          )
        }
        if (content) {
          const heading = content.querySelector('h2')
          const sub = content.querySelector('p')
          if (heading) {
            tl.fromTo(
              heading,
              { opacity: 0, y: 20 },
              { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
              '-=0.55'
            )
          }
          if (sub) {
            tl.fromTo(
              sub,
              { opacity: 0, y: 16 },
              { opacity: 1, y: 0, duration: 0.55, ease: 'power2.out' },
              '-=0.4'
            )
          }
        }
        if (items.length > 0) {
          tl.fromTo(
            items,
            { opacity: 0, x: 20 },
            { opacity: 1, x: 0, duration: 0.6, stagger: 0.08, ease: 'power2.out' },
            '-=0.3'
          )
        }
      })

      // 7. Core Values Grid Animation
      const coreValueContainers = gsap.utils.toArray<HTMLElement>('#mission-vision, #approach')
      coreValueContainers.forEach((container) => {
        const cards = container.querySelectorAll<HTMLElement>(
          'div[style*="gridTemplateColumns"] > div'
        )
        if (cards.length > 0) {
          gsap.fromTo(
            cards,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 0.7,
              stagger: 0.08,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: container,
                start: 'top 80%',
                toggleActions: 'play none none none'
              }
            }
          )
        }
      })

      // 8. Video Embeds (Stories in Motion / Documentary Showcase)
      const videoEmbeds = gsap.utils.toArray<HTMLElement>('.video-embed-wrapper, #featured-video')
      videoEmbeds.forEach((embed) => {
        gsap.fromTo(
          embed,
          { opacity: 0, y: 30, scale: 0.98 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.85,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: embed,
              start: 'top 85%',
              toggleActions: 'play none none none'
            }
          }
        )
      })

      // 9. Partner Logos Stagger
      const partnerContainers = gsap.utils.toArray<HTMLElement>('#clients')
      partnerContainers.forEach((container) => {
        const logoCards = container.querySelectorAll<HTMLElement>('img, [style*="minWidth: 180px"]')
        if (logoCards.length > 0) {
          gsap.fromTo(
            logoCards,
            { opacity: 0, scale: 0.9, y: 18 },
            {
              opacity: 1,
              scale: 1,
              y: 0,
              duration: 0.6,
              stagger: 0.06,
              ease: 'back.out(1.4)',
              scrollTrigger: {
                trigger: container,
                start: 'top 85%',
                toggleActions: 'play none none none'
              }
            }
          )
        }
      })

      // 10. Team Grid Stagger
      const teamGrid = document.querySelector('.team-grid')
      if (teamGrid) {
        const teamCards = teamGrid.querySelectorAll('.team-member-card')
        if (teamCards.length > 0) {
          gsap.fromTo(
            teamCards,
            { opacity: 0, y: 40, scale: 0.96 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.8,
              stagger: 0.12,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: teamGrid,
                start: 'top 85%',
                toggleActions: 'play none none none'
              }
            }
          )
        }
      }

      // 11. Contact Grid Stagger
      const contactGrid = document.querySelector('.contact-grid')
      if (contactGrid) {
        const leftCol = contactGrid.children[0]
        const rightCol = contactGrid.children[1]

        if (leftCol && rightCol) {
          const contactTl = gsap.timeline({
            scrollTrigger: {
              trigger: contactGrid,
              start: 'top 85%',
              toggleActions: 'play none none none'
            }
          })

          contactTl
            .fromTo(
              leftCol,
              { opacity: 0, x: -30 },
              { opacity: 1, x: 0, duration: 0.75, ease: 'power3.out' }
            )
            .fromTo(
              rightCol,
              { opacity: 0, x: 30, scale: 0.98 },
              { opacity: 1, x: 0, scale: 1, duration: 0.75, ease: 'power3.out' },
              '-=0.5'
            )
        }
      }

      // 12. Generic .reveal elements
      const genericReveals = gsap.utils.toArray<HTMLElement>('.reveal:not(.section-head)')
      genericReveals.forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            duration: 0.75,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 88%',
              toggleActions: 'play none none none'
            }
          }
        )
      })

      // Refresh ScrollTrigger slightly after initial render to account for fonts/images
      const timer = setTimeout(() => {
        ScrollTrigger.refresh()
      }, 250)

      return () => clearTimeout(timer)
    }, containerRef)

    return () => ctx.revert()
  }, [pathname])

  return (
    <div ref={containerRef} className="brandor-animation-wrapper">
      {children}
    </div>
  )
}
