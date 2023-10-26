//--------------show Modal-------------------//
$('.btn-add-product').click(function () { 
    $('#modal_product').modal('show');    
});

//--------------Close Modal-------------------//
$('btn-close-modal').click(function () { 
    $('#modal_product').modal('hide');
});

//-------------Send Form-------------------//
$('.btn-save-product').click(function () { 
    const formData = new FormData();
    formData.append('categories_select', $('#categories_select').val());
    formData.append('product_name', $('#product_name').val());
    formData.append('product_image', $('#product_image')[0].files[0]);
    formData.append('product_description', $('#product_description').val());
    formData.append('product_price', $('#product_price').val());
    formData.append('product_qty', $('#product_qty').val());
    $.ajax({
        type: "PUT",
        url: "/product/create",
        data: formData,
        dataType: "JSON",
        contentType: false,
        processData: false,
        context: this,
        success: function (response) {
            
        },
        error: function(){
            
        }
    });
});