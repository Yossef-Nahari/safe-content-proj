'use strict'

function onCheckAlreadyLog() {
    const alreadyLoged = getLoginUser()
    if (alreadyLoged) {
        location.href = 'welcome.html'
    }
    else return
}

function onCheckLogin(ev) {
    ev.preventDefault()
    const elName = document.querySelector('input[name="name-txt"]')
    const elPass = document.querySelector('input[name="pass-txt"]')
    const name = elName.value
    const pass = elPass.value
    if (!name || !pass) {
        alert(`You didn't insert user name / password!`)
        return
    }
    const test = doLogin(name, pass)
    if (test === null) alert('Wrong user name or password! Try again 🔐')
    else {
        alert(`Welcome back ${name}! \nNow you will be transfer to the relevant page! ✔️`)
        location.href = 'welcome.html'
    }
}

function welcomeUser() {
    const elUser = document.querySelector('.welcome-user')
    const logedInUser = getLoginUser()
    if (!logedInUser) location.href = 'index.html'
    elUser.innerText = logedInUser.userName
    isAdmin(logedInUser)
    renderTable(gUsers)
}

function isAdmin(logedInUser) {
    if (logedInUser.isAdmin && (document.URL.includes("welcome.html"))) {
        const elAdminButton = document.querySelector('.admin-btn')
        elAdminButton.style.display = 'block'
    }
}

function onLogOut() {
    const approval = confirm('Are you sure to log out?')
    if (approval) {
        removeLogedUser()
        location.href = 'index.html'
    }
    else return
}

function onGoAdmin() {
    const approval = confirm('Are you sure to enter admin interface?')
    if (approval) {
        alert(`Great! You will be immediately connected! ⌛`)
        location.href = 'admin.html'
    }
}

function renderTable(gUsers) {
    var strHTML = ''
    strHTML += `<tr>`
    strHTML += `<th class = "cell" > User name </th>`
    strHTML += `<th class = "cell"> Password </th>`
    strHTML += `<th class = "cell"> Last-login </th>`
    strHTML += `<th class = "cell"> is-Admin</th>`
    strHTML += `</tr>`;

    for (var i = 0; i < gUsers.length; i++) {
        strHTML += `<tr>`
        strHTML += `<td class = "cell" > ${gUsers[i].userName} </td>`
        strHTML += `<td class = "cell"> ${gUsers[i].password} </td>`
        strHTML += `<td class = "cell"> ${gUsers[i].lastLoginTime} </td>`
        strHTML += `<td class = "cell"> ${gUsers[i].isAdmin}</td>`
        strHTML += `</tr>`;
    }

    const elTable = document.querySelector('.table')
    elTable.innerHTML = strHTML
}