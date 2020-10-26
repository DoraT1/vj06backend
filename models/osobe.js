const mongoose=require('mongoose')
const password=process.env.ATLAS_PASS
const dbname='osobe-api'

//connection string
const url=`mongodb+srv://okviriDT:${password}@cluster0.iuz54.mongodb.net/${dbname}?retryWrites=true&w=majority` 

console.log('Spajam se na bazu');

//spoj na bazu
mongoose.connect(url, {
    useNewUrlParser: true,  
    useUnifiedTopology: true,  
    useCreateIndex: true,  
    useFindAndModify: false
})
.then(result=>{
    console.log("Spojeni smo na bazu");
})
.catch(error=>{
    console.log("Greška pri spajanju", error.message);
})


//schema
const osobaSchema = new mongoose.Schema({
    imeprezime: {
        type: String,
        required: true,
        minlength: 6,
    },
    email: {
        type: String,
        required: true
    }
})

//override fje, mijenjamo sta ce se dogoditi kad se pozove tojson nad rezultatom
osobaSchema.set('toJSON',{
    transform: (doc,ret)=>{
        ret.id=ret._id.toString(),
        delete ret._id
        delete ret.__v
        return ret
    }
})

//model
//const Osoba = mongoose.model('Osoba', osobaSchema, 'osobe')
module.exports = mongoose.model('Osoba', osobaSchema, 'osobe')