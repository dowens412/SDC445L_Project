import { supaBase } from "./supabaseClient";

export const signUpWithEmail = async (email, password) => {
  return await supaBase.auth.signUp({
    email,
    password,
  });
};

export const signInWithEmail = async (email, password) => {
  return await supaBase.auth.signInWithPassword({
    email,
    password,
  });
};

export const signOut = async () => {
  return await supaBase.auth.signOut();
};

export const getCurrentUser = async () => {
  return await supaBase.auth.getUser();
};
