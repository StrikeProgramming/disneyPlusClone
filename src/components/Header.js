import { useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { auth, provider } from "../Firebase";
import { signInWithPopup } from "firebase/auth";
import {
  selectUserName,
  selectUserPhoto,
  setSignOutState,
  setUserLoginDetails,
} from "../features/user/userSlice";

const Header = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userName = useSelector(selectUserName);
  const userPhoto = useSelector(selectUserPhoto);

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        setUser(user);
        navigate("/home");
      }
    });
  }, [userName]);

  const handleAuth = () => {
    if (!userName) {
      signInWithPopup(auth, provider)
        .then((result) => {
          setUser(result.user);
        })
        .catch((error) => {
          alert(error.message);
        });
    } else if (userName) {
      auth
        .signOut()
        .then(() => {
          dispatch(setSignOutState());
          navigate("/");
        })
        .catch((err) => alert(err.message));
    }
  };

  const setUser = (user) => {
    dispatch(
      setUserLoginDetails({
        name: user.displayName,
        email: user.email,
        photo: user.photoURL,
      })
    );
  };

  return (
    <Nav>
      <Logo>
        <img src="/images/logo.svg" />
      </Logo>

      {!userName ? (
        <Login onClick={handleAuth}>Login</Login>
      ) : (
        <>
          <NavMenu>
            <a href="/home">
              <img src="/images/home-icon.svg" alt="HOME" />
              <span>HOME</span>
            </a>
            <a>
              <img src="/images/search-icon.svg" alt="SEARCH" />
              <span>SEARCH</span>
            </a>
            <a>
              <img src="/images/watchlist-icon.svg" alt="WATCHLIST" />
              <span>WATCHLIST</span>
            </a>
            <a>
              <img src="/images/original-icon.svg" alt="ORIGINALS" />
              <span>ORIGINALS</span>
            </a>
            <a>
              <img src="/images/movie-icon.svg" alt="MOVIES" />
              <span>MOVIES</span>
            </a>
            <a>
              <img src="/images/series-icon.svg" alt="SERIES" />
              <span>SERIES</span>
            </a>
          </NavMenu>
          <SignOut>
            <UserImg src={userPhoto} alt={userName} />
            <DropDown>
              <span onClick={handleAuth}>Sign Out</span>
            </DropDown>
          </SignOut>
        </>
      )}
    </Nav>
  );
};

const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 4.4rem;
  padding: 0 2.25rem;
  background-color: #090b13;
  letter-spacing: 1rem;
  z-index: 3;
`;

const Logo = styled.a`
  display: inline-block;
  width: 5rem;
  max-height: 4.3rem;
  margin-top: 0.25rem;
  padding: 0;
  font-size: 0;

  img {
    display: block;
    width: 100%;
  }
`;

const NavMenu = styled.div`
  position: relative;
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-end;
  align-items: center;
  height: 100%;
  margin: 0;
  margin-right: auto;
  margin-left: 1.5rem;
  padding: 0;

  a {
    display: flex;
    align-items: center;
    padding: 0 0.5rem;

    img {
      height: 1.25rem;
      aspect-ratio: 1;
      z-index: auto;
    }

    span {
      position: relative;
      margin-left: 0.1rem;
      padding: 2px 0;
      color: rgb(249, 249, 249);
      font-size: 0.8rem;
      letter-spacing: 1.42px;
      line-height: 1.08;
      white-space: nowrap;

      &:before {
        content: "";
        position: absolute;
        right: 0;
        bottom: -6px;
        left: 0;
        width: auto;
        height: 2px;
        border-radius: 0 0 4px 4px;
        background-color: rgb(249, 249, 249);
        opacity: 0;
        transform: scaleX(0);
        transform-origin: left center;
        transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
        visibility: hidden;
      }
    }

    &:hover {
      span:before {
        opacity: 1;
        transform: scaleX(1);
        visibility: visible;
      }
    }
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const Login = styled.a`
  background-color: rgba(0, 0, 0, 0.6);
  padding: 0.5rem 1rem;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  border: 1px solid #f9f9f9;
  border-radius: 4px;
  transition: all 0.2s ease 0s;

  &:hover {
    background-color: #f9f9f9;
    color: #000;
  }
`;

const UserImg = styled.img`
  display: inline-block;
  text-align: center;
  letter-spacing: 1.5px;
  line-height: 4.3rem;
`;

const DropDown = styled.div`
  position: absolute;
  top: 3rem;
  right: 0;
  width: 100px;
  padding: 0.625rem;
  border: 1px solid rgba(151, 151, 151, 0.34);
  border-radius: 4px;
  background-color: rgb(19, 19, 19);
  letter-spacing: 2px;
  font-size: 0.875rem;
  text-align: center;
  box-shadow: rgb(0 0 0 /50%) 0 0 18px 0;
  opacity: 0;

  &:hover {
    background-color: #090b13;
  }
`;

const SignOut = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 3rem;
  aspect-ratio: 1;
  cursor: pointer;

  ${UserImg} {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }

  &:hover {
    ${DropDown} {
      opacity: 1;
      transition-duration: 1s;
    }
  }
`;

export default Header;
