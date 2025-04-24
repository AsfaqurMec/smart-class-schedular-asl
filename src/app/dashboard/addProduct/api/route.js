import { connectDB } from "../../../../../lib/connectDB";

import { NextResponse } from "next/server";
export const POST = async (request) => {
  const newCart = await request.json();
  try {
    const db = await connectDB();
    const classCollection = db.collection("courses");
    
    const resp = await classCollection.insertOne({...newCart});
 
   return NextResponse.json(newCart);
  } catch (error) {
    //console.log(error);
    
    return NextResponse.json(
      { message: "Something Went Wrong", error },
      { status: 500 }
    );
  }
};