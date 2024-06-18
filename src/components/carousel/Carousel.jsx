import React, { useRef, useState, useEffect } from 'react';
import { BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill } from 'react-icons/bs';
import { CircleRating, ContentWrapper, Genres, Img } from '../../components';
import PosterFallBack from '../../assets/no-poster.png';
import dayjs from 'dayjs';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './carousel.scss';

function Carousel({ data, loading, endpoint, title }) {
  const carouselContainer = useRef();
  const { url } = useSelector(state => state.home);
  const navigate = useNavigate();

  const navigation = (direction) => {
    const container = carouselContainer.current;
    const scrollAmount = direction === "left" ? container.scrollLeft - (container.offsetWidth + 20) : container.scrollLeft + (container.offsetWidth + 20);
    container.scrollTo({
      left: scrollAmount,
      behavior: "smooth"
    });
  };

  // code for draggable carousel------------------------------------------

  // const [isDragging, setIsDragging] = useState(false);
  // const [startX, setStartX] = useState(0);
  // const [scrollLeft, setScrollLeft] = useState(0);

  // const handleMouseDown = (e) => {
  //   setIsDragging(true);
  //   setStartX(e.pageX - carouselContainer.current.offsetLeft);
  //   setScrollLeft(carouselContainer.current.scrollLeft);
  // };

  // const handleMouseUp = () => setIsDragging(false);
  // const handleMouseLeave = () => setIsDragging(false);

  // const handleMouseMove = (e) => {
  //   if (!isDragging) return;
  //   e.preventDefault();
  //   const x = e.pageX - carouselContainer.current.offsetLeft;
  //   const walk = (x - startX) * 2; // The scroll speed multiplier
  //   carouselContainer.current.scrollLeft = scrollLeft - walk;
  // };

  // useEffect(() => {
  //   const carousel = carouselContainer.current;
  //   if (isDragging) {
  //     carousel.addEventListener('mousemove', handleMouseMove);
  //     carousel.addEventListener('mouseup', handleMouseUp);
  //     carousel.addEventListener('mouseleave', handleMouseLeave);
  //   } else {
  //     carousel.removeEventListener('mousemove', handleMouseMove);
  //     carousel.removeEventListener('mouseup', handleMouseUp);
  //     carousel.removeEventListener('mouseleave', handleMouseLeave);
  //   }

  //   return () => {
  //     carousel.removeEventListener('mousemove', handleMouseMove);
  //     carousel.removeEventListener('mouseup', handleMouseUp);
  //     carousel.removeEventListener('mouseleave', handleMouseLeave);
  //   };
  // }, [isDragging]);

  // draggable carousel ends here -------------------------------------------------------------------------

  const SkeletonItem = () => (
    <div className="skeletonItem">
      <div className="posterBlock skeleton"></div>
      <div className="textBlock">
        <div className="title skeleton"></div>
        <div className="date skeleton"></div>
      </div>
    </div>
  );

  return (
    <div className='carousel'>
      <ContentWrapper>
        {title && <div className="carouselTitle">
          {title}
        </div>}
        <BsFillArrowLeftCircleFill className='carouselLeftNav arrow' onClick={() => navigation("left")} />
        <BsFillArrowRightCircleFill className='carouselRightNav arrow' onClick={() => navigation("right")} />
        {!loading ? (
          <div className="carouselItems" ref={carouselContainer}>
            {data?.map((item) => {
              const posterUrl = item.poster_path ? url.poster + item.poster_path : PosterFallBack;
              return (
                <div key={item.id} className="carouselItem"
                  onClick={() => navigate(`/${item.media_type || endpoint}/${item.id}`)}>
                  <div className="posterBlock">
                    <Img src={posterUrl} />
                    <CircleRating rating={item.vote_average.toFixed(1)} />
                    <Genres data={item.genre_ids.slice(0, 2)} />
                  </div>
                  <div className="textBlock">
                    <span className="title">{item.title || item.name}</span>
                    <span className="date">{dayjs(item.release_Date).format('MMM D, YYYY')}</span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="loadingSkeleton">
            <SkeletonItem />
            <SkeletonItem />
            <SkeletonItem />
            <SkeletonItem />
            <SkeletonItem />
          </div>
        )}
      </ContentWrapper>
    </div>
  );
}

export default Carousel;
