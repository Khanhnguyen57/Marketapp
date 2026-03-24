import { useState } from "react";
import { useNavigate } from "react-router-dom";

function checkAvailable(email, password) {
  if (!email || !password) {
    
    return "Vui lòng nhập đầy đủ Email và Password!";
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return "Email không đúng định dạng!";
  }

  if (password.length < 6) {
    return "Mật khẩu phải chứa ít nhất 6 ký tự!";
  }

  return null;
}

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [errorMsg, setErrorMsg] = useState(""); 
  
  const navigate = useNavigate();

  const handleRegister = () => {
  
    const validationError = checkAvailable(email, password);

    if (validationError) {
      setErrorMsg(validationError); 
      return;
    }

   
    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];

  
    const isEmailExist = existingUsers.some((user) => user.email === email);
    if (isEmailExist) {
      setErrorMsg("Email này đã được đăng ký, vui lòng dùng email khác!");
      return;
    }

    const newUser = { name, email, password, phone };
    existingUsers.push(newUser);

    localStorage.setItem("users", JSON.stringify(existingUsers));
    


    setErrorMsg(""); 
    alert("Đăng ký thành công!");
    navigate("/login"); 
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="flex flex-col bg-white p-8 rounded-2xl shadow-xl w-full max-w-md space-y-5">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
          Sign Up
        </h2>

        {errorMsg && (
          <div className="bg-red-100 text-red-600 px-4 py-2 rounded-lg text-sm text-center">
            {errorMsg}
          </div>
        )}


        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-3 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition duration-200"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-3 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition duration-200"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-3 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition duration-200"
        />
        <input
          type="tel"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full px-4 py-3 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition duration-200"
        />

        <button
          onClick={handleRegister}
          className="w-full text-white bg-gray-900 py-3 rounded-lg font-semibold text-lg hover:bg-gray-800 active:scale-[0.98] transition-all duration-200 mt-4"
        >
          Sign Up
        </button>

        <p
          className="text-gray-500 flex items-center justify-center py-3 hover:text-blue-800 cursor-pointer"
          onClick={() => navigate("/login")}
        >
          Already have an account? Login
        </p>
      </div>
    </div>
  );
}

export default Register;