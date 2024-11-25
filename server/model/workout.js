//const { Collection, default: mongoose } = require("mongoose");

const mongoose = require("mongoose");

let workoutModel = mongoose.Schema({
    exerciseName: String,
    type: String,
    duration: String,
    date:Number
},
{
    collection:"workouts"
});
module.exports =mongoose.model('Workout',workoutModel);
