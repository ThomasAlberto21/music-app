import SongBar from './SongBar';

const RelatedSongs = ({
  data,
  isPlaying,
  artistId,
  activeSong,
  handlePauseClick,
  handlePlayClick,
}) => {
  return (
    <div className='flex flex-col'>
      <h1 className='font-bold text-white text-3xl'>Related Songs : </h1>

      <div className='w-full mt-6 flex flex-col'>
        {data?.map((song, i) => (
          <SongBar
            key={`${song.key}-${artistId}`}
            song={song}
            i={i}
            artistId={artistId}
            isPlaying={isPlaying}
            activeSong={activeSong}
            handlePauseClick={handlePauseClick}
            handlePlayClick={handlePlayClick}
          />
        ))}
      </div>
    </div>
  );
};

export default RelatedSongs;
