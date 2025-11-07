import { useAuth } from '../provider/AuthProvider';
import "./account.css"

const Account = () => {
    const {user} = useAuth();
    console.log(user);
    return (
        <>
            <div className='account-viewer'>

            </div>
        </>
    )
}

export default Account