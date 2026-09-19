/*
**	ProjectCard
*/


export class ProjectCard extends HTMLElement {
	static observedAttributes = ["colour"];


	/** @type {HTMLInputElement} */ colorInput;
	/** @type {HTMLInputElement} */ textInput;


	constructor() {
		super();				// Always call super first in constructor

		this.attachShadow({ mode: "open" });
		this.shadowRoot.innerHTML = `
			<style>
				[]project-icon { width:2em; }
			</style>
			<article>
				<h2>
					<slot name="project-icon">project-icon</slot>
					<slot name="project-name">project-name</slot>
				</h2>

				<div class="text">
					<slot name="project-text">project-text</slot>
				</div>
				<div class="image">
					<slot name="project-image">project-image</slot>
				</div>
			</article>
		`;
		// something is enforcing a min-width...


		//console.log('this', this);
		//console.log('document', document);
		//console.log('shadowRoot', this.shadowRoot);


		this.shadowRoot.querySelectorAll('input').forEach(
			(element) => {
				element.addEventListener(
					'change',
					(event) => {
						const eventTarget = /** @type {HTMLInputElement} */ (event.target);
						this.internalUpdate(eventTarget.value);
					}
				);
			}
		);

	}/* constructor */


	connectedCallback() {
		//console.log("Custom element added to page.");
	}

	disconnectedCallback() {
		//console.log("Custom element removed from page.");
	}

	connectedMoveCallback() {
		//console.log("Custom element moved with moveBefore()");
	}

	adoptedCallback() {
		//console.log("Custom element moved to new page.");
	}


	attributeChangedCallback(name, oldValue, newValue) {
		console.log(
			`Attribute ${name} has changed from ${oldValue} to ${newValue}.`,
		);
		if (name === 'colour') {
			this.updateColourInputs(newValue);
		}
	}

	internalUpdate(colourString) {
		this.updateColourInputs(colourString);
		this.attributes['colour'].value = colourString;
	}

	updateColourInputs(colourString) {
		this.colorInput.value = colourString;
		this.textInput.value = colourString;
		const changeEvent = new CustomEvent('change', {detail:colourString});
		this.dispatchEvent(changeEvent);
	}

}/* class ProjectCard */


customElements.define("project-card", ProjectCard);
