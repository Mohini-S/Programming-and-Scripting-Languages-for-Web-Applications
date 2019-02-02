# Project 2
# Mohini Salunke
# Red ID: 822049248
# This file is used for initalizing the database and for validating login and adding user to database

import mysql.connector
import datetime
import hmac, hashlib

now = datetime.datetime.now()

# initialize the database to connect and use the values specified
def initialize_db():
    config = {
        'user': 'agsroot',
        'password': 'ags',
        'host': 'db',
        'port': '3306',
        'database': 'ags_03'
    }
    connection = mysql.connector.connect(**config)
    return connection

# Function to validate the login 
def validateLogin(form_data):
    username = form_data['uname']
    password = form_data['password']
    #encrypt password
    encryptedPassword = hmac.new('5#24'.encode(), password.encode(), hashlib.sha256).hexdigest()    
    connection = initialize_db()
    cursor = connection.cursor()
    selectQuery = '''
    select "present" from players where screenName = '{0}' and encryptedPassword = '{1}'
    LIMIT 1;'''.format(username, encryptedPassword)

    cursor.execute(selectQuery)
    if cursor.fetchone():
        response = 'Valid'
    else:
        response = 'Invalid'
    # If response is valid, it is a valid user, else return invalid and ask to enter details again
    cursor.close()
    connection.close()
    return response

#Function to add valid user to the database. If username or email already present return an error
def validateRegistration(form_data):
    fname = form_data['fname']
    lname = form_data['lname']
    email = form_data['email']
    username = form_data['uname']
    dob = form_data['dob']
    favgame = form_data['favouriteGame']
    phone = form_data['phone']
    phoneType = form_data['phoneType']
    password = form_data['password']
    cpassword = form_data['cpassword']
    encryptedPassword = hmac.new('5#24'.encode(), password.encode(), hashlib.sha256).hexdigest()
    connection = initialize_db()
    cursor = connection.cursor()

    selectQuery = '''
    select "present" from players where screenName = '{0}' or email = '{1}'
    LIMIT 1;'''.format(username, email)

    cursor.execute(selectQuery)
    # If the username or email exists in db, Return an error saying user exists
    if cursor.fetchone():
        response = 'UserName or Email exists'
        cursor.close()
        connection.close()
    else:
        # Insert into db
        insertQuery = '''
        insert into players (screenName, firstName,lastName,email,dob, encryptedPassword, dateJoined, lastLogin)
        values ('{0}', '{1}', '{2}', '{3}', '{4}', '{5}', '{6}', '{7}');'''.format(username, fname, lname, email, dob, encryptedPassword, now, now)
        cursor.execute(insertQuery)
        cursor.commit()
        cursor.close()
        connection.close()
        response = 'success'
    return response