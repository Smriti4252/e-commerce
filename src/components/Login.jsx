import React, { useContext, useState } from 'react'
import { AuthContext } from '../contexts/AuthProvider';
import { Link, useLocation, useNavigate } from 'react-router';
const title = "Login";
const socialTitle = "Login with Social Media"
const btnText = "Login Now"

const socialList = [
    {
        iconName: 'icofont-facebook',
        siteLink: '#',
        className: 'facebook',
    },
    {
        iconName: 'icofont-twitter',
        siteLink: '#',
        className: 'twitter',
    },

    {
        iconName: 'icofont-instagram',
        siteLink: '#',
        className: 'instagram',
    },

]

const Login = () => {
    const [errorMessage, setErrorMessage] = useState("")
    const { signUpWithGmail, login } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();

    const from = location.state?.from?.pathname || "/";

    const [loading, setLoading] = useState(false);

    const handleLogin = (e) => {
        e.preventDefault();
        setLoading(true);
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        login(email, password)
            .then((result) => {
                const user = result.user;
                alert("Login Successful");
                navigate(from, { replace: true });
            })
            .catch((error) => {
                // Handle error
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const handleRegister = (e) => {
        e.preventDefault(); // Prevent the default behavior of the anchor tag
        signUpWithGmail().then((result) => {
            const user = result.user;
            navigate(from, { replace: true });
        }).catch((error) => {
            const errorMessage = error.message;
            setErrorMessage("Failed to login with Google. Please try again.");
        });
    }

    return (
        <div>
            <div className='login-section padding-tb section-bg'>
                <div className="container">
                    <div className="account-wrapper">
                        <h3 className='title'>{title}</h3>
                        <form className='account-form' onSubmit={handleLogin}>
                            <div className='form-group'>
                                <input type="email" name='email' id='email' placeholder='Email Address *' required />
                            </div>
                            <div className='form-group'>
                                <input type="password" name='password' id='password' placeholder='Password *' required />
                            </div>
                            {/* showing message */}
                            <div>
                                {
                                    errorMessage && (
                                        <div className='error-message text-danger'>
                                            {errorMessage}
                                        </div>
                                    )
                                }
                            </div>
                            <div className='form-group'>
                                <div className='d-flex justify-content-between flex-wrap pt-sm-2'>
                                    <div className='checkgroup'>
                                        <input type="checkbox" name='remember' id='remember' />
                                        <label htmlFor="remember">Remember Me</label>
                                    </div>
                                    <Link to="/forgetpass">Forget Passoword?</Link>
                                </div>
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
                                Don't Have an Account? <Link to="/sign-up">Sign Up</Link>
                            </span>
                            <span className='or'>
                                <span>or</span>
                            </span>
                            {/* social login */}
                            <h5 className='subtitle' >{socialTitle}</h5>
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
    )
}

export default Login
