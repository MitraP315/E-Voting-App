const mongoose = require('mongoose')
try {
    const conn = mongoose.connect('mongodb+srv://mitra:mitra@cluster0.hufpx.mongodb.net/electiondata?retryWrites=true&w=majority')
    console.log("db connected sucessfully")
} catch (error) {
    console.log(error)
}