const express = require ('express')
const server=express()

const Osoba=require('./models/osobe')

const cors=require('cors')
server.use(cors())

server.use(express.json())
server.use(express.static('build'))


const zahtjevInfo = (req,res,next)=>{
    console.log('Metoda: ',req.method)
    console.log('Putanja: ',req.path)
    console.log('Tijelo: ',req.body)
    console.log('---')
    next()
}
server.use(zahtjevInfo)

let osobe= [
      {
        id: 1,
        imeprezime: "Antea Klarić",
        email: "anteaklaric@gmail.com"
      },
      {
        id: 2,
        imeprezime: "Marija Šarić",
        email: "marijasaric@gmail.com"
      },
      {
        id: 3,
        imeprezime: "Lana Parić",
        email: "lanaparic@gmail.com"
      },
      {
        id: 4,
        imeprezime: "Luka Dadic",
        email: "lukadadic@gmail.com"
      }
    ]

server.get('/osobe', (req, res) => {
    Osoba.find({}).then(sveOsobe=>{
        res.json(sveOsobe)
    })
})


server.get('/osobe/:id', (req, res, next) => {
    const id=req.params.id
    Osoba.findById(id)
    .then(o=>{
        if(o){ //ako osoba s tim id postoji
            res.json(o)
        }
        else{ //ako ne postoji ali je dobar format id-ja
            res.status(404).end()
        }
    })
    .catch(err=> next(err)) //saljemo na middleware
})

server.delete('/osobe/:id', (req, res,next) => {
    const id=req.params.id
    Osoba.findByIdAndRemove(id)
    .then(result => {
        res.status(204).end()
    })
    .catch(err=>next(err))
})

server.post('/osobe', (req, res, err) => {
    const podatak=req.body
    
    const osoba=new Osoba({
        imeprezime: podatak.imeprezime,
        email: podatak.email
    })
    osoba.save().then(result=>{
        console.log("podatak spremljen");
        res.json(result);
    })
    .catch(err=>next(err))
    
})

server.put('/osobe/:id',(req,res, next)=>{
    const id=req.params.id
    const podatak=req.body;

    const osoba={
        imeprezime:podatak.imeprezime,
        email:podatak.email
    }

    Osoba.findByIdAndUpdate(id, osoba, {new: true})
    .then(osoba=>{
        res.json(osoba)
    })
    .catch(err=>next(err))
})

//middleware za upravljanje pogreskama
const errorHandler=(err, req,res,next) => {
    console.log("Middleware za pogreske");
    if(err.name="CastError"){
        return res.status(400).send({
            error:"Krivi format ID parametra"
        })
    }
    else if(err.name === "ValidationError"){
        return res.status(400).send({
            error:"Krivi format podatka"
        })
    }
    next(err)
}
server.use(errorHandler)

const PORT=process.env.PORT || 3001
server.listen(PORT, ()=>{
    console.log('Server slusa na portu ${PORT}')
})