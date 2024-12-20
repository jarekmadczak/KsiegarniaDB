import { useState, useEffect } from 'react';
import Nav from '../components/Nav';
import Layout from '../components/Layout';


export default function Home() {
  const [error, setError] = useState(null);
  
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  
  const handleSubmit = async (event) => {
    event.preventDefault();

    const email = event.target.email.value;
    const password = event.target.password.value;

    try {
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsLoggedIn(true); 
      } else {
        setError(data.message || 'Niepoprawny email lub hasło.');
      }
    } catch (err) {
      setError('Coś poszło nie tak. Spróbuj ponownie.');
    }
  };

  if (isLoggedIn) {
    return (
  
        <Layout>
          <Dashboard/>
        </Layout>
  
    );
  }

  // Formularz logowania (pokazywany tylko jeśli użytkownik nie jest zalogowany)
  return (
    <div className="bg-blue-900 w-screen h-screen flex flex-col items-center justify-center">
      <div className="text-center w-full">
        <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
          PANEL ADMINISTRATORA
        </h1>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="email"
            className="bg-gray-300 py-2 px-10 m-3"
          />
          <br />
          <input
            type="password"
            name="password"
            placeholder="hasło"
            className="bg-gray-300 py-2 px-10 m-3"
          />
          <br />
          <button
            type="submit"
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-10 rounded inline-flex items-center"
          >
            Zaloguj się
          </button>
        </form>
        {/* Wyświetlanie błędu w przypadku nieudanego logowania */}
        {error && <p className="text-red-500 mt-4">{error}</p>}
      </div>
    </div>
  );
}
