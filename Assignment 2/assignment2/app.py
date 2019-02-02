# Project 2
# Mohini Salunke
# Red ID: 822049248
# Main application file specifying the routes

from flask import Flask, session, render_template, escape, request, redirect, url_for, flash
import datetime
from dbstruct import validateLogin, validateRegistration

app = Flask(__name__)
# Setting a secret key to some random bytes.
app.secret_key = '5#24'
now = datetime.datetime.now() #Get the current time now, the year is used for the copyright displayed in the footer

# Goto home page when '/' is encountered
@app.route('/')
def index():
    return render_template('home.html', current_year = now.year)

# Function to be performed when login
@app.route('/login', methods = ['GET', 'POST'])
def login():
    error = None
    # If the request method is post, check if username and password are valid
    if request.method == 'POST':
        form_data['uname'] = request.form['uname']
        form_data['password'] = request.form['password']
        response = validateLogin(form_data)
        if response == 'Invalid':
            error = 'Invalid username or Password'
        else:
            session['logged_in'] = True
            session['uname'] = request.form['uname']
            flash('You were logged in')
            return redirect(url_for('index'))
    # If request method is get, render the login page
    elif request.method == 'GET':
        return render_template('login.html')
    return render_template('login.html', error=error)


@app.route('/register', methods = ['GET', 'POST'])
def register():
    error = None
    # If method is post, check is user already exists
    if request.method == 'POST':
        form_data['fname'] = request.form['fname']
        form_data['lname'] = request.form['lname']
        form_data['email'] = request.form['email']
        form_data['uname'] = request.form['uname']
        form_data['dob'] = request.form['dob']
        form_data['favouriteGame'] = request.form['favouriteGame']
        form_data['phone'] = request.form['phone']
        form_data['phoneType'] = request.form['phoneType']
        form_data['password'] = request.form['password']
        form_data['cpassword'] = request.form['cpassword']

        response = validateRegistration(form_data)
        # Username or email already exists in database
        if response != 'success':
            error = 'UserName or email already exists'
        else:
            # Start a new session for the user and add the details in db
            session['logged_in'] = True
            session['uname'] = request.form['uname']
            flash('You were logged in')
            return redirect(url_for('index'))
    elif request.method == 'GET':
        return render_template('register.html')
    return render_template('register.html', error=error)
    
@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/gameRelease')
def gameRelease():
    # Calculate the time left till release date to be displayed on the webpage
    releaseDate = datetime.datetime(2018, 12, 31, 18)
    timeLeft = releaseDate - now
    return render_template('countdown.html', timeLeft = timeLeft)
    
@app.route('/logout')
def logout():
    # Remove the username from the session if it exists
    session.pop('logged_in', None)
    flash('You were logged out')
    return redirect(url_for('index'))

if __name__ == "__main__":
    app.run(host='0.0.0.0',port=5000, debug=True)