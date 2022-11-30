import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Error, Loader, SongCard } from '../components';
import { useGetSongsByCountryQuery } from '../redux/services/shazamCore';

const CountryTracks = () => {
  const [country, setContry] = useState('');
  const [loading, setLoading] = useState(true);
  const { isPlaying, activeSong } = useSelector((state) => state.player);
  const { data, isFetching, error } = useGetSongsByCountryQuery(country);

  useEffect(() => {
    axios
      .get(
        'https://geo.ipify.org/api/v2/country?apiKey=at_4cnQhFpYGfsg1eG5rXZGcdFzxAVEY'
      )
      .then((res) => setContry(res?.data?.location?.country))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [country]);

  if (isFetching && loading) return <Loader title='Loading Songs Around You' />;

  if (error && country) return <Error />;

  return (
    <div className='flex flex-col'>
      <h2 className='text-white text-left font-bold text-3xl mb-5'>
        Around You
        <span className='font-black'> {country}</span>
      </h2>
      <div className='flex flex-wrap sm:justify-start justify-center gap-8'>
        {data?.map((song, i) => (
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

export default CountryTracks;
