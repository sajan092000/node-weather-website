const path=require('path');
const express=require('express');
const hbs=require('hbs');

const geocode=require('./utils/geocode');
const forecast=require('./utils/forecast');


// console.log(__dirname);
// console.log(__filename);

// console.log(path.join(__dirname,'../public'))

const app=express();


// defining paths for express config
const publicDirectoryPath=path.join(__dirname,'../public');
const viewsPath=path.join(__dirname,'../templates/views');
const partialsPath=path.join(__dirname,'../templates/partials')


//setup handlebars engine and views location
app.set('view engine','hbs');
app.set('views',viewsPath);
hbs.registerPartials(partialsPath);


//setup static directory to serve
app.use(express.static(publicDirectoryPath));


//using index.hbs file.
app.get('',(req,res)=>{
    res.render('index',{
        title:"Weather",
        name:"Sajan Rangari"
    });
})

//using about.hbs file.

app.get('/about',(req,res)=>{
    res.render('about',{
        title:"About Me",
        name:"Sajan Rangari"
    })
})


//using help.hbs file.
app.get('/help',(req,res)=>{
    res.render('help',{
        message:"This is the help page for testing purpose.",
        title:"Help",
        name:"Sajan Rangari"
    })
})


app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:"You must provide the address."
        })
    }

    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
          return res.send({
              error
          })
        }
        // else{
        //   console.log(data);
        // }
        forecast(	latitude, longitude, (error, forecastData) => {
          if(error){
            return res.send({
                error
            })
          }
        //   console.log(location);
        //   console.log(forecastData);
          res.send({
            address:req.query.address,
            location:location,
            weather_description:forecastData,

        })
        })
      })

    // console.log(req.query.address);
    // res.send({
    //     address:req.query.address,
    //     weather_description:"Haze, Its 26 degree out."
    // })
    
});


app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:"Please provide the search term."
        })
    }

    // console.log(req.query.search);
    res.send({
        products:[]
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        message:"Help Article Not Found",
        name:'Sajan Rangari',
        title:"404"
    })
    // res.send("")
})

app.get('*',(req,res)=>{
    res.render('404',{
        message:"Page Not Found",
        name:'Sajan Rangari',
        title:"404"
    })
    // res.send("My 404 Page");
})


app.listen(3000, ()=>{
    console.log("Server is Running on 3000 port")
})