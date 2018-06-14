import React, { Component } from 'react';
import albumData from './../data/albums';
import PlayerBar from './PlayerBar';

class Album extends Component {
  constructor(props) {
    super(props);

    const album = albumData.find( album => {
      return album.slug === this.props.match.params.slug
    });

    this.state = {
      album: album,
      currentSong: album.songs[0],
      currentTime: 0,
      duration: album.songs[0].duration, 
      isPlaying: false,
      volume: 0.8,
    };

    this.audioElement = document.createElement('audio');
    this.audioElement.src = album.songs[0].audioSrc;
  }

  play() {
    this.audioElement.play();
    this.setState({ isPlaying: true });
  }
  pause() {
    this.audioElement.pause();
    this.setState({ isPlaying: false });
  }
  setSong(song) {
    this.audioElement.src = song.audioSrc;
    this.setState({ currentSong: song });
  }

  buildControl(song, index) {
    const isSameSong = this.state.currentSong === song;
    const isSameHover = this.state.isHovered === index+1;
    // If current song
    if (isSameSong) {
        // and playing
        if (this.state.isPlaying) {
          return ( <span className="icon ion-md-pause"></span> )
        }
        // and paused
        if (!this.state.isPlaying) {
            return ( <span className="icon ion-md-play"></span> )
        }
    }
    // If not current song
    else {
      // and hovered
      if (isSameHover) {
        return ( <span className="icon ion-md-play"></span> )
      }
      else {
        return index+1;
      }
    }
  }

  handleSongClick(song) {
    const isSameSong = this.state.currentSong === song;

    if( isSameSong && this.state.isPlaying ) {
      this.pause();
    } else {
      if (!isSameSong) { this.setSong(song); }
      this.play();
    }
  }
  handlePrevClick() {
    const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
    const newIndex = Math.max(0, currentIndex - 1);
    const newSong = this.state.album.songs[newIndex];
    this.setSong(newSong);
    this.play();
  }
  handleNextClick() {
    const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
    const newIndex = Math.min(this.state.album.songs.length-1, currentIndex + 1);
    const newSong = this.state.album.songs[newIndex];
    this.setSong(newSong);
    this.play();
  }
  handleTimeChange(e) {
    const newTime = this.audioElement.duration * e.target.value;
    this.audioElement.currentTime = newTime;
    this.setState({ currentTime: newTime });
  }
  handleVolumeChange(e) {
    const newVolume = e.target.value;
    this.setState({ volume: newVolume });
    this.audioElement.volume = newVolume;
  }
  handleVolumeIncrease() {
    const newVolume = Math.min(this.state.volume + 0.1, 1);
    this.audioElement.volume = newVolume;
    this.setState({ volume: newVolume })
  }
  handleVolumeDecrease() {
    const newVolume = Math.max(this.state.volume - 0.1, 0);
    this.audioElement.volume = newVolume;
    this.setState({ volume: newVolume })
  }

  componentDidMount() {
    this.eventListeners = {
      timeupdate: (e) => { this.setState({ currentTime: this.audioElement.currentTime }) },
      durationchange: (e) => {this.setState({ duration: this.audioElement.duration }) },
    }
    this.audioElement.addEventListener('timeupdate', this.eventListeners.timeupdate);
    this.audioElement.addEventListener('durationchange', this.eventListeners.durationchange);
  }
  componentWillUnmount() {
    this.audioElement.src = null;
    this.audioElement.removeEventListener('timeupdate', this.eventListeners.timeupdate);
    this.audioElement.removeEventListener('durationchange', this.eventListeners.durationchange);
  }

  formatTime(seconds) {
    if(seconds >= 0) {
      let M = Math.floor(seconds/60);
      let SS = Math.round(seconds%60);
      if (SS < 10) { SS = '0'+SS };
      return `${M}:${SS}`
    }
    else {
      return '-:--';
    }
  }

  render() {
    return (
      <section className="album">
        <section id="album-info">
          <img id="album-cover-art" src={this.state.album.albumCover} alt={this.state.album.title}/>
            <div className="album-details">
              <h1 id="album-title">{this.state.album.title}</h1>
              <h2 className="artist">{this.state.album.artist}</h2>
              <div id="release-info">{this.state.album.releaseInfo}</div>
            </div>
          </section>
          <table id="song-list">
            <colgroup>
              <col id="song-number-column" />
              <col id="song-title-column" />
              <col id="song-duration-column" />
            </colgroup>  
           <tbody>{this.state.album.songs.map( (song, index) => 
              <tr className="song" key={index} 
                onClick={() => this.handleSongClick(song)} 
                onMouseEnter={() => this.setState({isHovered: index+1})}
                onMouseLeave={() => this.setState({isHovered: 0})}>
                <td>{this.buildControl(song,index)}</td> 
                <td>{song.title}</td>
                <td>{this.formatTime(song.duration)}</td>
              </tr>
            )}
           </tbody>
         </table>
         <PlayerBar
            isPlaying={this.state.isPlaying}
            currentSong={this.state.currentSong}
            handleSongClick={() => this.handleSongClick(this.state.currentSong)}
            handlePrevClick={() => this.handlePrevClick()}
            handleNextClick={() => this.handleNextClick()}
            handleTimeChange={(e) => this.handleTimeChange(e)}
            handleVolumeChange={(e) => this.handleVolumeChange(e)}
            handleVolumeIncrease={() => this.handleVolumeIncrease()}
            handleVolumeDecrease={() => this.handleVolumeDecrease()}
            formatTime={(e) => this.formatTime(e)}
            currentTime={this.state.currentTime}
            duration={this.state.duration}
            volume={this.state.volume}
          />
      </section>
    );
  }
}
 
export default Album;