import AsyncStorage from "@react-native-async-storage/async-storage";
import { apiCall } from "./api";

export const authService = {
  signup: async (email: string, password: string, fullName: string) => {
    const response = await apiCall("/auth/signup", "POST", {
      email,
      password,
      fullName,
    });

    await AsyncStorage.setItem("authToken", response.token);
    await AsyncStorage.setItem("userData", JSON.stringify(response.user));

    return response;
  },

  login: async (email: string, password: string) => {
    const response = await apiCall("/auth/login", "POST", {
      email,
      password,
    });

    await AsyncStorage.setItem("authToken", response.token);
    await AsyncStorage.setItem("userData", JSON.stringify(response.user));

    return response;
  },

  logout: async () => {
    await AsyncStorage.removeItem("authToken");
    await AsyncStorage.removeItem("userData");
  },

  getCurrentUser: async () => {
    try {
      const userData = await AsyncStorage.getItem("userData");
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error("Failed to get current user:", error);
      return null;
    }
  },

  isAuthenticated: async () => {
    const token = await AsyncStorage.getItem("authToken");
    return !!token;
  },
};
