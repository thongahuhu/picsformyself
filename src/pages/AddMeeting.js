import React from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row } from "react-bootstrap";
import { useContext } from "react";
import NavActiveContext from "../stores/navactive-context";
import AddMeets from "../components/addmeetings/AddMeets";
import "bootstrap/dist/css/bootstrap.min.css";

function AddMeeting() {
  const navigate = useNavigate();

  const NavActiveCtx = useContext(NavActiveContext);

  React.useEffect(() => {
    NavActiveCtx.handleActiveTab("Add");
  }, []);

  const handleAddMeeting = (meetingData) => {
    fetch(
      "https://pics4urself-7b237-default-rtdb.asia-southeast1.firebasedatabase.app/meetings.json",
      {
        method: "POST",
        body: JSON.stringify(meetingData),
        header: {
          "Content-Type": "application/json",
        },
      }
    ).then(() => {
      navigate("/"); //Trở lại trang AllMeetings.js sau khi POST dữ liệu thành công
      NavActiveCtx.handleActiveTab("All");
    });
  };

  return (
    <Container>
      <Row>
        <AddMeets onAddMeeting={handleAddMeeting} />
      </Row>
    </Container>
  );
}

export default AddMeeting;
