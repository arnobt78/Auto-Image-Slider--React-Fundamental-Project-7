import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import Slider from 'react-slick';
import { list } from './data';
import { FaQuoteRight } from 'react-icons/fa';

/**
 * Carousel built with react-slick: configurable via the settings object.
 * Uses the same data shape as Carousel (id, image, name, title, quote).
 */
const SlickCarousel = () => {
  // react-slick options: dots, infinite loop, animation speed, visible slides, autoplay, etc.
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    // fade: true,
    autoplay: true,
    autoplaySpeed: 1000,
    pauseOnHover: true,
  };

  return (
    <section className='slick-container'>
      <Slider {...settings}>
        {list.map((person) => {
          const { id, image, name, title, quote } = person;
          return (
            <article key={id}>
              <img src={image} alt={name} className='person-img' />
              <h5 className='name'>{name}</h5>
              <p className='title'>{title}</p>
              <p className='text'>{quote}</p>
              <FaQuoteRight className='icon' />
            </article>
          );
        })}
      </Slider>
    </section>
  );
};

export default SlickCarousel;
