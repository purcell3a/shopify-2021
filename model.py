from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

# *****************************************************************************
class User(db.Model):
    """A user."""

    __tablename__ = 'users'

    user_id = db.Column(db.Integer,
                        autoincrement=True,
                        primary_key=True)
    fname = db.Column(db.String,
                        nullable=False,
                        unique=False)
    lname = db.Column(db.String,
                        nullable=False,
                        unique=False)
    email = db.Column(db.String,
                        nullable=False,
                        unique=True)
    password = db.Column(db.String,
                        nullable=False)
    submission_status = db.Column(db.String,
                        nullable=False)
    date_added = db.Column(db.DateTime,nullable=False)
    date_modified = db.Column(db.DateTime,nullable=False)

    def __repr__(self):
        return (f'<User user_id={self.user_id} fname ={self.fname} lname={self.lname} '
                f'email={self.email} password={self.password} submission_status={submission_status} date_added={self.date_added} date_modified={self.date_modified}>')

class Nomination(db.Model):
    """A user."""

    __tablename__ = 'nominations'

    nom_id = db.Column(db.Integer,
                        autoincrement=True,
                        primary_key=True)
    user_id = db.Column(db.Integer,
                        nullable=False,
                        unique=False)
    movie_id = db.Column(db.String,
                        nullable=False,
                        unique=False)
    movie_title = db.Column(db.String,
                        nullable=False,
                        unique=False)
    date_added = db.Column(db.DateTime,nullable=False)
    date_modified = db.Column(db.DateTime,nullable=False)

    def __repr__(self):
        return (f'<Nomination user_id={self.user_id} nom_id={self.nom_id} movie_id={self.movie_id} '
                f'date_added={self.date_added} date_modified={self.date_modified}>')


def connect_to_db(flask_app, db_uri='postgresql:///shoppies', echo=True):
    flask_app.config['SQLALCHEMY_DATABASE_URI'] = db_uri
    flask_app.config['SQLALCHEMY_ECHO'] = echo
    flask_app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    db.app = flask_app
    db.init_app(flask_app)

    print('Connected to the db!')

# *****************************************************************************


if __name__ == '__main__':
    from server import app
    connect_to_db(app)
    print("Connected to DB.")