import '../App.css';
import { picProps } from '../Types';



function ProfilePic({pictureURL}: picProps) {

    return (
        <img 
            className="w-32 rounded-lg shadow-lg m-2.5"
            src={pictureURL}
            alt='public/images/blank_profile.webp'
      />
    );
}

export default ProfilePic;