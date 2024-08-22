# Feature of Project

1. firebase intallstion and setup

create firebase.js file in root of your application and put confrigation

import { getDatabase, ref, set, update } from "firebase/database";

2. using firebase add Student

    const db = getDatabase(app);
    set(ref(db, "student/" + state.stuId), {
        studentName: state.studentName,
        age: state.age,
      });

3. using firebase delete Student

    const db = getDatabase(app);
        const studentRef = ref(db,'student/'+id)
        remove(studentRef)

4. using firebase update Student
    
    const db = getDatabase(app);
    const studentRef = ref(db, "student/" + editedData?.id);
      update(studentRef, {
        studentName: state?.studentName,
        age: state?.age,
      });

5. using firebase show data

    const db = getDatabase(app);
        const studentRef = ref(db,'student')
        onValue(studentRef,(item)=>{
            const data = item.val();
            setList(data)
        })      