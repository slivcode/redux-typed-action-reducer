module.exports = {
	test: ['@build', 'jest'],
	build: [`@clean`, `tsc`],
	"build:prod": [
		`@clean`,
		`tsc -p tsconfig.publish.json`
	],
	'build:doc': ['typedoc --out doc'],
	clean: `rm -rf lib doc`,
	// prepublishOnly: `@build:prod`
};