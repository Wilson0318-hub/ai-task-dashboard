import { getToken } from "../utils/authStorage";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


export async function registerUser (userData) {
    const response = await fetch(`${API_BASE_URL}/auth/register`,{
        method: "POST",
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify(userData)
    });

    if(!response.ok){
        const errorText = await response.text();

        console.error("Register failed", errorText);

        throw new Error("Failed to register user");
    }

    return response.json();
}

export async function loginUser(loginData) {
    const formData = new URLSearchParams();
    
    formData.append("username", loginData.username);
    formData.append("password", loginData.password);

    const response = await fetch(`${API_BASE_URL}/auth/login`,{
        method: "POST",
        headers: {
            "Content-Type" : "application/x-www-form-urlencoded"
        },
        body: formData
    });

    if(!response.ok){
        const errorText = await response.text();

        console.error("Login failed", errorText);

        throw new Error("Failed to login");
    }

    return response.json();
}

export async function getCurrentUser() {
  const token = getToken();

  const response = await fetch(`${API_BASE_URL}/auth/me`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (!response.ok) {
    const errorText = await response.text();

    console.error("Get current user failed:", errorText);

    throw new Error("Failed to get current user");
  }

  return response.json();
}