import { useEffect, useState } from 'react';
import '../App.css';
import ProfileDetails from './profileDetails';
import { GitHubGetUser } from './widget';

type CollapsibleItemProps = {
    title: string;
    classNames?: string;
    users: GitHubGetUser[];
    setGitUser: (value: string) => void;
    newSearch: boolean;
  }

function CollapsibleItem({ title, classNames, users, setGitUser, newSearch }: CollapsibleItemProps) {

    const [open, setOpen] = useState<boolean>(newSearch);

    useEffect(() => {
        setOpen(newSearch)
    }, [newSearch]);

    const toggle = () => {
        setOpen(!open);
    }

    return (
        <div className={classNames}>
            <div className='flex flex-grow'>
                <button className="p-3 border flex flex-grow" onClick={toggle}>
                    <h6 className="font-bold">{title}</h6>
                    <div className="font-bold">{!open ? '+' : '-'}</div>
                </button>
            </div>
            <div className="border">
                {open && 
                    <div className="p-3">
                        {users.map((user, key) => {
                            return (
                                <ProfileDetails key={key} name={user.name} login={user.login} created_at={user.created_at} updated_at={user.updated_at} pictureURL={user.avatar_url} setGitUser={setGitUser} />
                            )
                        })

                        }
                    </div>
                }
            </div>
        </div>
    );
}

export default CollapsibleItem;
