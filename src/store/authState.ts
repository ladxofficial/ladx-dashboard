import { atom, selector } from "recoil";
import { User } from "../types/auth";

// Access Token State
export const accessTokenState = atom<string | null>({
    key: "accessTokenState",
    default: null, // Default value for the access token
});

// Current User State
export const currentUserState = atom<User | null>({
    key: "currentUserState",
    default: null, // Default value for user
});

// Is Authenticated Selector
export const isAuthenticatedState = selector<boolean>({
    key: "isAuthenticatedState",
    get: ({ get }) => !!get(accessTokenState), // Check if the token exists
});

// Reset Password State
export const resetPasswordState = atom<{
    email: string | null;
    token: string | null;
}>({
    key: "resetPasswordState",
    default: {
        email: null,
        token: null,
    },
});
