import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import Button from "./components/Button";
import TextField from "./components/TextField";
import SplitChart from "./components/SplitChart";
import { useEffect, useState } from "react";
import { getWorkouts } from "./supabase/Workouts";
import { setWorkouts, setSelectedSplit } from "./store/actions/workoutAction";
import {
  getCurrentUser,
  signInWithEmail,
  signUpWithEmail,
  signOut,
} from "./supabase/auth";
import { createUserProfile } from "./supabase/profile";

function App() {
  const workouts = useSelector((state) => state.workoutState.workouts);
  const selectedSplit = useSelector(
    (state) => state.workoutState.selectedSplit,
  );

  const dispatch = useDispatch();

  const [user, setUser] = useState(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const checkUser = async () => {
      const { data, error } = await getCurrentUser();

      if (error) {
        console.log("User Error:", error);
        return;
      }

      setUser(data.user);
    };

    checkUser();
  }, []);

  useEffect(() => {
    const fetchWorkouts = async () => {
      const data = await getWorkouts();
      dispatch(setWorkouts(data));
    };

    if (user) {
      fetchWorkouts();
    }
  }, [dispatch, user]);

  const handleSignUp = async () => {
    const { data, error } = await signUpWithEmail(email, password);

    if (error) {
      alert("Error signing up user");
      console.log(error);
      return;
    }

    const newUser = data.user;

    if (newUser && newUser.email) {
      await createUserProfile(newUser.id, newUser.email);
    }

    setUser(newUser);
    alert("Account Created Successfully");
  };

  const handleSignIn = async () => {
    const { data, error } = await signInWithEmail(email, password);

    if (error) {
      alert("Error signing in");
      console.log(error);
      return;
    }

    setUser(data.user);
    alert("Signed In Successfully");
  };

  const handleSignOut = async () => {
    await signOut();
    setUser(null);
    dispatch(setSelectedSplit(""));
    setSearchText("");
  };

  const splits = [...new Set(workouts.map((workout) => workout.name))];

  const filteredSplits = splits.filter((split) =>
    split.toLowerCase().includes(searchText.toLowerCase()),
  );

  const displayedSplits = selectedSplit ? [selectedSplit] : filteredSplits;

  const selectedWorkouts = workouts.filter(
    (workout) => workout.name.toLowerCase() === selectedSplit.toLowerCase(),
  );

  const handleSearchChange = (e) => {
    const cleanedText = e.target.value.replace(/[^a-zA-Z0-9\s/]/g, "");
    setSearchText(cleanedText);
  };

  const handleSelectSplit = () => {
    const cleanedSearch = searchText.trim();

    if (!cleanedSearch) {
      alert("Please type a split first.");
      return;
    }

    if (filteredSplits.length === 0) {
      alert("No split found. Please try a different search.");
      return;
    }

    if (filteredSplits.length > 1) {
      alert("Please keep typing until only one split is left.");
      return;
    }

    dispatch(setSelectedSplit(filteredSplits[0]));
  };

  const handleSplitClick = (split) => {
    dispatch(setSelectedSplit(split));
    setSearchText(split);
  };

  const handleClearLog = () => {
    setSearchText("");
    dispatch(setSelectedSplit(""));
  };

  if (!user) {
    return (
      <div className="app">
        <h1 className="app-title">FitLog - Workout Tracker</h1>
        <p className="app-subtitle">Sign in or create an account</p>

        <div className="section input-section">
          <h2 className="section-title">Account Login</h2>

          <TextField
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextField
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="button-group">
            <Button label="Sign Up" onClick={handleSignUp} />
            <Button label="Sign In" onClick={handleSignIn} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <h1 className="app-title">FitLog - Workout Tracker</h1>

      <Button label="Sign Out" onClick={handleSignOut} />

      <div className="section input-section">
        <h2 className="section-title">Search Split</h2>

        <TextField
          type="text"
          placeholder="Search split"
          value={searchText}
          onChange={handleSearchChange}
        />
      </div>

      <div className="section button-section">
        <h2 className="section-title">Actions</h2>
        <div className="button-group">
          <Button label="Add Workout" onClick={handleSelectSplit} />
          <Button label="Clear Log" onClick={handleClearLog} />
        </div>
      </div>

      <div className="section splits-section">
        <h2 className="section-title">
          {selectedSplit ? "Selected Split" : "Available Splits"}
        </h2>

        <ul className="split-list">
          {displayedSplits.map((split) => (
            <li
              className="split-item"
              key={split}
              onClick={() => handleSplitClick(split)}
            >
              {split}
            </li>
          ))}
        </ul>
      </div>

      <div className="section progress-section">
        <h2 className="section-title">Split Frequency Comparison</h2>

        {selectedSplit && (
          <p className="selected-split">
            Selected Split: <span>{selectedSplit}</span>
          </p>
        )}

        {selectedSplit && (
          <div className="workout-list">
            {selectedWorkouts.map((workout) => (
              <div className="workout-item" key={workout.id}>
                {workout.name}
              </div>
            ))}
          </div>
        )}

        <SplitChart splits={displayedSplits} />
      </div>
    </div>
  );
}

export default App;
