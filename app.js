const getMovies = async () => {
    try {
        let response = await axios.get('https://api.themoviedb.org/3/movie/popular', {
            params: {
                api_key: '309f4117937473292dead40619ada01e'
            },
            headers: {
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMDlmNDExNzkzNzQ3MzI5MmRlYWQ0MDYxOWFkYTAxZSIsInN1YiI6IjYzOGE4ZTdkNmRjNmMwMDA5N2JiMDAyNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.f1Xof7tA3QR2xxzFa-xtA2APY2u5Lkd6rjDVLV3c9iM'
            }
        });

        console.log(response);
        //return response.data.results
    } catch (error) {
        console.log(error);
    }
}

const showMovies = async () => {
    let dataMovies = await getMovies();
    dataMovies.forEach(movie => {
        let container = document.querySelector('#movie-container');
        container.innerHTML += `
            <div class="card" style="width: 18rem;">
                <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" class="card-img-top" alt="img-${movie.id}">
                <div class="card-body">
                    <p class="card-text">${movie.title}</p>
                </div>
            </div>
        `
    });
}
showMovies()