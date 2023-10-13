$(document).ready(function () {
    $('.nav-link').on('click', function (e) {
        $('#loginModal').modal('show');

    });

    // Register form
    $('.btn-singUp').click(function (e) {
        const usernameValue = document.getElementById('r_username').value;
        const lnameValue = document.getElementById('r_lname').value;
        const emailValue = document.getElementById('r_email').value;
        const passwordValue = document.getElementById('r_password').value;
        const passwordValueConfirm = document.getElementById('r_confirmPassword').value;

        if (usernameValue.length <= 0) {
            alert(`Please input username`);
            e.preventdefault() 
        } else if (lnameValue.length <= 0) {
            alert(`Please input lastname`);
            e.preventdefault() 
        } else if (emailValue.length <= 0) {
            alert(`Please input email`);
            e.preventdefault() 
        } else if (passwordValue.length <= 0) {
            alert(`Please input password`);
            e.preventdefault() 
        } else if (passwordValueConfirm.length <= 0) {
            alert(`Please input confirmPassword`);
            e.preventdefault() 
        } else if (passwordValue != passwordValueConfirm) {
            alert(`Password no Match!`)
            e.preventdefault() 
        }
        const userData = {
            username: usernameValue,
            lastname: lnameValue,
            email: emailValue,
            password: passwordValue,
            passwordConfirm: passwordValueConfirm,
        }
        $.ajax({
            type: "put",
            url: "auth/register",
            data: {
                firstname: userData.username,
                lastname: userData.lastname,
                email: userData.email,
                password: userData.password,
                passwordConfirm: userData.passwordConfirm
            },
            dataType: "JSON",
            success: function (res) {
                if (res.status == 200) {
                    Swal.fire({
                        title: 'อัพเดทข้อมูลสำเร็จ!',
                        text: 'อัพเดทข้อมูลที่เลือกแล้ว.',
                        icon: 'success',
                    }).then(() => {
                        alert(1111);
                    });
                }
            },
            error: function (error) {
                Swal.fire('เกิดข้อผิดพลาด', 'พบอีเมลนี้ในระบบแล้ว โปรดใช้อีเมลอื่น!', 'error');
            }
        });
    });

    // Login form
    $('.btn-singIn').click(function (e) {
        const usernameValue = document.getElementById('l_username').value;
        const passwordValue = document.getElementById('l_password').value;

        if (usernameValue.length <= 8) {
            alert(`กรุณากรอกรหัสอีเมลมากกว่า 8 ตัวอักษร`);
            return;

        } else if (passwordValue.length <= 7) {

            alert(`กรุณากรอกรหัสผ่านที่มากกว่า 8 ตัวอักษร`);
            return;
        }
        const newUser = {
            username: document.getElementById('l_username').value,
            password: document.getElementById('l_password').value,
        }
        console.log(newUser);
        $.ajax({
            type: "put",
            url: "auth/login",
            data: {
                username: newUser.username,
                password: newUser.password,
            },
            dataType: "JSON",
            success: function (res) {

            }
        });

    });

});