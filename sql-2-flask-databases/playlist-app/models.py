"""Models for Playlist app."""

from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class Playlist(db.Model):
    """Playlist."""
    
    __tablename__ = "playlists"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.Text, nullable=False, unique=True)
    description = db.Column(db.Text)
    
    assignments = db.relationship("PlaylistSong", backref="playlist")
    
    

    
class PlaylistSong(db.Model):
    """Mapping of a playlist to a song."""
    
    __tablename__ = "playlists_songs"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    playlist_id = db.Column(db.Integer, db.ForeignKey('playlists.id'), primary_key=True)
    song_id = db.Column(db.Integer, db.ForeignKey("songs.id"), primary_key=True)

class Song(db.Model):
    """Song."""

    __tablename__ = "songs"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.Text, unique=True, nullable=False)
    artist = db.Column(db.Text)
    
    assignments = db.relationship('PlaylistSong', backref="song")
    
    playlists = db.relationship(
        'Playlist',
        secondary="playlists_songs",
        backref="songs",
    )
    
    
# DO NOT MODIFY THIS FUNCTION
def connect_db(app):
    """Connect to database."""

    db.app = app
    db.init_app(app)
