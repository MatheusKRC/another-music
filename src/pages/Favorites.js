import React from 'react';
import Header from '../Components/Header';
import MusicCard from '../Components/MusicCard';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class Favorites extends React.Component {
  state = {
    collection: [],
    loading: false,
    remove: '',
  }

  componentDidMount = () => {
    this.getFavorites();
  }

  handleFavorite = ({ target: { value } }) => {
    this.setState({
      loading: true,
      remove: value,
    });
  }

  getFavorites = async () => {
    const favorits = await getFavoriteSongs();
    this.setState({
      collection: favorits,
    });
  }

 removeSong = (music) => {
   removeSong(music);
   this.setState({
     loading: false,
   });
 }

 componentDidUpdate = (_prevProps, prevState) => {
   const { collection, remove } = this.state;
   if (remove !== prevState.remove) {
     const music = collection.find((song) => song.trackName === remove);
     this.removeSong(music);
     this.getFavorites();
   }
 }

 render() {
   const { collection, loading } = this.state;
   return (
     <div data-testid="page-favorites">
       <Header />
       {loading ? (<Loading />) : (
         collection.map((music, index) => (

           <MusicCard
             key={ index }
             music={ music }
           />

         ))
       )}
     </div>
   );
 }
}

export default Favorites;
