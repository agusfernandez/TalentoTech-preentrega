import {createContext, useState, useEffect, useContext} from 'react';
import {db} from '../firebase/config';
import { doc, getDoc} from 'firebase/firestore';
import { getAuth, onAuthStateChanged, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth';


export const AuthContext = createContext();


//custom hook
export const useAuth = () => {

    const context = useContext(AuthContext);
    if(!context) {
        throw new Error ("useAuth debe ser usado dentro del AuthProvider")
    } 
    return context;

}

//create provider for context
export const AuthProvider = ({children}) => {

    const [user, setUser] = useState(null);
    const [loading , setLoading] = useState(true);
    const auth = getAuth();

    //register
    const signup = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    }

    //login
    const login = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    }

    //sign out
     const logout = () => {
        signOut(auth);
     }

     useEffect (() => {
        //verify if user es logged or not
        const unsubscribe = onAuthStateChanged (auth , async (currentUser) =>{
            if(currentUser){    
                const userDocRef = doc(db, 'users', currentUser.uid);
                const userDocSnap = await getDoc(userDocRef) 
                if (userDocSnap.exists() && userDocSnap.data().rol === "admin") {
                    setUser({ ...currentUser, rol:"admin"});
                } else {
                    setUser({ ...currentUser, rol:"user"});
                }
            } else {
                setUser(null);
            }
            setLoading(false);
        });

        //stop observer
        return () => unsubscribe();

        

     }, [auth]);


     const value = {
        user,
        loading,
        signup,
        login, 
        logout
     }

     return (
        <>
            <AuthContext.Provider value={value}>
                {!loading && children}
            </AuthContext.Provider>
        
        </>
     )



}