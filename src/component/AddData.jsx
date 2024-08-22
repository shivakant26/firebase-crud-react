import React, { useEffect, useState } from "react";
import { getDatabase, ref, set, update } from "firebase/database";
import {
  getStorage,
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { app } from "../../Firebase";
const AddData = ({ editedData, seteditedData }) => {
  const [state, setState] = useState({
    stuId: "",
    studentName: "",
    age: "",
    selectedFile: null,
  });

  console.log(state);
  useEffect(() => {
    if (editedData) {
      setState({
        stuId: editedData?.id,
        studentName: editedData.studentName,
        age: editedData.age,
        imageUrl : editedData.imageUrl
      });
    }
  }, [editedData]);

  const handleChange = (e) => {
    const file = e.target.files[0];
    setState({ ...state, selectedFile: file });
  };

  const handleSubmit = async () => {
    const db = getDatabase(app);
    const storage = getStorage(app);
    if (editedData) {
      const myRef = storageRef(storage, `images/${editedData.id}`);
      await uploadBytes(myRef, state?.selectedFile);
      const imageUrl = await getDownloadURL(myRef);
      const studentRef = ref(db, "student/" + editedData?.id);
     await update(studentRef, {
        studentName: state?.studentName,
        age: state?.age,
        imageUrl : imageUrl
      });
      seteditedData("");
    } else {
      // for image upload code
      const myRef = storageRef(storage, `images/${state.stuId}`);
      await uploadBytes(myRef, state?.selectedFile);
      const imageUrl = await getDownloadURL(myRef);
      // add data code
      set(ref(db, "student/" + state.stuId), {
        studentName: state.studentName,
        age: state.age,
        imageUrl: imageUrl,
      });
    }
    setState({
      stuId: "",
      studentName: "",
      age: "",
      imageUrl : null
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

      <div className="form-field">
        <input
          type="file"
          // value={state.selectedFile}
          onChange={(e) => handleChange(e)}
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
