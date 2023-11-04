var spanElements = $('span.last');
	var totalResult = $('span.text-result');
	var shippingPrice = $('span.shipping');
	var result = $('span.result');
	var middle = $('a.middle');
	var last = $('span.last');

//---------------- Total Sum Product Item------------------------//
	const middleElement = document.querySelectorAll('.middle');
	const lastElement = document.querySelectorAll('.last');
	for(let i = 0; i < middleElement.length; i++ ){
		const middleValue = middleElement[i];
		const lastValue = lastElement[i];
		const lastData =  lastValue.getAttribute('data-set');
		const middleData =  middleValue.getAttribute('data-set');
		const resultCross = lastData * middleData;
		last.eq(i).text(resultCross);
	}
//---------------- Sum Product------------------------//
	var totalSum = 0;
	spanElements.each(function() {
	const price = $(this).text();
	var priceAsNumber = parseFloat(price);
	totalSum += priceAsNumber;
	});

	var total = totalSum;

	shippingPrice.each(function() {
	const price = $(this).text();
	var priceAsNumber = parseFloat(price);
	total += priceAsNumber;
	});

	totalResult.text(totalSum);
	result.text(total); 

    // Open Modals
	$('#btn-modal-delivery').click(function (){
		$('#deliveryModal').modal('show');  
	})

	// Close Modals
	$('.btn-close').click(() =>{
		$('#deliveryModal').modal('hide');  
	})

	const chooseButton = document.querySelectorAll('.choose-delivery');
	for (let i = 0; i < chooseButton.length; i++) {
		chooseButton[i].addEventListener('click', () => {
			const dataPrice = chooseButton[i].getAttribute('data-price');
			const dataType = chooseButton[i].getAttribute('data-name');
			shippingPrice.text(dataPrice)
			

			$('#deliveryModal').modal('hide');
			
		});
	}