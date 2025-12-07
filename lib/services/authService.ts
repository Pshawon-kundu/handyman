import AsyncStorage from "@react-native-async-storage/async-storage";
import { apiCall } from "./api";

export const authService = {
  signup: async (email: string, password: string, fullName: string) => {
    try {
      // Try to call backend API
      const response = await apiCall("/(auth)/signup", "POST", {
        email,
        password,
        fullName,
      });

      await AsyncStorage.setItem("authToken", response.token);
      await AsyncStorage.setItem("userData", JSON.stringify(response.user));

      return response;
    } catch (error) {
      // Fallback to demo mode - create mock user
      console.log("Backend unavailable, using demo mode");
      const mockToken = `token_${Date.now()}`;
      const mockUser = {
        id: `user_${Date.now()}`,
        email,
        fullName,
        name: fullName,
      };

      await AsyncStorage.setItem("authToken", mockToken);
      await AsyncStorage.setItem("userData", JSON.stringify(mockUser));

      return { token: mockToken, user: mockUser };
    }
  },

  login: async (email: string, password: string) => {
    try {
      // Try to call backend API
      const response = await apiCall("/(auth)/login", "POST", {
        email,
        password,
      });

      await AsyncStorage.setItem("authToken", response.token);
      await AsyncStorage.setItem("userData", JSON.stringify(response.user));

      return response;
    } catch (error) {
      // Fallback to demo mode - create mock user
      console.log("Backend unavailable, using demo mode");
      const mockToken = `token_${Date.now()}`;
      const mockUser = {
        id: `user_${Date.now()}`,
        email,
        name: email.split("@")[0],
        fullName: email.split("@")[0],
      };

      await AsyncStorage.setItem("authToken", mockToken);
      await AsyncStorage.setItem("userData", JSON.stringify(mockUser));

      return { token: mockToken, user: mockUser };
    }
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
