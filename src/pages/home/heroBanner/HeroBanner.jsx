import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useFetch from '../../../hooks/useFetch';
import { useSelector } from 'react-redux';

import { Img, ContentWrapper } from '../../../components';

import './heroBanner.scss';

function HeroBanner() {

  const navigate = useNavigate();
  const [background, setBackground] = useState("");
  const [query, setQuery] = useState("");

  const { url } = useSelector((state) => state.home);

  const {data, loading} = useFetch('/movie/upcoming');

  useEffect(() => {
    const bg = url.backdrop + data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path;
    // console.log(url.backdrop);
    setBackground(bg);
  }, [data, url.backdrop===undefined]);

  const searchQueryHandler = (e) => {
    // e.preventDefault();
    if (e.key === 'Enter' && query.length > 0) {
      navigate(`/search/${query}`);
    }
  }

  return (
    <div className='heroBanner'>

      {!loading && <div className="backdrop-img">
        <Img src={background} />
      </div>}

      <div className="opacity-layer"></div>

      <ContentWrapper>
        <div className="heroBannerContent">
          <span className="title">Welcome.</span>
          <span className="subTitle">Millions of movies, TV shows and people to discover. Explore now.</span>

          <div className="searchInput">
            <input type="text"
              placeholder='Search movies or tv shows...'
              onChange={(e=> setQuery(e.target.value))}
              onKeyUp={searchQueryHandler}
            />
            <button>Search</button>
          </div>
        </div>
      </ContentWrapper>
    </div>
  );
}

export default HeroBanner;