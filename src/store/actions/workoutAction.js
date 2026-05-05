import { SET_WORKOUTS, SET_SELECTED_SPLIT } from "../type";

export const setWorkouts = (workouts) => ({
  type: SET_WORKOUTS,
  payload: workouts,
});

export const setSelectedSplit = (split) => ({
  type: SET_SELECTED_SPLIT,
  payload: split,
});
