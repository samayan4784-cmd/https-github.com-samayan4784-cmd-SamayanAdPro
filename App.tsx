import React, { useState } from 'react';
import WelcomeScreen from './components/WelcomeScreen';
import MainApp from './components/MainApp';
import { UserState } from './types';

const App: React.FC = () => {
  const [userState, setUserState] = useState<UserState>({
    name: '',
    isOnboarded: false,
  });

  const handleStart = (name: string) => {
    setUserState({
      name,
      isOnboarded: true,
    });
  };

  return (
    <>
      {!userState.isOnboarded ? (
        <WelcomeScreen onStart={handleStart} />
      ) : (
        <MainApp user={userState} />
      )}
    </>
  );
};

export default App;