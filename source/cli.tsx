#!/usr/bin/env node
import React from "react";
import meow from "meow";
import App from "./app.js";
import { withFullScreen } from "fullscreen-ink";

export const cli = meow(
	`
	Usage
	  $ ink-cli-demo

	Options
		--name  Your name

	Examples
	  $ ink-cli-demo --name=Jane
	  Hello, Jane
`,
	{
		importMeta: import.meta,
		flags: {
			name: {
				type: "string",
			},
		},
	},
);

withFullScreen(<App />).start();
