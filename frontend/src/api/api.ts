import { ResponseWithError, User } from "../types";

class Api {
  private readonly BASE_URL: string = import.meta.env.DEV ? "http://127.0.0.1:8080/api/" : "/api/";

  private async fetch(url: string | URL, options: RequestInit = {}) {
    let data;
    const response = await fetch(url, { ...options, credentials: "include" });
    if (response.headers.get("Content-Type")?.includes("application/json")) {
      data = (await response.json()) as unknown;
    } else {
      data = await response.text();
    }
    return data;
  }

  async logIn({ loginValue, password }: { loginValue: string; password: string }) {
    return (await this.fetch(this.BASE_URL + "auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ loginValue, password }),
    })) as User | ResponseWithError;
  }

  async signUp({
    email,
    username,
    password,
  }: {
    email: string;
    username: string;
    password: string;
  }) {
    return (await this.fetch(this.BASE_URL + "auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, username, password }),
    })) as User | ResponseWithError;
  }

  async relogIn() {
    return (await this.fetch(this.BASE_URL + "auth/whoami")) as User | ResponseWithError;
  }

  async logOut() {
    return await this.fetch(this.BASE_URL + "auth/logout");
  }
}

export const api = new Api();
