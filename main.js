const API_KAY="api_key=9c2a03cd716c14cec0e167b5657f23be";
const BASE_URL= "https://api.themoviedb.org/3";
const API_URL =BASE_URL + "/discover/movie?sort_by=popularity.desc&"+API_KAY;
const IMG_URL ="https://image.tmdb.org/t/p/w500"
const searchURL =BASE_URL +"/search/movie?"+API_KAY; 

getMovies(API_URL);

function getMovies(url){
    fetch(url).then(res=>res.json()).then(data=> {
       console.log(data.results);
        showMovies(data.results);
        
    })
    
}

const genres= [
    {
        "id": 28,
        "name": "Action"
      },
      {
        "id": 12,
        "name": "Adventure"
      },
      {
        "id": 16,
        "name": "Animation"
      },
      {
        "id": 35,
        "name": "Comedy"
      },
      {
        "id": 80,
        "name": "Crime"
      },
      {
        "id": 99,
        "name": "Documentary"
      },
      {
        "id": 18,
        "name": "Drama"
      },
      {
        "id": 10751,
        "name": "Family"
      },
      {
        "id": 14,
        "name": "Fantasy"
      },
      {
        "id": 36,
        "name": "History"
      },
      {
        "id": 27,
        "name": "Horror"
      },
      {
        "id": 10402,
        "name": "Music"
      },
      {
        "id": 9648,
        "name": "Mystery"
      },
      {
        "id": 10749,
        "name": "Romance"
      },
      {
        "id": 878,
        "name": "Science Fiction"
      },
      {
        "id": 10770,
        "name": "TV Movie"
      },
      {
        "id": 53,
        "name": "Thriller"
      },
      {
        "id": 10752,
        "name": "War"
      },
      {
        "id": 37,
        "name": "Western"
      }

]
const tagEl = document.getElementById('tags')
let selectedGenre = []
setGenre();
function setGenre() {
    tagEl.innerHTML= '';
    genres.forEach(genre => {
        const genreDiv = document.createElement('div');
        genreDiv.classList.add('tag');
        genreDiv.id=genre.id;
        genreDiv.innerText = genre.name;
        genreDiv.addEventListener('click', () => {
            if(selectedGenre.length == 0){
                selectedGenre.push(genre.id);
            }else{
                if(selectedGenre.includes(genre.id)){
                    selectedGenre.forEach((id, idx) => {
                        if(id == genre.id){
                            selectedGenre.splice(idx, 1);
                        }
                    })
                }else{
                    selectedGenre.push(genre.id);
                }
            }
            console.log(selectedGenre)
            getMovies(API_URL + '&with_genres='+encodeURI(selectedGenre.join(',')))
            highlightSelection()

        })
        tagEl.append(genreDiv);
    })
}
function highlightSelection() {
    const tags = document.querySelectorAll('.tag');
    tags.forEach(tag => {
        tag.classList.remove('highlight')
    })
    if(selectedGenre.length !=0){   
        selectedGenre.forEach(id => {
            const hightlightedTag = document.getElementById(id);
            hightlightedTag.classList.add('highlight');
        })
    }

}




function showMovies(data){
    const moviesEl = document.querySelector('.movies') ;
    moviesEl.innerHTML= ` `;
    let src;
    for (let i=0 ; i<data.length;i++){
        const movie =document.createElement("div");
        movie.classList.add('card','col-sm-4');
        if(data[i].poster_path===null){
             src="/img/p1.png";

        }else{
            src=IMG_URL+data[i].poster_path;

        }
        movie.innerHTML= `  
        <img class="card-img-top " src="${src}" style="height: 400px" alt="${data[i].title}">
        <div class="card-body">
        <h5 class="card-title d-flex justify-content-between ">${data[i].title} <span><br>${data[i].vote_average}</span></h5>
        
        <button type="button" class="btn-outline-danger btn-lg btn-block " style="padding: 1.25em; margin-top: 3px;"data-toggle="modal" data-target="#target${i}">Details</button>
        
        
        <div class="modal fade bd-example-modal-lx " id ='target${i}' tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lx">
        <div class="modal-content">
        <img src="${IMG_URL+data[i].backdrop_path}" alt="${data[i].title}">
        
        <h2> Title :${data[i].title}</h2>
        <h6>Release Date : ${data[i].release_date} </h6>
        <br>
        Overview : 
        <p><b>${data[i].overview}</b></p>
        </div>
        </div>
        </div>
        </div>                  
        `
        moviesEl.append(movie);
    }
    
};

    const search=document.getElementById("search")
    const searchInput=document.getElementById("searchInput")
   
    searchInput.addEventListener('click', () =>{
        const seashItem= search.value;
    //   console.log(seashItem);
        
        if(seashItem){
            getMovies(searchURL+'&query='+seashItem)
            // console.log(searchURL+'&query='+seashItem);
        }else{
            getMovies(API_URL)
            // console.log(API_URL);

        }
        
    })

