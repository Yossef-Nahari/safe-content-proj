'use strict'

const LOCAL_KEY = 'USERS'

var gUsers
var gNextId = 101
var gPeoplesList = [{ name: 'Yossef', pass: 12345, admin: true },
{ name: 'liron', pass: 123, admin: false }, { name: 'Tal', pass: 1234, admin: false }]

_createUsers()

function _createUsers() {
    gUsers = loadFromStorage(LOCAL_KEY)
    if (!gUsers || !gUsers.length) {
        gUsers = []
        for (var i = 0; i < 3; i++) {
            gUsers.push(_createUser(i))
        }
        saveToStorage(LOCAL_KEY, gUsers)
    }
}

function _createUser(index) {
    return {
        id: gNextId++,
        userName: gPeoplesList[index].name,
        password: gPeoplesList[index].pass,
        lastLoginTime: new Date(),
        isAdmin: gPeoplesList[index].admin
    }
}

function doLogin(userName, password) {
    var foundedUser = gUsers.find(user => user.userName === userName && user.password === +password)
    if (foundedUser) {
        foundedUser.lastLoginTime = new Date()
        saveToStorage('LOGIN_USER', foundedUser)
        return foundedUser
    }
    else return null
}

function getLoginUser() {
    const logedInUser = loadFromStorage('LOGIN_USER')
    return logedInUser
}

function removeLogedUser() {
    removeFromStorage()
    alert('You were log out! Bye Bye! 👋🏻')
}