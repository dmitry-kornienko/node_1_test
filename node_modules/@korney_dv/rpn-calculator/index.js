const { version } = require('./package.json')

console.log(`Hello! This is version ${version}`)

const calculateRPN = rpn => {
	const stack = []
	const nodes = rpn.split(' ')

	const operators = new Map([
		['+', (a, b) => a + b],
		['-', (a, b) => a - b],
		['*', (a, b) => a * b],
		[
			'/',
			(a, b) => {
				if (b === 0) throw new Error('Division by zero is not allowed')
				return a / b
			},
		],
	])

	for (let node of nodes) {
		if (!isNaN(node)) {
			stack.push(Number(node))
		} else if (operators.has(node)) {
			if (stack.length < 2) throw new Error('Insufficient operands')

			const last = stack.pop()
			const secondLast = stack.pop()
			const operation = operators.get(node)

			stack.push(operation(secondLast, last))
		}
	}

	return stack.pop()
}

module.exports = calculateRPN
