import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedin } from 'react-icons/fa'
import { ContentWrapper } from '../../components';

import './footer.scss';

function Footer() {
  return (
    <footer className='footer'>
      <ContentWrapper>
        <ul className="menuItems">
          <li className="menuItem">Terms of Use</li>
          <li className="menuItem">Privacy-Policy</li>
          <li className="menuItem">About</li>
          <li className="menuItem">Blog</li>
          <li className="menuItem">FAQ</li>
        </ul>

        <div className="infoText">
          Movix is your ultimate destination for discovering and exploring movies and TV shows. With personalized recommendations, detailed information, trailers, watchlists, user reviews, and advanced search features, Movix enhances your viewing experience. Stay updated with the latest releases and never miss out on great content.

        </div>
        <div className="socialIcons">
          <span className="icon">
            
            <a href=''></a>
            <FaFacebookF/>
          </span>
          <span className="icon">
            <FaInstagram/>
          </span>
          <span className="icon">
            <FaTwitter/>
          </span>
          <span className="icon">
            <FaLinkedin/>
          </span>
        </div>

        <div className="copyright">
          © 2024 Kirti Valechha. All rights reserved.
          </div>
      </ContentWrapper>
    </footer>
  );
}

export default Footer;