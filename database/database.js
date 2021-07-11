// import MongoDb from 'mongodb';
import Mongoose from 'mongoose'; 
import { config } from '../config.js';

//커넥팅 함수
export async function connectDB() {
  return Mongoose.connect(config.db.host, {
    //옵션전달 
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify:false,
  });
}

export function useVirtualId(schema) {
  schema.virtual('id').get(function () {
    return this._id.toString();
  });
  schema.set('toJSON', { virtuals: true });
  schema.set('toOject', { virtuals: true });
}

// ------배포시 삭제 [하단] ------

let db;

export function getTweets() {
  return db.collection('tweets');
}
