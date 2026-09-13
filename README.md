# Math Practice Project

This project is a browser-based learning app designed to build mental math speed and confidence through a mix of arithmetic drills, number exercises, and date-based reasoning.

## Features

### 1. Basic Calculator
A simple calculator for quick arithmetic tasks such as addition, subtraction, multiplication, division, and decimal work.

### 2. Practice Squares
The user is shown a number and must enter its square. This helps reinforce multiplication patterns and square values.

### 3. Practice Cubes
The user is shown a number and must enter its cube. This supports stronger mental computation with powers and repeated multiplication.

### 4. Predict Day from Date
A random date between 1600 and 2400 is generated, and the player must identify the correct weekday from several options. The date is shown in DD/MM/YYYY format, and the answer choices are ordered from Sunday to Saturday.

### 5. Mental Sprint
A fast-paced mental math challenge with three modes:

- Addition Sprint: user enters the final answer after a sequence of numbers shown one at a time
- Multiplication Sprint: same concept, using repeated multiplication steps
- Mixed Sprint: combines addition, subtraction, multiplication, and division in a single safe sequence designed to keep the math whole-number friendly and manageable

In Mixed Sprint mode, the app generates a valid sequence using safe operations so the final total remains consistent and the challenge is suitable for mental arithmetic practice.

## Project Structure

- `index.html` — main menu for all activities
- `calculator.html`, `calculator.css`, `script.js` — calculator page and logic
- `squares.html`, `squares.css`, `squares.js` — square practice page
- `cubes.html`, `cubes.css`, `cubes.js` — cube practice page
- `day_predict.html`, `day_predict.css`, `day_predict.js` — weekday prediction game
- `mental_sprint.html`, `mental_sprint.css`, `mental_sprint.js` — mental sprint practice with addition, multiplication, and mixed modes
- `style.css` — shared styling for the home page

## How to Run

Open `index.html` in a browser to start the app.

## Goal

The project is intended to make math learning interactive and engaging by combining practical calculation tools with focused mental arithmetic drills and logic practice in a simple static web app.
