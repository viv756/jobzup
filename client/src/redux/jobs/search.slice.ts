import { createSlice } from "@reduxjs/toolkit";

interface SearchState {
  cachedResults: Record<string, any>;
}

const initialState: SearchState = {
  cachedResults: {},
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setCachedResults: (state, action) => {
      const { searchKey, results } = action.payload;
      state.cachedResults[searchKey] = results;
    },
  },
});

export const { setCachedResults } = searchSlice.actions;
export default searchSlice.reducer;
