import '../App.css';
import ProfilePic from './profilePic';

type profileProps = {
    name: string;
    login: string;
    created_at?: string;
    updated_at?: string;
    pictureURL: string;
    setGitUser: (user: string) => void;
  }

const ProfileDetails = ({name, login, created_at, updated_at, pictureURL, setGitUser}: profileProps) => {

    let formated_created = '';
    let formated_updated = '';
    if(created_at) {
        formated_created = new Date(created_at).toLocaleDateString("en-GB");
    }
    if(updated_at) {
        formated_updated = new Date(updated_at).toLocaleDateString("en-GB");
    }

    const CallbackHandler = () => {
        setGitUser(login);
    }

    return (
        <div className='flex flex-wrap'>
            {pictureURL.length > 0 &&
                <ProfilePic pictureURL={pictureURL} />
            }
            <div className='text-left'>
                <h3 className='font-bold'>{name}</h3>
                <div><span className='font-semibold'>Login name: </span><button className='underline text-blue-600' onClick={CallbackHandler}>{login}</button></div>
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