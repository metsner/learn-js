const SIDE_SIZE = 4;

/*
 * Set what part of the width of the cell is border width (0.125 default).
 * For example: sell is 80px, so border will be 10px (if default).
 * 100px in sum (10 + 80 + 10) in this case.
 */
const BORDER_PART = 0.125;

var field = document.getElementById('field');

field.draw = function() {

    var result = '';

    cells.forEach(function(cell) {

        result += cell.outerHTML;

    });

    field.innerHTML = result;

};

var cell_with_border_size = field.clientWidth / SIDE_SIZE;

var cell_size = cell_with_border_size / (1 + 2 * BORDER_PART);

var border_size = cell_size * BORDER_PART;

var cells = [];

var n = 0;// number of cell, the empty cell will have largest number

/*
 * Creating cells. Set sizes and default positions. Set numbers.
 * Completing array of cells.
 */
for (i = 1; i <= SIDE_SIZE; i++) {

    for (j = 1; j <= SIDE_SIZE; j++) {

        var cell = document.createElement('div');

        cell.className = 'cell';

        cell.style.width = cell.style.height = cell_size;

        cell.style.borderWidth = border_size;

        cell.setPosition = function(coordinates) {

            this.coordinates = coordinates;

            this.style.top = cell_with_border_size * (coordinates[0] - 1);

            this.style.left = cell_with_border_size * (coordinates[1] - 1);

        }.bind(cell);

        cell.setPosition([i, j]);

        var span = document.createElement('span');

        span.innerHTML = n + 1;

        cell.innerHTML = span.outerHTML;

        if ((i == SIDE_SIZE) && (j == SIDE_SIZE)) {

            cell.id = 'empty';

            cell.innerHTML = '';

        }

        //adding cell to array of cells
        cells[n] = cell;

        n++;

    }

}

//In this point we draw cells at first time (default position, in order)
field.draw();

document.addEventListener("keydown", function(e) {

    move(e.key);

});

function move(key) {

    //coordinates of empty cell
    var empty_coordinates = cells[cells.length - 1].coordinates;

    //coordinates of CELL that will EXCHANGE PLACES WITH EMPTY cell
    //when concrete button is pushed, there's only one possible cell to move
    var cell_coordinates = null;

    if (key == "ArrowUp") {

        cell_coordinates = [empty_coordinates[0] + 1, empty_coordinates[1]];

    }

    if (key == "ArrowDown") {

        cell_coordinates = [empty_coordinates[0] - 1, empty_coordinates[1]];

    }

    if (key == "ArrowLeft") {

        cell_coordinates = [empty_coordinates[0], empty_coordinates[1] + 1];

    }

    if (key == "ArrowRight") {

        cell_coordinates = [empty_coordinates[0], empty_coordinates[1] - 1];

    }

    //make sure that such cell exists
    if ((cell_coordinates[0] > 0) &&
        (cell_coordinates[1] > 0) &&
        (cell_coordinates[0] <= SIDE_SIZE) &&
        (cell_coordinates[1] <= SIDE_SIZE)
    ) {

        var cell = getCellByCoordinates(cell_coordinates);

        cells[cells.length - 1].setPosition(cell_coordinates);

        cell.setPosition(empty_coordinates);

        field.draw();

    }

}

function getCellByCoordinates(coordinates) {

    var result = null;

    cells.forEach(function(cell) {

        if ((cell.coordinates[0] == coordinates[0]) && cell.coordinates[1] == coordinates[1]) {

            result = cell;

        }

    });

    return result;

}