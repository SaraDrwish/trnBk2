import { createSlice } from "@reduxjs/toolkit";

const papersSlice = createSlice({
  name: "papers",
  initialState: [],
  reducers: {
    addPaper: (state, action) => {
      return [...state, action.payload];
    },
    editPaper: (state, action) => {
      const { id, updatedData } = action.payload;
      return state.map((paper) =>
        paper.id === id ? { ...paper, ...updatedData } : paper
      );
    },
    deletePaper: (state, action) => {
      const idToDelete = action.payload;
      return state.filter((paper) => paper.id !== idToDelete);
    },
  },
});

export const { addPaper, editPaper, deletePaper } = papersSlice.actions;
export default papersSlice.reducer;
