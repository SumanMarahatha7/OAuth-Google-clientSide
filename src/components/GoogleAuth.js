import React,{useEffect,useState} from 'react';

export default function GoogleAuth(){

    const [user,setUser] = useState({
        image: '',
        name: '',
    });
    const [authState,setAuthState] = useState(null);
    const [signedIn,setSignedIn] = useState(false);

    const gapi = window.gapi

    async function initOAuth(){
        await gapi.load('auth2', async() => {
            try{
                await gapi.auth2.init({
                clientId: process.env.REACT_APP_CLIENT_ID,
                scope: 'email'
            })
            let auth = gapi.auth2.getAuthInstance();
            setAuthState(auth);
        }
        catch(err){
            console.log(err)
        }
        })
    }

    useEffect(() => {
        initOAuth()
    },[])

    const login = async() => {
        await authState.signIn();
        await setSignedIn(authState.isSignedIn.get());
        await fetchUserProfile();
    }

    const fetchUserProfile = async() =>{
        const userData = await authState.currentUser.get()
        const userProfile = await userData.getBasicProfile();
        let [name,image] = await [userProfile.getName(),userProfile.getImageUrl()];
        await setUser({...user, image,name})
    }

    const logout = async() => {
        await authState.signOut();
        await setSignedIn(authState.isSignedIn.get())
        await setUser({})
        alert('Successfully logged out')
    }


    if(signedIn === true){
        var information = <div>
            <center>
            <img src={user.image} height="100px" width="100px" style={{borderRadius:'50%'}} />
            <h4 style={{marginTop:"20px"}}>{user.name}</h4>
            <button style={{marginTop:"40px"}} onClick={logout}>Logout</button>
            </center>
        </div>
    }
    else{
        information = <button onClick={login}>Login with Google</button>
    }

    return(
        <div>
            {information}
        </div>
        )
}
