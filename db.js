const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;

const user = new Schema({
    email: String, 
    password: String,
    name: String
})

const todo = new Schema({
    title: String,
    mark: Boolean,
    UserId: ObjectId
})

const UserModel = mongoose.model('users', user);
const TodoModel = mongoose.model('todos', todo);

module.exports ={
    UserModel,
    TodoModel
}