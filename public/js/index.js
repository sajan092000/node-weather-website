




fetch('http://puzzle.mead.io/puzzle').then((response)=>{
    response.json().then((data)=>{
        // console.log(data);
    })
})


// fetch('http://localhost:3000/weather?address=!').then((response)=>{
//     response.json().then((data)=>{
//         if(data.error){
//             console.log(data.error);
//         }
//         else{
//             console.log(data.location);
//             console.log(data.weather_description)
//         }
//     })
// })



const weatherForm=document.querySelector('form');
const search=document.querySelector('input');
const messageOne=document.querySelector('#msg-1');
const messageTwo=document.querySelector('#msg-2');

// messageOne.textContent='From Sajan'

weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault()
    const location=search.value;

    messageOne.textContent= "Loading....";
    messageTwo.textContent='';


    fetch('http://localhost:3000/weather?address='+location).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            messageOne.textContent= data.error;
        }
        else{
            messageOne.textContent=data.location;
            messageTwo.textContent=data.weather_description;
            // console.log(data.location);
            // console.log(data.weather_description)
        }
    })
})
    // console.log(location);
})