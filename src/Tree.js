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
	remove(value) {
		if (!this.includes(value)) {
			return;
		}

		if (this.root.right === null && this.root.left === null) {
			this.root = null;
			return;
		}

		let current = this.root;
		let previous = current;

		while (current.data !== value) {
			previous = current;
			if (current.data > value) {
				current = current.left;
			} else {
				current = current.right;
			}
		}

		let direction = 'left';
		if (previous.right.data === value) {
			direction = 'right';
		}

		// Node has no children
		if (current.right === null && current.left === null) {
			previous[direction] = null;
			return;
		}

		// Node has one child
		if (current.right === null) {
			previous[direction] = current.left;
			return;
		} else if (current.left === null) {
			previous[direction] = current.right;
			return;
		}

		// Node has 2 children
		const targetNode = current;
		current = current.right;
		previous = current;

		while (current.left !== null) {
			previous = current;
			current = current.left;
		}

		// Node of unbalanced tree is successor with child
		if (current.right !== null) {
			previous.left = current.right;
		} else {
			// Otherwise remove
			previous.left = null;
		}

		targetNode.data = current.data;
	}
	levelOrderForEach(callback) {
		if (!callback) {
			throw new Error('A callback function is required');
		}

		if (this.root === null) {
			return;
		}

		// Solved Iteratively
		const queue = [this.root];

		while (queue.length > 0) {
			const current = queue[0];
			if (current.left) {
				queue.push(current.left);
			}
			if (current.right) {
				queue.push(current.right);
			}
			callback(current.data);
			queue.shift();
		}
	}
	// Solved recursively
	levelOrderForEachRecursively(callback, node, queue = [this.root.data]) {
		if (!callback) {
			throw new Error('A callback function is required');
		}

		if (this.root === null) {
			return;
		}

		if (node === null) {
			return;
		}

		const paths = ['left', 'right'];

		let current = this.root;

		if (node) {
			current = node;
		}

		// Queues children of current
		if (current.left !== null) {
			queue.push(current.left.data);
		}
		if (current.right !== null) {
			queue.push(current.right.data);
		}

		// Traverses tree recursively
		for (const path of paths) {
			this.levelOrderForEachRecursively(callback, current[path], queue);
		}

		if (queue[0] !== undefined) {
			// result.push(queue[0]);
			callback(queue[0]);
			queue.shift();
		}
	}
	preOrderForEach(callback, node) {
		if (!callback) {
			throw new Error('A callback function is required');
		}

		if (node === null) {
			return;
		}

		let current = this.root;

		if (node) {
			current = node;
		}

		callback(current.data);

		this.preOrderForEach(callback, current.left);
		this.preOrderForEach(callback, current.right);
	}
}
