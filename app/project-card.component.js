/*
**	ProjectCard
*/


export class ProjectCard extends HTMLElement {

	/** @type {string} */
	projectName = '';

	static observedAttributes = [
		'project-name',
		'project-path'
	];


	/** @type {HTMLInputElement} */ colorInput;
	/** @type {HTMLInputElement} */ textInput;


	constructor() {
		super();				// Always call super first in constructor

		const template = /** @type {HTMLTemplateElement} */ (document.getElementById('template-projectCard'));
		const templateContent = template.content;

		this.attachShadow({ mode: 'open' });
		this.shadowRoot.appendChild(templateContent.cloneNode(true));
		/*
		this.shadowRoot.innerHTML = `
			<style>
				.project-icon { width:2em; }
				h3 { margin-top:0em; }
				.project-body {
					display:grid;
					grid-template-columns: 1fr 1fr;

					// img {
					// 	height: calc(20 * var(--project-base-length));
					// 	text-align: end;
					// }
				}
				dl {
					display:grid;
					grid-template-columns: 1fr 2fr;
					dt:before {
						content: '⋄ ';
					}
				}
				@media (max-width: 900px) {
					dl {
						grid-template-columns: 1fr;
						dt:before { content:''; }
						dt:after { content:':'; }
					}
				}

			</style>

			<h3>
				<slot name="project-icon">project-icon</slot>
				<slot name="project-name">project-name</slot>
			</h3>

			<div class="project-body">
				<div>
					<slot name="description">
						project description
					</slot>
					<dl>
						<dt>Repository</dt>
						<dd><slot name="repository"></dd>
						<dt>Site</dt>
						<dd><slot name="site"></dd>
						<dt>Status</dt>
						<dd><slot name="status"></dd>
						<dt>Technology</dt>
						<dd><slot name="technology"></dd>
						<dt>Version</dt>
						<dd><slot name="version"></dd>
						<dt>Date</dt>
						<dd><slot name="date"></dd>
					</dl>
				</div>
				<div>
					<slot name="project-image">project-image</slot>
				</div>
			</div>

		`;
		*/
		// something is enforcing a min-width...


		//console.log('this', this);
		//console.log('document', document);
		//console.log('shadowRoot', this.shadowRoot);


		// this.shadowRoot.querySelectorAll('input').forEach(
		// 	(element) => {
		// 		element.addEventListener(
		// 			'change',
		// 			(event) => {
		// 				const eventTarget = /** @type {HTMLInputElement} */ (event.target);
		// 				this.internalUpdate(eventTarget.value);
		// 			}
		// 		);
		// 	}
		// );

	}/* constructor */


	async connectedCallback() {
		this.projectName = this.attributes['project-name'].value;
		//console.log(`Project card added: ${this.attributes['project-name'].value}, ${this.attributes['project-path'].value}`);



		const projectDataPath = `/${this.attributes['project-path'].value}project.json`;
		//console.log('projectDataPath',projectDataPath);
		const projectData = await import(projectDataPath, { with: { type: "json" } });
		console.log(`${this.projectName} data:`, projectData.default);
		this.populateCard(projectData.default);
	}

	disconnectedCallback() {
		//console.log('Custom element removed from page.');
	}

	connectedMoveCallback() {
		//console.log('Custom element moved with moveBefore()');
	}

	adoptedCallback() {
		//console.log('Custom element moved to new page.');
	}


	// attributeChangedCallback(name, oldValue, newValue) {
	// 	console.log(
	// 		`Attribute ${name} has changed from ${oldValue} to ${newValue}.`,
	// 	);
	// 	if (name === 'colour') {
	// 		this.updateColourInputs(newValue);
	// 	}
	// }

	populateCard(projectData) {
		this.shadowRoot.querySelector('slot[name=project-name]').innerHTML	= projectData.name;
		this.shadowRoot.querySelector('[slot=project-description]').innerHTML	= projectData.description;

		this.shadowRoot.querySelector('slot[name=repository]').innerHTML	= projectData.repository.replace('https://','');

		const repoLink = /** @type {HTMLAnchorElement} */ (this.shadowRoot.querySelector('a#project-repository-link'));
		repoLink.href = projectData.repository;

		const faviconSrc = `/${this.attributes['project-path'].value}favicon.svg`;
		this.shadowRoot.querySelector('[slot=project-favicon]').setAttribute('src', faviconSrc);

		this.shadowRoot.querySelector('.project-favicon-anchor').setAttribute('href', projectData.repository);


		this.shadowRoot.querySelector('slot[name=version]').innerHTML		= projectData.version;
		this.shadowRoot.querySelector('slot[name=date]').innerHTML			= projectData.date;
	}

}/* class ProjectCard */


customElements.define('project-card', ProjectCard);
