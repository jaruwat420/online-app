	var spanElements = $('span.last');
	var totalResult = $('span.text-result');
	var shippingPrice = $('span.shipping');
	var result = $('span.result');
	var middle = $('a.middle');
	var last = $('span.last');
	var shipping_value = $('span.shipping_value');

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
			
			// อัพเดตค่าขนส่งในรายการสินค้าที่เลือก
			const shippingElement = $('span.shipping').eq(i);
			shippingElement.text(dataPrice);

			// คำนวณยอดรวมใหม่ของราคาสินค้าและค่าจัดส่ง
			let newTotalSum = 0;
			$('span.last').each(function() {
				const price = $(this).text();
				const priceAsNumber = parseFloat(price);
				newTotalSum += priceAsNumber;
				
			});

			let newShippingSum = 0;
			$('span.shipping').each(function() {
				const price = $(this).text();
				const priceAsNumber = parseFloat(price);
				newShippingSum += priceAsNumber;
			});

			const newTotal = newTotalSum + newShippingSum;
			shipping_value.text(dataType);
			// อัพเดตยอดรวมทั้งหมด
			$('span.text-result').text(newTotalSum);
			$('span.result').text(newTotal);

			// ปิด Modal
			$('#deliveryModal').modal('hide');
		});
	}
	// Reload Page!
	function reload (){
		window.location.reload();
	}

	const qrCodeBtn = document.getElementById('qrCodeBtn');
	const cashOnDeliveryBtn = document.getElementById('cashOnDeliveryBtn');

	qrCodeBtn.addEventListener('click', () =>{
		if (!qrCodeBtn.classList.contains('selected')) {
			qrCodeBtn.classList.add('selected');
			cashOnDeliveryBtn.classList.remove('selected');
		}
	});

	cashOnDeliveryBtn.addEventListener('click', () => {
		if (!cashOnDeliveryBtn.classList.contains('selected')) {
			cashOnDeliveryBtn.classList.add('selected');
			qrCodeBtn.classList.remove('selected');
		}
	});

	// Order product
	const orderProductBtn = document.getElementById('btn-order-product');
	orderProductBtn.addEventListener('click' ,() => {
		const  checkbox = document.getElementById('f-option4');
		if (!checkbox.checked) {
			alert('โปรดเลือก "ฉันได้อ่านและยอมรับข้อกำหนดและเงื่อนไข" ก่อนดำเนินการต่อ');
		} else {
			const link = document.querySelector('a .result');
			const firstname = $('#firstname').val();
			const lastname = $('#lastname').val();
			const telephone =$('#telephone').val();
			const email =$('#email').val();
			const address1 =$('#address1').val();
			const address2 =$('#address2').val();
			const city =$('#city').val();
			const province =$('#province_select').val();
			const zip =$('#zip').val();
			console.log(link.textContent);
		}
	});

	// Choose Address Other
	const checkbox = document.getElementById('f-option3')
	const collapseExample = document.getElementById('collapseAddress')
	checkbox.addEventListener('change', () => {
		if(checkbox.checked){
			collapseAddress.classList.add('show');
		} else {
			collapseAddress.classList.remove('show');
		}
	});	



