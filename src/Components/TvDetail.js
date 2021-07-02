import React from "react";
import Helmet from "react-helmet";
import PropTypes from "prop-types";
import UseTabs  from "../Components/UseTabs";
import styled from "styled-components";

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
  `;

const Title = styled.h3`
  font-size: 2.5rem;
`;
const TabButton = styled.div`
    width: 33%;
    color: darkgrey;
    font-size: 1.5rem;
    text-align: center;
    text-transform: capitalize;
    padding: 1rem;
    border-bottom: ${props => (props.current ? "yellow" : "transparent")} solid 3px;
    transition: border-bottom 0.5s ease-in-out;
`;

const TabMenu = styled.div`
    display: flex;
    margin: 0.5rem 0px;
`;

const ItemContainer = styled.div`
  margin: 1rem 0;
`;

const Item = styled.span``;

const Divider = styled.span`
  margin: 0 10px;
`;

const Overview = styled.p`
  margin-top: 20px;
  opacity: 0.7;
  line-height: 1.5;
`;

const Scontainer = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, 125px);
    grid-gap: 25px;
`;

const Image = styled.div`
  background-image: url(${props => props.bgUrl});
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
`;

const Year = styled.span`
  font-size: 0.5rem;
  color: rgba(255, 255, 255, 0.5);
`;

const SmallTitle = styled.p`
  margin-top: 20px;
  font-size: 1.3rem;
`;

const Cnames = styled.p`
  font-size: 24px;
  margin-top: 1rem;
  opacity: 0.5;
`;

const Header = styled.div`
  height: 50%;
`;

const TvDetail = ({data}) => {
    const { currentItem, changeItem } = UseTabs(0, data);
   
    return (
    <Container>
      <Helmet>
        <title>
          {data[0].content.original_name}{" "} | FlixNet
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
          <Header>
            {data[0].content.videos.length > 0 ? <iframe title={data[0].content.videos[0].key} width="100%" height="100%" src={`https://www.youtube.com/embed/${data[0].content.videos[0].key}?autoplay=1&mute=1`} frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            : <Title>{data[0].content.original_name}</Title>}
          </Header>
          <TabMenu>
            {data.map(
                    (section, index) => (
                    <TabButton key={index} current={currentItem.tab===section.tab} onClick={() => changeItem(index)}>{section.tab}</TabButton>
            ))}
          </TabMenu>
            {currentItem.tab === "info" ? 
              <ItemContainer>
                <Item>
                  {currentItem.content.first_air_date && currentItem.content.first_air_date.substring(0, 4)}
                </Item>
                <Divider>•</Divider>
                <Item>
                  {currentItem.content.episode_run_time && currentItem.content.episode_run_time[0]} min
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
                <Overview>{currentItem.content.overview}</Overview></ItemContainer> : 
                ((currentItem.tab === "production") ? <ItemContainer>
                    <SmallTitle>Companies : </SmallTitle>
                    <Cnames>
                      {currentItem.content.production_companies.length > 0 ? currentItem.content.production_companies.map(
                        (company, index) => company &&
                            (index === currentItem.content.production_companies.length - 1
                              ? company.name
                              : `${company.name} / `)
                      ) : "No Companies"}
                    </Cnames>
                    <SmallTitle>Countries : </SmallTitle>
                    <Cnames>
                      {currentItem.content.production_countries.length > 0 ? currentItem.content.production_countries.map(
                        (country, index) => country &&
                            (index === currentItem.content.production_countries.length - 1
                              ? country.name
                              : `${country.name} / `)
                      ) : "No Countries"}
                    </Cnames>
                </ItemContainer> :
                <ItemContainer>
                    <Scontainer>
                        {currentItem.content.seasons.map(
                            (season, index) => (
                                <div>
                                    <ImageContainer>
                                    <Image
                                    bgUrl={
                                        season.poster_path
                                        ? `https://image.tmdb.org/t/p/original${season.poster_path}`
                                        : require("../assets/noPosterSmall.png")
                                    }
                                    />
                                    </ImageContainer>
                                    <Stitle>
                                        {season.name}
                                    </Stitle>
                                    <Year>{season.air_date}</Year>
                                </div>
                            )
                        )}
                    </Scontainer>
                </ItemContainer>)
            }
        </Data>
      </Contents>
    </Container>
    );
};

TvDetail.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      tab: PropTypes.string,
      content: PropTypes.shape({
        backdrop_path: PropTypes.string,
        poster_path: PropTypes.string,
        original_name: PropTypes.string,
        episode_run_time: PropTypes.array,
        first_air_date: PropTypes.string,
        genres: PropTypes.array,
        overview: PropTypes.string,
        videos: PropTypes.array

      })
    }),
    PropTypes.shape({
      tab: PropTypes.string,
      content: PropTypes.shape({
        production_companies: PropTypes.array,
        production_countries: PropTypes.array
      })
    }),
    PropTypes.shape({
        tab: PropTypes.string,
        content: PropTypes.shape({
            seasons: PropTypes.array,
        })
    }),
  ),
};

export default TvDetail;