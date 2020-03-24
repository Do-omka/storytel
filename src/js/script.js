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
		document.querySelectorAll('[data-active]').forEach((elem)=> {
			elem.addEventListener('click', (e)=> {
				elem.getAttribute('data-active').split(', ').forEach((target)=> {
					switch (target) {
						case 'this':
							elem.classList.toggle('_active')
						break
						
						case 'parent':
							elem.parentElement.classList.toggle('_active')
						break
						default:
							if (document.querySelector(target)) {
								document.querySelector(target).classList.toggle('_active')
							}
						break
					}
				})
			})
		})
	}
	
	if (document.querySelector('[data-radio-uncheck]')) {
		document.querySelectorAll('[data-radio-uncheck]').forEach((elem)=> {
			elem.addEventListener('click', (e)=> {
				elem.getAttribute('data-radio-uncheck').split(', ').forEach((target)=> {
					if (document.querySelector('[data-radio-name="'+target+'"]')) {
						document.querySelectorAll('[data-radio-name="'+target+'"]').forEach((radio)=> {
							radio.classList.remove('_active')
						})
					}
				})
				
				elem.getAttribute('data-radio-for').split(', ').forEach((target)=> {
					if (document.querySelector('[data-radio-id="'+target+'"]')) {
						document.querySelectorAll('[data-radio-id="'+target+'"]').forEach((radio)=> {
							radio.classList.add('_active')
						})
					}
				})
			})
		})
	}
	
})
