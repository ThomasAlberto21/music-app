import { useSelector } from 'react-redux';
import { Error, Loader, SongCard } from '../components';
import { useGetTopChartsQuery } from '../redux/services/shazamCore';

const TopCharts = () => {
  const { isPlaying, activeSong } = useSelector((state) => state.player);
  const { data, isFetching, error } = useGetTopChartsQuery();

  if (isFetching) return <Loader title='Loading Top Charts' />;

  if (error) return <Error />;

  return (
    <div className='flex flex-col'>
      <h2 className='text-white text-left font-bold text-3xl mb-5'>
        Discover Top Charts
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

export default TopCharts;
