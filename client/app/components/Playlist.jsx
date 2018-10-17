import React, { Component } from 'react';
import SC from 'soundcloud';
import firebase from 'firebase/app';
import 'firebase/database';
import {DB_CONFIG} from '../../../server/config/config_fire.js';


export default class Playlist extends Component {
    constructor(props) {
        super(props);
        this.app = firebase.initializeApp(DB_CONFIG);
        this.database = this.app.database().ref().child('Playlist1')

        this.state = {
          playlist_songs: [],
          songList: [],
        };
    }

	componentWillMount(){
    let new_songs = this.state.playlist_songs

    SC.initialize({
          client_id: 'ebe2d1362a92fc057ac484fcfb265049'
        });

    // Firebase displays data as a snapshot
    this.database.on('child_added', snap => {
      // console.log(snap.key)
      new_songs.push({
        id: snap.key,
        song_name: snap.val().song_name,
      })

      this.setState({
        playlist_songs: new_songs
      })
      (console.log(new_songs))

  })
}

searchSong(){
    let searchResult = this.refs.songSearch.value;

    SC.get('/tracks/',{
			q: searchResult,
      limit: 50
		}).then((results) => {
        this.setState({
          songList: results
        })
        // console.log(this.state.songList)
    })
  }

  render() {
    const {songList, index, voteIndex, playlist_db, signedIn, searchIndex} = this.state;
    const searchedSongs = () => {
      if(songList && songList.length > 0){
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
