function getDogList(){
    $.get('https://dog.ceo/api/breeds/list/all' , function(data){
    let dogBreed=data.message;
    for(let breed in dogBreed){
      $('.dog-breed').append(`<option val="${breed}">${breed}</option>`);
    }
  });
  

  // after getting all dogs breed list we check whether the dog subreed exists or not 
  //  if it exitst than we also make another dropdown list of subbreed 
  $('.dog-breed').change(function(){
    let breed=$('.dog-breed :selected').text();
    let url='https://dog.ceo/api/breed/' + breed + '/list';
    $('.dog-subBreed').remove();
    $.get(url , function(data){
        if(data.message.length != 0){
            $('.dog-breed').after(`<select class="dog-subBreed">`);
    
            for(let content of data.message){
                $('.dog-subBreed').append(`<option value=${content}>${content}</option>`);
            }
        }
    });
  });
}

// updating the list of the dogs breed 
getDogList();

function fetchBreed(){
    let dogBreed=$('.dog-breed :selected').text();
    let dogSubBreed=$('dog-subBreed :selected').text();
    let apiURL='https://dog.ceo/api/breed/' + dogBreed ;
    // if subbreed exists then we add into the api url
    if(dogSubBreed != ''){
        apiURL+='/' + dogSubBreed;
    }

    apiURL+='/images';
    $('.img-wrapper').remove();
    $.ajax({
    url:apiURL,
    method:'GET',
    success:function(data){
        for(let i=0 ; i<data.message.length ; i++){
            $(document.createElement('div')).attr('class' , 'img-wrapper').html(`<img src=${data.message[i]}>`).appendTo('.main');
        }
    }
    });
}



function intialiseApp(){
    $('.btn').click(fetchBreed);
}

// app start function
intialiseApp();