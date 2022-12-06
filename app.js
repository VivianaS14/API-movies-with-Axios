const API_URL = 'https://api.themoviedb.org/3/movie/popular';
const SEARCH_URL = 'http://api.themoviedb.org/3/search/movie';
const API_KEY = '309f4117937473292dead40619ada01e';
const IMG_PATH = 'https://image.tmdb.org/t/p/w500/'

const formSearch = document.querySelector('#form-search');
const search = document.querySelector('#search');
const logo = document.querySelector('#load-content')

let pag = 1;
const btnPrevious = document.querySelector('#btn-previous');
const btnNext = document.querySelector('#btn-next');

const getData = async (url, key, pag, term = '') => {
    try {
        let data = await axios.get(url, {
            params: {
                api_key: key,
                page: pag,
                query: term
            },
            headers: {
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMDlmNDExNzkzNzQ3MzI5MmRlYWQ0MDYxOWFkYTAxZSIsInN1YiI6IjYzOGE4ZTdkNmRjNmMwMDA5N2JiMDAyNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.f1Xof7tA3QR2xxzFa-xtA2APY2u5Lkd6rjDVLV3c9iM'
            }
        })
        //console.log(data);
        showMovies(data);
        return data
    } catch (error) {
        console.log(error);
        Swal.fire({
            title: 'Error!',
            text: 'Conexion Troubles, Please try later!',
            icon: 'error',
            confirmButtonText: 'Ok'
        })
    }
}

const showMovies = (movies) => {
    let container = document.querySelector('#movie-container');
    container.innerHTML = ''
    movies.data.results.forEach(movie => {
        const { title, poster_path, vote_average, overview } = movie
        container.innerHTML += `
            <div class="card movie-card" style="width: 18rem;">
                <img src="${IMG_PATH + poster_path}" class="card-img-top" alt="img-${title}">
                <div class="card-body">
                    <div class="movie-info">
                        <h4>${title}</h4>
                        <span class="${getClassByRate(vote_average)}">${vote_average}</span>
                    </div>
                    <div class="overview">
                        <h4>Overview</h4>
                        <p>${overview}</p>
                    </div>
                </div>
            </div>
        `
        //console.log(movie.genre_ids);
    })
}

const getClassByRate = (rate) => {
    if (rate < 4) return 'red'
    else if (rate > 6) return 'green'
    else return 'orange'
}

window.addEventListener('DOMContentLoaded', () => {
    getData(API_URL, API_KEY, pag)
})

logo.addEventListener('click', () => {
    getData(API_URL, API_KEY, pag)
})

formSearch.addEventListener('submit', e => {
    e.preventDefault();
    console.log(search.value);
    if (search.value !== '') {
        getData(SEARCH_URL, API_KEY, pag, search.value);
        search.value = ""
    } else {
        window.location.reload()
    }
})

btnNext.addEventListener('click', () => {
    if (pag < 1000) {
        pag++
        getData(API_URL, API_KEY, pag)
        btnPrevious.classList.remove('disabled')
    }
})

btnPrevious.addEventListener('click', () => {
    if (pag > 1) {
        pag--
        getData(API_URL, API_KEY, pag)
    }
})

/* const getMovies = async () => {
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
getMovies(); */
