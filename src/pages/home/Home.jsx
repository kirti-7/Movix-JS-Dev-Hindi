import {HeroBanner, Popular, TopRated, Trending} from '../home';
import './home.scss';


function Home() {
  return (
    <div className='home'>
      <HeroBanner />
      <Trending/>
      <Popular />
      <TopRated/>
    </div>
  );
}

export default Home;