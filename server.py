from flask import (Flask, render_template, request, flash, session,
                   redirect,jsonify)
from model import connect_to_db, db, User
import crud
from jinja2 import StrictUndefined
import secrets
import os

app = Flask(__name__)


@app.route('/', defaults={'input_path': ''}) #if this matches the URL
@app.route('/<path:input_path>') #or if this does
def show_homepage(input_path):
    """Show the application's homepage."""
    return render_template('base.html')

@app.route('/api/apikey')
def return_api():
    '''Return the API Key'''
    return jsonify(os.environ['APIKEY'])

#!============================= USER ACCOUNT ROUTES =============================
@app.route('/api/signup', methods=["POST"])
def sign_up():
    """add new user to the DB AND GO TO HOMEPAGE"""

    #  GET DATA
    # ****************************** #
    data = request.get_json()
    fname = data['fname']
    lname = data['lname']
    email = data['email']
    password = data['password']
    # ****************************** #

    existing_user = crud.does_user_exist(email)
    if existing_user == 'user exists':
        return jsonify('you already exist dingus')
    else:
        new_user = crud.create_user(fname,lname,email,password)
        return jsonify('account created')


@app.route('/api/login', methods=["POST"])
def login_user():
    '''verify user and login'''

    #  GET DATA
    # ****************************** #
    data = request.get_json()

    email = data['email']
    password = data['password']
    user = crud.get_user_by_email(email)
    # ****************************** #

    is_user = crud.validate_user(password,email)

    if is_user:
        return jsonify({'fname' : user['fname'], 'id':user['user_id'] })

    else:
        return jsonify('info does not match')

# ======================================== NOMINATION ROUTES =============================================


@app.route('/api/get-user-nominations', methods=["POST"])
def get_user_nominations():
    ''' get user nominations'''

    #  GET DATA
    # ****************************** #
    data = request.get_json()
    user_id = data['user_id']
    # ****************************** #

    nomination_id_list = crud.get_user_nominations(user_id)

    print('******************************************************************************************', nomination_id_list)
    if nomination_id_list:
        return jsonify(nomination_id_list)
    else:
        return jsonify('no nominations')


@app.route('/api/toggle-nominate', methods=["POST"])
def toggle_nominate():
    '''toggle movie nomination status'''

     #  GET DATA
    # ****************************** #
    data = request.get_json()
    user_id = data['user_id']
    imdbID = data['imdbID']
    movie_year = data['year']
    movie_title = data['title']
    movie_poster = data['poster']
    # ****************************** #

    # CHECK HOW MANY NOMINATIONS USER HAS
    nomination_id_list = crud.get_user_nominations(user_id)
    if len(nomination_id_list) == 5:
        return jsonify('User has 5 nominations')
    # CHECK IF NOMINATION EXISTS
    nomination = crud.get_nomination(user_id,imdbID)

    # IF NOMINATED THEN REMOVE
    if nomination:
        nomination_remove = crud.remove_nomination(user_id, imdbID)
        return jsonify('Nomination Removed')
    else:
        new_nomination = crud.add_nominate(user_id,imdbID,movie_year,movie_title,movie_poster)
        return jsonify('Nomination Added!!!!')





if __name__ == '__main__':
    connect_to_db(app)
    app.run(debug=True, host='0.0.0.0')

