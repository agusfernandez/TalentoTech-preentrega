import { useAuth } from '../../context/AuthContext';
import { Navigate } from 'react-router-dom';
import Spinner from '../Products/Spinner';

const RouteProtected = ({children, allowedUsers}) => {

    const {user, loading} = useAuth();

    if (loading) return <Spinner />;

    if (!user || (allowedUsers && !allowedUsers.includes(user.rol))) return <Navigate to="/login" />;

    return (
         <>
            {children}
        </>
    )
    
}

export default RouteProtected;