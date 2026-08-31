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

describe('remove()', () => {
	test('removing a node that does not exist in tree should do nothing', () => {
		const tree = new Tree([8, 4, 12]);

		expect(tree.remove(1)).toBeUndefined();
	});

	test('removing the only node should leave an empty tree', () => {
		const tree = new Tree([8]);

		tree.remove(8);

		expect(tree.root).toBeNull();
	});

	test('removing a node with no children should remove the node and leave rest of tree unchanged', () => {
		const tree = new Tree([8, 4, 12]);
		//       8
		//      / \
		//     4   12

		tree.remove(12);

		expect(tree.root.data).toBe(8);
		expect(tree.root.left.data).toBe(4);
		expect(tree.root.right).toBeNull();
	});

	test('removing a node with one child should remove the node and the child should take its place', () => {
		const tree = new Tree([8, 4, 12, 16, 20]);
		//       12
		//      / \
		//     8   20
		//	  /    /
		//   4    16

		tree.remove(20);

		// one step down
		expect(tree.root.right.data).toBe(16);
	});

	test('removing a node with two children should replace it with its successor of right tree', () => {
		const tree = new Tree([8, 4, 12, 2, 6, 10, 14]);
		//          8
		//        /   \
		//       4     12
		//      / \    / \
		//     2   6  10  14

		tree.remove(8);

		expect(tree.root.data).toBe(10);
		expect(tree.root.left.data).toBe(4);
		expect(tree.root.right.data).toBe(12);
	});
	test('removing a node with child on an unbalanced tree preserves the successor right child', () => {
		const tree = new Tree([4, 8, 12]);

		tree.insert(10);
		tree.insert(11);

		//       8
		//      / \
		//     4   12
		//         /
		//        10
		//          \
		//           11

		tree.remove(8);

		expect(tree.root.data).toBe(10);
		expect(tree.root.left.data).toBe(4);
		expect(tree.root.right.data).toBe(12);
		expect(tree.root.right.left.data).toBe(11);
	});
});

test('levelOrderForEach should take a callback and throw error if not', () => {
	const tree = new Tree([]);

	// Anonymous function lets function run before checking for error toThrow
	expect(() => tree.levelOrderForEach()).toThrow(Error);
});

test('levelOrderForEach should traverse the tree level by level, left to right and takes a callback', () => {
	const tree = new Tree([8, 4, 12, 2, 6, 10, 14]);
	//          8
	//        /   \
	//       4     12
	//      / \    / \
	//     2   6  10  14

	const array = [];
	tree.levelOrderForEach((value) => array.push(value));
	expect(array).toEqual([8, 4, 12, 2, 6, 10, 14]);
});

test('preOrderForEach should traverse the tree current, left to right and take a callback', () => {
	const tree = new Tree([8, 4, 12, 2, 6, 10, 14]);
	//          8
	//        /   \
	//       4     12
	//      / \    / \
	//     2   6  10  14

	const array = [];
	tree.preOrderForEach((value) => array.push(value));
	expect(array).toEqual([8, 4, 2, 6, 12, 10, 14]);
});

test('inOrderForEach should traverse the tree left to right and take a callback', () => {
	const tree = new Tree([8, 4, 12, 2, 6, 10, 14]);
	//          8
	//        /   \
	//       4     12
	//      / \    / \
	//     2   6  10  14

	const array = [];
	tree.inOrderForEach((value) => array.push(value));
	expect(array).toEqual([2, 4, 6, 8, 10, 12, 14]);
});

test('postOrderForEach should traverse the tree left to right, then current and take a callback', () => {
	const tree = new Tree([8, 4, 12, 2, 6, 10, 14]);
	//          8
	//        /   \
	//       4     12
	//      / \    / \
	//     2   6  10  14

	const array = [];
	tree.postOrderForEach((value) => array.push(value));
	expect(array).toEqual([2, 6, 4, 10, 14, 12, 8]);
});
