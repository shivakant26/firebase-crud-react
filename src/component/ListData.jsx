import React, { useEffect, useState } from "react";
import {getDatabase , onValue, ref , remove, set} from "firebase/database";
import { app } from "../../Firebase";
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
        const studentRef = ref(db,'student/'+id)
        remove(studentRef)
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
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {list && Object.entries(list).map(([id, { studentName, age }]) => (
          <tr key={id}>
            <td>{id}</td>
            <td>{studentName}</td>
            <td>{age}</td>
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