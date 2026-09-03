
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import type { ReactNode } from "react";
type ProtectedRouteProps = {
    children: ReactNode
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
    const [loggedIn, setLoggedIn] = useState<boolean | null>(null);
    useEffect(() => {
        const checkSession = async () => {
            const { data } = await supabase.auth.getSession();
            setLoggedIn(data.session!==null)
        };
        checkSession();
    }, []);
    if (loggedIn === null) {
        return <p className="text-center text-white/55 py-10">Checking login...</p>;
    }
    if (!loggedIn) {
        return <Navigate to="/admin/login" replace />;
    }
    return children;
}
