// toggle password to hide and show
togglePass = () => {
    const newPass = document.getElementById('newPassword');
    const togglePassIconChange = document.getElementById('togglePassIcon');
    if (newPass.type === "password") {
        newPass.type = "text"
        togglePassIconChange.innerHTML = 'visibility_off'
    } else {
        newPass.type = "password"
        togglePassIconChange.innerHTML = 'visibility'
    }
}
// ...