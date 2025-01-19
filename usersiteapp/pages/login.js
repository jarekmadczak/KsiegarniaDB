import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import styled from 'styled-components';
import NavBar from '../components/Nav';
import { Footer, FooterText } from '../components/Layout';

// Updated FormContainer for better design
const FormContainer = styled.div`
  flex: 1;
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 30px;
  margin-top: 10vh;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  margin-left: auto;
  margin-right: auto;
`;

const InputField = styled.input`
  padding: 12px;
  margin: 10px 0;
  width: 100%;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
  box-sizing: border-box;
`;

const Button = styled.button`
  padding: 12px 20px;
  background-color: #007bff;
  color: white;
  font-size: 1.2rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: 100%;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

const TabSwitcher = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

const TabButton = styled.button`
  padding: 10px 20px;
  margin: 0 10px;
  font-size: 1rem;
  cursor: pointer;
  border: ${(props) => (props.active ? "2px solid #007bff" : "1px solid #ccc")};
  background-color: ${(props) => (props.active ? "#007bff" : "white")};
  color: ${(props) => (props.active ? "white" : "#000")};
  border-radius: 5px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${(props) => (props.active ? "#0056b3" : "#f0f0f0")};
  }
`;

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('asdasdas'); // Added address field
  const [error, setError] = useState('');
  const [isLoginMode, setIsLoginMode] = useState(true);
  const router = useRouter();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/auth', {
        action: 'login',
        email,
        password,
      });
      Cookies.set('token', response.data.token);
      router.push('/');
    } catch (err) {
      setError('Nieprawidłowy email lub hasło');
    }
  };

  const handleRegisterSubmit = async (e) => {
    setAddress("dasdasdasdasd")
    
    e.preventDefault();
    try {
 
      await axios.post('/api/auth', {
        action: 'register',
        firstName,
        lastName,
        email,
        password,
        address 
      });
      setIsLoginMode(true); 
    } catch (err) {
      setError('Rejestracja nie powiodła się. Spróbuj ponownie.');
    }
  };

  return (
    <div>
      <NavBar />
      <FormContainer>
        <TabSwitcher>
          <TabButton active={isLoginMode} onClick={() => setIsLoginMode(true)}>
            Logowanie
          </TabButton>
          <TabButton active={!isLoginMode} onClick={() => setIsLoginMode(false)}>
            Rejestracja
          </TabButton>
        </TabSwitcher>
        {isLoginMode ? (
          <form onSubmit={handleLoginSubmit}>
            <InputField
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <InputField
              type="password"
              placeholder="Hasło"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button type="submit">Zaloguj się</Button>
          </form>
        ) : (
          <form onSubmit={handleRegisterSubmit}>
            <InputField
              type="text"
              placeholder="Imię i Nazwisko"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
            <InputField
              type="text"
              placeholder="Adres"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          
            <InputField
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <InputField
              type="password"
              placeholder="Hasło"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button type="submit">Zarejestruj się</Button>
          </form>
        )}
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </FormContainer>
      <Footer>
        <FooterText>&copy; 2025 E-Biblioteka. All Rights Reserved.</FooterText>
      </Footer>
    </div>
  );
}
