import { useAuth } from '../provider/AuthProvider';
import "./account.css"

export const Account = () => {
    const {user} = useAuth();
    console.log(user);
    return (
        <>
            <div className='account-viewer'>

            </div>
        </>
    )
}