"""CRUD operations."""
from flask import Flask, render_template, request, flash, session, redirect ,jsonify
from model import db, User,connect_to_db, Nomination
import datetime
import random
import logging

# ======================================== USER ROUTES =============================================
def create_user(fname,lname,email,password):
    now = datetime.datetime.now()
    new_user= User(fname=fname, lname=lname, email=email, password=password,profile_img ='static/img/stock-profile-img.png',date_added=now, date_modified= now)

    db.session.add(new_user)
    db.session.commit()
    return new_user

def get_user_by_email(email):
    ''' return a user by email'''

    result = User.query.filter(User.email == email).first()
    user = { 'email': result.email,
            'fname' : result.fname,
            'lname' : result.lname,
            'password' : result.password,
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

def get_nomination(user_id, imdbID):

    nomination = Nomination.query.filter(Nomination.user_id == user_id, Nomination.movie_id == imdbID).first()

    return nomination

def remove_nomination(user_id, imdbID):

    nomination = Nomination.query.filter(Nomination.user_id == user_id, Nomination.movie_id == imdbID).first()

    db.session.delete(nomination)
    db.session.commit()


def add_nominate(user_id, imdbID):

    now = datetime.datetime.now()
    new_nomination = Nomination(user_id = user_id,
                            movie_id = imdbID,
                            date_added = now,
                            date_modified = now)
    db.session.add(new_nomination)
    db.session.commit()


if __name__ == '__main__':
    from server import app
    connect_to_db(app)

