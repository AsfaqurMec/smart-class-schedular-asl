import { connectDB } from "../../../../lib/connectDB";
//import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
export const POST = async (request) => {
  const slot = await request.json();
  try {
    
    const db = await connectDB();
    const userCollection = db.collection("availability");
     const exist =await userCollection.findOne({ email: slot.email });

    const resp = await userCollection.insertOne(slot);
  
   return NextResponse.json(slot);
  } catch (error) {
    //console.log(error);
    
    return NextResponse.json(
      { message: "Something Went Wrong", error },
      { status: 500 }
    );
  }
};
