import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Image = styled.div`
  background-image: url(${props => props.bgUrl});
  height: 300px;
  background-size: cover;
  border-radius: 4px;
  background-position: center center;
  transition: opacity 0.1s linear;
`;

const Detail = styled.span`
  top: 50%;
  left: 50%;
  width: 80%;
  position: absolute;
  transform:translate(-50%, -50%);
  font-size: 1rem;
  padding: 10px 10px;
  text-align: center;
  opacity: 0;
  color: white;
  border: white 2px solid;
  border-radius: 10px;
  transition: opacity 0.1s linear;
`;

const ImageContainer = styled.div`
  margin-bottom: 5px;
  position: relative;
  &:hover {
    ${Image} {
      opacity: 0.3;
    }
    ${Detail} {
      opacity: 1;
    }
  }
`;

const Title = styled.span`
  display: block;
  font-size: 1rem;
  margin: 10px 0;
`;
const SubContainer = styled.span`
  display: flex;
  justify-content: space-between;
`;
const SubTitle = styled.span`
  display: block;
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.5);
`;

const Container = styled.div`
  margin-right: 1.5rem;
  width: 200px;
  &:hover {
    ${Title} {
      color: red;
    }
  }
`;

const Poster = ({ id, imageUrl, title, rating, year, isMovie = false }) => (
  <Link to={isMovie ? `/movie/${id}` : `/show/${id}`}>
    <Container>
      <ImageContainer>
        <Image
          bgUrl={
            imageUrl
              ? `https://image.tmdb.org/t/p/w500${imageUrl}`
              : require("../assets/noPosterSmall.png")
          }
        />
        <Detail>
          상세정보
        </Detail>
      </ImageContainer>
      <Title>
        {title.length > 18 ? `${title.substring(0, 18)}...` : title}
      </Title>
      <SubContainer>
      <SubTitle>{year && year.substring(0, 4)}</SubTitle>
      <SubTitle>
          <span role="img" aria-label="rating">
            ⭐️
          </span>{" "}
          {rating}
        </SubTitle>
      </SubContainer>
    </Container>
  </Link>
);

Poster.propTypes = {
  id: PropTypes.number.isRequired,
  imageUrl: PropTypes.string,
  title: PropTypes.string.isRequired,
  rating: PropTypes.number,
  year: PropTypes.string,
  isMovie: PropTypes.bool
};

export default Poster;
