//
//	controller.js
//


import { HTMLApp } from "../[html-common]/module/HTMLApp.js";
import { ldpercyApp } from "./ldpercyApp.js";


let colourScheme = 'light';


class Controller {

	constructor() {
		this.element = HTMLApp.buildElementMap(document, this.elementMap)
		HTMLApp.addEventListeners(this.eventListeners, this);
		this.keyboardHandler = HTMLApp.newKeyboardHandler(this.keyFunctionMap,this);
	}


	elementMap = {
		// appInfoDialog	: 'dialog-appInfo',
		metaThemeColor		: 'meta-themeColor',
	};


	/** @type {array} */
	eventListeners = [
		{
			query: '.colourScheme-selector',
			type: 'click',
			listener: (event) => { this.setColourScheme(event.target.dataset.colourscheme); }
		},
		{
			query: '#colourScheme-toggle',
			type: 'click',
			listener: (event) => { event.preventDefault(); this.toggleColourScheme(); }
		},
		{
			element: document,
			type: 'visibilitychange',
			listener: () => { ldpercyApp.visibilitychangeListener(); }
		},
		{
			element: document,
			type: 'keydown',
			//listener: this.keyboardHandler							//	Use this for a local keyboard handler
			listener: (event) => { this.keyboardHandler(event); }		//	Use this for one generated from HTMLApp
		},
		// {
		// 	query: '#button-showAppInfo',
		// 	type: 'click',
		// 	listener: ui.toggleAppInfoDialog,
		// },

	];/* eventListeners */


	//
	//	event listeners
	//



	keyFunctionMap = {
		//'?'	: ui.toggleAppInfoDialog,
	};


	documentKeyListener(event) {
		//console.log('documentKeyListener', event);

		if (!event.altKey && !event.ctrlKey && !event.metaKey) {

			if (this.keyFunctionMap[event.key]) {
				event.preventDefault();
				this.keyFunctionMap[event.key]();
			}
		}

	}/* documentKeyListener */



	//
	//	handlers
	//

	toggleColourScheme() {
		if (colourScheme === 'light') {
			colourScheme = 'dark';
		} else {
			colourScheme = 'light';
		}
		this.setColourScheme(colourScheme);
	}


	/** @param {string} colourScheme */
	setColourScheme(colourScheme) {
		//ui.colourScheme = colourScheme;
		ldpercyApp.setColourScheme(colourScheme);

		// try using the meta element itself as the element to read for colour changes
		this.element.metaThemeColor.setAttribute('content', window.getComputedStyle(this.element.metaThemeColor).color);
	}



} /* Controller  */


export const controller = new Controller();