import { SET_WORKOUTS, SET_SELECTED_SPLIT } from "../type";

const initialState = {
  workouts: [],
  selectedSplit: "",
};

const workoutReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_WORKOUTS:
      return {
        ...state,
        workouts: action.payload,
      };

    case SET_SELECTED_SPLIT:
      return {
        ...state,
        selectedSplit: action.payload,
      };

    default:
      return state;
  }
};

export default workoutReducer;
