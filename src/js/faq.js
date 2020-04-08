document.addEventListener('DOMContentLoaded', (e)=> {
	@@include('blocks/index.js')
	
	let toblur = document.querySelectorAll('.faq-item:last-child')
	
	if ("IntersectionObserver" in window) {
		toblur.forEach((i) => {
			i.parentElement.classList.add('_blurred')
		})
		
		let blurObserver = new IntersectionObserver((entries)=> {
			entries.forEach(function(entry) {
				if (entry.intersectionRatio > 0) {
					entry.target.parentElement.classList.remove('_blurred')
				} else {
					entry.target.parentElement.classList.add('_blurred')
				}
			})
		}, {threshold: 0.01})
		
		document.querySelectorAll('.faq-item:last-child').forEach((faq)=> {
			blurObserver.observe(faq)
		})
		
	} else {
		blurOnScroll.forEach((faq)=> {
			faq.parentElement.classList.remove('_blurred')
		})
	}
	
})
