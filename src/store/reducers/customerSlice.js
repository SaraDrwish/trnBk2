import { createSlice } from "@reduxjs/toolkit";

const customerSlice = createSlice({
  name: "customer",
  initialState: [],
  reducers: {
    addCustomer: (state, action) => {
      return [...state, action.payload];
    },
    editCustomer: (state, action) => {
      const { id, updatedData } = action.payload;
      return state.map((customer) =>
        customer.id === id ? { ...customer, ...updatedData } : customer
      );
    },
    deleteCustomer: (state, action) => {
      const idToDelete = action.payload;
      return state.filter((customer) => customer.id !== idToDelete);
    },
  },
});

export const { addCustomer, editCustomer, deleteCustomer } =
  customerSlice.actions;
export default customerSlice.reducer;
