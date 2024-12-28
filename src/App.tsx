// import React from 'react';
// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import { Toaster } from 'react-hot-toast';
// import { Header } from './components/Header';
// import { Footer } from './components/Footer';
// import { HomePage } from './pages/HomePage';
// import { LoginPage } from './pages/LoginPage';
// import { SignupPage } from './pages/SignupPage';
// import { FindCandidatesPage } from './pages/FindCandidatesPage';
// import { DashboardPage } from './pages/DashboardPage';

// function App() {
//   return (
//     <BrowserRouter>
//       <div className="min-h-screen bg-slate-900 flex flex-col">
//         <Header />
//         <main className="flex-grow">
//           <Routes>
//             <Route path="/" element={<HomePage />} />
//             <Route path="/login" element={<LoginPage />} />
//             <Route path="/signup" element={<SignupPage />} />
//             <Route path="/find-candidates" element={<FindCandidatesPage />} />
//             <Route path="/dashboard" element={<DashboardPage />} />
//           </Routes>
//         </main>
//         <Footer />
//         <Toaster position="top-right" />
//       </div>
//     </BrowserRouter>
//   );
// }

// export default App;



import React, { useEffect, useState, createContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { HomePage } from "./pages/HomePage";
import { AuthProvider } from './AuthContext';
import { LoginPage } from "./pages/LoginPage";
import { SignupPage } from "./pages/SignupPage";
import { FindCandidatesPage } from "./pages/FindCandidatesPage";
import { DashboardPage } from "./pages/DashboardPage";

// Define the type for the context
interface GlobalContextType {
  user: any; // Replace `any` with the actual user type if available
  setUser: React.Dispatch<React.SetStateAction<any>>; // Replace `any` with the user type
}

// Create the context with proper typing
export const GlobalContext = createContext<GlobalContextType | null>(null);

// const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;


function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch user data or authentication status on app load
  useEffect(() => {
    const fetchUser = async () => {
      try {
        // console.log("Backend URL:", BACKEND_URL);
        const backendUrl = import.meta.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';
        const res = await fetch(`${backendUrl}/api/auth/me`, {
          credentials: "include", // To include cookies for authentication
        });
        if (res.ok) {
          const data = await res.json();
          setUser(data.user); // Assuming backend returns user data in "user"
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Failed to fetch user:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <GlobalContext.Provider value={{ user, setUser }}>
      <BrowserRouter>
      <AuthProvider>
        <div className="min-h-screen bg-slate-900 flex flex-col">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/find-candidates" element={<FindCandidatesPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
            </Routes>
          </main>
          <Footer />
          <Toaster position="top-right" />
        </div>
        </AuthProvider>
      </BrowserRouter>
    </GlobalContext.Provider>
  );
}

export default App;
