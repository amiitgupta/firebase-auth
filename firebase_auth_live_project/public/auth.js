
// listen to user auth status
auth.onAuthStateChanged(user => {
    if (user) {
        console.log("user status: logged in", user)
        setupUI(user);

        // display user information
        var profileName, profileEmail, emailVerified;
        profileName = user.displayName;
        profileEmail = user.email;
        emailVerified = user.emailVerified;
        // to check if mail is verified or not
        var mailVerified
        if (emailVerified) {
            mailVerified = 'Email is verified'
        } else {
            mailVerified = `"Email not verified"`
        }
        document.querySelector('#displayUserName').innerHTML = profileName;
        document.querySelector('#displayUserEmail').innerHTML = profileEmail;
        document.querySelector('#isEmailVerified').innerHTML = mailVerified;

        // update user name to profile
        const addUserName = document.querySelector('#userDataForm')
        addUserName.addEventListener('submit', (e) => {
            e.preventDefault();
            const fName = addUserName['first_name'].value;
            const lName = addUserName['last_name'].value;
            userName = fName + ' ' + lName
            user.updateProfile({
                displayName: userName,
            }).then(function() {
                console.log('name update successfully!')
                addUserName.reset();
            }).catch(function(error) {
                console.log(error)
            });
        })

        // update user email
        const newMail = document.querySelector('#updateEmailForm')
        newMail.addEventListener('submit', (e) => {
            e.preventDefault();
            const newEmail = newMail['new-email'].value;
            user.updateEmail(newEmail).then(() => {
                console.log('new mail updated!')
                newMail.reset()
            }).catch(function(error) {
                console.log(error)
            });
        })

        // password update
        const newPass = document.querySelector('#resetPasswordForm')
        newPass.addEventListener('submit', (e) => {
            e.preventDefault();
            const newPassword = newPass['newPassword'].value;

            user.updatePassword(newPassword).then(() => {
                console.log("password updated successfully.");
                newPass.reset()
            }).catch(function(error) {
                console.log(error)
            });
        });

        // delete user account
        const delUser = document.querySelector('#deleteUserAcc')
        delUser.addEventListener('submit', (e) => {
            e.preventDefault();
            user.delete().then(function() {
                console.log('user deleted')
            }).catch(function(error) {
                console.log(error)
            });
        })

    }
    else {
        console.log("user status: logged out")
        setupUI();
    }
})

// DOM changes on user auth state
const loggedIn = document.querySelectorAll('.showOnUserlogin')
const loggedOut = document.querySelectorAll('.showOnUserlogout')
const setupUI = (user) => {
    if (user) {
        loggedIn.forEach(item => item.style.display = 'block')
        loggedOut.forEach(item => item.style.display = 'none')  
    } else {
        loggedIn.forEach(item => item.style.display = 'none')
        loggedOut.forEach(item => item.style.display = 'block')
    }
}

// sign in user with email and password
const login = document.querySelector('#login-form');
login.addEventListener('submit', (e) => {
    e.preventDefault();
    // get user info for login
    const email = login['loginEmail'].value;
    const password = login['loginPassword'].value;
    auth.signInWithEmailAndPassword(email, password).then(userCredential => {
//         console.log('user is logged in', userCredential.user)
        login.reset();
    });
});

// user sign out
const logout = document.querySelector('#userLogOut');
logout.addEventListener('click', (e) => {
    e.preventDefault();
    auth.signOut().then(() => {
        console.log("sign out completed")
    });
});

// register user
const register = document.querySelector('#register-form');
register.addEventListener('submit', (e) => {
    e.preventDefault();
    // get user info
    const email = register['userEmail'].value;
    const password1 = register['userPassword'].value;
    const password = register['cnfUserPassword'].value;
    if (password1 === password) {
        // register the user on firebase
        auth.createUserWithEmailAndPassword(email, password).then(userCredential => {
            console.log("account successfully created for", userCredential.user)
            // calling send email verification email function
            sendVerificationEmail();
            register.reset();
        });
    } else {
        console.log('password mismatch, try again!')
    }

    // send user email verification link
    const sendVerificationEmail = () => {
        auth.currentUser.sendEmailVerification().then(() => {
            console.log("email verification link sent successfully.")
        })
    };

});

// forgot password
const passReset = document.querySelector('#forgotPasswordForm');
passReset.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = passReset['userAccEmail'].value;
    auth.sendPasswordResetEmail(email).then(() => {
        console.log("password reset email sent successfully.");
        passReset.reset()
    })
})

// google sign-in
const googleAuth = document.getElementById('google-signIn');
googleAuth.addEventListener('click', (e) => {
    e.preventDefault()
    provider = new firebase.auth.GoogleAuthProvider();
    console.log(provider)
    auth.signInWithPopup(provider).then((result) => {
        console.log('login success')
        var credential = result.credential;
    }).catch((error) => {
        console.log(error)
    });
})
