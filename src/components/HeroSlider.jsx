import { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { SLIDE_HEIGHT, SLIDE_WIDTH, SLOGAN } from "../constants";

const SLIDES = [
    { src: '/slider/slider-1.webp', alt: 'Букет ніжно-рожевих гвоздик' },
    { src: '/slider/slider-2.webp', alt: 'Гілочка яскраво-рожевих орхідей' },
    {src: '/slider/slider-3.webp', alt: 'Букет ніжно-рожевих троянд'}
]

export function HeroSlider() {
    const [index, setIndex] = useState(0);
    const { pathname } = useLocation();
    const isHome = pathname === '/';

    const goPrev = () => setIndex((i) => (i - 1 + SLIDES.length) % SLIDES.length);
    const goNext = () => setIndex((i) => (i + 1) % SLIDES.length);

    return (
        <section className={`slider ${isHome ? 'slider--home' : ''}`} aria-roledescription="carousel" aria-label="Фото продукції">
            <div className="slider__track" style={{ transform: `translateX(-${index * 100}%)` }}>
                {SLIDES.map(({ src, alt } ,i) => (
                    <img
                        key={src}
                        src={src}
                        alt={alt}
                        className="slider__image"
                        width={SLIDE_WIDTH}
                        height={SLIDE_HEIGHT}
                        loading={i === 0 ? "eager" : "lazy"}
                        fetchPriority={i === 0 ? "high" : undefined}
                    />
                ))}
            </div>

            <button type="button" className="slider__arrow slider__arrow--prev" onClick={goPrev} aria-label="Попереднє фото">
                ‹
            </button>
            <button type="button" className="slider__arrow slider__arrow--next" onClick={goNext} aria-label="Наступне фото">
                ›
            </button>

            <div className="slider__dots">
                {SLIDES.map(({ src }, i) => (
                    <button
                        key={src}
                        type="button"
                        className={`slider__dot ${i === index ? 'slider__dot--active' : ''}`}
                        onClick={() => setIndex(i)}
                        aria-label={`Фото ${i + 1} з ${SLIDES.length}`}
                        aria-current={i === index} />
                ))}
            </div>

            {isHome && (
                <div className="slider__hero">
                    <p className="slider__slogan">{SLOGAN}</p>
                    <Link to="/builder" className="slider__cta">
                        Зібрати свій букет
                    </Link>
                </div>
            )}
        </section>
    )
}