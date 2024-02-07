import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Login } from './components/Login/Login';
import { Signup } from './components/SignUp/Signup';
import { Home } from './components/Home/Home';
import { QueryClient, QueryClientProvider } from 'react-query';

function App() {
  const queryClient: QueryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route index element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path='home' element={<Home />} />

        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
