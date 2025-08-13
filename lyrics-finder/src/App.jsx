import { useState } from 'react'
import Axios from "axios";
import './App.css'

function App() {
  const [artistName, setArtistName] = useState('');
  const [songName, setSongName] = useState('');
  const [lyrics, setLyrics] = useState('');
  const [error, setError] = useState('');

  let searchLyrics = async () => {
    if (artistName === "" || songName === "") {
      setError("Please enter both artist and song name.");
      return;
    }
    setError('');
    setLyrics('Loading...');
    try {
      // Example using lyrics.ovh API with CORS proxy
      const response = await Axios.get(
        `/v1/${artistName}/${songName}`,
      );
      setLyrics(response.data.lyrics || "No lyrics found.");
    } catch (err) {
      setLyrics('');
      setError('Failed to fetch lyrics. CORS or network error.');
    }
  }

  return (
    <>
      <div className='lyrics-app'>
        <h1>Lyrics Finder</h1>
        <input className='artist' type='text' placeholder='Artist Name' onChange={(e) => { setArtistName(e.target.value) }} />
        <input className='song' type='text' placeholder='Song Name' onChange={(e) => { setSongName(e.target.value) }} />
        <button className="btn" onClick={() => searchLyrics()}>Search</button>
        <hr />
        {error && <div style={{color: 'red'}}>{error}</div>}
        <pre>{lyrics}</pre>
      </div>
    </>
  )
}

export default App;
