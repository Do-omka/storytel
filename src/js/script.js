document.addEventListener('DOMContentLoaded', (e)=> {
	
	if (document.querySelector('[data-active]')) {
		let activators = document.querySelectorAll('[data-active]')
		activators.forEach(function(elem) {
			elem.addEventListener('click', function(e) {
				elem.dataset.active.split(', ').forEach(function(target) {
					if (target === 'this') {
						elem.classList.toggle('_active')
					} else if (document.querySelector(target)) {
						document.querySelector(target).classList.toggle('_active')
					}
				})
			})
		})
	}
	
})
