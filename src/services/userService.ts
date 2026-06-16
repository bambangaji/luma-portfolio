import type { User } from "../interface/userModel";

export const userService = {
  async fetchUsers(): Promise<User[]> {
    const res = await fetch("https://jsonplaceholder.typicode.com/users");
    if (!res.ok) throw new Error("Failed to fetch users");
    return res.json();
  },
};