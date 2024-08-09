import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AuthContext } from '../Providers/AuthProvider';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const { signIn, logOut } = useContext(AuthContext);

    const handleLogin = async () => {
        try {
            await signIn(email, password);
            setIsLoggedIn(true);
            Swal.fire({
                title: 'Success!',
                text: 'Logged in successfully.',
                icon: 'success',
                confirmButtonText: 'OK'
            });
        } catch (error) {
            Swal.fire({
                title: 'Error!',
                text: error.message,
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    };

    const handleLogout = async () => {
        try {
            await logOut();
            setIsLoggedIn(false);
            Swal.fire({
                title: 'Logged out!',
                text: 'You have been logged out successfully.',
                icon: 'info',
                confirmButtonText: 'OK'
            });
        } catch (error) {
            Swal.fire({
                title: 'Error!',
                text: error.message,
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    };

    return (
        <div
            className="bg-[#006382] shadow-lg rounded-3xl p-6"
            style={{
                boxShadow: "0px 15px 25px rgba(101, 239, 231, 0.43)",
            }}
        >
            <h2 className="text-xl text-white ml-2 font-bold mb-4">
                {isLoggedIn ? 'Welcome Back!' : 'Login'}
            </h2>
            <form>
                {!isLoggedIn ? (
                    <>
                        <div className="mb-4">
                            <input
                                id="email"
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <input
                                id="password"
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                required
                            />
                        </div>
                        <div className="flex items-center mb-4 justify-between">
                            <button
                                className="bg-white text-[#006382] font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
                                type="button"
                                onClick={handleLogin}
                            >
                                Sign In
                            </button>
                        </div>
                    </>
                ) : (
                    <div className="flex items-center mb-4 justify-between">
                        <button
                            className="bg-white text-[#006382] font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
                            type="button"
                            onClick={handleLogout}
                        >
                            Sign Out
                        </button>
                    </div>
                )}
                {!isLoggedIn && (
                    <>
                        <div className="flex items-center mb-2 justify-between">
                            <Link
                                to="/signUp"
                                className="bg-white bg-opacity-80 text-[#006382] font-bold py-2 px-4 rounded-full inline-block text-center focus:outline-none focus:shadow-outline"
                            >
                                Apply for new membership
                            </Link>
                        </div>
                        <div className="flex items-center mb-2 justify-between">
                            <button
                                className="bg-white bg-opacity-80 text-[#006382] font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
                                type="button"
                            >
                                Renew Your Membership
                            </button>
                        </div>
                    </>
                )}
            </form>
        </div>
    );
};

export default Login;
