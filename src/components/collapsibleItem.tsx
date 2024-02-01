import { useEffect, useState } from 'react';
import '../App.css';
import ProfileDetails from './profileDetails';
import { CollapsibleItemProps } from '../Types';

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
                        {users.length > 0 ? 
                            users.map((user, key) => {
                                return (
                                    <ProfileDetails key={key} gitUserDetails={user} setGitUser={setGitUser} />
                                )
                            })
                        :
                            <div className='flex flex-wrap'>
                                There are no users to display.
                            </div>
                        }
                    </div>
                }
            </div>
        </div>
    );
}

export default CollapsibleItem;
