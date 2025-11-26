import React, {useContext} from "react";
import { AuthContext } from "../providers/authProvider";
import { useNavigate } from "react-router-dom";
import { Role } from "../@types";

export const Login = () => {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const userName = e.currentTarget['userName'].value;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const role = (e.currentTarget['role'] as any).value;
        if (userName) {
            login({ userName, role });
            navigate('/');
        }
    }
    return (
        <div className="login-screen">
            <p>Plase enter your login data</p>
            <form onSubmit={handleLogin} style={{ display:'flex', flexDirection: 'column', rowGap:'20px'}}>
                <div>
                    <label htmlFor="userName">User Name: </label>
                    <input type="text" name="userName" placeholder="Rawand" />
                </div>
                <div>
                    <label htmlFor="role">Select Role: </label>
                    <select name="role">
                        <option value={Role.ADMIN}>Admin</option>
                        <option value={Role.Teacher}>Teacher</option>
                        <option value={Role.GUEST}>Guest</option>
                    </select>
                </div>
                <div>
                    <input type="submit" value="Login" />
                </div>
            </form>
        </div>
    )
}