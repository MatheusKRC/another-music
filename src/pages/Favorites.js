import React from 'react';
import Header from '../Components/Header';
import MusicCard from '../Components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class Favorites extends React.Component {
  state = {
    collection: [],
    loading: false,
  }

  componentDidMount = () => {
    this.getFavorites();
  }

  getFavorites = async () => {
    const favorits = await getFavoriteSongs();
    this.setState({
      collection: favorits,
    });
  }

 componentDidUpdate = () => {
   this.getFavorites();
 }

 render() {
   const { collection, loading } = this.state;
   return (
     <div data-testid="page-favorites">
       <Header />
       {loading ? <Loading /> : (
         <div className="musicCards">
           {collection.map((music, index) => (

             <div key={ index } className="musicCard">
               <MusicCard
                 key={ index }
                 music={ music }
                 favoriteMusics={
                   collection.find((song) => song.trackName === music.trackName)
                 }
               />
             </div>

           ))}
         </div>

       )}
     </div>
   );
 }
}

export default Favorites;
