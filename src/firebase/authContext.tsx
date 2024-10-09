import React, { useContext, useState, useEffect, ReactNode } from 'react';
import { auth } from './firebase';  

interface AuthContextType {
  currentUser: any | null; 
}


const AuthContext = React.createContext<AuthContextType | undefined>(undefined);


export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}


interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [currentUser, setCurrentUser] = useState<any | null>(null); 


  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });

    return unsubscribe;  // Cleanup on component unmount
  }, []);

  // Provide the currentUser to children via context
  const value: AuthContextType = { currentUser };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
