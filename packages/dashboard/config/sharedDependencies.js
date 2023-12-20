const SKIP_DEPS = ['@mui/icons-material', '@mui/material'];

const allDeps = require('../package.json').dependencies;
const dependencies = Object.keys(allDeps).reduce(
	(res, key) => {
		if (!SKIP_DEPS.includes(key)) {
			return {...res, [key]: allDeps[key]};
		}
		return res;
	},
	{}
);

module.exports = { dependencies };
