import React, { useState } from "react";
import { getDatabase, ref, set, update } from "firebase/database";
import { app } from "../../Firebase";
import { useLocation, useNavigate } from "react-router-dom";
const UpdateData = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [state, setState] = useState({
    stuId: location?.state[0],
    studentName: location?.state[1]?.studentName,
    age: location?.state[1]?.age,
  });
  const handleSubmit = () => {
    const db = getDatabase(app);
    const studentRef = ref(db, "student/" + location?.state[0]);
    update(studentRef, {
      studentName: state.studentName,
      age: state.age,
    })
      .then((res) => {
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <h1>Update Student</h1>
      <input
        type="text"
        placeholder="studentId"
        value={state.stuId}
        disabled
        onChange={(e) => setState({ ...state, stuId: e.target.value })}
      />
      <input
        type="text"
        placeholder="Studnet Name"
        value={state.studentName}
        onChange={(e) => setState({ ...state, studentName: e.target.value })}
      />
      <input
        type="text"
        placeholder="Student age"
        value={state.age}
        onChange={(e) => setState({ ...state, age: e.target.value })}
      />
      <button onClick={handleSubmit}>Update Student</button>
    </>
  );
};

export default UpdateData;
