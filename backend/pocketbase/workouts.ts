import { pocketbaseInstance } from "./index";
import type PocketBase from "pocketbase";

export class PocketBaseService {
  pb: PocketBase;
  constructor() {
    this.pb = pocketbaseInstance();
  }
  // fetch a paginated records list

  async incrementLike(id: string) {
    try {
      const workoutToUpdate = await this.pb
        .collection("Workouts")
        .getOne(id, {});
      const currentLikes = Number.parseInt(workoutToUpdate.likes);
      const updatedLikes = { likes: currentLikes + 1 };
      if (!updatedLikes.likes || typeof updatedLikes.likes !== "number")
        throw new Error("Failed to update likes on workout");

      return await this.pb.collection("Workouts").update(id, updatedLikes);
    } catch (error) {
      console.warn(error);
      throw new Error("Failed to increment likes in pocketbase backend");
    }
  }

  async getOneWithId(id: string) {
    return await this.pb
      .collection("Workouts")
      .getOne(id, {})
      .catch((err) => {
        console.error(err);
        throw new Error(
          "Failed to get workout with id from pocketbase backend",
        );
      });
  }

  // you can also fetch all records at once via getFullList

  async getMostPopularWorkouts() {
    return await this.pb
      .collection("Workouts")
      .getList(1, 12, {
        sort: "-likes",
      })
      .catch((err) => {
        console.warn(err);
        throw new Error(
          "Failed to get most popular workouts from pocketbase backend ",
        );
      });
  }

  async createWorkout(workoutData: {
    title: string;
    workout: string;
    duration: string;
    details: string;
    likes: number;
  }) {
    try {
      const workout = await this.pb.collection("Workouts").create(workoutData);
      return workout;
    } catch (error) {
      console.warn(error);
      throw new Error("Failed to create workout in pocketbase");
    }
  }
}
