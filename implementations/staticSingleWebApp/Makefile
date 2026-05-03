.PHONY: build test run clean install

install:
	npm install

build: install
	npm run build

test: install
	npm test

run: install
	npx vite dev

clean:
	rm -rf dist node_modules
