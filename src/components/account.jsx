import { useAuth } from '../provider/AuthProvider';
import { AccountDetails } from './accountComponents';
import "./account.css"

const Account = () => {
    const {user} = useAuth();
    console.log(user);
    return (
        <>
            <div className='account-viewer'>
                <AccountDetails/>
            </div>
        </>
    )
}

export default Account