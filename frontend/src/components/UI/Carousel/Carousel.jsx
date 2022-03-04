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

import AirForce1 from '../../../images/air-force-1.jpg';
import AirMax from '../../../images/air max.jpg';
import Future from '../../../images/back from the future.jpg';
import Adapt from '../../../images/adapt.jpg';
import AirForce1v2 from '../../../images/air-force-1v2.png';
import AirForce1v3 from '../../../images/air-force-1v3.jpg';
import AirForce1v4 from '../../../images/air-force-1v4.jpg';

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

const DUMMY_ITEMS = [
  {
    id: 1,
    manufacturer: 'Nike',
    name: 'Air Force 1',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum ut quas eligendi dolore autem.',
    images: [AirForce1, AirForce1v2, AirForce1v3, AirForce1v4],
    price: 100,
  },
  {
    id: 2,
    manufacturer: 'Nike',
    name: 'Air Max',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum ut quas eligendi dolore autem.',
    images: [AirMax],
    price: 120,
  },
  {
    id: 3,
    manufacturer: 'Nike',
    name: 'Back From The Future',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum ut quas eligendi dolore autem.',
    images: [Future],
    price: 2000,
  },
  {
    id: 4,
    manufacturer: 'Nike',
    name: 'Adaot',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum ut quas eligendi dolore autem.',
    images: [Adapt],
    price: 80,
  },
];

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
        {DUMMY_ITEMS.map((img) => (
          <SwiperSlide key={Math.random()}>
            <Image src={img.images} alt={img.name} />
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
        {DUMMY_ITEMS.map((img) => (
          <SwiperSlide key={Math.random()}>
            <ThumbImage src={img.images} alt={img.name} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
