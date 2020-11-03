import { gql } from "@apollo/client";

export const GET_SCHEDULES = gql`
  query getSchedules {
    schedules(order_by: { date: asc }) {
      date
      end_time
      id
      participants
      start_time
      title
    }
  }
`;
