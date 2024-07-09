import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkSignup } from "../../redux/session";
import '../LoginFormModal/LoginForm.css';
import "./SignupForm.css";

function SignupFormModal() {
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState({});
    const { closeModal } = useModal();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            return setErrors({
                confirmPassword:
                    "Confirm Password field must be the same as the Password field",
            });
        }

        const serverResponse = await dispatch(
            thunkSignup({
                email,
                username,
                password,
            })
        );

        if (serverResponse) {
            setErrors(serverResponse);
        } else {
            closeModal();
        }
    };

    return (
        <>
            <h1>Sign Up</h1>
            <div className="login-error__container">
                {errors.server && <p className='errors'>{errors.server}</p>}
            </div>
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
                    {errors.email && <p className='errors'>{errors.email}</p>}
                </div>

                <label>
                    Username
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </label>
                <div className="login-error__container">
                    {errors.username && <p className='errors'>{errors.username}</p>}
                </div>

                <label>
                    Password
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </label>
                <div className="login-error__container">
                    {errors.password && <p className='errors'>{errors.password}</p>}
                </div>

                <label>
                    Confirm Password
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </label>
                <div className="login-error__container">
                    {errors.confirmPassword && <p className='errors'>{errors.confirmPassword}</p>}
                </div>

                <button type="submit">Sign Up</button>
            </form>
        </>
    );
}

export default SignupFormModal;
