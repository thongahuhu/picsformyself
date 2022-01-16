import React from "react";
import { useEffect, useContext } from "react";
import { Container, Row } from "react-bootstrap";
import MeetingList from "../components/meetings/MeetingList";
import Loading from "../components/loading/Loading";
import LoadingContext from "../stores/getData-context";
import "../components/sass/_custom.scss";
import "bootstrap/dist/css/bootstrap.min.css";

function AllMeeting() {
  const LoadedMeetingsCtx = useContext(LoadingContext);

  useEffect(() => {
    LoadedMeetingsCtx.setIsLoading(true);
    setTimeout(() => {
      fetch(
        "https://pics4urself-7b237-default-rtdb.asia-southeast1.firebasedatabase.app/meetings.json"
      )
        .then((res) => res.json())
        .then((data) => {
          const meetings = [];

          for (const key in data) {
            //Dữ liệu từ server là obj nên phải lặp theo key để lấy và đưa vào Array
            const meeting = {
              id: key,
              ...data[key],
            };
            meetings.push(meeting);
          }
          LoadedMeetingsCtx.setIsLoading(false);
          LoadedMeetingsCtx.setLoadedMeetings(meetings);
        });
    }, 500);
  }, []);

  return LoadedMeetingsCtx.isLoading ? (
    <Loading />
  ) : (
    <div>
      <Container fluid="md">
        <Row>
          {LoadedMeetingsCtx.loadedMeetings.length === 0 ? (
            <h1
              style={{
                color: "#f90",
                textAlign: "center",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "80vh",
              }}
            >
              NOTHING.
            </h1>
          ) : (
            <MeetingList meetings={LoadedMeetingsCtx.loadedMeetings} />
          )}
        </Row>
      </Container>
    </div>
  );
}

export default AllMeeting;
