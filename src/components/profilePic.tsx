import '../App.css';

type picProps = {
    pictureURL: string;
  }

function ProfilePic({pictureURL}: picProps) {

    return (
        <img 
            className="w-32 rounded-lg shadow-lg m-2.5"
            src={pictureURL}
            alt="new"
      />
    );
}

export default ProfilePic;