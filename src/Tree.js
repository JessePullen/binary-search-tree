import Node from './Node.js';

export default class Tree {
	constructor(array) {
		// Call private method
		this.root = this.#buildTree(array);
	}
	// # makes private
	#buildTree(array) {
		if (array.length === 0) {
			return;
		}

		array.sort((a, b) => a - b);
		// Remove duplicate numbers in array - not part of this project
		array = [...new Set(array)];

		const middleIndex = Math.trunc(array.length / 2);
		const middleValue = array[middleIndex];

		const left = array.slice(0, middleIndex);
		const right = array.slice(middleIndex + 1);

		return new Node(middleValue, this.#buildTree(left), this.#buildTree(right));
	}
}
