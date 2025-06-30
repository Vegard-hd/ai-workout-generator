import PocketBase from "pocketbase";

export function pocketbaseInstance() {
  try {
    const token = process.env.POCKETBASE_SECRET;
    if (!token) throw new Error("Token in pocketbase index.ts is invalid");

    const pb = new PocketBase(
      "http://my-public-apps-pocketbase-1d4836-51-68-234-12.traefik.me",
    );
    pb.authStore.save(token, null);

    return pb;
  } catch (error) {
    console.warn(error);
    throw new Error("Failed to connect to pocketbase backend");
  }
}
