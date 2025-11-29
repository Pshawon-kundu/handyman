import { apiCall } from "./api";

export const providerService = {
  getProviders: async (options?: {
    category?: string;
    location?: string;
    minRating?: number;
    page?: number;
    limit?: number;
  }) => {
    let url = "/service-providers?";
    const params = new URLSearchParams();

    if (options?.category) params.append("category", options.category);
    if (options?.location) params.append("location", options.location);
    if (options?.minRating)
      params.append("minRating", options.minRating.toString());
    if (options?.page) params.append("page", options.page.toString());
    if (options?.limit) params.append("limit", options.limit.toString());

    return apiCall(`/service-providers?${params.toString()}`);
  },

  getProviderDetails: async (providerId: string) => {
    return apiCall(`/service-providers/${providerId}`);
  },

  getProviderReviews: async (providerId: string, page = 1, limit = 10) => {
    return apiCall(
      `/service-providers/${providerId}/reviews?page=${page}&limit=${limit}`
    );
  },
};
