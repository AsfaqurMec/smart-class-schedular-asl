import { connectDB } from "../../../../../lib/connectDB"
import { NextResponse } from "next/server";

export const GET = async () => {
    
   
    
    const db =await connectDB()
    const buyCollection = db.collection('users')
    try {
       
       const service = await buyCollection.find().toArray();
       //console.log('cart data',service);
       
        return NextResponse.json({service})
    } catch (error) {
        return NextResponse.json({message : "No Data Found"})
    }
}