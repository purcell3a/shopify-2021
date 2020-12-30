"""Script to seed database."""

import os
import json
from random import choice, randint
from datetime import datetime
import csv

# import crud
from model import db, connect_to_db,User
import server

os.system('dropdb shopees')

os.system('createdb shoppees')

# After that, you connect to the database and call db.create_all:
connect_to_db(server.app)
db.create_all()


new_user = User(fname = 'User',
                lname ='user',
                email = 'user@gmail.com',
                password = 'user',
                date_added = '2020-11-21',
                date_modified = '2020-11-21')

db.session.add(new_user)
db.session.commit()


# ***************************************************************************
