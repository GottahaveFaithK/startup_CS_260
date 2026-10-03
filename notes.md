# CS 260 Notes

This file represents what I have learned about web programming.

"I love web programming"

- [My startup](https://startup.dice260.click)
- [My simon](https://simon.cs260.click)

## Helpful links

- [Course instruction](https://github.com/webprogramming260)
- [Canvas](https://byu.instructure.com)
- [MDN](https://developer.mozilla.org)

## AWS

Ensure AWS is listening to port 80 so you can access it. 

Public elastic IP: http://52.72.15.253

Address: http://dice260.click

When setting DNS, do * to get any traffic with the root of your address

## HTML

It is best to avoid using <br> to try and space out elements. That is because CSS is more effective when structuring elements, and it is better to leave that responsibility to CSS. Utilizng structure pieces like headers and footers are very useful to get the proper page formatting and divisions for the later structures to build off of. HTML is almost like a wireframe, an initial way to view the raw structure and ideas so you can later iterate on it and make it look pretty and add functionality.
It is pretty easy to draw your own images and add them in html.

## CSS
CSS can be used in the same file as HTML, however it is more customary to have seperate CSS files. It is structured differently from HTML but also very straightforward and easy to read. Animations such as elements fading in, spinning, or sliding around can be done in CSS, as well as handling items such as my spritesheets. A note for CSS when not using hex codes, is that "darkgrey" is actually notably lighter than the regular grey. 

I learned a lot more when implementing CSS on my project. There are settings to keep art pixelated which was needed for my animations and art. Class selectors are very helpful for specific formatting and behavior, such as the player's game board, where each cell highlights when hovered over. Class selectors may be my favourite aspect of bootstrap. Keyframes can handle spritesheets if you specify which pixels to focus on. You can make custom responsive behavior using the order functionality in bootstrap, and this allows you to set a certain order for sections on web and a different order on mobile for better reading. Pseudoselectors can be used to make something look more responsive, such as login boxes, hovering over elements, or moving a button when it is clicked. 

## React
For this project I used Vite. All references to class need to be switched to className when using react, and the input requires a closing mark in JS when it doesn't in html. Vite is setup to expect images in the public folder, but the public folder is not meant to be part of the path when referencing the images. 
