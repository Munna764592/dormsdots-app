import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import auth from "@react-native-firebase/auth";
import {
  GoogleSignin,
  statusCodes
} from "@react-native-google-signin/google-signin";
import database from "@react-native-firebase/database";

interface AuthState {
  user: any | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  lsloading: boolean;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  lsloading: false
};

export const googleSignIn = createAsyncThunk(
  "auth/googleSignIn",
  async (_, { rejectWithValue }) => {
    try {
      GoogleSignin.configure({
        webClientId: process.env.FIREBASE_WEB_CLIENT_ID,
        offlineAccess: true
      });

      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true
      });
      const signInResult = await GoogleSignin.signIn();

      let idToken = signInResult.data?.idToken;
      if (!idToken) {
        throw new Error("No ID token found");
      }
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      // Sign-in the user with the credential
      const userCredential = await auth().signInWithCredential(
        googleCredential
      );

      // Extract only serializable fields from the user
      const userData = {
        uid: userCredential.user.uid,
        displayName: userCredential.user.displayName,
        email: userCredential.user.email,
        photoURL: userCredential.user.photoURL
      };

      const snapshot = await database()
        .ref(`/usersdata/${userData.uid}`)
        .once("value");

      if (!snapshot.exists()) {
        await database().ref(`/usersdata/${userData.uid}`).set(userData);
      }

      return userData;
    } catch (error: any) {
      console.error("Google Sign-In Error:", error);
      return rejectWithValue(error.message);
    }
  }
);

export const googleSignOut = createAsyncThunk(
  "auth/googleSignOut",
  async (_, { rejectWithValue }) => {
    try {
      await auth().signOut();
      await GoogleSignin.signOut();
      return null;
    } catch (error: any) {
      console.error("Sign Out Error:", error);
      return rejectWithValue(error.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<any>) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
    },
    clearUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
    resetError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(googleSignIn.pending, (state) => {
        state.lsloading = true;
        state.error = null;
      })
      .addCase(googleSignIn.fulfilled, (state, action) => {
        state.lsloading = false;
        state.user = action.payload;
        state.isAuthenticated = true; 
        state.error = null;
      })
      .addCase(googleSignIn.rejected, (state, action) => {
        state.lsloading = false;
        state.error = action.payload as string;
        state.isAuthenticated = false;
      })
      .addCase(googleSignOut.pending, (state) => {
        state.lsloading = true;
        state.error = null;
      })
      .addCase(googleSignOut.fulfilled, (state) => {
        state.lsloading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.error = null;
      })
      .addCase(googleSignOut.rejected, (state, action) => {
        state.lsloading = false;
        state.error = action.payload as string;
        state.isAuthenticated = false;
      });
  }
});

export const { setUser, clearUser, resetError } = authSlice.actions;
export default authSlice.reducer;
