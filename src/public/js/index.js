const socket = io()
let user = ''
let chatbox = document.getElementById('chatbox')

Swal.fire({
    title: "Authentication",
    input: "text",
    text: "Set username for the Super Coder Chat",
    inputValidator: value => {
        return !value.trim() && "Please write a username!"
    },
    allowOutsideClick: false
})
    .then(result => {
        user = result.value
        document.getElementById('username').innerHTML = user
    })

chatbox.addEventListener('keyup', event => {
    if (event.key === 'Enter') {
        if (chatbox.value.trim().length > 0) {
            socket.emit('message', {
                user,
                message: chatbox.value
            })
            chatbox.value = ""
        }
    }
})

socket.on('logs', data => {
    const divLog = document.getElementById('messageLogs')
    let messages = ''
    data.reverse().forEach(element => {
        messages += `<p><i>${element.user}</i>: ${element.message}</p>`
    });
    divLog.innerHTML = messages
})