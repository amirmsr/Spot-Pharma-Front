import { useQuery } from "react-query";
import { baseUrl } from "../config";



export async function fetchUserData(token: any) {
    if (!token) {
      throw new Error("Token missing");
    }
    const response = await fetch("https://spot-pharma-api-bd00f8c1ff03.herokuapp.com/home", {
      headers: {
        token: `${token}`,
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch user profile");
    }
    const data = await response.json();
    return data;
  }