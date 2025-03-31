import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import auth from "@react-native-firebase/auth";
import {
  GoogleSignin,
  statusCodes
} from "@react-native-google-signin/google-signin";
import database from "@react-native-firebase/database";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { BACKEND_URI } from "@env";
import axios from "axios";
import { GET_USERS } from "../graphql/queries/userQueries";
import { SEND_OTP } from "../graphql/mutations/userMutations";
import client from "../graphql/client";

interface AuthState {
  user: any | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  lsloading: boolean;
  otpScreen: boolean;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  lsloading: false,
  otpScreen: false
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
      // console.error("Google Sign-In Error:", error);
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

function generateOtp(): string {
  return Math.floor(10000 + Math.random() * 90000).toString();
}

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (
    {
      email,
      password,
      confirmPassword
    }: {
      email: string;
      password: string;
      confirmPassword: string;
    },
    { rejectWithValue, dispatch }
  ) => {
    try {
      if (password !== confirmPassword) {
        throw new Error("Passwords do not match!");
      }
      const clientOtp = generateOtp();
      const userCredential = await auth().createUserWithEmailAndPassword(
        email,
        password
      );
      const user = userCredential.user;

      // Step 3: Store user details in Firebase Realtime Database
      const userData = {
        uid: user.uid,
        email: user.email,
        emailVerified: false,
        otp: generateOtp(),
        createdAt: new Date().toISOString()
      };

      await database().ref(`/usersdata/${user.uid}`).set(userData);

      const { data } = await client.mutate({
        mutation: SEND_OTP,
        variables: {
          input: {
            clientOtp,
            email
          }
        }
      });

      if (data?.sendOtp) {
        dispatch(setOtpScreenStatus(true));
      }

      return {
        ...userData,
        message: "User registered successfully."
      };
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to register user");
    }
  }
);

export const sendOtp = createAsyncThunk(
  "auth/sendOtp",
  async (email: string, { rejectWithValue }) => {
    try {
      const response = await axios.post(BACKEND_URI, {
        query: `
          mutation {
            sendOtp(input: { email: "${email}" })
          }
        `
      });

      if (response.data.data.sendOtp) {
        return { email, message: "OTP sent successfully" };
      } else {
        throw new Error("Failed to send OTP");
      }
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const matchOtp = createAsyncThunk<
  void, // Return type (no return needed)
  { otp: string }, // Expected argument type
  { rejectValue: string } // Custom error type
>("auth/matchOtp", async ({ otp }, { rejectWithValue }) => {
  try {
    console.log(otp);

    if (otp === "12345") {
      return; // Success
    } else {
      throw new Error("Invalid OTP");
    }
  } catch (error: any) {
    return rejectWithValue(error.message || "OTP Verification Failed");
  }
});


const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setOtpScreenStatus: (state, action) => {
      state.otpScreen = action.payload;
    },
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
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(matchOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(matchOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(matchOtp.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false; // Unauthenticated after OTP failure
        state.error = action.payload as string;
      });
  }
});

export const { setUser, clearUser, resetError, setOtpScreenStatus } =
  authSlice.actions;
export default authSlice.reducer;
