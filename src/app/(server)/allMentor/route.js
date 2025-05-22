import { connectDB } from "../../../../lib/connectDB"
import { NextResponse } from "next/server";

export const GET = async () => {
    const db = await connectDB();
    const buyCollection = db.collection('users');
    
    try {
        const service = await buyCollection.find({role : 'mentor'}).toArray();
       // console.log('cart data:', service);

        // Log the entire response before sending
        const response = { service };
       // console.log("API Response:", response);

        return NextResponse.json(response);
    } catch (error) {
        console.error("Error fetching data:", error);
        return NextResponse.json({ message: "No Data Found" });
    }
}