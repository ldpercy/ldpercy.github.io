Project data fetch
==================

So far it's all hardcoded in here.
It would be cool to fetch some of the info from each deployed project itself, so that it automatically updates as projects get updated.
Thinking something like a little json file in the root of each project that contains version, commit hash, release date etc.

`project.json`
```json
{
	"name"			: "",
	"description"	: "",
	"repository"	: "",
	"version"		: "",
	"commit"		: "",
	"date"			: "",
	"tag"			: ["a","b","c"]
}
```
Having some of that automatically generated (eg commit hook/filter?) would also be cool, but will start with manual updates.

This will also help getting (at least some of) the magic strings out the code.
*Some* things like index.html's head title and meta desc i might keep manually updating for now, will consider substitution options for those later.



