import {createSlice, type PayloadAction} from "@reduxjs/toolkit";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface AuthState {
  user: User | null;
}

// Helper function to get the initial state from localStorage
const getInitialState = (): AuthState => {
  try {
    const serializedState = localStorage.getItem("user");
    if (serializedState === null) return {user: null};

    const user = JSON.parse(serializedState) as User;
    return {user};
  } catch (error) {
    console.error("Error retrieving user state from localStorage:", error);
    return {user: null};
  }
};

const initialState: AuthState = getInitialState();

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      // Save the user data to localStorage whenever it's set
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    clearUser: (state) => {
      state.user = null;
      // Remove the user data from localStorage when the user is cleared
      localStorage.removeItem("user");
    },
  },
});

export const {setUser, clearUser} = userSlice.actions;
export default userSlice.reducer;
