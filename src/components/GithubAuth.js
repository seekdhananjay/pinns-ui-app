import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import FontAwesome from 'react-fontawesome'
import { API_URL } from 'config/index'
import { getIsLoggedIn, getLoggedInUserInfo } from 'utils';

 const GithubAuth = ({ socket, provider }) => {
  const [user, setUser] = useState({});
  const [disabled, setDisabled] = useState('');
  
  let popupReference = null;
  const afterAuthProviderLoginCallback = (user) => {
    setUser(user);
    popupReference.close()
    // store the user in localStorage
    localStorage.setItem('user', JSON.stringify(user));
    console.info("Github User Info: ", user);
  };

  useEffect(()=> {
    if(getIsLoggedIn() && getLoggedInUserInfo){
      const user = getLoggedInUserInfo();
      setUser(user);
    }
    socket.on(provider, afterAuthProviderLoginCallback);
  }, []);
  
  const checkPopup = () => {
    const check = setInterval(() => {
      if (!popupReference || popupReference.closed || popupReference.closed === undefined) {
        clearInterval(check);
        setDisabled('');
      }
    }, 1000)
  };

  const openPopup = () => {
    const width = 600, height = 600
    const left = (window.innerWidth / 2) - (width / 2)
    const top = (window.innerHeight / 2) - (height / 2)
    const url = `${API_URL}/${provider}?socketId=${socket.id}`

    return window.open(url, '',       
      `toolbar=no, location=no, directories=no, status=no, menubar=no, 
      scrollbars=no, resizable=no, copyhistory=no, width=${width}, 
      height=${height}, top=${top}, left=${left}`
    )
  };

  const startAuth = () => {
    if (!disabled) {
      popupReference = openPopup();
      checkPopup();
      setDisabled('disabled');
    }
  };

  const closeCard = () => {
    setUser({});
    localStorage.clear();
  };

  const { name, location, photo} = user;
  return (
    <div>
      {name ? 
        <>
          <hr />
          <h1>{'Logout'}</h1>
          <hr />
          <div className='card'> 
            <img src={photo} alt={name} />
            <FontAwesome
              name='times-circle'
              className='close'
              onClick={closeCard}
            />
            <h4>{`${name}`} @ {`${location}`}</h4>
          </div>
        </>            
        :
        <>
          <hr />
          <h1>{'Login'}</h1>
          <hr />
          <div className='button-wrapper fadein-fast'>
            <button 
              onClick={startAuth} 
              className={`${provider} ${disabled} button`}
            >
              <FontAwesome
                name={provider}
              />
            </button>
          </div>
        </>
      }
    </div>
  )
}

GithubAuth.propTypes = {
  provider: PropTypes.string.isRequired,
  socket: PropTypes.object.isRequired
}

export default GithubAuth;