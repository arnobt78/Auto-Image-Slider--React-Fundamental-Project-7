/**
 * Custom carousel component: no external slider library.
 * Uses React state for the current index, setInterval for auto-advance, and CSS transform for sliding.
 */
import { useCallback, useEffect, useState } from 'react';
import { longList } from './data';
import { FaQuoteRight } from 'react-icons/fa';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const Carousel = () => {
  // Slide data (read-only here); currentPerson is the index of the visible slide
  const [people] = useState(longList);
  const [currentPerson, setCurrentPerson] = useState(0);

  // Go to previous slide with wraparound: (current - 1 + length) % length
  const prevSlide = () => {
    setCurrentPerson((oldPerson) => {
      const result = (oldPerson - 1 + people.length) % people.length;
      return result;
    });
  };
  // Go to next slide with wraparound; useCallback keeps a stable reference for useEffect deps
  const nextSlide = useCallback(() => {
    setCurrentPerson((oldPerson) => {
      const result = (oldPerson + 1) % people.length;
      return result;
    });
  }, [people.length]);

  // Auto-advance every 5s; cleanup clears the interval when component unmounts or nextSlide changes
  useEffect(() => {
    const sliderId = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => {
      clearInterval(sliderId);
    };
  }, [nextSlide]);

  return (
    <section className='slider-container'>
      {people.map((person, personIndex) => {
        const { id, image, name, title, quote } = person;
        return (
          <article
            className='slide'
            style={{
              // Horizontal offset: active at 0%, prev/next at ±100%; transition in CSS
              transform: `translateX(${100 * (personIndex - currentPerson)}%)`,
              opacity: personIndex === currentPerson ? 1 : 0,
              visibility: personIndex === currentPerson ? 'visible' : 'hidden',
            }}
            key={id}
          >
            <img src={image} alt={name} className='person-img' />
            <h5 className='name'>{name}</h5>
            <p className='title'>{title}</p>
            <p className='text'>{quote}</p>
            <FaQuoteRight className='icon' />
          </article>
        );
      })}
      <button type='button' className='prev' onClick={prevSlide}>
        <FiChevronLeft />
      </button>
      <button type='button' className='next' onClick={nextSlide}>
        <FiChevronRight />
      </button>
    </section>
  );
};
export default Carousel;
