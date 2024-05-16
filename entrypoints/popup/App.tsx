import reactLogo from '@/assets/react.svg';
import wxtLogo from '/wxt.svg';
import linkedinLogo from '/linkedin.svg';
import './App.css';

function App() {

  const handleClick = async () => {
    //@ts-ignore
    chrome.runtime.sendMessage({ authorize: true }).catch((error: any) => {
      alert("Error en el proceso: " + error);
    });
  }

  return (
    <>
      <div className="card">
        <div>
          <a href="https://www.linkedin.com/in/cuartas" target="_blank">
            <img src={linkedinLogo} className="logo" alt="WXT logo" />
          </a>
          <h1>Visit Page</h1>
        </div>
        <button onClick={handleClick}>
          Generate CV
        </button>
      </div>
    </>
  );
}

export default App;
