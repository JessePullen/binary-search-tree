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
