// // import React from 'react';
// import { Brain } from 'lucide-react';
// import { Link } from 'react-router-dom';
// import { useAuth } from '../AuthContext';

// export function Header() {
//   const { user, logout } = useAuth();

//   return (
//     <header className="fixed top-0 w-full bg-gradient-to-r from-purple-700/90 to-blue-600/90 backdrop-blur-sm z-50">
//       <div className="container mx-auto px-6 py-4">
//         <div className="flex items-center justify-between">
//           {/* Logo and Brand Name */}
//           <div className="flex items-center space-x-2">
//             <Brain className="h-8 w-8 text-white animate-pulse" />
//             <span className="text-2xl font-bold text-white">AI Hiring Agent</span>
//           </div>

//           {/* Navigation Menu */}
//           <nav className="h-full flex items-center">
//             <ul className="flex items-center space-x-8">
//               <li className="flex items-center">
//                 <a
//                   href="#features"
//                   className="text-white hover:text-purple-200 transition-all duration-300 transform hover:scale-110"
//                 >
//                   Features
//                 </a>
//               </li>
//               <li className="flex items-center">
//                 <a
//                   href="#how-it-works"
//                   className="text-white hover:text-purple-200 transition-all duration-300 transform hover:scale-110"
//                 >
//                   How It Works
//                 </a>
//               </li>
//               {user ? (
//                 <>
//                   <li className="text-white font-medium">Welcome, {user.name}!</li>
//                   <li>
//                     <button
//                       onClick={logout}
//                       className="bg-white text-purple-700 px-4 py-2 rounded-lg hover:bg-purple-100 transition-all"
//                     >
//                       Logout
//                     </button>
//                   </li>
//                 </>
//               ) : (
//                 <li>
//                   <Link to="/login">
//                     <button className="bg-white text-purple-700 px-6 py-2 rounded-lg font-medium hover:bg-purple-100 transition-all">
//                       Login
//                     </button>
//                   </Link>
//                 </li>
//               )}
//             </ul>
//           </nav>
//         </div>
//       </div>
//     </header>
//   );
// }
  


import { Brain } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

export function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleScrollToSection = (sectionId: string) => {
    // Navigate to home page first, then scroll to the section
    navigate('/');
    setTimeout(() => {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100); // Delay to ensure navigation completes before scrolling
  };

  return (
    <header className="fixed top-0 w-full bg-gradient-to-r from-purple-700/90 to-blue-600/90 backdrop-blur-sm z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Brand Name */}
          <div className="flex items-center space-x-2">
            <Brain className="h-8 w-8 text-white animate-pulse" />
            <span className="text-2xl font-bold text-white">AI Hiring Agent</span>
          </div>

          {/* Navigation Menu */}
          <nav className="h-full flex items-center">
            <ul className="flex items-center space-x-8">
              <li className="flex items-center">
                <button
                  onClick={() => handleScrollToSection('features')}
                  className="text-white hover:text-purple-200 transition-all duration-300 transform hover:scale-110"
                >
                  Features
                </button>
              </li>
              <li className="flex items-center">
                <button
                  onClick={() => handleScrollToSection('how-it-works')}
                  className="text-white hover:text-purple-200 transition-all duration-300 transform hover:scale-110"
                >
                  How It Works
                </button>
              </li>
              {user ? (
                <>
                  <li className="text-white font-medium">Welcome, {user.name}!</li>
                  <li>
                    <button
                      onClick={logout}
                      className="bg-white text-purple-700 px-4 py-2 rounded-lg hover:bg-purple-100 transition-all"
                    >
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <li>
                  <Link to="/login">
                    <button className="bg-white text-purple-700 px-6 py-2 rounded-lg font-medium hover:bg-purple-100 transition-all">
                      Login
                    </button>
                  </Link>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
