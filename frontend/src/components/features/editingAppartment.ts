import { createSlice } from "@reduxjs/toolkit";
import { Appartment } from "../../types";

interface EditingAppartmentState {
  editingAppartment: Appartment | null;
}

const initialState: EditingAppartmentState = {
  editingAppartment: null,
};

export const appartmentSlice = createSlice({
  name: "appartment",
  initialState,
  reducers: {
    setEditingAppartment: (state, action) => {
      state.editingAppartment = action.payload;
    },
  },
});

export const { setEditingAppartment } = appartmentSlice.actions;

export default appartmentSlice.reducer;
