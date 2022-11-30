import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Error, Loader, SongCard } from '../components';
import { useGetSongsBySearchQuery } from '../redux/services/shazamCore';

const Search = () => {
  const { searchTerm } = useParams();
  const { isPlaying, activeSong } = useSelector((state) => state.player);
  const { data, isFetching, error } = useGetSongsBySearchQuery();

  const songs = data?.tracks?.hits.map((song) => song.track);

  if (isFetching) return <Loader title={`Searching ${searchTerm}...`} />;

  if (error) return <Error />;

  return (
    <div className='flex flex-col'>
      <h2 className='text-white text-left font-bold text-3xl mb-5'>
        Showing Result For <span className='font-black'>{searchTerm}</span>
      </h2>
      <div className='flex flex-wrap sm:justify-start justify-center gap-8'>
        {songs.map((song, i) => (
          <SongCard
            key={song.key}
            song={song}
            isPlaying={isPlaying}
            activeSong={activeSong}
            data={data}
            i={i}
          />
        ))}
      </div>
    </div>
  );
};

export default Search;
