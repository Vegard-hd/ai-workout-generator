import mongoose from "mongoose";
import { config } from "dotenv";
config();

if (!process.env.MONGO_CONN_STRING || !process.env.PROD_MONGO_CONN) {
  throw new Error("MONGO_CONN_STRING environment variable is not defined");
}

const mongoConnString =
  process.env.NODE_ENV === "production"
    ? process.env.PROD_MONGO_CONN
    : process.env.MONGO_CONN_STRING;

await mongoose.connect(mongoConnString).catch((e) => {
  console.warn("Mongoose failed to connect with PRODUCTION error....", e);
});

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const WorkoutSchema = new Schema({
  _id: ObjectId,
  title: { type: String, required: true },
  workout: { type: String, required: true },
  duration: { type: String, required: true },
  details: { type: String, required: false },
  likes: { type: Number, required: true, default: 0 },
  // owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
  private: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Create the model from schema
const MongooseWorkoutModel = mongoose.model("Workouts", WorkoutSchema);

/* REF generated with claude sonnet thinking 3.7 */
export class WorkoutModel {
  /**
   * Create a new event
   * @param workoutData Event data to create
   * @returns Created event document
   */
  async createWorkout(workoutData: {
    title: string;
    workout: string;
    duration: string;
    details: string;
  }) {
    try {
      const workout = new MongooseWorkoutModel({
        ...workoutData,
        _id: new mongoose.Types.ObjectId(),
      });
      return await workout.save();
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get workout(s) by query parameters
   * @param query Object with query parameters
   * @returns workout(s) matching the query
   */
  async getWorkout(
    query: {
      _id?: string;
      title?: string;
      owner?: mongoose.Types.ObjectId;
      routeLink?: string;
      startTime?: Date;
      location?: string;
    } = {},
  ) {
    try {
      if (query._id) {
        return await MongooseWorkoutModel.findById(query._id);
      }
      return await MongooseWorkoutModel.find(query);
    } catch (error) {
      throw error;
    }
  }
  async updateLikes(id: string) {
    return MongooseWorkoutModel.findByIdAndUpdate(
      id,
      { $inc: { likes: 1 } },
      { new: true }, // returns the updated document
    );
  }
  async decrementLikes(id: string) {
    return MongooseWorkoutModel.findByIdAndUpdate(
      id,
      { $inc: { likes: -1 } },
      { new: true }, // returns the updated document
    );
  }
}
