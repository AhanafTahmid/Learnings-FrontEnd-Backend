//Exercise: GitHub User Search

import React from 'react'
import { data } from 'react-router-dom';
import { set } from 'zod/v4-mini';
interface GitHubUser {
    id: number;
    login: string;
    name: string;
    avatar_url: string;
    public_repos: number;
    followers: number;
    following: number;
}

const Chapter10 = () => {
    const [inputs, setInputs] = React.useState<string>('')
    const [loading, setLoading] = React.useState<boolean>(false);
    const [user, setUser] = React.useState<GitHubUser | null>(null);
    const [error, setError] = React.useState<string | null>(null);

    const handleclick = () => {
        //reset
        setLoading(true);
        setError(null);
        setUser(null);
        setLoading(true)
        fetch(`https://api.github.com/users/${inputs}`)
        .then((res) => {
            if (!res.ok) {
                setError('User not found');
                return Promise.reject('User not found');
            }
            return res.json();
        })
        .then((data) => {
            setUser(data);
            setError(null);
        })
        .catch((err) => {
            setError('User not found');
            setUser(null);
        })
        .finally(() => {
            setLoading(false)
        })
    }

  return (
    <div>
        <input type="text" name="" id="" value={inputs} placeholder='Type User ID'
        onChange={(e) => setInputs(e.target.value)}
        />
        <button onClick={handleclick}>Search</button>


        <div>
            {loading && <p>Loading...</p>}
            {error!==null && <p style={{color: 'red'}}>{error}</p>}
            {!loading && inputs && <p>Search results for: {inputs}</p>}
            {!loading && inputs && <h1> {inputs}</h1>}
            {!loading && <img src={user?.avatar_url} alt="User Avatar" />}
            {!loading && <> Followers: {user?.followers} </>}


        </div>


    </div>
  )
}

export default Chapter10