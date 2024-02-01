export type ProfileDetailsProps = {
    gitUserDetails: GitHubUser;
    setGitUser: (user: string) => void;
}


export type GitHubUser = {
    name?: string;
    login: string;
    created_at?: string;
    updated_at?: string;
    avatar_url: string;
    followers?: number;
    followers_url: string;
    following?: number;
}

export type state = {
    gitUser: string;
    gitUserInfo: GitHubUser;
    followersUserInfo: GitHubUser[];
    followingUserInfo: GitHubUser[];
    userUpdated: boolean;
}
  
export type action = {
    type: string;
    gitUser?: string;
    gitUserInfo?: GitHubUser;
    followersUserInfo?: GitHubUser[];
    followingUserInfo?: GitHubUser[];
}

export type picProps = {
    pictureURL: string;
}

export type CollapsibleItemProps = {
    title: string;
    classNames?: string;
    users: GitHubUser[];
    setGitUser: (value: string) => void;
    newSearch: boolean;
}

export type inputProps = {
    labelText: string;
    value: string;
    submissionFunction: (input: string) => void;
}