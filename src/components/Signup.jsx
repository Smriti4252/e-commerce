import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { AuthContext } from '../contexts/AuthProvider';

const title = "Register";
const socialTitle = "Login with Social Media";
const btnText = "Signup Now";

const Signup = () => {
    const [errorMessage, setErrorMessage] = useState("");
    const { signUpWithGmail, createUser } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || "/"; // Define `from` variable

    const handleRegister = (e) => {
        e.preventDefault(); // Prevent the default behavior of the anchor tag
        signUpWithGmail()
            .then((result) => {
                const user = result.user;
                navigate(from, { replace: true });
            })
            .catch((error) => {
                console.error("Google authentication error:", error); // Log the error
                setErrorMessage("Failed to login with Google. Please try again.");
            });
    };

    const handleSignup = (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        const confirmPassword = form.confirmPassword.value;

        if (password !== confirmPassword) {
            setErrorMessage("Password doesn't match! Please provide a correct password.");
        } else {
            setErrorMessage("");
            createUser(email, password) 
                .then((userCredentials) => {
                    const user = userCredentials.user;
                    navigate(from, { replace: true });
                })
                .catch((error) => {
                    console.log(error.message);
                    alert(`${error.message}`);
                });
        }
    };

    return (
        <div>
            <div className='login-section padding-tb section-bg'>
                <div className="container">
                    <div className="account-wrapper">
                        <h3 className='title'>{title}</h3>
                        <form className='account-form' onSubmit={handleSignup}>
                            <div className='form-group'>
                                <input type="text" name='name' id='name' placeholder='Full Name *' required />
                            </div>
                            <div className='form-group'>
                                <input type="email" name='email' id='email' placeholder='Email Address *' required />
                            </div>
                            <div className='form-group'>
                                <input type="password" name='password' id='password' placeholder='Password *' required />
                            </div>
                            <div className='form-group'>
                                <input type="password" name='confirmPassword' id='confirmPassword' placeholder='Confirm Password *' required />
                            </div>
                            {/* showing message */}
                            <div>
                                {errorMessage && (
                                    <div className='error-message text-danger'>
                                        {errorMessage}
                                    </div>
                                )}
                            </div>

                            <div className='form-group'>
                                <button type='submit' className='d-block lab-btn'>
                                    <span>{btnText}</span>
                                </button>
                            </div>
                        </form>

                        {/* account bottom */}
                        <div className='account-bottom'>
                            <span className='d-block cate pt-10'>
                                Don't Have an Account? <Link to="/login">Login</Link>
                            </span>
                            <span className='or'>
                                <span>or</span>
                            </span>
                            {/* social login */}
                            <h5 className='subtitle'>{socialTitle}</h5>
                            <ul className='lab-ul social-icons d-flex justify-content-center'>
                                <li>
                                    <a href='/' className='github' onClick={handleRegister}><i className='icofont-github'></i></a>
                                </li>
                                <li>
                                    <a href='/' className='facebook'><i className='icofont-facebook'></i></a>
                                </li>
                                <li>
                                    <a href='/' className='instagram'><i className='icofont-instagram'></i></a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;