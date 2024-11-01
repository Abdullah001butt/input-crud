import React from "react";
import Create from "./components/Create";
import Read from "./components/Read";

const App = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
      <header className="w-full bg-blue-600 text-white p-4 text-center text-3xl font-bold">
        CRUD Application
      </header>
      <main className="w-full max-w-2xl bg-white shadow-md rounded p-4 mt-4">
        <Create />
        <Read />
      </main>
    </div>
  );
};

export default App;
