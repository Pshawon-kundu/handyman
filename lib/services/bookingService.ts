import { apiCall } from "./api";

export const bookingService = {
  createBooking: async (bookingData: {
    providerId: string;
    service: string;
    date: string;
    time: string;
    location: string;
    notes?: string;
    amount: number;
  }) => {
    return apiCall("/bookings", "POST", bookingData);
  },

  getUserBookings: async (status?: string, page = 1, limit = 20) => {
    const url = status
      ? `/bookings?status=${status}&page=${page}&limit=${limit}`
      : `/bookings?page=${page}&limit=${limit}`;
    return apiCall(url);
  },

  getBookingDetails: async (bookingId: string) => {
    return apiCall(`/bookings/${bookingId}`);
  },

  updateBookingStatus: async (bookingId: string, status: string) => {
    return apiCall(`/bookings/${bookingId}`, "PUT", { status });
  },

  cancelBooking: async (bookingId: string) => {
    return apiCall(`/bookings/${bookingId}`, "DELETE");
  },
};
