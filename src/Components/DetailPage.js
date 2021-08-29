import React from "react";
import {DetailComponents} from "Components/DetailComponents";
import Helmet from "react-helmet";
import UseTabs  from "./UseTabs";
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import { Carousel } from 'react-responsive-carousel';

const {Container,Backdrop,Contents,Cover,Data,Title,TabButton,TabMenu,ItemContainer,Item,Divider,Overview,Image,ImageContainer,Stitle,Casts,Cast,Cnames,Videos,Video,Scontainer,Year
  } = DetailComponents;

const noImage = require("../assets/noPosterSmall.png");

const renderSwitch = (current) => {
    switch(current.tab) {
      case 'info':
        return <ItemContainer>
        <Item>
          {current.content.release_date ? current.content.release_date.substring(0, 4) : current.content.first_air_date.substring(0, 4)}
        </Item>
        <Divider>•</Divider>
        <Item>
          {current.content.runtime ? current.content.runtime : current.content.episode_run_time} min
        </Item>
        <Divider>•</Divider>
        <Item>
          {current.content.genres &&
            current.content.genres.map((genre, index) =>
              index === current.content.genres.length - 1
                ? genre.name
                : `${genre.name} / `
            )}
        </Item>
        <Divider></Divider>
        <Overview>{current.content.overview}</Overview>
      </ItemContainer>;
      case 'production':
        return <ItemContainer>
        <Cnames>
          {current.content.production_companies.length > 0 ? current.content.production_companies.map(
            (company, index) => company &&
                (index === current.content.production_companies.length - 1
                  ? company.name
                  : `${company.name} / `)
          ) : "No Companies"}
        </Cnames>
        <Cnames>
          {current.content.production_countries.length > 0 ? current.content.production_countries.map(
            (country, index) => country &&
                (index === current.content.production_countries.length - 1
                  ? country.name
                  : `${country.name} / `)
          ) : "No Countries"}
        </Cnames>
        <Casts>
        {current.content.casts.map(
          (cast, index) => (
            <Cast key={cast.id}>
              <ImageContainer>
              <Image
              bgUrl={
                  cast.profile_path
                  ? `https://image.tmdb.org/t/p/original${cast.profile_path}`
                  : noImage
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
    </ItemContainer>;
      case 'trailer':
        return <ItemContainer>
        <Videos>
          {current.content.videos.results.length > 0 ? 
          <Carousel plugins={['arrows']} showThumbs={false} showStatus={false} showIndicators={false}>
            {current.content.videos.results.map(
              (video, index) => (
                <Video key={video.key} title={index} width="90%" height="400px" src={`https://www.youtube.com/embed/${video.key}?mute=1`} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></Video>
              )
            )}
          </Carousel>
          : null}
        </Videos>
      </ItemContainer>;
      default:
        return <ItemContainer>
        <Scontainer>
            {current.content.seasons.map(
                (season, index) => (
                    <div key={season.id}>
                        <ImageContainer>
                        <Image
                        bgUrl={
                            season.poster_path
                            ? `https://image.tmdb.org/t/p/original${season.poster_path}`
                            : noImage
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
    </ItemContainer>;
    }
  };

const DetailPage = ({data}) => {
  
    const { currentItem, changeItem } = UseTabs(0, data);
    const commonData = data[0].content;
    return (
    <Container>
      <Helmet>
        <title>
          {commonData.original_title ? commonData.original_title : commonData.original_name}{" "} | FlixNet
        </title>
      </Helmet>
      <Backdrop
        bgImage={`https://image.tmdb.org/t/p/original${commonData.backdrop_path}`}
      />
      <Contents>
        <Cover
          bgImage={
            commonData.poster_path
              ? `https://image.tmdb.org/t/p/original${commonData.poster_path}`
              : noImage
          }
        />
        <Data>
          <Title>{commonData.original_title ? commonData.original_title : commonData.original_name}{commonData.imdb_id ? <a href={`https://www.imdb.com/title/${commonData.imdb_id}`} target="_blank" rel="noopener noreferrer"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/IMDB_Logo_2016.svg/1200px-IMDB_Logo_2016.svg.png" width="5%" style={{marginLeft: 1.5 + 'rem'}} alt="imdbLogo" /></a>: null}</Title>
          <TabMenu>
            {data.map(
                  (section, index) => (
                    <TabButton key={index} blocked={section.content===undefined} current={currentItem.tab===section.tab} onClick={() => changeItem(index)}>{section.tab}</TabButton>
            ))}
          </TabMenu>
          {renderSwitch(currentItem)}
        </Data>
      </Contents>
    </Container>
    );
};

export default DetailPage;