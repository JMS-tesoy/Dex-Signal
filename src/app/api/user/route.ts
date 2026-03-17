import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    // 1. Parse the incoming JSON data from the request body
    const body = await request.json();
    const { name, email, role } = body;

    // 2. Validate the data (ensure required fields aren't empty)
    if (!name || !email) {
      return NextResponse.json(
        { error: 'Name and email are required fields.' },
        { status: 400 } // 400 means "Bad Request"
      );
    }

    // 3. Insert the data into your DEXSignal PostgreSQL database
    // --- Example using raw SQL (pg): ---
    // const result = await db.query(
    //   'INSERT INTO users (name, email, role) VALUES ($1, $2, $3) RETURNING *',
    //   [name, email, role || 'User']
    // );
    // const newUser = result.rows[0];
    
    // --- Example using Prisma ORM: ---
    // const newUser = await prisma.user.create({ 
    //   data: { name, email, role: role || 'User' } 
    // });

    // 4. Return a success response
    return NextResponse.json(
      { 
        message: 'User created successfully', 
        // In a real app, you would return the 'newUser' variable from your DB here
        data: { name, email, role: role || 'User' } 
      },
      { status: 201 } // 201 means "Created"
    );

  } catch (error) {
    // 5. Catch and log any database or server errors
    console.error('Failed to create user:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}