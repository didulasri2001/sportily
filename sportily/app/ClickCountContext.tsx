import { createContext, useState } from "react";

// Extending the context to include authentication states
export const ClickCountContext = createContext({
  clickCount: 0,
  setClickCount: (value: number) => {},
  yourName: "",
  setYourName: (value: string) => {},
  isAuthenticated: false,
  setIsAuthenticated: (value: boolean) => {},
  userEmail: "",
  setUserEmail: (value: string) => {},
  userPassword: "",
  setUserPassword: (value: string) => {},
});

const ClickCountProvider = ({ children }: { children: any }) => {
  const [clickCount, setClickCount] = useState(0);
  const [yourName, setYourName] = useState("");

  // Authentication state management
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");

  return (
    <ClickCountContext.Provider
      value={{
        clickCount,
        setClickCount,
        yourName,
        setYourName,
        isAuthenticated,
        setIsAuthenticated,
        userEmail,
        setUserEmail,
        userPassword,
        setUserPassword,
      }}
    >
      {children}
    </ClickCountContext.Provider>
  );
};

export default ClickCountProvider;
