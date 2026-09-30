import Tree from './Tree.js';

const prettyPrint = (node, prefix = '', isLeft = true) => {
	if (node === null || node === undefined) {
		return;
	}

	prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
	console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
	prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
};

function randomArray(size) {
	const numbers = [];
	for (let i = 0; i < size; i++) {
		numbers.push(Math.floor(Math.random() * 100));
	}
	return numbers;
}

const tree = new Tree(randomArray(10));

console.log('Balanced?: ' + tree.isBalanced());

const levelOrderArr = [];
const preOrderArr = [];
const postOrderArr = [];
const inOrderArr = [];

tree.levelOrderForEach((value) => levelOrderArr.push(value));
tree.preOrderForEach((value) => preOrderArr.push(value));
tree.postOrderForEach((value) => postOrderArr.push(value));
tree.inOrderForEach((value) => inOrderArr.push(value));

console.log('Level order: ', levelOrderArr);
console.log('Pre order: ', preOrderArr);
console.log('Post order: ', postOrderArr);
console.log('In order: ', inOrderArr);

tree.insert(101);
tree.insert(202);
tree.insert(303);

console.log('Balanced?: ' + tree.isBalanced());

console.log('Rebalancing');

tree.rebalance();

console.log('Balanced?: ' + tree.isBalanced());

prettyPrint(tree.root);
