import { useState, useEffect, useReducer } from 'react';
import Input from './input';
import CollapsibleItem from './collapsibleItem';
import ProfileDetails from './profileDetails';
import { GitHubUser, state, action } from '../Types';

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

  const setGitUserInfo = (userInfo: GitHubUser) => {
    dispatch({
      type: 'set_git_user_info',
      gitUserInfo: userInfo
    });
  }

  const setFollowersUserInfo = (userInfo: GitHubUser[]) => {
    dispatch({
      type: 'set_followers_user_info',
      followersUserInfo: userInfo
    });
  }

  const setFollowingUserInfo = (userInfo: GitHubUser[]) => {
    dispatch({
      type: 'set_following_user_info',
      followingUserInfo: userInfo
    });
  }
  // end - functions for calling the dispatch

  // this is for the Followers and Following drop down
  const [followersTitle, setFollowersTitle] = useState<string>('');
  const [followingTitle, setFollowingTitle] = useState<string>('');
  const [validUser, setValidUser] = useState<boolean>(false);

  // this gets the account information of the searched user
  useEffect(() => {
    if(state.gitUser !== '') {
        fetch("https://api.github.com/users/"+state.gitUser)
        .then((result) => {
          if(!result.ok) {
            return Promise.reject(result);
          }
          return result.json();
        })
        .then((json) => {
          setGitUserInfo(json);
          setValidUser(true);
          setFollowersTitle('Followers (' + json.followers + ')');
          setFollowingTitle('Following (' + json.following + ')');
        })
        .catch((error) => {
          setValidUser(false);
          console.log(error);
        })
    }
  }, [state.gitUser]);

  // get the followers of the searched user
  useEffect(() => {
    setFollowersUserInfo([]);
    if(state.gitUserInfo.followers_url !== '' && state.gitUserInfo.followers !== undefined && state.gitUserInfo.followers > 0) {
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
    if (state.gitUserInfo.following !== undefined && state.gitUserInfo.following > 0) {
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
      { validUser ? 
        <div className="flex w-full flex-wrap">
          <div className='px-5'>
            {state.gitUserInfo.name !== undefined && state.gitUserInfo.name.length > 0 &&
              <ProfileDetails gitUserDetails={state.gitUserInfo} setGitUser={setGitUser} />
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
        :  state.gitUser !== '' &&
        <div className='px-5'>
          Please enter a valid Github username.
        </div>
      }
    </div>
  );
}

export default Widget;
