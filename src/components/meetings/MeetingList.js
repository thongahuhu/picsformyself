import React from "react";
import styles from "./MeetingList.module.scss";
import MeetingItem from "./MeetingItem";

function MeetingList(props) {
  return (
    <ul className={styles.list}>
      {props.meetings.map((item, index) => (
        <MeetingItem
          key={index}
          id={item.id} //ID random của firebase
          image={item.image}
          title={item.title}
          address={item.address}
          description={item.description}
        />
      ))}
    </ul>
  );
}

export default MeetingList;
