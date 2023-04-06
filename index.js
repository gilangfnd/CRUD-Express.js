const express = require("express");
const app = express();
const Book = require("./book");
const uploadMemory = require("./middleware/uploadMemory");
const uploadDisk = require("./middleware/uploadDisk")
const cloudinary = require("./config/cloudinary");
const CarController = require("./car");
const { PORT = 8000 } = process.env;

//Book.js tambahkan module.exports = Book
//tambahkan property .length di this.constructor.records jadi
//const lastRecordId =
// this.constructor.records[this.constructor.records.length - 1]

app.use(express.static("public"))
app.set('view engine', 'ejs')
app.use(express.json())


//list
app.get('/api/v1/cars', async (req, res) => {
    try {
        const cars = await CarController.list();
        res.status(200).json(cars)
    } catch (error) {
        res.status(400).json({
            message: "Error",
            data: error
        })
    }
})

//detail
app.get('/api/v1/cars/:id', async (req, res) => {
    try {
        const cars = await CarController.find(req.params.id);
        if(!cars) throw Error("Not Found")
        res.status(200).json(cars)
    } catch (error) {
        res.status(404).json({
            message: "Error",
            data: error
        })
    }
})

//create
app.post('/api/v1/cars', async (req, res) => {
    try {
        const cars = await CarController.create(req.body);
        res.status(201).json({
            message: "Sukses",
            data: cars
        })
    } catch (error) {
        res.status(400).json({
            message: "Error",
            data: error
        })
    } 
})

// update / edit
app.put('/api/v1/cars/:id', async (req, res) => {
    try {
        const cars = await CarController.update(req.params.id, req.body);
        res.status(200).json({
            message: "Sukses",
            data: cars
        })
    } catch (error) {
        res.status(400).json({
            message: "Error",
            data: error
        })
    }
})

// delete
app.delete('/api/v1/cars/:id', async (req, res) => {
    try {
        const cars = await CarController.delete(req.params.id);
        res.status(204).json({
            message: "Sukses",
            data: cars
        })
    } catch (error) {
        res.status(400).json({
            message: "Error",
            data: error
        })
    }
})

// upload
app.post('/api/v1/upload/', uploadDisk.single("picture"), (req, res) => {
    const url = `/uploads/${req.file.filename}`;
    res
      .status(200)
      .json({ message: "Foto berhasil di-upload, silahkan cek URL", url });
})

app.post('/api/v1/upload/cloudinary', uploadMemory.single("picture"), (req, res) => {
    const fileBase64 = req.file.buffer.toString("base64")
    const file = `data:${req.file.mimetype};base64,${fileBase64}`
    
    cloudinary.uploader.upload(file, (err, result) => {
        if(!!err){
            console.log(err)
            return res.status(400).json({
                message: "Gagal upload file"
            })
        }

        res.status(201).json({
            message: "Upload file berhasil",
            url: result.url
        })
    })
})

// View Engine
app.get('/', async (req, res) => {
    let data = []
    try {
        const cars = await CarController.list(req.body);
        data = cars
    } catch (error) {
        console.log(error)
    }
    
    res.render('index', {
        data:data
    })
})

app.get("/createCars", (req, res) => {
    res.render("createCar");
   });
   
app.get("/update/:id", async (req, res) => {
    let data = []
    try {
        const cars = await CarController.find(req.params.id);
        data = cars
    } catch (error) {
        console.log(error)
    }
    res.render("update", {data:data});
});


app.use((req, res) => {
    res.status(404).send("Mau kemana bos?")
})

app.listen(PORT, () => {
    console.log(`Server nyala di http://localhost:${PORT}`)
})