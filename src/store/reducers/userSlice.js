import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: [],
  reducers: {
    addUser: (state, action) => {
      return [...state, action.payload];
    },
    editUser: (state, action) => {
      const { id, updatedData } = action.payload;
      return state.map((user) =>
        user.id === id ? { ...user, ...updatedData } : user
      );
    },
    deleteUser: (state, action) => {
      const idToDelete = action.payload;
      return state.filter((user) => user.id !== idToDelete);
    },
  },
});

export const { addUser, editUser, deleteUser } = userSlice.actions;
export default userSlice.reducer;
