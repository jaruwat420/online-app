// Reload Datatable Categories
get_dataTable();

$('.btn-add-category').click(function () { 
    $('#modal_category').modal('show');    
});

$('.btn-save-category').click(function () { 
    const categoryName = $('#category_name').val();
    const categoryImage = $('#category_image')[0].files[0]; // รับไฟล์อัปโหลด
    const categoryDetail = $('#category_detail').val(); 
    const formData = new FormData();
    formData.append('category_name', categoryName);
    formData.append('category_image', categoryImage);
    formData.append('category_detail', categoryDetail);

    $.ajax({
        type: "POST",
        url: "/backend/category",
        data: formData,
        contentType: false,
        processData: false,
        context: this,
        success: function (res) {
            if (res.status == 201) {
                alert('Success');
            }
        },
        error: function (error) {
            console.log(error);
        }
    });
});


function get_dataTable() {
    fetch('/backend/get_datatable_category')
        .then(res => res.json())
        .then(data => {
            //console.log(data);
                dataTable = $('#dataTable').DataTable({
                serverSide: false,
                data: data,
                searching: true,
                destroy: true,
                "ordering": false,
                columns: [
                {data: null, render: function (data, type, row, meta) {
                    return meta.row + meta.settings._iDisplayStart + 1;
                }},
                {data: 'category_name'},
                {data: 'category_image'},
                {data: 'category_detail'},
                    {data: null,render: function (data, type, row) {
                        return `<button class="btn btn-warning btn-edit" id = "btn-edit" data-id="${data.car_id}">Edit</button>`;
                    }
                    },
                    {data: null,render: function (data, type, row) {
                        return `<button class="btn btn-danger btn-delete" id = "btn-delete" data-id="${data.car_id}">Delete</button>`;
                    }
                    }
                ],
            });
        })
        .catch(error => console.error('Error:', error));
    }

$('#dataTable').on('click', '.btn-delete', function() {
    const carId = $(this).data('id');
    //console.log(carId);
});
