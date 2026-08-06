import { supabase } from "../supabaseClient";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function AdminLogin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const [status, setStatus] = useState("")
    const navigate = useNavigate();
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setStatus("Logging in...")
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) {
            setStatus(error.message)
            return;
        }
        setStatus("Login successful.")


        setTimeout(() => {
            navigate("/admin/newlisting");
        }, 1000);

    }
    return (
        <form className="grid col-2 text-xl md:text-2xl" onSubmit={handleSubmit} >
            <h3>Admin Login</h3>
            <hr className="py-1 border-gray-300"></hr>
            <h3>Email:</h3><input className="border rounded-xl my-4"required type="email" name="email" value={email} onChange={(event) => setEmail(event.target.value)}></input>
            <h3>Password:</h3><input className="border rounded-xl my-4" required type="password" value={password} name="password" onChange={(event) => setPassword(event.target.value)}></input>
            <button className="bg-blue-500 text-white rounded-xl py-2 px-4" type="submit">Log In</button>
            {status && <p>{status}</p>}

        </form>
    )

}