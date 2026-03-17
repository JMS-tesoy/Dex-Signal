import React from 'react';
// 1. Import your new client component
import CreateUserForm from '@/components/CreateUserForm'; 

export default function HomePage() {
  return (
    <main className="min-h-screen dot-bg p-8 flex flex-col items-center justify-center">
      
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-white tracking-tight mb-2">
          DEXSignal Admin
        </h1>
        <p className="text-gray-400">
          Add new users to your local PostgreSQL database
        </p>
      </div>

      {/* 2. Drop the form component onto the page */}
      <div className="w-full max-w-md">
        <CreateUserForm />
      </div>

    </main>
  );
}