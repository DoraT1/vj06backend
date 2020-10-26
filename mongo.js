const mongoose=require('mongoose')
const password='mongobaza123'
const dbname='osobe-api'

const url=`mongodb+srv://okviriDT:${password}@cluster0.iuz54.mongodb.net/${dbname}?retryWrites=true&w=majority` //connection string

//spoj na bazu
mongoose.connect(url, {
    useNewUrlParser: true,  
    useUnifiedTopology: true,  
    useCreateIndex: true,  
    useFindAndModify: false
})

const osobaSchema = new mongoose.Schema({
    imeprezime: String,
    email:String
})

const Osoba = mongoose.model('Osoba', osobaSchema, 'osobe')

const novaOsoba=new Osoba({
    imeprezime:'Karla Aric',
    email: 'karla@gmail.com'
})

//spremanje
/*
novaOsoba.save().then(result =>{
    console.log("Osoba spremljena");
    console.log(result);
    mongoose.connection.close()
})*/

//dohvacanje
Osoba.find({}).then(result=>{
    result.forEach(o=>{
        console.log(o);
    })
    mongoose.connection.close()
})

