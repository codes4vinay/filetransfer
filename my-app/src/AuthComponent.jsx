// AuthComponent.js
import React, { useState, useEffect } from 'react';
import { auth } from './firebaseConfig.jsx';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    sendPasswordResetEmail,
    sendEmailVerification,
    onAuthStateChanged
} from 'firebase/auth';

const AuthComponent = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState(null);

    // Monitor authentication state
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return unsubscribe;
    }, []);

    const handleSignUp = async () => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            await sendEmailVerification(userCredential.user);
            alert('Verification Email sent. Please verify your account.');
        } catch (error) {
            alert(error.message);
        }
    };

    const handleSignIn = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (error) {
            alert(error.message);
        }
    };

    const handleSignOut = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            alert(error.message);
        }
    };

    const handleResetPassword = async () => {
        try {
            await sendPasswordResetEmail(auth, email);
            alert('Password reset email sent!');
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <div>
            {user ? (
                <div id="user_container">
                    <div style={{ display: 'flex', justifyContent: 'center', paddingRight: '20px', backgroundColor: "wheat" }}>
                        <div id="user_container" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <h1 style={{ fontSize: '1rem', fontWeight: 'bold', margin: 0 }}>{user.email}</h1>
                            <button onClick={handleSignOut} style={{ padding: '5px 10px', cursor: 'pointer', backgroundColor: "#646cff", color: "white" }}>Logout</button>

                        </div>
                    </div>


                </div>
            ) : (
                <div id="auth_container">


                </div>
            )}
        </div>
    );
};

export default AuthComponent;
