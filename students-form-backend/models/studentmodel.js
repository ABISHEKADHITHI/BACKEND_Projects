const mongoose = require("mongoose")

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        trim: true
    },
    age: {
        type: Number,
        require: true,
        trim: true
    },
    department: {
        type: String,
        require: true,
        trim: true
    },
    gender: {
        type: String,
        require: true,
        trim: true
    },
    email: {
        type: String,
        require: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    mobile: {
        type: String,
        require: true,
        unique: true,
        trim: true
    }
})

studentSchema.pre("save", function(next) {
    if( this.age > 50 && !this.name.endsWith("-og")){
        this.name = `${this.name}-og`
    }
});

studentSchema.pre("findOneAndUpdate", function(next) {
    const update = this.getUpdate();

    if( update.age > 50 && !update.name.endsWith("-og")){
        update.name = `${update.name}-og`
    }
});



module.exports = mongoose.model("Student", studentSchema);