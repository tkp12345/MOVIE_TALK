// import MongoDb from 'mongodb';
import Mongoose from 'mongoose';
import { useVirtualId } from '../database/database.js';

//몽고디비에서 제공하는 id (몽구스를 사용할것이기에 주석)
// const ObjectID = MongoDb.ObjectID;

// SQL: DB Schema
// NOSQL: DB Schema X, ORM Schema 

//몽구스 설정  (스키마 사용)
const userSchema = new Mongoose.Schema({
  username: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  url: String,
});

useVirtualId(userSchema);

//model 만들기 
const User = Mongoose.model('user',userSchema); 

export async function findByUsername(username) {
  return User.findOne({ username });
}

export async function findById(id) {
  return User.findById(id);
}

export async function createUser(user) {
  return new User(user).save().then((data) => data.id);
}

