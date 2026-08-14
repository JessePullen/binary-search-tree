import Node from './Node.js';

export default class Tree {
	constructor(array) {
		// Call private method
		this.root = this.#buildTree(array);
	}
	// # makes private
	#buildTree(array) {
		if (array.length === 0) {
			return null;
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
	includes(value) {
		let current = this.root;

		while (current !== null) {
			if (current.data === value) {
				return true;
			}
			if (current.data > value) {
				current = current.left;
			} else {
				current = current.right;
			}
		}
		return false;
	}
	insert(value) {
		if (this.root === null) {
			this.root = new Node(value);
		}

		if (this.includes(value)) {
			return;
		}

		let current = this.root;
		let previous = current;

		while (current !== null) {
			previous = current;
			if (current.data > value) {
				current = current.left;
			} else {
				current = current.right;
			}
		}
		if (previous.data < value) {
			previous.right = new Node(value);
		} else {
			previous.left = new Node(value);
		}
	}
}
