import React, { useState } from "react";
import AddData from "./AddData";
import ListData from "./ListData";
import UpdateData from "./UpdateData";
const Home = () => {
  const [editedData, seteditedData] = useState();

  return (
    <>
      <h1>Home component</h1>
      {/* {toggleform ? <AddData /> : <UpdateData />} */}
      <AddData 
      editedData={editedData}
      seteditedData={seteditedData}
      />
      <ListData
        editedData={editedData}
        seteditedData={seteditedData}
      />
    </>
  );
};
export default Home;
