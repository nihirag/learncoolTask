import React from "react";
import moment from "moment";
import { compareTime } from "./helper";
import { useMutation } from "@apollo/client";
import { ADD_SCHEDULE } from "./graphql/mutations";
import { GET_SCHEDULES } from "./graphql/queries";
export default function Form() {
  const [addSchedule] = useMutation(ADD_SCHEDULE);
  const [title, setTitle] = React.useState("");
  const [date, setDate] = React.useState(
    moment(Date.now()).format("YYYY-MM-DD")
  );
  const [startHour, setstartHour] = React.useState(
    parseInt(moment(Date.now()).format("h"))
  );
  const [startMinute, setStartMinute] = React.useState(
    parseInt(moment(Date.now()).format("mm"))
  );
  const [startampm, setStartampm] = React.useState(
    moment(Date.now()).format("LTS").slice(-2).toLowerCase()
  );
  const [endHour, setEndHour] = React.useState(
    parseInt(moment(Date.now()).format("h"))
  );
  const [endMinute, setEndMinute] = React.useState(
    parseInt(moment(Date.now()).format("mm"))
  );
  const [endampm, setEndampm] = React.useState(
    moment(Date.now()).format("LTS").slice(-2).toLowerCase()
  );

  async function handleSubmit(e) {
    e.preventDefault();
    const startTime =
      startHour + ":" + startMinute + " " + startampm.toUpperCase();
    const endTime = endHour + ":" + endMinute + " " + endampm.toUpperCase();
    if (!compareTime(startTime, endTime)) {
      return alert("Provide proper timings");
    }
    if (!title.trim()) {
      return alert("Write some title for your Schedule");
    }
    console.log(moment(startTime, ["h:mm A"]).format("hh:mm"));
    const variables = {
      title: title,
      date: date,
      start_time: moment(startTime, ["h:mm A"]).format("hh:mm"),
      end_time: moment(endTime, ["h:mm A"]).format("hh:mm"),
    };
    await addSchedule({
      variables,
      refetchQueries: [
        {
          query: GET_SCHEDULES,
        },
      ],
    });
    window.location.reload();
  }
  return (
    <form className="creationForm" onSubmit={handleSubmit}>
      <p>Title</p>
      <input
        type="text"
        required
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <p>Date</p>
      <input
        type="date"
        required
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <p>Start Time</p>
      <input
        type="number"
        max="12"
        placeholder="Hours"
        required
        value={startHour}
        onChange={(e) => setstartHour(e.target.value)}
      />
      <input
        type="number"
        max="59"
        placeholder="Minutes"
        required
        value={startMinute}
        onChange={(e) => setStartMinute(e.target.value)}
      />
      <select
        name="ampm"
        required
        value={startampm}
        onChange={(e) => setStartampm(e.target.value)}
      >
        <option value="am">AM</option>
        <option value="pm">PM</option>
      </select>
      <p>End Time</p>
      <input
        type="number"
        max="12"
        placeholder="Hours"
        required
        value={endHour}
        onChange={(e) => setEndHour(e.target.value)}
      />
      <input
        type="number"
        max="59"
        placeholder="Minutes"
        required
        value={endMinute}
        onChange={(e) => setEndMinute(e.target.value)}
      />
      <select
        name="ampm"
        required
        value={endampm}
        onChange={(e) => setEndampm(e.target.value)}
      >
        <option value="am">AM</option>
        <option value="pm">PM</option>
      </select>
      <button type="submit">Create Schedule</button>
    </form>
  );
}
