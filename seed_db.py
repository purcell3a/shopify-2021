"""Script to seed database."""

import os
import json
from random import choice, randint
from datetime import datetime
import crud
from model import db, connect_to_db,User
import server

os.system('dropdb shoppies')

os.system('createdb shoppies')

connect_to_db(server.app)
db.create_all()


new_user = User(fname = 'User',
                lname ='user',
                email = 'user@gmail.com',
                password = 'user',
                submission_status = 'false',
                date_added = '2020-11-21',
                date_modified = '2020-11-21')

db.session.add(new_user)
db.session.commit()

