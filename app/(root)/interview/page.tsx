import Agent from "@/components/Agent";
import { getCurrentUser } from "@/lib/actions/auth";
import React from "react";

const Interview = async() => {

    const user =await getCurrentUser();
  return <div>
        Interview
        <Agent
           userName ={user?.name!} 
           userId={user?.id}
           profileImage={user?.profileURL}
           type="generate"
        />
    </div>;
};

export default Interview;
