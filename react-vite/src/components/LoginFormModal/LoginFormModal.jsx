import { useState } from "react";
import { thunkLogin } from "../../redux/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import "./LoginForm.css";

function LoginFormModal() {
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false)
    const { closeModal } = useModal();

    const handleSubmit = async (e) => {
        e.preventDefault();

        setErrors({});

        const serverResponse = await dispatch(
            thunkLogin({
                email,
                password,
            })
        );

        if (serverResponse) {
            setErrors(serverResponse);
        } else {
            closeModal();
        }
    };

    const handleDemoUserLogin = () => {
        setErrors({});
        return dispatch(thunkLogin('demo@aa.io', 'password'))
            .then(() => {
                closeModal();
            });
    }

    return (
        <>
            <h1>Log In</h1>
            <form className="login-signup-form" onSubmit={handleSubmit}>
                <label>
                    Email
                    <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </label>
                <div className="login-error__container">
                    {errors.email && <p className="errors">{errors.email}</p>}
                </div>
                <label>
                    Password
                    <span className="password-container">
                        <input
                            type={showPassword ? 'input' : 'password'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        {showPassword ?
                            <FaEye onClick={() => setShowPassword(false)} /> :
                            <FaEyeSlash onClick={() => setShowPassword(true)} />}
                    </span>
                </label>
                <div className="login-error__container">
                    {errors.password && <p className="errors">{errors.password}</p>}
                </div>
                <button type="submit">Log In</button>
                <a
                    id="demo-user-login"
                    onClick={handleDemoUserLogin}
                >
                    Log in as Demo User
                </a>
            </form>
        </>
    );
}

export default LoginFormModal;
