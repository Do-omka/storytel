document.addEventListener('DOMContentLoaded', (e)=> {
	let popuplvl = 0
	
	if (document.querySelector('.popup')) {
		document.querySelectorAll('.popup').forEach((popup)=> {
			popup.addEventListener('click', function(e) {
				if (e.target === popup) {
					popup.classList.remove('_popup')
					popuplvl--
					if (popuplvl < 1) {
						document.querySelector('body').classList.remove('overflow')
					}
				}
			})
		})
	}
	
	if (document.querySelector('[data-popup-close]')) {
		document.querySelectorAll('[data-popup-close]').forEach(function(close) {
			close.addEventListener('click', function(e) {
				if (e.target.closest('._popup')) {
					let popup = e.target.closest('._popup')
					popup.classList.remove('_popup')
					popuplvl--
					if (popuplvl < 1) {
						document.querySelector('body').classList.remove('overflow')
					}
				}
			})
		})
	}
	
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
	
	if (document.querySelector('[data-popup]')) {
		document.querySelectorAll('[data-popup]').forEach(function(elem) {
			elem.addEventListener('click', function(e) {
				let popup
				if (elem.getAttribute('data-popup') === 'this') {
					popup = elem
				} else if (document.querySelector(elem.getAttribute('data-popup'))) {
					popup = document.querySelector(elem.getAttribute('data-popup'))
				}
				
				if(popup && !popup.classList.contains('_popup')) {
					popup.classList.add('_popup')
					popuplvl++
					document.querySelector('body').classList.add('overflow')
				}
			})
		})
	}
	
})
