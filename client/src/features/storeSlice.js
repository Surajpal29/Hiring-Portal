import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  userData: [
    {
      id: 5,
      firstName: "hello world",
      lastName: "",
      city: "",
      country: "",
      experience: "",
      skills: [],
      DomainOfInterest: [],
      jobType: "",
      phoneNumber: "",
    },
  ],
};

export const storeSlice = createSlice({
  name: "jobnest",
  initialState,
  reducers: {
    addDataToStore: (state, action) => {
      state.userData.push(action.payload); // Assuming the server response contains the entire user data object
    },
    removeDataFromStore: (state, action) => {
      state.userData.pop();
    },
  },
});

export const { addDataToStore, removeDataFromStore } = storeSlice.actions;
export default storeSlice.reducer;
