import Tree from '../src/Tree.js';

test('builds a tree with the middle value as the root, sorts the array and removes duplication', () => {
	const tree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);

	expect(tree.root.data).toBe(8);
});

test('builds the correct left and right children', () => {
	const tree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);

	expect(tree.root.left.data).toBe(4);
	expect(tree.root.right.data).toBe(67);
});

test('recursively builds the tree', () => {
	const tree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);

	expect(tree.root.left.left.data).toBe(3);
	expect(tree.root.left.right.data).toBe(7);

	expect(tree.root.right.left.data).toBe(23);
	expect(tree.root.right.right.data).toBe(6345);
});

test('handles an empty array', () => {
	const tree = new Tree([]);

	expect(tree.root).toBeNull();
});

test('should check the tree for a value returning true if present or false if not', () => {
	const tree = new Tree([1, 2, 3]);

	expect(tree.includes(1)).toBeTruthy();
	expect(tree.includes(5)).toBeFalsy();
});

describe('insert()', () => {
	test('inserts a value to the left of a node', () => {
		const tree = new Tree([8, 4, 12]);

		tree.insert(2);

		expect(tree.root.left.left.data).toBe(2);
	});

	test('inserts a value to the right of a node', () => {
		const tree = new Tree([8, 4, 12]);

		tree.insert(14);

		expect(tree.root.right.right.data).toBe(14);
	});

	test('inserts a value several levels deep', () => {
		const tree = new Tree([8, 4, 12, 2, 6, 10, 14]);

		tree.insert(5);

		expect(tree.root.left.right.left.data).toBe(5);
	});

	test('does not insert duplicate values', () => {
		const tree = new Tree([8, 4, 12]);

		tree.insert(8);

		expect(tree.root.data).toBe(8);
		expect(tree.root.left.data).toBe(4);
		expect(tree.root.right.data).toBe(12);
	});

	test('inserts into an empty tree', () => {
		const tree = new Tree([]);

		tree.insert(5);

		expect(tree.root.data).toBe(5);
	});
});
