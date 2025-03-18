import React, { useEffect, useState } from 'react';
import { createContext } from 'react';
import app from "../firebase/firebase.config";
import {
    createUserWithEmailAndPassword,
    getAuth,
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    sendPasswordResetEmail,
} from 'firebase/auth';

export const AuthContext = createContext();
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Create user with email and password
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
            .catch((error) => {
                console.error("Error creating user:", error.message);
                throw error;
            });
    };

    // Sign in with Google
    const signUpWithGmail = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider)
            .then((result) => {
                const user = result.user;
                console.log("Google User:", user.displayName, user.photoURL);
                return user;
            })
            .catch((error) => {
                console.error("Error signing in with Google:", error.message);
                throw error;
            });
    };

    // Login with email and password
    const login = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
            .catch((error) => {
                console.error("Error logging in:", error.message);
                throw error;
            });
    };

    // Logout
    const logOut = () => {
        return signOut(auth)
            .then(() => {
                setUser(null); // Reset user state
            })
            .catch((error) => {
                console.error("Error logging out:", error.message);
                throw error;
            });
    };

    // Reset password
    const resetPassword = (email) => {
        return sendPasswordResetEmail(auth, email)
            .then(() => {
                console.log("Password reset email sent.");
            })
            .catch((error) => {
                console.error("Error sending password reset email:", error.message);
                throw error;
            });
    };

    // Check if user is logged in
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);

            // Store user data in localStorage
            if (currentUser) {
                localStorage.setItem("user", JSON.stringify(currentUser));
            } else {
                localStorage.removeItem("user");
            }
        });

        return () => unsubscribe();
    }, []);

    // Initialize user state from localStorage on mount
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const authInfo = {
        user,
        loading,
        createUser,
        login,
        logOut,
        signUpWithGmail,
        resetPassword,
    };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;