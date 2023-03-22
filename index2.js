const express = require("express");
const app = express();
const { PORT = 8000 } = process.env;

app.set('view engine', 'ejs')

function isAdmin(req, res, next){
    req.params.model = "Model : " + req.params.model
    if(req.query.iam === "admin"){
        next();
        return
    }
    res.status(401).send("Kamu bukan admin")
}

function checkQuery(req, res, next){
    if("model" in req.query && "tahun" in req.query){
        next();
        return
    }
    res.status(400).send("model dan tahun wajib di isi")
}

app.get("/", (req, res) => {
    res.render("i", {
        name: req.query.name || 'Guest'
    })
})

//params: ini wajib ada parameter nya, karena dianggap sebagai satu kesatuan link / url
// untuk mengakses detail dari sebuah data / biasanya digunakan untuk edit / delete data
// http://localhost:8000/cars/Jazz
app.get("/cars/:model", isAdmin, (req, res) => {
    res.send(`Hello, ${req.params.model}!`)
})

//query tidak wajib ada / optional
//query: untuk searching, filter, sorting dll
// http://localhost:8000/search?model=Civic&tahun=
app.get("/search", checkQuery ,(req, res) => {
    // const model = req.query.model
    // const tahun = req.query.tahun
    const { model, tahun } = req.query

    res.send(`Search, Model: ${model}, Tahun: ${tahun}!`)
})

//Challenges 
// Coba temen2 buat routing untuk params dan query masing2 3 

app.post("/api/v1/login", (req, res) => {
    res.status(201).send("Masoook!")
})

app.use((req, res) => {
    res.status(404).send("Mau kemana bos?")
})

app.listen(PORT, () => {
    console.log(`Server nyala di http://localhost:${PORT}`)
})