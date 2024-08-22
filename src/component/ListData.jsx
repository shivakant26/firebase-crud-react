import React, { useEffect, useState } from "react";
import {getDatabase , onValue, ref , remove, set} from "firebase/database";
import { app } from "../../Firebase";
import {
  getStorage,
  ref as storageRef,
  deleteObject,
} from "firebase/storage";
// import { useNavigate } from "react-router-dom";
const ListData = ({editedData, seteditedData}) =>{
    // const navigate = useNavigate();
    const [list ,setList] = useState();
    useEffect(()=>{
        const db = getDatabase(app);
        const studentRef = ref(db,'student')
        onValue(studentRef,(item)=>{
            const data = item.val();
            setList(data)
        })
    },[])
    console.log(list)


    const handleDelete = (id) =>{
        const db = getDatabase(app);
        // for delete image
        const storage =getStorage(app)
        const studentRef = ref(db,'student/'+id)
        // delete image from firebase database if data is deleted
        const myRef = storageRef(storage, `images/${id}`);
        deleteObject(myRef)
        .then(res=>{
          remove(studentRef)
        })
        .catch(err=>{
          console.log(err)
        })
    }

    const handleEdit = (data) =>{
        seteditedData(data)
    }
    return(
        <>
        <h1>Student List</h1>
        <table className="styled-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>StudentName</th>
          <th>Age</th>
          <th>Image</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {list && Object.entries(list).map(([id, { studentName, age ,imageUrl }]) => (
          <tr key={id}>
            <td>{id}</td>
            <td>{studentName}</td>
            <td>{age}</td>
            <td><img src={imageUrl} height="50px" width="50px" alt="student-image"/></td>
            <td style={{display:"flex",gap:"15px"}}>
                <button className="button edit-button" onClick={()=>handleEdit({id,studentName,age})}>Update</button>
                {/* <button onClick={()=>navigate('/update-data',{state:[id,{studentName,age}]})}>Update</button> */}
                <button className="button delete-button" onClick={()=>handleDelete(id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
        </>
    )
}

export default ListData;