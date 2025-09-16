import { createSlice } from "@reduxjs/toolkit";

interface CachedResult {
  jobs: any[]; // or JobType[]
  totalPages: number;
  pageNumber: number;
}

interface SearchState {
  cachedResults: Record<string, CachedResult>;
}

const initialState: SearchState = {
  cachedResults: {},
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setCachedResults: (state, action) => {
      const { searchKey, jobs, totalPages, pageNumber } = action.payload;
      state.cachedResults[searchKey] = { jobs, totalPages, pageNumber };
    },
  },
});

export const { setCachedResults } = searchSlice.actions;
export default searchSlice.reducer;
