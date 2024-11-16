import { useState, useEffect, useRef } from 'react';
import './App.css';
import { uploadFile } from './services/api.js';
import Navbar from './Navbar';
import Footer from './Footer.jsx';
import AuthComponent from './AuthComponent.jsx';

function App() {
  const [file, setFile] = useState("");
  const [result, setResult] = useState('');

  const fileInputRef = useRef();
  const logo = 'https://i.pinimg.com/originals/16/46/24/1646243661201a0892cc4b1a64fcbacf.jpg';

  const onUploadClick = () => {
    fileInputRef.current.click();
  };

  useEffect(() => {
    const getImage = async () => {
      if (file) {
        const data = new FormData();
        data.append("name", file.name);
        data.append("file", file);

        let response = await uploadFile(data);
        setResult(response.path);
      }
    };
    getImage();
  }, [file]);

  const copyToClipboard = () => {
    if (result) {
      navigator.clipboard.writeText(result)
        .then(() => {
          alert('Link copied to clipboard!'); // Optional: feedback to the user
        })
        .catch(err => {
          console.error('Failed to copy: ', err);
        });
    }
  };

  return (
    <>
      <Navbar />
      <AuthComponent />
      <div className='container'>
        <img src={logo} alt='banner'></img>
        <div className='wrapper'>
          <h1>Filespire</h1>
          <p>Upload and share the download link</p>
          <br></br>
          <button onClick={onUploadClick}>Upload</button>

          <input type='file' ref={fileInputRef} style={{ display: 'none' }} onChange={(e) => setFile(e.target.files[0])}></input>
          <br></br>

          {result && (
            <>
              <a href={result} target="_blank" rel="noopener noreferrer">{result}</a>
              <button onClick={copyToClipboard}>Copy Link</button>

            </>


          )}
          <br></br>
          <button><a href='http://localhost:5000'>Send File via Email</a></button>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default App;
