// lib/mongoose.ts
import mongoose, { Mongoose } from "mongoose";

const MONGODB_URI = process.env.DATABASE_URL;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the DATABASE_URL environment variable inside .env"
  );
}

declare global {
  // eslint-disable-next-line no-var
  var mongoose:
    | {
        conn: Mongoose | null;
        promise: Promise<Mongoose> | null;
      }
    | undefined;
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connect(): Promise<Mongoose> {
  if (cached!.conn) {
    return cached!.conn;
  }

  if (!cached!.promise) {
    const opts = {
      // options mongoose 7+ (pas besoin d'ajouter useNewUrlParser etc)
    };

    cached!.promise = mongoose
      .connect(MONGODB_URI!, opts)
      .then((mongooseInstance) => {
        return mongooseInstance;
      });
  }
  cached!.conn = await cached!.promise;
  return cached!.conn;
}

export default connect;
