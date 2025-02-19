import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ref, update } from "firebase/database";
import { database } from "../firebase/config";

interface Profile {
  id: string;
  name: string;
  email: string;
  avatar: string; 
  bio: string;
}

interface ProfileState {
  profile: Profile | null;
  loading: boolean;
  profileSidebar: boolean;
}

const initialState: ProfileState = {
  profile: null,
  loading: true,
  profileSidebar:false
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    rightSidebar: (state, action: PayloadAction<boolean>) => {
      state.profileSidebar = action.payload;
    },
    setProfile: (state, action: PayloadAction<Profile>) => {
      state.profile = action.payload;
      state.loading = false;
    },
    updateProfile: (state, action: PayloadAction<Partial<Profile>>) => {
      if (state.profile) {
        state.profile = { ...state.profile, ...action.payload };

        const profileRef = ref(database, `users/${state.profile.id}`);
        update(profileRef, action.payload);
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    }
  }
});

export const { setProfile, updateProfile, setLoading, rightSidebar } = profileSlice.actions;
export default profileSlice.reducer;
