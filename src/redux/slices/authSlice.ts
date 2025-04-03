import { TRADEWISE_USER_DATA, TRADEWISE_USER_TOKEN } from '@/lib/constants';
import { getCookie, setCookie } from '@/lib/cookies';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define proper interfaces for our data
export interface SignUpData {
  email?: string;
  fullName?: string;
  department?: string;
  designation?: string;
  biography?: string;
  password?: string;
  phoneNumber?: string;
  stepId?: number;
}

export interface AuthState {
  email: string;
  fullName: string;
  department: string;
  designation: string;
  biography: string;
  token: string;
  isUserVerified: boolean;
  days: number;
  signUpData: SignUpData | null;
  userSubscribed: boolean;
  subscriptionStatus: string
}

// Define the initial state
const initialState: AuthState = {
  email: '',
  fullName: '',
  department: '',
  designation: '',
  biography: '',
  token: '',
  isUserVerified: false,
  signUpData: null,
  days: 0,
  userSubscribed: false,
  subscriptionStatus: ''
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials(state, action: PayloadAction<Omit<AuthState, 'signUpData'> | Partial<AuthState>>) {
      setCookie(
        TRADEWISE_USER_TOKEN,
        action.payload.token || '',
        action.payload.days || 0
      );
      setCookie(
        TRADEWISE_USER_DATA,
        {
          email: action.payload.email || '',
          fullName: action.payload.fullName || '',
          department: action.payload.department || '',
          designation: action.payload.designation || '',
          biography: action.payload.biography || '',
          isUserVerified: action.payload.isUserVerified || false,
          userSubscribed: action.payload.userSubscribed || false,
          subscriptionStatus: action.payload.subscriptionStatus || '',
        },
        action.payload.days || 0
      );
      state.email = action.payload.email || state.email;
      state.fullName = action.payload.fullName || state.fullName;
      state.department = action.payload.department || state.department;
      state.designation = action.payload.designation || state.designation;
      state.biography = action.payload.biography || state.biography;
      state.isUserVerified = action.payload.isUserVerified || state.isUserVerified;
      state.token = action.payload.token || state.token;
      state.days = action.payload.days || state.days;
      state.userSubscribed = action.payload.userSubscribed || state.userSubscribed;
      state.subscriptionStatus = action.payload.subscriptionStatus || state.subscriptionStatus;
    },
    updateCredentials: (state, action: PayloadAction<Partial<AuthState>>) => {
      const userPrevData = getCookie(TRADEWISE_USER_DATA);
      setCookie(
        TRADEWISE_USER_DATA,
        {
          ...userPrevData,
          email: action.payload.email || state.email,
          fullName: action.payload.fullName || state.fullName,
          department: action.payload.department || state.department,
          designation: action.payload.designation || state.designation,
          biography: action.payload.biography || state.biography,
          isUserVerified: action.payload.isUserVerified || state.isUserVerified,
          userSubscribed: action.payload.userSubscribed || state.userSubscribed,
          subscriptionStatus: action.payload.subscriptionStatus || state.subscriptionStatus
        },
        action.payload.days || state.days
      );
      state.email = action.payload.email || state.email;
      state.fullName = action.payload.fullName || state.fullName;
      state.department = action.payload.department || state.department;
      state.designation = action.payload.designation || state.designation;
      state.biography = action.payload.biography || state.biography;
      state.isUserVerified = action.payload.isUserVerified || state.isUserVerified;
      state.token = action.payload.token || state.token;
      state.days = action.payload.days || state.days;
      state.userSubscribed = action.payload.userSubscribed || state.userSubscribed;
      state.subscriptionStatus = action.payload.subscriptionStatus || state.subscriptionStatus;
    },
    setSignUpData(state, action: PayloadAction<Partial<SignUpData>>) {
      state.signUpData = { ...state.signUpData, ...action.payload };
    },
    clearSignUpData(state) {
      state.signUpData = null;
    },
    clearAuthState: (state) => {
      state.email = '';
      state.fullName = '';
      state.department = '';
      state.designation = '';
      state.biography = '';
      state.token = '';
      state.isUserVerified = false;
      state.signUpData = null;
      state.days = 0;
      state.userSubscribed = false;
      state.subscriptionStatus = '';
    }

  },
});

export const {
  setCredentials,
  updateCredentials,
  setSignUpData,
  clearSignUpData,
  clearAuthState
} = authSlice.actions;

// Export the reducer
export default authSlice.reducer;
