import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authService } from "@/services";

const tokenFromStorage = localStorage.getItem("accessToken");
const userFromStorage = localStorage.getItem("user");

let parsedUser = null;
try {
  parsedUser = userFromStorage ? JSON.parse(userFromStorage) : null;
} catch (e) {
  console.log(e);
  localStorage.removeItem("user");
}

const initialState = {
  user: parsedUser,
  accessToken: tokenFromStorage || null,
  tokenType: localStorage.getItem("tokenType") || "Bearer",
  isAuthenticated: !!tokenFromStorage,
  loading: false,
  error: null,
  success: null,
};

/* -------------------------------------------------------------------------- */
/*                                Async Thunks                                */
/* -------------------------------------------------------------------------- */

export const loginThunk = createAsyncThunk(
  "auth/login",
  async (credentials, thunkAPI) => {
    try {
      const response = await authService.login(credentials);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Login failed"
      );
    }
  }
);

export const signupThunk = createAsyncThunk(
  "auth/signup",
  async (userData, thunkAPI) => {
    try {
      const response = await authService.signup(userData);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Signup failed"
      );
    }
  }
);

export const verifyEmailThunk = createAsyncThunk(
  "auth/verify-email",
  async (token, thunkAPI) => {
    try {
      const response = await authService.verifyEmail(token);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Email verification failed"
      );
    }
  }
);

export const forgotPasswordThunk = createAsyncThunk(
  "auth/forgot-password",
  async (emailData, thunkAPI) => {
    try {
      const response = await authService.forgotPassword(emailData);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to send reset email"
      );
    }
  }
);

export const resetPasswordThunk = createAsyncThunk(
  "auth/reset-password",
  async (resetData, thunkAPI) => {
    try {
      const response = await authService.resetPassword(resetData);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Password reset failed"
      );
    }
  }
);

/* -------------------------------------------------------------------------- */
/*                                 Auth Slice                                 */
/* -------------------------------------------------------------------------- */

const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    logout(state) {
      state.user = null;
      state.accessToken = null;
      state.tokenType = null;
      state.isAuthenticated = false;
      state.error = null;
      state.success = null;

      // LocalStorage Clean करें
      localStorage.removeItem("accessToken");
      localStorage.removeItem("tokenType");
      localStorage.removeItem("user");
    },

    clearError(state) {
      state.error = null;
    },

    clearSuccess(state) {
      state.success = null;
    },
  },

  extraReducers: (builder) => {
    builder
      /* 1. Signup */
      .addCase(signupThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(signupThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.message || "Signup successful";
      })
      .addCase(signupThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* 2. Verify Email */
      .addCase(verifyEmailThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(verifyEmailThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.message || "Email verified successfully";
      })
      .addCase(verifyEmailThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* 3. Login - FIXED PAYLOAD PARSING */
      .addCase(loginThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.loading = false;

        // Extracting exact fields from backend response
        const userInfo = action.payload?.data?.userInfo;
        const tokenInfo = action.payload?.data?.tokenInfo;

        state.user = userInfo || null;
        state.accessToken = tokenInfo?.accessToken || null;
        state.tokenType = tokenInfo?.tokenType || "Bearer";
        state.isAuthenticated = true;
        state.success = action.payload?.message || "Login successful";

        // Save to LocalStorage for persistence
        if (tokenInfo?.accessToken) {
          localStorage.setItem("accessToken", tokenInfo.accessToken);
          localStorage.setItem("tokenType", tokenInfo.tokenType || "Bearer");
        }
        if (userInfo) {
          localStorage.setItem("user", JSON.stringify(userInfo));
        }
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* 4. Forgot Password */
      .addCase(forgotPasswordThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(forgotPasswordThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.message || "Reset link sent successfully";
      })
      .addCase(forgotPasswordThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* 5. Reset Password */
      .addCase(resetPasswordThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(resetPasswordThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.message || "Password reset successful";
      })
      .addCase(resetPasswordThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, clearError, clearSuccess } = authSlice.actions;

export default authSlice.reducer;