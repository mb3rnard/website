.SILENT:
.PHONY: help

## Colors
COLOR_RESET   = \033[0m
COLOR_INFO    = \033[32m
COLOR_COMMENT = \033[33m

## Help
help:
	printf "${COLOR_COMMENT}Usage:${COLOR_RESET}\n"
	printf " make [target]\n\n"
	printf "${COLOR_COMMENT}Available targets:${COLOR_RESET}\n"
	awk '/^[a-zA-Z\-\_0-9\.@]+:/ { \
		helpMessage = match(lastLine, /^## (.*)/); \
		if (helpMessage) { \
			helpCommand = substr($$1, 0, index($$1, ":")); \
			helpMessage = substr(lastLine, RSTART + 3, RLENGTH); \
			printf " ${COLOR_INFO}%-16s${COLOR_RESET} %s\n", helpCommand, helpMessage; \
		} \
	} \
	{ lastLine = $$0 }' $(MAKEFILE_LIST)

## Install
install:
	brew update
	brew install hugo
	sudo easy_install Pygments
	npm install

clean-up:
	rm -rf static/* public/*

build: clean-up
	hugo --theme=manala --config=config.yaml
	chmod -R a+r static/images

build-assets:
	node_modules/.bin/gulp install

## Build
build: build build-assets

## Hugo server (Dev only)
server-start:
	hugo server --theme=manala --buildDrafts --watch --ignoreCache=true
