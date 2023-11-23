import MovieCard from "./MovieCard";


export default function Favoritos({favorites, addOrRemoveFavorites} ) {

    return (
        <>
            <div className="row">
                {
                    favorites.map((favorites, inx) => {
                        return (
                            <div className="col-xl-3 col-md-6 col-lg-4 col-12" key={inx} > <MovieCard title={favorites.movieTitle}
                                image={`https://image.tmdb.org/t/p/w500/${favorites.movieImage}`}
                                overview={favorites.movieDescription}
                                movieID={favorites.movieID}
                                addOrRemoveFavorites={addOrRemoveFavorites}
                            /></div>
                        )
                    })
                }
            </div>
        </>
    )
}