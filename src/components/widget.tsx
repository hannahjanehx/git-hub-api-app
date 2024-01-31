import { useState, useEffect, useReducer } from 'react';
import Input from './input';
import CollapsibleItem from './collapsibleItem';
import ProfileDetails from './profileDetails';

export type GitHubGetUser = {
  name: string;
  login: string;
  created_at: string;
  updated_at: string;
  avatar_url: string;
  followers: number;
  followers_url: string;
  following: number;
}

export type state = {
  gitUser: string;
  gitUserInfo: GitHubGetUser;
  followersUserInfo: GitHubGetUser[];
  followingUserInfo: GitHubGetUser[];
  userUpdated: boolean;
}

export type action = {
  type: string;
  gitUser?: string;
  gitUserInfo?: GitHubGetUser;
  followersUserInfo?: GitHubGetUser[];
  followingUserInfo?: GitHubGetUser[];
}

const reducer = (state: state, action: action): state => {

  const prevState: state = {
    gitUser: state.gitUser,
    gitUserInfo: state.gitUserInfo,
    followersUserInfo: state.followersUserInfo,
    followingUserInfo: state.followingUserInfo,
    userUpdated: state.userUpdated
  };

  switch(action.type) {
    case 'set_git_user' : {
      if(typeof action.gitUser !== 'undefined') {
        return {
          gitUser: action.gitUser,
          gitUserInfo: state.gitUserInfo,
          followersUserInfo: state.followersUserInfo,
          followingUserInfo: state.followingUserInfo,
          userUpdated: true
        }
      } else {
        return prevState;
      }
    }
    case 'set_git_user_info' : {
      if(typeof action.gitUserInfo !== 'undefined') {
        return {
          gitUser: state.gitUser,
          gitUserInfo: action.gitUserInfo,
          followersUserInfo: state.followersUserInfo,
          followingUserInfo: state.followingUserInfo,
          userUpdated: false
        }
      } else {
        return prevState;
      }
    }
    case 'set_followers_user_info' : {
      if(typeof action.followersUserInfo !== 'undefined') {
        return {
          gitUser: state.gitUser,
          gitUserInfo: state.gitUserInfo,
          followersUserInfo: action.followersUserInfo,
          followingUserInfo: state.followingUserInfo,
          userUpdated: false
        }
      } else {
        return prevState;
      }
    }
    case 'set_following_user_info' : {
      if(typeof action.followingUserInfo !== 'undefined') {
        return {
          gitUser: state.gitUser,
          gitUserInfo: state.gitUserInfo,
          followersUserInfo: state.followersUserInfo,
          followingUserInfo: action.followingUserInfo,
          userUpdated: false
        }
      } else {
        return prevState;
      }
    }
  }
  throw Error('Unknown action: ' + action.type);
}

function Widget() {

  const [state, dispatch] = useReducer<(state: state, actions: action) => state>(reducer, {
    gitUser: '',
    gitUserInfo: {
      name: '',
      login: '',
      created_at: '',
      updated_at: '',
      avatar_url: '',
      followers: 0,
      followers_url: '',
      following: 0,
    },
    followersUserInfo: [],
    followingUserInfo: [],
    userUpdated: false
  });

  // start - functions for calling the dispatch
  const setGitUser = (user: string) => {
    dispatch({
      type: 'set_git_user',
      gitUser: user
    });
  }

  const setGitUserInfo = (userInfo: GitHubGetUser) => {
    dispatch({
      type: 'set_git_user_info',
      gitUserInfo: userInfo
    });
  }

  const setFollowersUserInfo = (userInfo: GitHubGetUser[]) => {
    dispatch({
      type: 'set_followers_user_info',
      followersUserInfo: userInfo
    });
  }

  const setFollowingUserInfo = (userInfo: GitHubGetUser[]) => {
    dispatch({
      type: 'set_following_user_info',
      followingUserInfo: userInfo
    });
  }
  // end - functions for calling the dispatch

  // I originally did it all as useState, but decided to change to useReducer to demonstrate I know how to use the hook type
        // const [gitUser, setGitUser] = useState<string>('');
        // const [gitUserInfo, setGitUserInfo] = useState<GitHubGetUser>(
        //   {
        //     name: '',
        //     login: '',
        //     created_at: '',
        //     updated_at: '',
        //     avatar_url: '',
        //     followers: 0,
        //     followers_url: '',
        //     following: 0,
        //   });

        // const [followersUserInfo, setFollowersUserInfo] = useState<GitHubGetUser[]>([]);
        // const [followingUserInfo, setFollowingUserInfo] = useState<GitHubGetUser[]>([]);

    // this is for the Followers and Following drop down
    const [followersTitle, setFollowersTitle] = useState<string>('');
    const [followingTitle, setFollowingTitle] = useState<string>('');

    // this gets the account information of the searched user
    useEffect(() => {
      if(state.gitUser !== '') {
          fetch("https://api.github.com/users/"+state.gitUser)
          .then((result) => {
            return result.json();
          })
          .then((json) => {
            console.log(json);
            setGitUserInfo(json);
            setFollowersTitle('Followers (' + json.followers + ')');
            setFollowingTitle('Following (' + json.following + ')');
          })
      }
    }, [state.gitUser]);

    // get the followers of the searched user
    useEffect(() => {
      setFollowersUserInfo([]);
      if(state.gitUserInfo.followers_url !== '' && state.gitUserInfo.followers > 0) {
        fetch(state.gitUserInfo.followers_url)
          .then((result) => {
            return result.json();
          })
          .then((json) => {
            setFollowersUserInfo(json);
          })
      }
    }, [state.gitUserInfo]);  

    // get the following users of the searched user
    useEffect(() => {
      setFollowingUserInfo([]);
      if(state.gitUserInfo.following > 0) {
        const url = 'https://api.github.com/users/' + state.gitUserInfo.login + '/following';
        fetch(url)
          .then((result) => {
            return result.json();
          })
          .then((json) => {
            setFollowingUserInfo(json);
          })
      }
    }, [state.gitUserInfo]);  

  return (
    <div className="flex flex-row flex-wrap">
      <div className='w-full'>
          <Input labelText='Username: ' value={state.gitUser} submissionFunction={setGitUser} />
      </div>
      <div className="flex w-full flex-wrap">
        <div className='px-5'>
          {state.gitUserInfo.name.length > 0 &&
            <ProfileDetails name={state.gitUserInfo.name} login={state.gitUserInfo.login} created_at={state.gitUserInfo.created_at} updated_at={state.gitUserInfo.updated_at} pictureURL={state.gitUserInfo.avatar_url} setGitUser={setGitUser} />
          }
        </div>
        <div className='w-full px-5 lg:w-7/12'>
          {followersTitle !== '' && 
            <CollapsibleItem title={followersTitle} classNames='w-full px-5' users={state.followersUserInfo} setGitUser={setGitUser} newSearch={state.userUpdated} />
          }

          {followingTitle !== '' && 
            <CollapsibleItem title={followingTitle} classNames='w-full px-5' users={state.followingUserInfo} setGitUser={setGitUser} newSearch={state.userUpdated} />
          }
        </div>
      </div>
    </div>
  );
}

export default Widget;
