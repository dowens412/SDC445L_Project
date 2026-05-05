import { supaBase } from "./supabaseClient";

export const getWorkouts = async () => {
  const { data, error } = await supaBase.from("splits").select("*");

  if (error) {
    console.log("There Was an Error ", error);
    return [];
  }

  return data;
};
