"use client";
import { createSlice } from "@reduxjs/toolkit";

export interface SignupState {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirm_password: string;
}

const initialState: SignupState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirm_password: "",
};

export const signupSlice = createSlice({
  name: "signup",
  initialState,
  reducers: {
      updateSignup: (state, action) => {
          
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateSignup } = signupSlice.actions;

export default signupSlice.reducer;
