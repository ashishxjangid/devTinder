const mongoose = require('mongoose');

const connectDB = async () => {
    await mongoose.connect(        
        "mongodb+srv://namastedev:hKsOyEjJv79ik3GF@namastenode.auvhemp.mongodb.net/devTinder"
    );
};

module.exports = connectDB;
