import '../App.css';
import ProfilePic from './profilePic';
import { ProfileDetailsProps } from '../Types';


const ProfileDetails = ({ gitUserDetails, setGitUser }: ProfileDetailsProps) => {

    let formated_created = '';
    let formated_updated = '';
    if(gitUserDetails.created_at) {
        formated_created = new Date(gitUserDetails.created_at).toLocaleDateString("en-GB");
    }
    if(gitUserDetails.updated_at) {
        formated_updated = new Date(gitUserDetails.updated_at).toLocaleDateString("en-GB");
    }

    const CallbackHandler = () => {
        setGitUser(gitUserDetails.login);
    }

    return (
        <div className='flex flex-wrap'>
            {gitUserDetails.avatar_url.length > 0 &&
                <ProfilePic pictureURL={gitUserDetails.avatar_url} />
            }
            <div className='text-left m-2.5'>
                <h3 className='font-bold'>{gitUserDetails.name}</h3>
                <div><span className='font-semibold'>Login name: </span><button className='underline text-blue-600' onClick={CallbackHandler}>{gitUserDetails.login}</button></div>
                {formated_created !== '' && 
                    <div><span className='font-semibold'>Account created at: </span>{formated_created}</div>
                }
                {formated_updated !== '' &&
                    <div><span className='font-semibold'>Account updated at: </span>{formated_updated}</div>
                }
            </div>
        </div>
    );
}

export default ProfileDetails;