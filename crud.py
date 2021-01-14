"""CRUD operations."""
from flask import Flask, render_template, request, flash, session, redirect ,jsonify
from model import db, User,connect_to_db, Nomination
import datetime
import random
import logging

# ======================================== USER ROUTES =============================================

def user_submit_status(user_id):

    now = datetime.datetime.now()
    user = User.query.get(user_id)

    user.submission_status = 'true'
    user.date_modified = now

    db.session.commit()

    updated_user = User.query.get(user_id)

    user = {'email': updated_user.email,
            'fname' : updated_user.fname,
            'lname' : updated_user.lname,
            'password' : updated_user.password,
            'submission_status':updated_user.submission_status,
            'user_id' : updated_user.user_id}

    return user

def create_user(fname,lname,email,password):
    now = datetime.datetime.now()
    new_user= User(fname=fname, lname=lname, email=email, password=password,submission_status='false',date_added=now, date_modified= now)

    db.session.add(new_user)
    db.session.commit()

    user = {'email': new_user.email,
            'fname' : new_user.fname,
            'lname' : new_user.lname,
            'password' : new_user.password,
            'submission_status':new_user.submission_status,
            'user_id' : new_user.user_id}

    return user

def get_user_by_email(email):
    ''' return a user by email'''

    result = User.query.filter(User.email == email).first()
    user = {'email': result.email,
            'fname' : result.fname,
            'lname' : result.lname,
            'password' : result.password,
            'submission_status':result.submission_status,
            'user_id' : result.user_id}

    return user


def does_user_exist(email):
    ''' return a user by email'''

    result = User.query.filter(User.email == email).first()

    if result is not None:
        return ('user exists')
    else:
        return('user does not exist')


def validate_user(password,email):
    """checks for valid password on login"""

    return User.query.filter(User.password == password, User.email == email).first()

# ======================================== NOMINATION ROUTES =============================================

def get_user_nominations(user_id):

    nomination_object_list = []
    nomination_id_list = Nomination.query.filter(Nomination.user_id == user_id).all()

    if len(nomination_id_list) == 0:
        nomination = {'Title':'looks like you have none','imdbID':'none'}
    else:
        for nom in nomination_id_list:
            nomination = {'imdbID':nom.movie_id,
                        'Title':nom.movie_title,
                        'Poster':nom.poster,
                        'Year':nom.year}
            nomination_object_list.append(nomination)

    return nomination_object_list

def get_nomination(user_id, imdbID):

    nomination = Nomination.query.filter(Nomination.user_id == user_id, Nomination.movie_id == imdbID).first()

    return nomination

def remove_nomination(user_id, imdbID):

    nomination = Nomination.query.filter(Nomination.user_id == user_id, Nomination.movie_id == imdbID).first()

    db.session.delete(nomination)
    db.session.commit()


def add_nominate(user_id, imdbID,movie_title,poster,year):

    now = datetime.datetime.now()
    new_nomination = Nomination(user_id = user_id,
                            movie_id = imdbID,
                            movie_title = movie_title,
                            poster = poster,
                            year = year,
                            date_added = now,
                            date_modified = now)
    db.session.add(new_nomination)
    db.session.commit()


if __name__ == '__main__':
    from server import app
    connect_to_db(app)

