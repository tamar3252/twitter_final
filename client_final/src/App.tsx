import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Login } from './components/Login/Login';
import { Signup } from './components/SignUp/Signup';
import { Home } from './components/Home/Home';
import { QueryClient, QueryClientProvider } from 'react-query';
import { TweetComp } from './components/Tweet/Tweet';
import UserDetails from './components/UserDetails';
import { useUserDetailsQuery } from './components/Home/Functions';
import { User } from '../../Types/User';

function App() {
  const queryClient: QueryClient = new QueryClient();
  // const { data  } = useUserDetailsQuery();
  // const userDetails:User| undefined=data

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
      {/* <UserDetails user={userDetails!} isConnectedUser={true}></UserDetails> */}
        <Routes>
          <Route index element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path='home' element={<Home />} />
          <Route path='tweet/:tweet_id' element={<TweetComp/>} />

        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
