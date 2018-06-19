import React, { Component } from "react";
import { Link } from 'react-router-dom';
import albumData from './../data/albums';


class Library extends Component {
	constructor(props) {
		super(props);
		this.state = { albums: albumData };
	}
  render() {
    return (
			<section className="library">
				{ this.state.albums.map( ( album, index ) => 
					<div className="album-listing" key={index}>
						<Link to={`/album/${album.slug}`} key={index} >
							<img src={album.albumCover} alt={album.title} />
							<h2>{album.title}</h2>
							<h3>{album.artist}</h3>
							<div className="album-stats">{album.songs.length} songs</div>
						</Link>
					</div>
				)}
			</section>
		);
  }
}

export default Library;
