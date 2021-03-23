import React, {useState, useEffect} from "react";

export const AuthContext = React.createContext();

export function AuthProvider(Props) {
  const [auth, setAuth] = useState("");
  const [number, setNumber] = useState("");
  const [isst, setIsst] = useState();
  const [inst, setInst] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const num = localStorage.getItem("number");
    const ll = localStorage.getItem("state");
    const ins = localStorage.getItem("inst");
    const na = localStorage.getItem("name");

    if (token) {
      setAuth(token);
      setNumber(num);
      setIsst(ll);
      setInst(ins);
      setName(na);
    }
  }, []);

  return (
    <AuthContext.Provider value={{auth, setAuth, isst, number, inst, name}}>
      {Props.children}
    </AuthContext.Provider>
  );
}
