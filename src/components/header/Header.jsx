import React, { useState, useEffect } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";
import { useNavigate, useLocation } from "react-router-dom";


import { ContentWrapper } from '../../components';
import logo from "../../assets/movix-logo.svg";

import './header.scss';

const Header = () => {
  const [show, setShow] = useState("top");
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [query, setQuery] = useState("");
  const [showSearch, setShowSearch] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const controlNavbar = () => {
    // console.log(window.scrollY);
    if (window.scrollY > 200 && !mobileMenu) {
      if (window.scrollY > lastScrollY) {
        setShow("hide");
      } else {
        setShow("show");
      }
    } else {
      setShow("top");
    }
    setLastScrollY(window.scrollY);
  }

  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);
    return () => {
      window.removeEventListener("scroll", controlNavbar);
    }
  }, [lastScrollY]);
  
  const openSearch = () => {
    setShowSearch(true);
    setMobileMenu(false);
  }

  const openMobileMenu = () => {
    setMobileMenu(true);
    setShowSearch(false);
  }
  
  const searchQueryHandler = (e) => {
    // e.preventDefault();
    if (e.key === 'Enter' && query.length > 0) {
      navigate(`/search/${query}`);

      setTimeout(() => {
        setShowSearch(false);
      }, 1000);
    }
  }

  const navigationHandler = (type) => {
    navigate(`/explore/${type}`);
    setMobileMenu(false);
  } 
  

  return (
    <header className={`header ${mobileMenu ? "mobileView" : ""} ${show}`}>
      <ContentWrapper>
        <div className="logo" onClick={()=>navigate('/')}>
          <img src={logo} alt="" />
        </div>
        <ul className="menuItems">
          {/* <button onClick={()=>navigationHandler("movies")}>Go to Movies</button> */}
          {/* In this case, navigationHandler("movies") will be called immediately when the component renders, not when the button is clicked. This is because you are invoking the function immediately and assigning its return value to onClick. */}
          <li className="menuItem" onClick={()=>navigationHandler("movie")}>Movies</li>
          <li className="menuItem" onClick={() => navigationHandler("tv")}>TV Shows</li>
          <li className="menuItem">
            <HiOutlineSearch onClick={openSearch} />
          </li>
        </ul>

        <div className="mobileMenuItems">
          <HiOutlineSearch onClick={openSearch}/>
          {mobileMenu? <VscChromeClose onClick={()=>setMobileMenu(false)}/> : <SlMenu onClick={openMobileMenu}/>}
        </div>
      </ContentWrapper>

     {showSearch && <div className="searchBar">
        <ContentWrapper>
          <div className="searchInput">
            <input type="text"
              placeholder='Search movies or tv shows...'
              onChange={(e => setQuery(e.target.value))}
              onKeyUp={searchQueryHandler}
            />
            <VscChromeClose onClick={() => setShowSearch(false)} />
          </div>
        </ContentWrapper>
      </div>}
    </header>
  );
    
};

export default Header;