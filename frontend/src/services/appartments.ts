import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Appartment } from "../types";

export const appartamentsApi = createApi({
  reducerPath: "appartamentsApi",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_API_URL }),
  tagTypes: ["Appartments"],
  endpoints: (builder) => ({
    getAppartments: builder.query<Appartment[], void>({
      query: () => "/appartments",
      providesTags: ["Appartments"],
    }),
    createAppartment: builder.mutation({
      query: (newAppartment: Omit<Appartment, "_id">) => ({
        url: "/appartments",
        method: "POST",
        body: newAppartment,
      }),
      invalidatesTags: ["Appartments"],
    }),
    deleteAppartment: builder.mutation({
      query: (id: string) => ({
        url: `/appartments/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Appartments"],
    }),
    updateAppartment: builder.mutation({
      query: (updatedAppartment: Appartment) => ({
        url: `/appartments/${updatedAppartment._id}`,
        method: "PUT",
        body: updatedAppartment,
      }),
      invalidatesTags: ["Appartments"],
    }),
  }),
});

export const {
  useGetAppartmentsQuery,
  useCreateAppartmentMutation,
  useDeleteAppartmentMutation,
  useUpdateAppartmentMutation,
} = appartamentsApi;
