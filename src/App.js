import React, { useState, useEffect } from 'react'
import CssBaseline from '@material-ui/core/CssBaseline';
import { CircularProgress } from '@material-ui/core';
import ShellPage from 'pages/ShellPage';
import { API_URL } from 'config'

function App() {
  const [ loading, setLoading ] = useState(true);
  const checkServerWakeUpApi = async () => {
    const res = await fetch(`${API_URL}/wake-up`);
    if (res.ok) {
      setLoading(false);
    }
  };
  useEffect(()=> {
    checkServerWakeUpApi();
  }, []);

  return (
    <>
      <CssBaseline />
      {loading
            ? <CircularProgress />
            : 
            
            <ShellPage />
      }
    </>
  )
}

export default App;