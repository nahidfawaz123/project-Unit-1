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
        <img class="card-img-top " src="${src}" alt="${data[i].title}">
        <div class="card-body">
        <h5 class="card-title d-flex justify-content-between ">${data[i].title} <span>${data[i].vote_average}</span></h5>
        
        <button type="button" class="btn-outline-danger btn-lg btn-block " data-toggle="modal" data-target="#target${i}">Details</button>
        
        
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

   

    function users(){
        let users = JSON.parse(localStorage.getItem('Users')) || [];
        let Userdata = {
            rUsername:document.getElementById("rUsername").value,
            rPassword:document.getElementById("rPassword").value};
        users.push(Userdata);
        localStorage.setItem('Users', JSON.stringify(users));
        window.location.reload();
    }

    function check() {
        let users=[];
        let username=document.getElementById("username").value;
        let password =document.getElementById("password").value;
         users = JSON.parse(localStorage.getItem('Users')) ;
        console.log(users.length);
            for (let i = 0; i < users.length; i++) {
                // console.log(username);
                // console.log(password);
                // console.log(users[i].rUsername);
                // console.log(users[i].rPassword);
         if(username !== users[i].rUsername && password !== users[i].rPassword) {

            alert('ERROR');
        }else {
             alert('You are loged in.');
             const logIn =document.querySelector('#login');
             logIn.style.display='none'
            //  logIn.innerText=username

           const logUser=document.querySelector('.logUser');
            const but=document.createElement("button");
            but.innerText=username;
            logUser.append(but)
            

            
         }
        
    } 
}  
 




