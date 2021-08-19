
export const contents = result => [
    {   
      tab: "info",
      content: {
        backdrop_path: result.backdrop_path,
        poster_path: result.poster_path,
        ...(result.original_title ? {original_title: result.original_title} : {original_name: result.original_name}),
        ...(result.imdb_id && {imdb_id: result.imdb_id}),
        ...(result.release_date ? {release_date: result.release_date} : {first_air_date: result.first_air_date}),
        ...(result.runtime ? {runtime: result.runtime} : {episode_run_time: result.episode_run_time}),
        genres: result.genres,
        overview: result.overview,  
      }         
    },
    {
      tab: "production",
      content: {
        production_companies: result.production_companies,
        production_countries: result.production_countries,
        casts: result.credits.cast,
      }
    },
    {
      tab: "trailer",
      content: {
        videos: result.videos
      }
    },
    {...(result.seasons && {
      tab: "seasons",
      content: {
        seasons: result.seasons
      }
    })}
  ];
