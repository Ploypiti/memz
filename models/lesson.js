var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var lessonSchema = new Schema({
    avail: Boolean,
    lesson_id: Number,
    course: String,
    name: String,
    lang: String,
    vocab_size: Number,
    vocab: [{ id: Number, word: String, meaning: String}] 
});

module.exports = mongoose.model('Lesson', lessonSchema);