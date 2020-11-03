import { useQuery } from "@apollo/client";
import { CircularProgress } from "@material-ui/core";
import { GET_SCHEDULES } from "./graphql/queries";
import { tConvert, dateConvert } from "./helper";
import "./App.css";
import React from "react";
import Form from "./form";
function App() {
  //Queries
  const { data, loading, error } = useQuery(GET_SCHEDULES);
  // Hooks

  //Handling Functions
  function handleCreateScheduleButton(e) {
    e.preventDefault();
    const scheduleContainer = document.querySelector(".schedule-container");
    const form = document.querySelector("form");
    scheduleContainer.style.display = "none";
    form.style.display = "flex";
  }

  if (loading)
    return (
      <div
        style={{
          display: "flex",
          flexFlow: "column",
          alignItems: "center",
          marginTop: "50px",
        }}
      >
        <CircularProgress />
      </div>
    );
  else if (error) return <div>ERrror</div>;

  return (
    <div className="container">
      <div className="heading">
        <h1>Schedules</h1>
      </div>
      <Form />
      <div className="schedule-container">
        <button className="addButton" onClick={handleCreateScheduleButton}>
          Create Schedule
        </button>
        {data.schedules.map((schedule) => {
          console.log(schedule);
          return (
            <div key={schedule.id} className="schedule">
              <div className="dateDiv">
                <p>{dateConvert(schedule.date)}</p>
              </div>
              <div className="detailsDiv">
                <p className="title">{schedule.title}</p>

                <p className="time">
                  {tConvert(schedule.start_time) +
                    "to" +
                    tConvert(schedule.end_time)}
                </p>
                <p className="participants">
                  {schedule.participants.toString() + " participants"}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
