# Welcome to your first Python program!
# This is a simple number guessing game

# First, we'll import a module to generate random numbers
import random

# Print a welcome message
print("Welcome to the Number Guessing Game!")
print("I'm thinking of a number between 1 and 100.")
print("You have 3 tries to guess it!")

# Generate a random number between 1 and 100
secret_number = random.randint(1, 100)
tries = 3  # Number of tries the player has

# Main game loop
while tries > 0:
    # Ask the player for their guess
    print(f"\nYou have {tries} tries left.")
    guess = int(input("What's your guess? "))
    
    # Check if the guess is correct
    if guess == secret_number:
        print("Congratulations! You guessed the correct number!")
        break
    else:
        tries -= 1  # Decrease the number of tries
        # Give a hint if the guess is too high or too low
        if guess > secret_number:
            print("Too high! Try a lower number.")
        else:
            print("Too low! Try a higher number.")
        
        if tries == 0:
            print(f"\nGame Over! The number was {secret_number}")

# Ask if they want to play again
while True:
    play_again = input("\nWould you like to play again? (yes/no): ")
    if play_again.lower() == 'yes':
        print("\nI'm thinking of a number between 1 and 100.")
        print("You have 3 tries to guess it!")
        secret_number = random.randint(1, 100)
        tries = 3
        
        # Main game loop for new game
        while tries > 0:
            print(f"\nYou have {tries} tries left.")
            guess = int(input("What's your guess? "))
            
            if guess == secret_number:
                print("Congratulations! You guessed the correct number!")
                break
            else:
                tries -= 1
                if guess > secret_number:
                    print("Too high! Try a lower number.")
                else:
                    print("Too low! Try a higher number.")
                
                if tries == 0:
                    print(f"\nGame Over! The number was {secret_number}")
    else:
        print("Thanks for playing! Goodbye!")
        break
