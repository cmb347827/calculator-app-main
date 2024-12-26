# Frontend Mentor - Calculator app solution

This is a solution to the [Calculator app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/calculator-app-9lteq5N29). Frontend Mentor challenges help you improve your coding skills by building realistic projects. 

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)


## Overview

### The challenge

Users should be able to:

- See the size of the elements adjust based on their device's screen size
- Perform mathmatical operations like addition, subtraction, multiplication, and division
- Adjust the color theme based on their preference
- **Bonus**: Have their initial theme preference checked using `prefers-color-scheme` and have any additional changes saved in the browser

### Screenshot

![screenshot](./images/screenshot.PNG "screenshot")

### Links

- Solution URL: [Github]()
- Live Site URL: [Live Github]()

## My process

### Built with

- Semantic HTML5 markup
- Sass/SCSS
- Bootstrap
- jQuery/Javascript
- Mobile-first workflow


### What I learned
  - I thought it would be a good exercise to use html entities for the operands values in the html file, instead of just the operands as is : +,- etc. And to work with the html entities in the js file. 
  I found a stackoverflow post on how to convert html entities to characters (see link 1) 
  - The trickiest part of this was the checkMinus() function, that checks to see if a user tried to enter multiple operands after each other, and had to come up with this solution , that I doubt is bug free, but done to the best of my abilities.
   I have off course tested the app by trying to enter multiple operands after each other
  - Using localStorage was doable, as I could take a look at my todo-app in which I had already used this.
  - I have coded calculators before , with freecodecamp, but I did not take a look at my old code as I wanted to practice a fresh approach.
  - So I did the bonus part of this challenge, the user preference for color theme is saved and there on page refresh.
  - And I read online that the use of eval() is not a good idea, and read about a better alternative (see link 2)
   

### Continued development

- Daily tutorials and projects in HTML5, CSS3, Javascript, Bootstrap, Sass/SCSS. For now, in time I will go re-learn React ect.

### Useful resources

[convert ascii to hex](https://stackoverflow.com/questions/20580045/javascript-character-ascii-to-hex)

[avoid eval](https://dev.to/spukas/everything-wrong-with-javascript-eval-35on)

## Author

- Website - [One of my latest codepens](https://codepen.io/cynthiab72/pen/oNybYON)
- Frontend Mentor - [@cmb347827](https://www.frontendmentor.io/profile/cmb347827)

