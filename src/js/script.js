document.addEventListener('DOMContentLoaded', (e)=> {
	
	document.addEventListener('scroll', function(e) {
		if (document.querySelector('.header')) {
			if (window.pageYOffset > 0) {
				document.querySelector('.header').classList.add('_stuck')
			} else {
				document.querySelector('.header').classList.remove('_stuck')
			}
		}
	})
	
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
