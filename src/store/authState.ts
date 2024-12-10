import { atom, selector } from "recoil";
import { User } from "../types/auth";

export const authTokenState = atom<string | null>({
    key: "authTokenState",
    default: null,
});

export const currentUserState = atom<User | null>({
    key: "currentUserState",
    default: null,
});

export const isAuthenticatedState = selector<boolean>({
    key: "isAuthenticatedState",
    get: ({ get }) => !!get(authTokenState),
});

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
