import { gql } from "@apollo/client";

export const ADD_SCHEDULE = gql`
  mutation addSchedule(
    $title: String!
    $date: date!
    $start_time: time!
    $end_time: time!
  ) {
    insert_schedules(
      objects: {
        title: $title
        date: $date
        start_time: $start_time
        end_time: $end_time
      }
    ) {
      returning {
        id
        title
        date
        start_time
        end_time
        participants
      }
    }
  }
`;
