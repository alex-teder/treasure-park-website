import { MyApi } from "../types";
import {
  categoriesSchema,
  collectionSchema,
  commentsCountResponseSchema,
  createItemResponseSchema,
  itemSchema,
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

  async getPopularTags() {
    const { data, error } = await this.fetch("tags");
    if (error) throw error;
    return popularTagsSchema.parse(data);
  }

  async getCategories() {
    const { data, error } = await this.fetch("categories");
    if (error) throw error;
    return categoriesSchema.parse(data);
  }

  async getCollection(id: number) {
    const { data, error } = await this.fetch(`collections/${id}`);
    if (error) throw error;
    return { collection: collectionSchema.parse(data) };
  }

  async postCollection(data: unknown) {
    return await this.fetch("collections", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  }

  async updateCollection(id: number, data: unknown) {
    return await this.fetch(`collections/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  }

  async deleteCollection(id: number) {
    return await this.fetch(`collections/${id}`, {
      method: "DELETE",
    });
  }

  async getItem(id: number) {
    const { data, error } = await this.fetch(`items/${id}`);
    if (error) throw error;
    return { item: itemSchema.parse(data) };
  }

  async postItem(data: unknown) {
    const { data: resWithInsertId, error } = await this.fetch("items", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (error) return { error };
    return { id: createItemResponseSchema.parse(resWithInsertId).id };
  }

  async updateItem(id: number, data: unknown) {
    const { error } = await this.fetch(`items/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (error) return { error };
    return { id };
  }

  async deleteItem(id: number) {
    return await this.fetch(`items/${id}`, {
      method: "DELETE",
    });
  }

  async postComment(data: unknown) {
    return await this.fetch("comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  }

  async deleteComment(id: number) {
    return await this.fetch(`comments/${id}`, {
      method: "DELETE",
    });
  }

  async checkCommentCount(itemId: number) {
    const { error, data } = await this.fetch(`comments/count?itemId=${itemId}`);
    if (error) throw error;
    return commentsCountResponseSchema.parse(data).count;
  }
}

export const api = new Api();
