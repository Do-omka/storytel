document.addEventListener('DOMContentLoaded', (e)=> {
	@@include('blocks/index.js')
	
	function newContents() {
		let arr = []
		for (let i = 0; i < 6; i++) {
			arr.push(document.querySelector('.contents-itemContainer').cloneNode(true))
		}
		return arr
	}
	
	let contentsObserver = new IntersectionObserver((entries)=> {
		entries.forEach((entry)=> {
			if (entry.intersectionRatio > 0) {
				let target = entry.target.parentElement
				newContents().forEach(function(elem) {
					target.appendChild(elem)
				})
				target.appendChild(entry.target)
			}
		})
	}, {threshold: 0.01}).observe(document.querySelector('#contents-sentinel'))
	
})
