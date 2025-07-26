import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext({ user: null });

export function AuthProvider({ children }) {
  // اتركي user = null أو ضعي أي منطق لاحقاً
  const [user, setUser] = useState(null);
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
