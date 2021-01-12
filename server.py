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
    """SHOW APPLICATION HOMEPAGE."""
    return render_template('base.html')

@app.route('/api/apikey')
def return_api():
    '''RETURN API KEY'''
    return jsonify(os.environ['APIKEY'])

#!============================= USER ACCOUNT ROUTES =============================
@app.route('/api/signup', methods=["POST"])
def sign_up():
    """ADD NEW USER TO DB AND GO TO HOMEPAGE"""

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
        return jsonify('user exits')
    else:
        new_user = crud.create_user(fname,lname,email,password)
        return jsonify('account created')


@app.route('/api/login', methods=["POST"])
def login_user():
    '''VERIFY USER AND LOGIN'''

    #  GET DATA
    # ****************************** #
    data = request.get_json()
    email = data['email']
    password = data['password']
    user = crud.get_user_by_email(email)
    # ****************************** #

    is_user = crud.validate_user(password,email)

    if is_user:
        return jsonify({'fname' : user['fname'], 'id':user['user_id'], 'submission_status':user['submission_status'] })

    else:
        return jsonify('info does not match')

@app.route('/api/toggle-submission-status', methods=["POST"] )
def user_submission():
    ''' CHANGE USER SUBMIT STATUS TO TRUE'''

    #  GET DATA
    # ****************************** #
    data = request.get_json()
    print('*********************************************************')
    print('*********************************************************')
    print('*********************************************************')
    print('user_id', data)
    user_id = data['user_id']
    # ****************************** #

    user_submitted = crud.user_submit_status(user_id)

    return jsonify({'fname' : user_submitted['fname'], 'id':user_submitted['user_id'], 'submission_status':user_submitted['submission_status'] })


# ======================================== NOMINATION ROUTES =============================================


@app.route('/api/get-user-nominations', methods=["POST"])
def get_user_nominations():
    '''GET USER NOMINATIONS'''

    #  GET DATA
    # ****************************** #
    data = request.get_json()
    user_id = data['user_id']
    # ****************************** #

    nomination_object_list = crud.get_user_nominations(user_id)
    return jsonify(nomination_object_list)


@app.route('/api/toggle-nominate', methods=["POST"])
def toggle_nominate():
    '''TOGGLE MOVIE NOMINATION STATUS'''

     #  GET DATA
    # ****************************** #
    data = request.get_json()
    user_id = data['user_id']
    imdbID = data['imdbID']
    movie_title = data['title']
    poster = data['poster']
    year = data['year']
    # ****************************** #

    # CHECK HOW MANY NOMINATIONS USER HAS
    nomination_id_list = crud.get_user_nominations(user_id)
    if len(nomination_id_list) == 5:
        return jsonify('User has 5 nominations')
    elif len(nomination_id_list) < 4:
        new_nomination = crud.add_nominate(user_id,imdbID,movie_title,poster,year)
        return jsonify('nomination added')
    elif len(nomination_id_list) == 4:
        new_nomination = crud.add_nominate(user_id,imdbID,movie_title,poster,year)
        return jsonify('Last Nomination!')


@app.route('/api/remove-nominate', methods=["POST"])
def remove_nominate():
    '''REMOVE MOVIE FROM NOMINATIONS'''

    #  GET DATA
    # ****************************** #
    data = request.get_json()
    user_id = data['user_id']
    imdbID = data['imdbID']
    movie_title = data['title']
    # ****************************** #

    #  REMOVE NOMINATION
    nomination_remove = crud.remove_nomination(user_id, imdbID)
    return jsonify('nomination removed')


if __name__ == '__main__':
    connect_to_db(app)
    app.run(debug=True, host='0.0.0.0')

