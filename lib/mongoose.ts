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
      serverSelectionTimeoutMS: 10000, // Attend jusqu'à 10s pour trouver un nœud
      socketTimeoutMS: 20000, // Garde les sockets ouverts jusqu’à 20s
      connectTimeoutMS: 15000, // Laisse 15s pour établir la connexion
      retryWrites: true,
      w: "majority",
    };

   cached!.promise = mongoose
     .connect(MONGODB_URI!, opts)
     .then((mongooseInstance) => {
       console.log("✅ Connected to MongoDB");
       return mongooseInstance;
     })
     .catch((err) => {
       console.error("❌ Failed to connect to MongoDB:", err);
       throw err;
     });

  }
  cached!.conn = await cached!.promise;
  return cached!.conn;
}

export default connect;
