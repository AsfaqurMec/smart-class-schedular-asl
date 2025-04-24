import { connectDB } from "../../../lib/connectDB"; // Import MongoDB connection
 // Import User model

export async function POST(req) {
  
  
  try {
    const {email, course} = await req.json();
    //console.log("data",email, course);
    
    if (!email) {
      return new Response(JSON.stringify({ message: "Email and new role are required" }), { status: 400 });
    }
     
    // Connect to MongoDB
    const db = await connectDB()
    const userCollection = db.collection('users')
    // Find user by email
    const user = await userCollection.findOne({email });

    if (!user) {
      
      
      return new Response(JSON.stringify({ message: "User not found" }), { status: 404 });
    }

    // Store the new password directly (Not Secure)
    const updatedUser = await userCollection.updateOne({ email }, { $set: { role: 'mentor', discipline: course?.subject } });
    if (updatedUser.modifiedCount === 0) {
        return new Response(JSON.stringify({ message: "User not found or role unchanged" }), { status: 404 });
      }
    return new Response(JSON.stringify({ message: "Role updated successfully" }), { status: 200 });
  } catch (error) {
    console.error("Role update error:", error);
    return new Response(JSON.stringify({ message: "Failed to update user role" }), { status: 500 });
  }
}

