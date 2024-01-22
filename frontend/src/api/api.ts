import { MyApi } from "../types";
import {
  collectionSchema,
  popularTagsSchema,
  responseWithErrorSchema,
  userProfileSchema,
  userSchema,
} from "../zod/responses";

class Api implements MyApi {
  readonly BASE_URL: string = import.meta.env.DEV ? "http://127.0.0.1:8080/api/" : "/api/";

  async fetch(subUrl: string, options: RequestInit = {}) {
    let data;
    const response = await fetch(this.BASE_URL + subUrl, { ...options, credentials: "include" });
    if (response.headers.get("Content-Type")?.includes("application/json")) {
      data = (await response.json()) as unknown;
    } else {
      data = await response.text();
    }
    if (!response.ok) {
      return { error: responseWithErrorSchema.parse(data) };
    }
    return { data };
  }

  async logIn(input: { loginValue: string; password: string }) {
    const { data, error } = await this.fetch("auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(input),
    });
    if (error) return { error };
    return { user: userSchema.parse(data) };
  }

  async signUp(input: { email: string; username: string; password: string }) {
    const { data, error } = await this.fetch("auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(input),
    });
    if (error) return { error };
    return { user: userSchema.parse(data) };
  }

  async relogIn() {
    const { data, error } = await this.fetch("auth/whoami");
    if (error) return { error };
    return { user: userSchema.parse(data) };
  }

  async logOut() {
    return await this.fetch("auth/logout");
  }

  async getUserProfile(id: number) {
    const { data, error } = await this.fetch(`users/${id}`);
    if (error) throw error;
    return { userProfile: userProfileSchema.parse(data) };
  }

  async getCollection(id: number) {
    const { data, error } = await this.fetch(`collections/${id}`);
    if (error) throw error;
    return { collection: collectionSchema.parse(data) };
  }

  async getPopularTags() {
    const { data, error } = await this.fetch("tags");
    if (error) throw error;
    return popularTagsSchema.parse(data);
  }
}

export const api = new Api();
