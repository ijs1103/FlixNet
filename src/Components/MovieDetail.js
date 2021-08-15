import React from "react";
import Helmet from "react-helmet";
import PropTypes from "prop-types";
import UseTabs  from "../Components/UseTabs";
import styled from "styled-components";
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import { Carousel } from 'react-responsive-carousel';

const Container = styled.div`
    height: calc(100vh - 50px);
    width: 100%;
    position: relative;
    padding: 50px;
    font-size: 1rem;
  `;

  const Backdrop = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url(${props => props.bgImage});
    background-position: center center;
    background-size: cover;
    filter: blur(3px);
    opacity: 0.5;
    z-index: 0;
  `;

  const Contents = styled.div`
    display: flex;
    width: 100%;
    position: relative;
    z-index: 1;
    height: 100%;
  `;

  const Cover = styled.div`
    width: 30%;
    background-image: url(${props => props.bgImage});
    background-position: center center;
    background-size: cover;
    height: 100%;
    border-radius: 5px;
  `;

  const Data = styled.div`
    width: 70%;
    margin-left: 1rem;
    overflow-y: scroll;
  `;

const Title = styled.p`
  font-size: 2.5rem;
`;
const TabButton = styled.div`
    width: 25%;
    color: ${props => (props.current ? "white" : "darkgrey")};
    font-size: 1.5rem;
    text-align: center;
    text-transform: capitalize;
    padding: 1rem;
    border-bottom: ${props => (props.current ? "yellow" : "transparent")} solid 2px;
    transition: border-bottom 0.5s ease-in-out;
`;

const TabMenu = styled.div`
    display: flex;
    margin: 0.5rem 0px;
`;

const ItemContainer = styled.div`
  margin: 1rem 0;
  height: 70%;
`;

const Item = styled.span``;

const Divider = styled.span`
  margin: 0 20px;
`;

const Overview = styled.p`
  margin-top: 20px;
  opacity: 0.7;
  line-height: 1.5;
`;

const Image = styled.div`
  background-image: url(${props => props.bgUrl});
  width: 125px;
  height: 180px;
  background-size: cover;
  border-radius: 4px;
  background-position: center center;
`;

const ImageContainer = styled.div`
  margin-bottom: 5px;
  position: relative;
`;

const Stitle = styled.span`
  display: block;
  color: rgba(255, 255, 255, 0.5);
`;

const Casts = styled.div`
  margin-top: 2rem;
  display: flex;
  overflow-x: scroll;
  overflow-y: hidden;
  ::-webkit-scrollbar {
  height: 4px;
  }
  ::-webkit-scrollbar-track {
  background-color: transparent;
  }
  ::-webkit-scrollbar-thumb {
  border-radius: 5px;
  background-color: yellow;
  }
`;

const Cast = styled.div`
  margin-right: 1.5rem;
`;

const Cnames = styled.p`
  font-size: 1.5rem;
  margin-top: 1rem;
  opacity: 0.7;
`;

const Videos = styled.div`
  height: 100%;
`;
const Video = styled.iframe`
`;

const MovieDetail = ({data}) => {
  
    const { currentItem, changeItem } = UseTabs(0, data);
    return (
    <Container>
      <Helmet>
        <title>
          {data[0].content.original_title}{" "} | FlixNet
        </title>
      </Helmet>
      <Backdrop
        bgImage={`https://image.tmdb.org/t/p/original${data[0].content.backdrop_path}`}
      />
      <Contents>
        <Cover
          bgImage={
            data[0].content.poster_path
              ? `https://image.tmdb.org/t/p/original${data[0].content.poster_path}`
              : require("../assets/noPosterSmall.png")
          }
        />
        <Data>
          <Title>{data[0].content.original_title}<a href={`https://www.imdb.com/title/${data[0].content.imdb_id}`} target="_blank" rel="noopener noreferrer"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/IMDB_Logo_2016.svg/1200px-IMDB_Logo_2016.svg.png" width="5%" style={{marginLeft: 1.5 + 'rem'}}/></a></Title>

          <TabMenu>
            {data.map(
                  (section, index) => (
                    <TabButton key={index} current={currentItem.tab===section.tab} onClick={() => changeItem(index)}>{section.tab}</TabButton>
            ))}
          </TabMenu>
            {currentItem.tab === "info" ? 
              <ItemContainer>
                  <Item>
                    {currentItem.content.release_date && currentItem.content.release_date.substring(0, 4)}
                  </Item>
                  <Divider>•</Divider>
                  <Item>
                    {currentItem.content.runtime} min
                  </Item>
                  <Divider>•</Divider>
                  <Item>
                    {currentItem.content.genres &&
                      currentItem.content.genres.map((genre, index) =>
                        index === currentItem.content.genres.length - 1
                          ? genre.name
                          : `${genre.name} / `
                      )}
                  </Item>
                  <Divider></Divider>
                  <Overview>{currentItem.content.overview}</Overview>
                </ItemContainer> : (currentItem.tab === "trailer") ? 
                <ItemContainer>
                  <Videos>
                    {currentItem.content.videos.length > 0 ? 
                    <Carousel plugins={['arrows']}>
                      {currentItem.content.videos.map(
                        (video, index) => (
                          <Video key={video.key} title={index} width="90%" height="400px" src={`https://www.youtube.com/embed/${video.key}?mute=1`} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></Video>
                        )
                      )}
                    </Carousel>
                    : null}
                  </Videos>
                </ItemContainer> : 
                <ItemContainer>
                    <Cnames>
                      {currentItem.content.production_companies.length > 0 ? currentItem.content.production_companies.map(
                        (company, index) => company &&
                            (index === currentItem.content.production_companies.length - 1
                              ? company.name
                              : `${company.name} / `)
                      ) : "No Companies"}
                    </Cnames>
                    <Cnames>
                      {currentItem.content.production_countries.length > 0 ? currentItem.content.production_countries.map(
                        (country, index) => country &&
                            (index === currentItem.content.production_countries.length - 1
                              ? country.name
                              : `${country.name} / `)
                      ) : "No Countries"}
                    </Cnames>
                    <Casts>
                    {currentItem.content.casts.map(
                      (cast, index) => (
                        <Cast>
                          <ImageContainer>
                          <Image
                          bgUrl={
                              cast.profile_path
                              ? `https://image.tmdb.org/t/p/original${cast.profile_path}`
                              : require("../assets/noPosterSmall.png")
                          }
                          />
                          </ImageContainer>
                          <Stitle>
                              {cast.name}
                          </Stitle>
                        </Cast>
                      )
                    )}
                    </Casts>
                </ItemContainer>
            }
        </Data>
      </Contents>
    </Container>
    );
};

MovieDetail.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      tab: PropTypes.string,
      content: PropTypes.shape({
        backdrop_path: PropTypes.string,
        poster_path: PropTypes.string,
        original_title: PropTypes.string,
        release_date: PropTypes.string,
        runtime: PropTypes.number,
        genres: PropTypes.array,
        imdb_id: PropTypes.string,
        overview: PropTypes.string,
      })
    }),
    PropTypes.shape({
      tab: PropTypes.string,
      content: PropTypes.shape({
        production_companies: PropTypes.array,
        production_countries: PropTypes.array,
        casts: PropTypes.array
      })
    }),
    PropTypes.shape({
      tab: PropTypes.string,
      content: PropTypes.shape({
        videos: PropTypes.array
      })
    }),
  ),
};

export default MovieDetail;