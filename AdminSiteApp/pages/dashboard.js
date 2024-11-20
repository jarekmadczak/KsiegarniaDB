import { useState, useEffect } from 'react';
import Layout from "../components/Layout"

export default function Dashboard(){
    const [adminUsers, setAdminUsers] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAdminUsers = async () => {
          try {
            const response = await fetch('/api/getData');
            if (!response.ok) {
              throw new Error('Nie udało się pobrać użytkowników administratora');
            }
            const result = await response.json();
            setAdminUsers(result); 
          } catch (err) {
            setError(err.message); // Obsługa błędów
          }
        };
    
        fetchAdminUsers();
      }, []);

    return (
       <Layout>
     
        <h2 className="text-xl font-bold mb-4 ">Użytkownicy Administratora:</h2>
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
        </Layout>
   
      );
}