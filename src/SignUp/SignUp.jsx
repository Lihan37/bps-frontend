import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AuthContext } from '../Providers/AuthProvider';

const SignUp = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        fatherName: '',
        motherName: '',
        maritalStatus: 'Single',
        nationalId: '',
        dateOfBirth: '',
        age: '',
        placeOfBirth: '',
        nationality: 'Bangladeshi',
        gender: 'Male',
        officePhone: '',
        mobile: '',
        residenceNumber: '',
        email: '',
        membership: '',
        membershipId: '',
        center: ''
    });
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const { createUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const validatePassword = (password) => {
        const minLength = 8;
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumber = /[0-9]/.test(password);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

        if (password.length < minLength) {
            return 'Password must be at least 8 characters long.';
        }
        if (!hasUpperCase) {
            return 'Password must contain at least one uppercase letter.';
        }
        if (!hasLowerCase) {
            return 'Password must contain at least one lowercase letter.';
        }
        if (!hasNumber) {
            return 'Password must contain at least one number.';
        }
        if (!hasSpecialChar) {
            return 'Password must contain at least one special character.';
        }

        return '';
    };

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const passwordValidationError = validatePassword(password);

        if (passwordValidationError) {
            setPasswordError(passwordValidationError);
            return;
        }

        try {
            await createUser(formData.email, password);
            Swal.fire({
                title: 'Success!',
                text: 'Account created successfully.',
                icon: 'success',
                confirmButtonText: 'OK'
            }).then(() => {
                navigate('/');
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
        <div className="max-w-4xl mt-10 mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-3xl font-semibold text-center mb-6">Sign Up</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Full Name *</label>
                        <input type="text" id="fullName" value={formData.fullName} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required />
                    </div>
                    <div>
                        <label htmlFor="fatherName" className="block text-sm font-medium text-gray-700">Father Name *</label>
                        <input type="text" id="fatherName" value={formData.fatherName} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required />
                    </div>
                    <div>
                        <label htmlFor="motherName" className="block text-sm font-medium text-gray-700">Mother Name *</label>
                        <input type="text" id="motherName" value={formData.motherName} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required />
                    </div>
                    <div>
                        <label htmlFor="maritalStatus" className="block text-sm font-medium text-gray-700">Marital Status *</label>
                        <select id="maritalStatus" value={formData.maritalStatus} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                            <option value="Single">Single</option>
                            <option value="Married">Married</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="nationalId" className="block text-sm font-medium text-gray-700">National Id No *</label>
                        <input type="text" id="nationalId" value={formData.nationalId} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required />
                    </div>
                    <div>
                        <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700">Date of Birth *</label>
                        <input type="date" id="dateOfBirth" value={formData.dateOfBirth} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required />
                    </div>
                    <div>
                        <label htmlFor="age" className="block text-sm font-medium text-gray-700">Age *</label>
                        <input type="number" id="age" value={formData.age} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required />
                    </div>
                    <div>
                        <label htmlFor="placeOfBirth" className="block text-sm font-medium text-gray-700">Place of Birth *</label>
                        <input type="text" id="placeOfBirth" value={formData.placeOfBirth} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required />
                    </div>
                    <div>
                        <label htmlFor="nationality" className="block text-sm font-medium text-gray-700">Nationality *</label>
                        <input type="text" id="nationality" value={formData.nationality} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required />
                    </div>
                    <div>
                        <label htmlFor="gender" className="block text-sm font-medium text-gray-700">Gender *</label>
                        <select id="gender" value={formData.gender} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                    </div>
                </div>

                <h3 className="text-xl font-semibold mt-6 mb-4">Contact</h3>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="officePhone" className="block text-sm font-medium text-gray-700">Office Phone *</label>
                        <input type="text" id="officePhone" value={formData.officePhone} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required />
                    </div>
                    <div>
                        <label htmlFor="mobile" className="block text-sm font-medium text-gray-700">Mobile *</label>
                        <input type="text" id="mobile" value={formData.mobile} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required />
                    </div>
                    <div>
                        <label htmlFor="residenceNumber" className="block text-sm font-medium text-gray-700">Residence Number *</label>
                        <input type="text" id="residenceNumber" value={formData.residenceNumber} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email *</label>
                        <input type="email" id="email" value={formData.email} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required />
                    </div>
                </div>

                <h3 className="text-xl font-semibold mt-6 mb-4">Membership Information</h3>

                <div className="grid grid-cols-3 gap-4">
                    <div>
                        <label htmlFor="membership" className="block text-sm font-medium text-gray-700">Membership Applying For *</label>
                        <select id="membership" value={formData.membership} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                            <option value="">Select Membership Applying For</option>
                            <option value="Member">Member</option>
                            <option value="Fellow">Fellow</option>
                            <option value="Associate">Associate</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="membershipId" className="block text-sm font-medium text-gray-700">Present IEB Membership Number (if any)</label>
                        <input type="text" id="membershipId" value={formData.membershipId} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                    </div>
                    <div>
                        <label htmlFor="center" className="block text-sm font-medium text-gray-700">Center *</label>
                        <select id="center" value={formData.center} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required>
                            <option value="">Select Center</option>
                            <option value="Dhaka">Dhaka</option>
                            <option value="Chittagong">Chittagong</option>
                            <option value="Khulna">Khulna</option>
                        </select>
                    </div>
                </div>

                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password *</label>
                    <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required />
                    {passwordError && (
                        <p className="mt-2 text-red-600 text-sm">{passwordError}</p>
                    )}
                </div>

                <div>
                    <button type="submit" className="w-full px-4 py-2 text-white font-semibold bg-[#006382] rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2">Submit</button>
                </div>
            </form>
        </div>
    );
};

export default SignUp;
