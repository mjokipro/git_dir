from models import db, Playlist, Song, PlaylistSong
from app import app

db.drop_all()
db.create_all()

Playlist.query.delete()
PlaylistSong.query.delete()
Song.query.delete()

# db.session.commit()

p1 = Playlist(name="test_playlist_1", description="test_desc_1")
db.session.add(p1)
db.session.commit()


s1 = Song(title="test_song_1", artist="test_artist_1")
db.session.add(s1)
db.session.commit()

# ps1 = Playlist(playlist_id=p1.name, song_id=s1.title)
# db.session.add(ps1)
# db.session.commit()
