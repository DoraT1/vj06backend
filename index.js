const express = require ('express')
const server=express()

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
    res.json(osobe)
})

server.get('/osobe/:id', (req, res) => {
    const id=Number(req.params.id)
    const osoba=osobe.find(o=>o.id===id)
    if(osoba){
        res.json(osoba)
    }
    else{
        res.status(404).end()
    }
})

server.delete('/osobe/:id', (req, res) => {
    const id=Number(req.params.id)
    osobe = osobe.filter(o => o.id !== id)
    res.status(204).end()
})

server.post('/osobe', (req, res) => {
    const maxId = osobe.length > 0
    ? Math.max(...osobe.map(o => o.id))
    : 0

    const podatak=req.body
    if(!podatak.imeprezime || !podatak.email){
        return res.status(400).json({
            error: 'Nedostaju podaci'
        })
    }
    const osoba={
        id:maxId+1,
        imeprezime: podatak.imeprezime,
        email: podatak.email
    }


    osobe=osobe.concat(osoba)
    res.json(osoba)
})

server.put('/osobe/:id',(req,res)=>{
    const id=Number(req.params.id)
    const podatak=req.body;
    osobe=osobe.map(o => o.id !== id ? o : podatak)
    res.json(podatak)
})


const PORT=3001
server.listen(PORT, ()=>{
    console.log('Server slusa na portu ${PORT}')
})