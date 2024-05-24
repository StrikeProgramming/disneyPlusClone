import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const ImgSlider = (props) => {
  let settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };
  return (
    <Carousel {...settings}>
      <Wrap>
        <a>
          <img src="/images/slider-badging.jpg" alt="" />
        </a>
      </Wrap>
      <Wrap>
        <a>
          <img src="/images/slider-scale.jpg" alt="" />
        </a>
      </Wrap>
      <Wrap>
        <a>
          <img src="/images/slider-badag.jpg" alt="" />
        </a>
      </Wrap>
      <Wrap>
        <a>
          <img src="/images/slider-scales.jpg" alt="" />
        </a>
      </Wrap>
    </Carousel>
  );
};

const Carousel = styled(Slider)`
  margin-top: 1.25rem;

  & > button {
    height: 100%;
    width: 5vw;
    opacity: 0;
    z-index: 1;

    &:hover {
      opacity: 1;
      transition: opacity 0.2s ease 0s;
    }
  }

  ul li button {
    &:before {
      color: rgb(150, 150, 150);
      font-size: 0.65rem;
    }
  }
  li.slick-active button:before {
    color: #fff;
  }

  .slick-list {
    overflow: initial;
  }

  .slick-prev {
    left: -2rem;
  }

  .slick-next {
    right: -2rem;
  }
`;

const Wrap = styled.div`
  position: relative;
  border-radius: 4px;
  cursor: pointer;

  a {
    position: relative;
    display: block;
    padding: 0.25rem;
    border-radius: 4px;
    box-shadow: rgb(0 0 0 / 69%) 0 26px 30px -10px,
      rgb(0 0 0 / 73%) 0 16px 10px -10px;
    cursor: pointer;

    img {
      width: 100%;
      height: 100%;
    }

    &:hover {
      padding: 0;
      border: 4px solid rgba(249, 249, 249, 0.8);
    }
  }
`;

export default ImgSlider;
