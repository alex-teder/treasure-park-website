import { MyApi } from "../types";
import { responseWithErrorSchema, userSchema } from "../zod/responses";

class Api implements MyApi {
  readonly BASE_URL: string = import.meta.env.DEV ? "http://127.0.0.1:8080/api/" : "/api/";

  async fetch(url: string, options: RequestInit = {}) {
    let data;
    const response = await fetch(url, { ...options, credentials: "include" });
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
    const { data, error } = await this.fetch(this.BASE_URL + "auth/login", {
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
    const { data, error } = await this.fetch(this.BASE_URL + "auth/signup", {
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
    const { data, error } = await this.fetch(this.BASE_URL + "auth/whoami");
    if (error) return { error };
    return { user: userSchema.parse(data) };
  }

  async logOut() {
    return await this.fetch(this.BASE_URL + "auth/logout");
  }
}

export const api = new Api();
