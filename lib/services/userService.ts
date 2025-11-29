import { apiCall } from "./api";

export const userService = {
  getUserProfile: async () => {
    return apiCall("/users/profile");
  },

  updateUserProfile: async (updateData: {
    fullName?: string;
    phone?: string;
    location?: string;
    avatar?: string;
  }) => {
    return apiCall("/users/profile", "PUT", updateData);
  },

  becomeProvider: async (providerData: {
    services: string[];
    experience?: string;
    certifications?: string[];
  }) => {
    return apiCall("/users/become-provider", "POST", providerData);
  },
};
