'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useId } from 'react'
import { A11y, Autoplay, Keyboard, Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import styles from './ProjectCasesCarousel.module.css'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

type ProjectCaseItem = {
  title: string
  description: string
  image: string
  logo: string
  href: string
}

type ProjectCasesCarouselProps = {
  items: ProjectCaseItem[]
}

function ArrowRightIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
    </svg>
  )
}

function ArrowLeftIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
    </svg>
  )
}

export default function ProjectCasesCarousel({ items }: ProjectCasesCarouselProps) {
  const navigationId = useId().replace(/:/g, '')
  const prevClass = `project-cases-prev-${navigationId}`
  const nextClass = `project-cases-next-${navigationId}`
  const paginationClass = `project-cases-pagination-${navigationId}`

  return (
    <div className="relative mt-16">
      <Swiper
        modules={[Autoplay, Navigation, Pagination, Keyboard, A11y]}
        className={styles.carousel}
        slidesPerView={1}
        loop={items.length > 1}
        speed={650}
        grabCursor
        keyboard={{ enabled: true }}
        autoplay={{
          delay: 4500,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        navigation={{
          prevEl: `.${prevClass}`,
          nextEl: `.${nextClass}`,
          disabledClass: styles.navButtonDisabled,
        }}
        pagination={{
          el: `.${paginationClass}`,
          clickable: true,
        }}
        a11y={{
          prevSlideMessage: 'Previous case',
          nextSlideMessage: 'Next case',
          paginationBulletMessage: 'Go to case {{index}}',
        }}
      >
        {items.map((item) => (
          <SwiperSlide key={`${item.title}-${item.logo}`} className={styles.slide}>
            <Link href={item.href} className={styles.cardLink}>
              <div className={styles.logoBadge}>
                <Image src={item.logo} alt={`${item.title} logo`} width={144} height={42} className={styles.logoImage} />
              </div>

              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(max-width: 767px) 100vw, (max-width: 1279px) 100vw, 1120px"
                className={styles.image}
                priority={false}
              />
              <div className={styles.overlay} />

              <div className={styles.content}>
                <h3 className={styles.title}>{item.title}</h3>
                <p className={styles.description}>{item.description}</p>
                <span className={styles.cta}>
                  View Case Study
                  <ArrowRightIcon className={styles.arrow} />
                </span>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className={styles.footerBar}>
        <div className={styles.paginationWrap}>
          <div className={paginationClass} />
        </div>

        <div className={styles.controls}>
          <button type="button" aria-label="Previous case" className={`${styles.navButton} ${prevClass}`}>
            <ArrowLeftIcon className={styles.navIcon} />
          </button>
          <button type="button" aria-label="Next case" className={`${styles.navButton} ${nextClass}`}>
            <ArrowRightIcon className={styles.navIcon} />
          </button>
        </div>
      </div>
    </div>
  )
}
