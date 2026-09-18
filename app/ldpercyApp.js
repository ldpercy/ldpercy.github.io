//
//	ldpercyApp.js
//

import { HTMLApp } from "../[html-common]/module/HTMLApp.js";

import { controller} from './controller.js';
// import { documentArea } from './document-area.js';
// import { ui } from './main-ui.js';


class LdpercyApp extends HTMLApp {

	appName			= 'ldpercy';
	appVersion		= 'v0.2.0';
	projectColour	= 'limegreen';
	appInfo = [`%c
		ldpercy.github.io ${this.appVersion} by ldpercy
		https://github.com/ldpercy/ldpercy.github.io/releases/tag/${this.appVersion}
		`.replace(/\n\t/g,'\n'),
		`color: light-dark(hsl(from ${this.projectColour} h s 30), hsl(from ${this.projectColour} h s 70));`,
	];




	/** @type {object} */
	elementMap = {
		commandInput	: 'input-command',
		pageForm		: 'form-page',
		page			: 'group-page',
	};



	documentDOMContentLoaded() {
		super.documentDOMContentLoaded();
		this.setup();
	}/* documentDOMContentLoaded */



	setup() {
		this.loadSettings();
		//ui.setup();
	}




	//
	// application lifecycle
	//


	visibilitychangeListener() {

		if (document.visibilityState === 'hidden')
		{
			this.saveSettings();
		}
	}


	/* saveSettings
	*/
	saveSettings() {

		const appSettings = {

		};

		const appSettingsJson = JSON.stringify(appSettings);
		localStorage.setItem(`${this.appName}_settings`, appSettingsJson );
		localStorage.setItem(`${this.appName}_savedAt`, new Date().toISOString());
	}/* saveSettings */


	loadSettings() {
		//console.log('Settings loaded');

		if (localStorage[`${this.appName}_settings`]) {
			const appSettings = JSON.parse(localStorage[`${this.appName}_settings`]);
		}
		else {
			// first load
		}

		localStorage.setItem(`${this.appName}_loadedAt`, new Date().toISOString());
	}/* loadSettings */



}/* LdpercyApp */




export const ldpercyApp = new LdpercyApp();

