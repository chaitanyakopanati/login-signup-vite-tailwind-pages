import React, { useState, useEffect } from 'react';
import { BiUser } from 'react-icons/bi';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  useEffect(() => {
    const storedEmail = localStorage.getItem('formData');
    if (storedEmail) {
      const parsedData = JSON.parse(storedEmail);
      if (parsedData[0] && parsedData[0].email) {
        setEmail(parsedData[0].email);
      }
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Reset password request sent for:', email);
  };

  return (
    <div className="w-full flex justify-center items-center min-h-screen bg-[#d4d6ea]">
      <div className="border-slate-100 bg-white rounded-md p-8 shadow-lg backdrop-filter backdrop-blur-sm max-w-md w-full">
        <form onSubmit={handleSubmit}>
          <h2 className="text-4xl text-black font-bold text-start mb-6">Forgot Password</h2>
          <p className="text-center mb-4">Enter your email to reset your password</p>
          <div className="relative mb-4">
            <div className="flex items-center justify-between">
              <label htmlFor="email" className="required block text-sm mb-2">
                Email
              </label>
              <BiUser className="text-gray-400 mr-2" />
            </div>
            <div className="flex items-center">
              <input
                className="block w-full py-2.5 px-3 text-sm text-gray-700 bg-gray-100 rounded-md border border-gray-300 focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>
          <button
            className="w-full mb-4 text-white rounded-md bg-[#5138ee] hover:bg-blue-600 py-2.5 transition-colors duration-300"
            type="submit"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;























// import React, { useState, useEffect } from 'react';
// import { BiUser } from 'react-icons/bi';

// const ForgotPassword = () => {
//   const [email, setEmail] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState('');

//   useEffect(() => {
//     const storedEmail = localStorage.getItem('formData');
//     if (storedEmail) {
//       const parsedData = JSON.parse(storedEmail);
//       if (parsedData[0] && parsedData[0].email) {
//         setEmail(parsedData[0].email);
//       }
//     }
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setMessage('');

//     try {
//       // Replace the URL with your actual API endpoint
//       const response = await fetch('https://your-api-endpoint.com/reset-password', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ email }),
//       });

//       if (response.ok) {
//         const result = await response.json();
//         setMessage('Password reset link has been sent to your email.');
//       } else {
//         setMessage('Failed to send reset link. Please try again.');
//       }
//     } catch (error) {
//       setMessage('An error occurred. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="w-full flex justify-center items-center min-h-screen bg-[#d4d6ea]">
//       <div className="border-slate-100 bg-white rounded-md p-8 shadow-lg backdrop-filter backdrop-blur-sm max-w-md w-full">
//         <form onSubmit={handleSubmit}>
//           <h2 className="text-4xl text-black font-bold text-start mb-6">Forgot Password</h2>
//           <p className="text-center mb-4">Enter your email to reset your password</p>
//           <div className="relative mb-4">
//             <div className="flex items-center justify-between">
//               <label htmlFor="email" className="required block text-sm mb-2">
//                 Email
//               </label>
//               <BiUser className="text-gray-400 mr-2" />
//             </div>
//             <div className="flex items-center">
//               <input
//                 className="block w-full py-2.5 px-3 text-sm text-gray-700 bg-gray-100 rounded-md border border-gray-300 focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
//                 type="email"
//                 placeholder="Enter your email address"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//               />
//             </div>
//           </div>
//           <button
//             className="w-full mb-4 text-white rounded-md bg-[#5138ee] hover:bg-blue-600 py-2.5 transition-colors duration-300"
//             type="submit"
//             disabled={loading}
//           >
//             {loading ? 'Sending...' : 'Reset Password'}
//           </button>
//           {message && (
//             <p className="text-center text-sm mt-4 text-red-500">{message}</p>
//           )}
//         </form>
//       </div>
//     </div>
//   );
// };

// export default ForgotPassword;
