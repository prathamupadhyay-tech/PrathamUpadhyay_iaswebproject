


import React, { useState } from "react";
import data from "../../components/ApiData";
const TempPage = () => {


    const getData = async ()=>{
        try{
            const res = fetch("/api/getQuestionsFromApi")
            
        }catch(err){
            console.log(err);
        }
    }

  return (
    <div>
      
    </div>
  );
};

export default TempPage;
