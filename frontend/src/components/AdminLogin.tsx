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
            navigate("/admin");
        }, 1000);

    }
    return (
        <div className="flex justify-center">
            <form className="w-full max-w-sm bg-navy-mid/50 rounded-2xl px-8 py-10" onSubmit={handleSubmit}>
                <h3 className="font-display text-gold font-bold text-2xl md:text-3xl text-center">Admin Login</h3>
                <hr className="border-gold mt-4 mb-6 w-full" />

                <div className="flex flex-col gap-1 mb-4">
                    <label className="text-white/55 text-sm md:text-base">Email</label>
                    <input className="border rounded border-gold/75 bg-navy/75 text-white px-3 py-2 focus:outline-none focus:border-gold" required type="email" name="email" value={email} onChange={(event) => setEmail(event.target.value)}></input>
                </div>

                <div className="flex flex-col gap-1 mb-6">
                    <label className="text-white/55 text-sm md:text-base">Password</label>
                    <input className="border rounded border-gold/75 bg-navy/75 text-white px-3 py-2 focus:outline-none focus:border-gold" required type="password" value={password} name="password" onChange={(event) => setPassword(event.target.value)}></input>
                </div>

                <button className="w-full bg-gold/75 rounded-xl px-6 py-2 font-display hover:scale-105 transition-all" type="submit">Log In</button>
                {status && <p className="text-center text-white/70 mt-4">{status}</p>}
            </form>
        </div>
    )

}