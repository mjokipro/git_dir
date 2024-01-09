## What is jinja?
- **Jinja** is a popular template system for Python, used by Flask.
- There are many template systems for Python. Jinja is a particularly popular one. Django has its own template system, which served as an inspiration for Jinja. (Django is even more opinionated)
- & Jinja does not throw errors. If jinja templates are not passed expected variables, those non-passed variables evaluate to an empty string (which is a falsy value)


## Dynamically styled

- Jinja can be used to dynamically style divs
	- Note lines 4 and 8 below, where a user can supply an image for their profile or header pictures, and jinja dynamically updates this with inline style attribute.
	- **hero**: UX term for big splashy thing on a page
```html nums {4,8}
<div 
	 id="warbler-hero"
	 class="full-width"
	 style="background-image: url('{{ user.header_image_url }}')"
>
</div>
<img 
	 src="{{ user.image_url }}"   
	 alt="Image for {{ user.username }}"
	 id="profile-avatar"
>
```