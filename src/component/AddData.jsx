import React, { useEffect, useState } from "react";
import { getDatabase, ref, set, update } from "firebase/database";
import { app } from "../../Firebase";
const AddData = ({ editedData, seteditedData }) => {
  const [state, setState] = useState({
    stuId: "",
    studentName: "",
    age: "",
  });

  useEffect(() => {
    if (editedData) {
      setState({
        stuId: editedData?.id,
        studentName: editedData.studentName,
        age: editedData.age,
      });
    }
  }, [editedData]);

  const handleSubmit = () => {
    const db = getDatabase(app);
    if (editedData) {
      const studentRef = ref(db, "student/" + editedData?.id);
      update(studentRef, {
        studentName: state?.studentName,
        age: state?.age,
      });
      seteditedData("");
    } else {
      set(ref(db, "student/" + state.stuId), {
        studentName: state.studentName,
        age: state.age,
      });
    }
    setState({
      stuId: "",
      studentName: "",
      age: "",
    });
  };
  return (
    <>
      <h1>{editedData ? "Update Student" : "Add Student"}</h1>
      <div className="form-field">
        <input
          type="text"
          placeholder="studentId"
          value={state.stuId}
          disabled={editedData ? true : false}
          onChange={(e) => setState({ ...state, stuId: e.target.value })}
        />
      </div>
      <div className="form-field">
        <input
          type="text"
          placeholder="Studnet Name"
          value={state.studentName}
          onChange={(e) => setState({ ...state, studentName: e.target.value })}
        />
      </div>
      <div className="form-field">
        <input
          type="text"
          placeholder="Student age"
          value={state.age}
          onChange={(e) => setState({ ...state, age: e.target.value })}
        />
      </div>

      <button
        onClick={handleSubmit}
        className={editedData ? "button update-button" : "button save-button"}
      >
        {editedData?.id ? "Update Data" : "Save Data"}
      </button>
    </>
  );
};

export default AddData;
