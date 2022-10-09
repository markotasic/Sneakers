import React, { useState } from 'react';
import { useSelector } from 'react-redux';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import 'swiper/css/effect-coverflow';
import { styled } from '@mui/system';

import './styles.css';

import AirMax from '../../../images/air max.jpg';
import Future from '../../../images/back from the future.jpg';
import Adapt from '../../../images/adapt.jpg';
import AirForce1v2 from '../../../images/air-force-1v2.png';
import AirForce1v3 from '../../../images/air-force-1v3.jpg';
import AirForce1v4 from '../../../images/air-force-1v4.jpg';

// import required modules
import { FreeMode, Navigation, Thumbs, EffectCoverflow } from 'swiper';
import { useParams } from 'react-router-dom';

const Image = styled('img')({
  // width: 'fit-content',
  maxHeight: '500px',
  objectFit: 'cover',
  borderRadius: '5px',
});

const ThumbImage = styled('img')({
  height: '100px',
  objectFit: 'cover',
  borderRadius: '5px',
});

function Carousel(props) {
  const { items } = useSelector((state) => state.items);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <div className='carousel'>
      <Swiper
        effect={'coverflow'}
        style={{
          '--swiper-navigation-color': '#fff',
        }}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        centeredSlides={true}
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs, EffectCoverflow]}
      >
        {items.imagePaths &&
          items.imagePaths.map((item) => (
            <SwiperSlide key={Math.random()}>
              <Image src={`http://localhost:5000/${item}`} alt={items.title} />
            </SwiperSlide>
          ))}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={30}
        slidesPerView={4}
        modules={[FreeMode, Navigation, Thumbs]}
        className='mySwiper'
      >
        {items.imagePaths &&
          items.imagePaths.map((item) => (
            <SwiperSlide key={Math.random()}>
              <ThumbImage
                src={`http://localhost:5000/${item}`}
                alt={items.title}
              />
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
}

export default Carousel;
