import Image from 'next/image';

export default function Song({ song }) {
  return (
    <div className="col card-group">
      <div className="card shadow-sm">
        {song.album_cover_art_url && (
          <Image
            src={song.album_cover_art_url}
            alt={`Cover art of ${song.track_album_name}`}
            className="card-img-top"
            width={640}
            height={640}
          />
        )}

        <div className="card-body">
          <p className="card-text">{song.track_name}</p>
          <p className="card-text d-flex justify-content-between flex-wrap">
          <small className="text-muted ">{song.track_artist}</small>
          <small>{song.danceability > 0.6 && <small className='align-self-start text-white bg-success rounded px-2 py-1 fw-bold '>Danceable!</small> }</small>
          </p>
        </div>
        <ul className="list-group list-group-flush">
          {[song.playlist_genre, song.playlist_subgenre].map((elem, i)=>{if(elem) return (<li key={i} className='fw-light text-capitalize list-group-item'>{elem}</li>)})}  
          </ul> 
      </div>
    </div>
  );
}
