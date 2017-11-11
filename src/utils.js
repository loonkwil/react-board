/**
 * Returns an array of elements from start to end, inclusive
 * @param {number} start
 * @param {number} end
 * @return {Array.<number>}
 */
export function range(start, end) {
    const length = (end - start) + 1;
    return Array.from(new Array(length))
        .map((_, i) => start + i);
}

/**
 * @param {Array.<number|string|null|undefined|boolean>} arr1
 * @param {Array.<number|string|null|undefined|boolean>} arr2
 * @return {boolean}
 */
export function arrayEq(arr1, arr2) {
    return (
        arr1.length === arr2.length &&
        arr1.every((value, index) => (value === arr2[index]))
    );
}

/** @type {Array.<string>} */
const letters = range('a'.charCodeAt(), 'z'.charCodeAt())
    .map(code => String.fromCharCode(code));

/**
 * @param {number} col
 * @return {string}
 */
export function getColName(col) {
    if (col < letters.length) {
        return letters[col];
    }

    return getColName(Math.floor(col / letters.length) - 1) +
        getColName(col % letters.length);
}

/**
 * @param {number} row
 * @return {string}
 */
export function getRowName(row) {
    return (row + 1).toString();
}

/**
 * @param {number} col
 * @param {number} row
 * @return {string}
 */
export function getCellName(col, row) {
    return getColName(col) + getRowName(row);
}
