// Part 1:
// Const are block-scoped, much like variables defined using the let statement, value of a const can't be changed through reassignment, and it can't be redeclared.
    const GAME_SPEED = 100;
    const CANVAS_BORDER_COLOUR = 'white';
    const CANVAS_BACKGROUND_COLOUR = "white";
    const SNAKE_COLOUR = 'turquoise';
    const SNAKE_BORDER_COLOUR = 'lightgreen';
    const FOOD_COLOUR = 'red';
    const FOOD_BORDER_COLOUR = 'darkred';
    //length of snake
    let snake = [
      {x: 150, y: 150},
      {x: 140, y: 150},
      {x: 130, y: 150},
      {x: 120, y: 150},
      {x: 110, y: 150}
    ]

    let score = 0;

    // When set to true the snake is changing direction
    let changingDirection = false;
    let foodX;
    let foodY;
    // direction for the snake 
    let dx = 10;
    let dy = 0;

    // Get the canvas element
    const gameCanvas = document.getElementById("gameCanvas");

    // Return a two dimensional drawing context
    const ctx = gameCanvas.getContext("2d");

    // Start game
    main();

    // Create the first food location
    createFood();



    // Call changeDirection whenever a key is pressed
    document.addEventListener("keydown", changeDirection);
    /**
     * Main function of the game
     * called repeatedly to advance the game
     */
    function main() {
      // If the game ended return early to stop game
      if (didGameEnd()) return;
      setTimeout(function onTick() {
        changingDirection = false;
        clearCanvas();
        drawFood();
        advanceSnake();
        drawSnake();
        // Call game again
        main();
      }, GAME_SPEED)
    }

    /**
    // Part 2:
     * Change the background colour of the canvas to CANVAS_BACKGROUND_COLOUR and
     * draw a border around it
     */
    function clearCanvas() {
      //  Select the colour to fill the drawing
      ctx.fillStyle = "white";
      //  Select the colour for the border of the canvas
      ctx.strokestyle = "turquoise";
      // Draw a "filled" rectangle to cover the entire canvas
      ctx.fillRect(0, 0, gameCanvas.width, gameCanvas.height);
      // Draw a "border" around the entire canvas
      ctx.strokeRect(0, 0, gameCanvas.width, gameCanvas.height);
    }
    /**
     * Draw the food on the canvas
     */
    function drawFood() {
      ctx.fillStyle = "red";
      ctx.strokestyle = "darkred";
      ctx.fillRect(foodX, foodY, 10, 10);
      ctx.strokeRect(foodX, foodY, 10, 10);
    }

    function advanceSnake() {
      // Create the new Snake's head
      const head = {x: snake[0].x + dx, y: snake[0].y + dy};

      // Add the new head to the beginning of snake body
      snake.unshift(head); // unshift adds new items to the beginning of an array, and returns the new length.

      const didEatFood = snake[0].x === foodX && snake[0].y === foodY;
      if (didEatFood) {
        // Increase score
        score += 10;
        // Display score on screen
        document.getElementById('score').innerHTML = score;
        // Generate new food location
        createFood();
      } else {
        // Remove the last part of snake body
        snake.pop();
      }
    }
    /**
     * Returns true if the head of the snake touched another part of the game or any of the walls
     */
    function didGameEnd() {
      for (let i = 4; i < snake.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) return true
      }
      const hitLeftWall = snake[0].x < 0;
      const hitRightWall = snake[0].x > gameCanvas.width - 10;
      const hitToptWall = snake[0].y < 0;
      const hitBottomWall = snake[0].y > gameCanvas.height - 10;
      return hitLeftWall || hitRightWall || hitToptWall || hitBottomWall
    }
    /**
     * Generates a random number that is a multiple of 10 given a min and a max number
     * min - min number the random number can be
     * max - max number the random number can be
     */
    function randomTen(min, max) {
      return Math.round((Math.random() * (max-min) + min) / 10) * 10;
    }
    /**
     * Creates random set of coordinates for the snake food.
     */
    function createFood() {
      // Generate a random number the food x-coordinate
      foodX = randomTen(0, gameCanvas.width - 10);
      // Generate a random number for the food y-coordinate
      foodY = randomTen(0, gameCanvas.height - 10);
      // if the new food location is where the snake currently is, generate a new food location
      snake.forEach(function isFoodOnSnake(part) {
        const foodIsoNsnake = part.x == foodX && part.y == foodY;
        if (foodIsoNsnake) createFood();
      });
    }

    /**
    // Part 3:
     * Draws the snake on the canvas
     */
    function drawSnake() {
      // loop through the snake parts drawing each part on the canvas
      snake.forEach(drawSnakePart)
    }
    /**
     * Draws a part of the snake on the canvas
     */
    function drawSnakePart(snakePart) {
      // Set the color of the snake part
      ctx.fillStyle = "turquoise";
      // Set the border color of the snake part
      ctx.strokestyle = "lightgreen";
      // Draw a "filled" rectangle to represent the snake part at the coordinates
      // the part is located
      ctx.fillRect(snakePart.x, snakePart.y, 10, 10);
      // Draw a border around the snake part
      ctx.strokeRect(snakePart.x, snakePart.y, 10, 10);
    }
    /**
     * The direction cannot be switched to the opposite direction, to prevent the snake from reversing
     * For example if the the direction is 'right' it cannot become 'left'
     */
    function changeDirection(event) {
      const LEFT_KEY = 37;
      const RIGHT_KEY = 39;
      const UP_KEY = 38;
      const DOWN_KEY = 40;
      /**
       * Prevent the snake from reversing
       */
      if (changingDirection) return;
      changingDirection = true;
      const keyPressed = event.keyCode;
      const goingUp = dy === -10;
      const goingDown = dy === 10;
      const goingRight = dx === 10;
      const goingLeft = dx === -10;
      if (keyPressed === LEFT_KEY && !goingRight) {
        dx = -10;
        dy = 0;
      }
      if (keyPressed === UP_KEY && !goingDown) {
        dx = 0;
        dy = -10;
      }
      if (keyPressed === RIGHT_KEY && !goingLeft) {
        dx = 10;
        dy = 0;
      }
      if (keyPressed === DOWN_KEY && !goingUp) {
        dx = 0;
        dy = 10;
      }
    }
