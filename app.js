let pag = 1;
const btnPrevious = document.querySelector('#btn-previous');
const btnNext = document.querySelector('#btn-next');

btnNext.addEventListener('click', () => {
    if (pag < 1000) {
        pag++
        getMovies();
    }
})

btnPrevious.addEventListener('click', () => {
    if (pag > 1) {
        pag--
        getMovies();
    }
})

const getMovies = async () => {
    try {
        let response = await axios.get('https://api.themoviedb.org/3/movie/popular', {
            params: {
                api_key: '309f4117937473292dead40619ada01e',
                page: pag
            },
            headers: {
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMDlmNDExNzkzNzQ3MzI5MmRlYWQ0MDYxOWFkYTAxZSIsInN1YiI6IjYzOGE4ZTdkNmRjNmMwMDA5N2JiMDAyNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.f1Xof7tA3QR2xxzFa-xtA2APY2u5Lkd6rjDVLV3c9iM'
            }
        });

        if (response.status == 200) {
            let container = document.querySelector('#movie-container');
            container.innerHTML = ''
            response.data.results.forEach(movie => {
                container.innerHTML += `
                    <div class="card movie-card" style="width: 18rem;">
                        <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" class="card-img-top" alt="img-${movie.id}">
                        <div class="card-body">
                            <p class="card-text">${movie.title}</p>
                        </div>
                    </div>
                `
                //console.log(movie.genre_ids);
            })

        } else if (response.status == 401) {
            console.log('Pusiste la llave mal');
        } else if (response.status == 404) {
            console.log('La pelicula que buscas no existe');
        } else {
            console.log('Hubo un error y no sabemos que paso');
        }

        //return response.data.results
    } catch (error) {
        console.log(error);
    }
}
getMovies();
