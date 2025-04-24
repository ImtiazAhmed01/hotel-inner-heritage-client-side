import { createContext, useEffect, useState } from "react";
import { auth } from "../../../firebase.init";
import {
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updateProfile
} from "firebase/auth";
import axios from "axios";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const googleProvider = new GoogleAuthProvider();

    // this is for jwt token to be accessed
    const getToken = () => {
        const token = localStorage.getItem("access-token");
        console.log("Token retrieved from localStorage:", token);  // Log the token
        if (!token) {
            console.error("No JWT token found in localStorage");
        }
        return token;
    };



    const createUser = async (email, password, userDetails) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const newUser = userCredential.user;

            await updateProfile(newUser, {
                displayName: userDetails.displayName,
                photoURL: userDetails.photoURL,
            });

            const updatedUser = {
                ...newUser,
                displayName: userDetails.displayName,
                photoURL: userDetails.photoURL,
            };

            setUser(updatedUser);
            localStorage.setItem("userProfile", JSON.stringify(updatedUser));
            await getToken(email); // ← Use JWT after registration
            return newUser;
        } catch (error) {
            console.error("Error creating user:", error.message);
            throw error;
        }
    };

    const updateUserProfile = async (updatedUser) => {
        try {
            if (auth.currentUser) {
                await updateProfile(auth.currentUser, {
                    displayName: updatedUser.displayName,
                    photoURL: updatedUser.photoURL,
                });

                const updatedProfile = {
                    ...auth.currentUser,
                    displayName: updatedUser.displayName,
                    photoURL: updatedUser.photoURL,
                };

                setUser(updatedProfile);
                localStorage.setItem("userProfile", JSON.stringify(updatedProfile));
            }
        } catch (error) {
            console.error("Error updating profile:", error.message);
            throw error;
        }
    };

    const signOutUser = async () => {
        try {
            await signOut(auth);
            setUser(null);
            localStorage.removeItem("userProfile");
            localStorage.removeItem("access-token");
        } catch (error) {
            console.error("Sign-out error:", error.message);
        }
    };

    const signInWithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const user = result.user;
            setUser(user);
            localStorage.setItem("userProfile", JSON.stringify(user));
            await getToken(user.email); // ← Use JWT after Google sign in
            return user;
        } catch (error) {
            console.error("Google Sign-In error:", error.message);
            throw error;
        }
    };

    const signInUser = async (email, password) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const loggedInUser = userCredential.user;
            await getToken(email); // ← Use JWT after login
            return loggedInUser;
        } catch (error) {
            console.error("Login error:", error.message);
            throw error;
        }
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
                localStorage.setItem("userProfile", JSON.stringify(currentUser));
            } else {
                setUser(null);
                localStorage.removeItem("userProfile");
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                user,
                createUser,
                signInUser,
                signOutUser,
                signInWithGoogle,
                updateUserProfile,
                getToken,
            }}
        >
            {!loading && children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
