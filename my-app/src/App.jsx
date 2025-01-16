import { useState, useEffect, useRef } from 'react';
import './App.css';
import { uploadFile } from './services/api.js';
import Navbar from './Navbar';
import Footer from './Footer.jsx';
import AuthComponent from './AuthComponent.jsx';

function App() {
  const [file, setFile] = useState("");
  const [result, setResult] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [showNotification, setShowNotification] = useState(true); // Show notification by default

  const fileInputRef = useRef();
  const logo = './filespp.jpeg';

  const onUploadClick = () => {
    fileInputRef.current.click();
  };

  // Close the notification
  const closeNotification = () => {
    setShowNotification(false);
  };

  useEffect(() => {
    const getImage = async () => {
      if (file) {
        setIsLoading(true);
        const data = new FormData();
        data.append("name", file.name);
        data.append("file", file);

        try {
          let response = await uploadFile(data);
          setResult(response.path);
        } catch (error) {
          console.error("Error uploading file:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };
    getImage();
  }, [file]);

  const copyToClipboard = () => {
    if (result) {
      navigator.clipboard.writeText(result)
        .then(() => {
          alert('Link copied to clipboard!');
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
      
      {/* Notification Banner */}
{showNotification && (
  <div className="notification">
    <p>New feature: Now users can send multiple files at a time!</p>
    <button className="close-btn" onClick={closeNotification}>✖</button>
  </div>
)}


      <div className='container'>
        <img src={logo} alt="Logo" />
        <div className='wrapper'>
          <h1 className="mail-btn">filetranfer</h1>
          <h3 className="mail-btn">Upload and share the download link</h3>
          <br />
          <button onClick={onUploadClick}>Upload</button>

          <input type='file' ref={fileInputRef} style={{ display: 'none' }} onChange={(e) => setFile(e.target.files[0])}></input>
          <br />

          {isLoading ? (
            <div className="loading">
              <span className="mail-btn" >Loading...</span>
              <div className="spinner"></div>
            </div>
          ) : result && (
            <>
              <a href={result} target="_blank" rel="noopener noreferrer">{result}</a>
              <button className="navbar-btn" onClick={copyToClipboard}>Copy Link</button>
              <br />
              <a href='./short'><button className="navbar-btn">Shorten Link</button></a>
            </>
          )}
          <br />
          <button className="recommended-btn">
  <span className="recommended-label">Recommended</span>
  <a className="mail-btn" href='https://app.filetranfer.tech/'>Send File via Email</a>
</button>

        </div>
      </div >
      <div className='xyz'>
        <header className="features-header">
          <h1>Why Choose filetranfer?</h1>
          <p>Secure, reliable, and easy-to-use file-sharing platform.</p>
        </header>

        <section className="features-grid">
          <div className="feature-item">
            <div className="icon">🔒</div>
            <h2>QR code for links</h2>
            <p>Easy sharing.</p>
          </div>
          <div className="feature-item">
            <div className="icon">🔗</div>
            <h2>Link Generation</h2>
            <p>Get a sharable link as soon as you upload a file.</p>
          </div>
          <div className="feature-item">
            <div className="icon">📧</div>
            <h2>Email based file sharing</h2>
            <p> Send file links directly to your email.</p>
          </div>
          <div className="feature-item">
            <div className="icon">🛡️</div>
            <h2>User Authentication</h2>
            <p>Securely log in with Firebase.</p>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}

export default App;
