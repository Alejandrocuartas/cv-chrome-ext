import { Blocks } from 'react-loader-spinner';
import { useState, useEffect } from 'react';
import linkedinLogo from '/linkedin.svg';
import './App.css';

function App() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');

  const handleClick = async () => {
    setLoading(true);
    //@ts-ignore
    chrome.runtime.sendMessage({ authorize: true, email }).catch((error: any) => {
      alert("Error on process: " + error);
    });
  }

  const setEmailHandler = (event: any) => {
    setEmail(event.target.value);
  }

  useEffect(() => {
    let isListening = true;

    function handleMessage(request: any, sender: any, sendResponse: any) {
      if (isListening && request.success) {
        setLoading(false);
        alert("CV generated successfully. Check your email in less than a minute!");
      }
    }

    //@ts-ignore
    chrome.runtime.onMessage.addListener(handleMessage);

    return () => {
      isListening = false;
    };
  }, []);

  return (
    <>
      <div className="card">
        <div>
          <a href="https://www.linkedin.com/in/cuartas" target="_blank">
            <img src={linkedinLogo} className="logo" alt="WXT logo" />
          </a>
        </div>
        <input type='email' placeholder='email' onChange={setEmailHandler}></input>
        {
          loading ? (
            <Blocks
              height="80"
              width="80"
              color="#000000"
              ariaLabel="blocks-loading"
              wrapperStyle={{}}
              wrapperClass="blocks-wrapper"
              visible={true}
            />
          ) : (
            <button onClick={handleClick}>
              Generate CV
            </button>
          )
        }
      </div >
    </>
  );
}

export default App;
