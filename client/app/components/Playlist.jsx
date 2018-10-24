import React, { Component } from 'react';
import SC from 'soundcloud';
import firebase from 'firebase/app';
import 'firebase/database';
import {DB_CONFIG} from '../../../server/config/config_fire.js';


export default class Playlist extends Component {
    constructor(props) {
        super(props);
        this.app = firebase.initializeApp(DB_CONFIG);
        this.database = this.app.database().ref().child('New Playlist')

        this.state = {
          playlist_songs: [],
          songList: []
        };
    }

	componentWillMount(){
    let playlist_songs = this.state.playlist_songs

    SC.initialize({
          client_id: 'ebe2d1362a92fc057ac484fcfb265049'
        })

}

searchSong(){
    let searchResult = this.refs.songSearch.value;

    if (searchResult === '') {
      this.setState({
        songList: []
      })
    }

    SC.get('/tracks/',{
			q: searchResult,
      limit: 50
		}).then((results) => {
        this.setState({
          songList: results
        })
    })
  }

  addToPlaylist(id){
    let addingSong = this.state.songList.filter(item => item.id == id)[0];

    this.database.push().set({
      song: addingSong.title,
      song_id: addingSong.id,
      uri: addingSong.uri,
      artwork: addingSong.artwork_url,
      votes_count: 0,
    })

  }

  render() {
    const {songList, index, voteIndex, playlist_db, signedIn, searchIndex} = this.state;
    const searchedSongs = () => {
      if(songList.length > 0){
        return(
            <div className="container scroll-search text-center">
                    {
                    songList.map((item, index) => {
                        return (
                              <div key={index} className="row">
                                <div>
                                  <ui className="col s3"><img src={item.artwork_url}></img></ui>
                                  <p className="col s5">{item.title}</p>
                                  <button className="waves-effect waves-light btn blue-grey col s2" onClick={() => this.addToPlaylist(item.id)}><i className="material-icons text-center">playlist_add</i></button>
                                </div>
                              </div>
                               )
                    })
                  }
            </div>
        )
      }
    }

    return (
      <div>
        <input style={{
                width: '70%'
              }} type="text" onChange={this.searchSong.bind(this)} ref="songSearch" placeholder="Search by your favorite artist or song" id="search-bar"/>
              <div>
                {searchedSongs()}
              </div>
      </div>

    )
  }
}
