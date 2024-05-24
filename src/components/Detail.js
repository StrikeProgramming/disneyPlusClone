import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { db } from "../Firebase";
import { collection, doc, getDoc } from "firebase/firestore";

const Detail = (props) => {
  const { id } = useParams();
  const [detailData, setDetailData] = useState({});
  console.log(id);

  useEffect(() => {
    const fetchDetailData = async () => {
      try {
        if (!id) {
          console.log("ID is undefined or empty");
          return;
        }

        const docRef = doc(collection(db, "movies"), id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setDetailData(docSnap.data());
        } else {
          console.log("No such document in Firebase with ID:", id);
        }
      } catch (error) {
        console.error("Error getting document:", error);
      }
    };

    fetchDetailData();
  }, [id]);

  return (
    <Container>
      <Background>
        <img src={detailData.backgroundImg} alt={detailData.title} />
      </Background>

      <ImageTitle>
        <img src={detailData.titleImg} alt={detailData.title} />
      </ImageTitle>
      <ContentMeta>
        <Controls>
          <Player>
            <img src="/images/play-icon-black.png" alt="" />
            <span>Play</span>
          </Player>
          <Trailer>
            <img src="/images/play-icon-white.png" alt="" />
            <span>Trailer</span>
          </Trailer>
          <AddList>
            <span />
            <span />
          </AddList>
          <GroupWatch>
            <div>
              <img src="/images/group-icon.png" alt="" />
            </div>
          </GroupWatch>
        </Controls>
        <SubTitle>{detailData.subTitle}</SubTitle>
        <Description>{detailData.description}</Description>
      </ContentMeta>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  top: 4.5rem;
  display: block;
  min-height: calc(100vh - 250px);
  padding: 0 calc(3.5vw + 5px);
  overflow: hidden;
`;

const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  opacity: 0.8;
  z-index: -1;

  img {
    width: 100vw;
    height: 100vh;

    @media (max-width: 768px) {
      width: initial;
    }
  }
`;

const ImageTitle = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;
  -webkit-box-pack: start;
  min-height: 170px;
  height: 30vw;
  width: 100%;
  margin: 0 auto;
  padding-bottom: 1.5rem;

  img {
    max-width: 600px;
    min-width: 200px;
    width: 35vw;
  }
`;

const ContentMeta = styled.div`
  max-width: 874px;
`;

const Controls = styled.div`
  display: flex;
  align-items: center;
  flex-flow: row wrap;
  row-gap: 1rem;
  min-height: 3.5rem;
  margin: 1.5rem 0;
`;

const Player = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 3.5rem;
  margin: 0 1.5rem 0 0;
  padding: 0 1.5rem;
  border: none;
  border-radius: 4px;
  background: rgb(249, 249, 249);
  color: rgb(0, 0, 0);
  font-size: 2rem;
  letter-spacing: 1.8px;
  text-align: center;
  text-transform: uppercase;
  cursor: pointer;

  img {
    width: 2rem;
  }

  &:hover {
    background: rgb(198, 198, 198);
  }

  @media (max-width: 768px) {
    height: 2.8rem;
    padding: 0 1.5rem;
    font-size: 0.75rem;
    margin: 0 0.65rem 0 0;

    img {
      width: 1.5rem;
    }
  }
`;

const Trailer = styled(Player)`
  border: 1px solid rgb(249, 249, 249);
  background: rgba(0, 0, 0, 0.3);
  color: rgb(249, 249, 249);
`;

const AddList = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 2.75rem;
  aspect-ratio: 1;
  margin-right: 1rem;
  border-radius: 50%;
  border: 2px solid #fff;
  background: rgba(0, 0, 0, 0.6);
  cursor: pointer;

  span {
    display: inline-block;
    background: rgb(249, 249, 249);

    &:first-child {
      height: 2px;
      width: 1rem;
      transform: translate(1px, 0) rotate(0deg);
    }

    &:nth-child(2) {
      height: 1rem;
      width: 2px;
      transform: translate(-8px) rotate(0deg);
    }
  }
`;

const GroupWatch = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 2.75rem;
  aspect-ratio: 1;
  border-radius: 50%;
  background: #fff;
  cursor: pointer;

  div {
    height: 2.5rem;
    aspect-ratio: 1;
    border-radius: 50%;
    background: rgb(0, 0, 0);

    img {
      width: 100%;
    }
  }
`;

const SubTitle = styled.div`
  min-height: 1.25rem;
  color: rgb(249, 249, 249);
  font-size: 1rem;

  @media (max-width: 768px) {
    font-size: 0.75rem;
  }
`;

const Description = styled.div`
  padding: 1rem 0;
  color: rgb(249, 249, 249);
  font-size: 1.25rem;
  line-height: 1.4;

  @media (max-width: 768px) {
    font-size: 0.875rem;
  }
`;

export default Detail;
