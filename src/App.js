import "./App.css";
import AdminPanel from "./components/AdminPanel/AdminPanel";
import Content from "./components/Content/Content";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import { Routes, Route } from "react-router-dom";
import ProgrammsSection from "./components/ProgrammsSection/ProgrammsSection";
import Articles from "./components/Articles/Articles";
import AuthForm from "./components/AuthForm/AuthForm";
import { useState } from "react";
import AuthPrivate from "./components/AuthPrivate/AuthPrivate";

function App({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    if(localStorage.getItem('isAuthorizated') === 'true') return true
    return false
  });

  return (
    <div className="App">
      <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
      <Routes>
        <Route path="/" element={<Content>{children}</Content>} />
        <Route path="/admin" element={
          <AuthPrivate isLoggedIn={isLoggedIn}>
            <AdminPanel isLoggedIn={isLoggedIn}/>
          </AuthPrivate>
        }/>
        <Route path="/programms" element={<ProgrammsSection isLoggedIn={isLoggedIn}/>} />
        <Route path="/programms/:id" element={<Articles isLoggedIn={isLoggedIn}/>} />
        <Route path="/authForm" element={<AuthForm isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
