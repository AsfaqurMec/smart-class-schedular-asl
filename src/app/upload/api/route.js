import { promises as fs } from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

// Helper function to save the file
async function saveFile(fileData, filename) {
  const uploadDir = path.join(process.cwd(), 'public/uploads/');
  
  // Ensure the 'uploads' directory exists
  await fs.mkdir(uploadDir, { recursive: true });

  const filePath = path.join(uploadDir, filename);
  
  // Write the file data to disk
  await fs.writeFile(filePath, fileData);

  return filePath;
}

// Handle POST requests
export async function POST(req) {
  try {
    const formData = await req.formData(); // Parse the form data from the request

    const file = formData.get('image'); // Get the uploaded file (the 'image' field)
console.log(file);

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer(); // Get file content
    const buffer = Buffer.from(arrayBuffer); // Convert arrayBuffer to Buffer
    const savedPath = await saveFile(buffer, file.name); // Save file using helper

    // Return a dynamic file serving path
    const filePath = `/uploads/${file.name}`;
    console.log(filePath);
    
    return NextResponse.json({ filePath }, { status: 200 }); // Return the file path
  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json({ error: 'File upload failed' }, { status: 500 });
  }
}
