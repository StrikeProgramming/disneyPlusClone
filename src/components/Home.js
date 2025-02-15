import styled from "styled-components";
import ImgSlider from "./ImgSlider";
import Viewers from "./Viewers";
import Recommends from "./Recommends";
import NewDisney from "./NewDisney";
import Originals from "./Originals";
import Trending from "./Trending";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { db } from "../Firebase";
import { setMovies } from "../features/movie/movieSlice";
import { selectUserName } from "../features/user/userSlice";
import { collection, onSnapshot } from "firebase/firestore";

const Home = (props) => {
  const dispatch = useDispatch();
  const userName = useSelector(selectUserName);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "movies"),
      (snapshot) => {
        let recommends = [];
        let newDisneys = [];
        let originals = [];
        let trending = [];

        snapshot.forEach((doc) => {
          const data = doc.data();
          switch (data.type) {
            case "recommend":
              recommends.push({ id: doc.id, ...data });
              break;

            case "new":
              newDisneys.push({ id: doc.id, ...data });
              break;

            case "original":
              originals.push({ id: doc.id, ...data });
              break;

            case "trending":
              trending.push({ id: doc.id, ...data });
              break;

            default:
              break;
          }
        });

        dispatch(
          setMovies({
            recommend: recommends,
            newDisney: newDisneys,
            originals: originals,
            trending: trending,
          })
        );
      },
      [userName]
    );

    return () => unsubscribe();
  }, [dispatch]);

  return (
    <Container>
      <ImgSlider />
      <Viewers />
      <Recommends />
      <NewDisney />
      <Originals />
      <Trending />
    </Container>
  );
};

const Container = styled.main`
  position: relative;
  min-height: calc(100vh - 250px);
  overflow-x: hidden;
  top: 4.3rem;
  padding: 0 calc(3.5vw + 5px);

  &:after {
    content: "";
    background: url("/images/home-background.png") center center / cover
      no-repeat fixed;
    position: absolute;
    inset: 0;
    z-index: -1;
  }
`;

export default Home;
