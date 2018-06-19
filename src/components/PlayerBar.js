import React, { Component } from 'react';

class PlayerBar extends Component {
	render() {
		return (
			<section className="player-bar">
				<section id="buttons">
					<button id="previous" onClick={this.props.handlePrevClick}>
						<span className="ion-ios-skip-backward"></span>
					</button>
					<button id="play-pause" onClick={this.props.handleSongClick}>
						<span className={this.props.isPlaying ? 'ion-ios-pause' : 'ion-ios-play'}>
						</span>
					</button>
					<button id="next" onClick={this.props.handleNextClick}>
						<span className="ion-ios-skip-forward"></span>
					</button>
				</section>
				<section id="time-control">                                                                    
					<input 
						type="range" 
						className="seek-bar" 
						value={(this.props.currentTime / this.props.duration) || 0} 
						max="1" 
						min="0" 
						step="0.01" 
						onChange={this.props.handleTimeChange}
					/>
					<div className="current-time">{this.props.formatTime(this.props.currentTime)}</div> / 
					<div className="total-time">{this.props.formatTime(this.props.duration)}</div>
				</section>
				<section id="volume-control">
					<div className="ion-ios-volume-low" onClick={this.props.handleVolumeDecrease}></div>
					<input 
						type="range" 
						className="seek-bar" 
						max="1"
						min="0"
						step="0.01"
						value={this.props.volume}
						onChange={this.props.handleVolumeChange}
					/>
					<div className="ion-ios-volume-high" onClick={this.props.handleVolumeIncrease}></div>
				</section>
			</section>
		);
	}
}

export default PlayerBar;