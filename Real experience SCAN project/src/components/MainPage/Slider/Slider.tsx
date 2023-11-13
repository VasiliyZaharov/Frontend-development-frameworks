import React from 'react';
import Slider from 'react-slick';
import './slick.scss';
import './slick-theme.scss';

const Carousel: React.FC = () => {
  const settings = {
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 3,

      responsive: [
        {
          breakpoint: 414,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]

    }

  return (
    <div className="carousel-container">

      <Slider {...settings}>
        <div className="carousel-item">
          <img src="/card1.png" alt="Slide 1" />
        </div>
        <div className="carousel-item">
          <img src="/card2.png" alt="Slide 2" />
        </div>
        <div className="carousel-item">
          <img src="/card3.png" alt="Slide 3" />
        </div>
        <div className="carousel-item">
          <img src="/card1.png" alt="Slide 3" />
        </div>
        <div className="carousel-item">
          <img src="/card2.png" alt="Slide 2" />
        </div>
        <div className="carousel-item">
          <img src="/card3.png" alt="Slide 3" />
        </div>
      </Slider>
    </div>
  );
};

export default Carousel;
