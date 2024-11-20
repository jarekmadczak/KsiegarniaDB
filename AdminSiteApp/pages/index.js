import { useState, useEffect } from 'react';
function refreshPage(){ 
  window.location.reload(); 
}
export default function Home() {
  const [error, setError] = useState(null);
  const [adminUsers, setAdminUsers] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Stan do przechowywania informacji o logowaniu
  // Funkcja do pobierania danych z kolekcji AdminUser
  
  useEffect(() => {
    const fetchAdminUsers = async () => {
      try {
        const response = await fetch('/api/getData');
        if (!response.ok) {
          throw new Error('Nie udało się pobrać użytkowników administratora');
        }
        const result = await response.json();
        setAdminUsers(result); // Zapisanie danych użytkowników w stanie
      } catch (err) {
        setError(err.message); // Obsługa błędów
      }
    };

    fetchAdminUsers();
  }, []); // Wywołanie tylko raz po załadowaniu komponentu

  // Funkcja obsługująca logowanie
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
        // Jeśli logowanie jest udane, ustaw stan isLoggedIn na true
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
      
      <div className="bg-blue-900 w-screen h-screen flex flex-col items-center justify-center">
       <button type="button"   className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-10 rounded inline-flex items-right" onClick={ refreshPage }> wyloguj </button> 
        <div className="text-center w-full">
          <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
            PANEL ADMINISTRATORA
          </h1>
        </div>
        {/* Sekcja wyświetlania danych z kolekcji AdminUser */}
        <div className="bg-gray-100 p-4 rounded shadow-md mt-8 w-3/4">
          <h2 className="text-xl font-bold mb-4">Użytkownicy Administratora:</h2>
          {adminUsers.length > 0 ? (
            <ul>
              {adminUsers.map((user, index) => (
                <li key={index} className="mb-2">
                  <strong>Email:</strong> {user.email} -{' '}
                  <strong>Hasło:</strong> {user.password}
                </li>
              ))}
            </ul>
          ) : (
            <p>{error ? `Błąd: ${error}` : 'Brak danych.'}</p>
          )}
        </div>
      </div>
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
