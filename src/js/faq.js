document.addEventListener('DOMContentLoaded', (e)=> {
	@@include('blocks/index.js')
	
	if ("IntersectionObserver" in window) {
		let blurObserver = new IntersectionObserver((entries)=> {
			entries.forEach(function(entry) {
				if (entry.intersectionRatio > 0) {
					entry.target.parentElement.classList.add('_scrolled')
				} else {
					entry.target.parentElement.classList.remove('_scrolled')
				}
			})
		}, {threshold: 0.01})
		
		document.querySelectorAll('.faq-item:last-child').forEach((faq)=> {
			blurObserver.observe(faq)
		})
		
	} else {
		document.querySelectorAll('.faq-item:last-child').forEach((faq)=> {
			blurObserver.observe(faq.parentElement.classList.add('_scrolled'))
		})
	}
	
})
