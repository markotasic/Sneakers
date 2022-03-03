import React, { useState } from 'react';
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

// import required modules
import { FreeMode, Navigation, Thumbs, EffectCoverflow } from 'swiper';

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

export default function App(props) {
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
        {props.item.images.map((img) => (
          <SwiperSlide key={Math.random()}>
            <Image src={img} alt={props.item.name} />
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
        {props.item.images.map((img) => (
          <SwiperSlide key={Math.random()}>
            <ThumbImage src={img} alt={props.item.name} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
