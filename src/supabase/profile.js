import { supaBase } from "./supabaseClient";

export const createUserProfile = async (userId, email) => {
  return await supaBase.from("profiles").insert({
    id: userId,
    email: email,
  });
};
