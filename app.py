from flask import Flask, render_template, request, session, redirect, url_for
import random

app = Flask(__name__)
app.secret_key = 'your-secret-key-here'  # Required for session management

@app.route('/')
def home():
    # Initialize game state if not exists
    if 'secret_number' not in session:
        session['secret_number'] = random.randint(1, 100)
        session['tries'] = 3
        session['message'] = "Welcome! Guess a number between 1 and 100."
        session['game_over'] = False
    return render_template('index.html')

@app.route('/guess', methods=['POST'])
def guess():
    try:
        guess = int(request.form['guess'])
        if guess == session['secret_number']:
            session['message'] = f"Congratulations! You guessed the correct number ({session['secret_number']})!"
            session['game_over'] = True
        else:
            session['tries'] -= 1
            if session['tries'] == 0:
                session['message'] = f"Game Over! The number was {session['secret_number']}"
                session['game_over'] = True
            else:
                if guess > session['secret_number']:
                    session['message'] = f"Too high! Try a lower number. You have {session['tries']} tries left."
                else:
                    session['message'] = f"Too low! Try a higher number. You have {session['tries']} tries left."
    except ValueError:
        session['message'] = "Please enter a valid number!"
    
    return redirect(url_for('home'))

@app.route('/new_game')
def new_game():
    session.clear()
    return redirect(url_for('home'))

if __name__ == '__main__':
    app.run(debug=True) 