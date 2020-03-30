document.addEventListener('DOMContentLoaded', (e)=> {
	@@include('blocks/index.js')
	@@include('blocks/custom-select.min.js')
	
	customSelect('select', {
		isDisabledClass: 'is-disabled',
	})

})
