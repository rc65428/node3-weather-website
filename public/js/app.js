const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')


weatherForm.addEventListener('submit', (e) => {

    e.preventDefault()

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    
    const location = search.value
    fetch('http://127.0.0.1:3000/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if(data.error){
                return messageOne.textContent='Error: ' + data.error// console.log('Error: ' + data.error)
            }
            messageOne.textContent = data.location
            messageTwo.textContent = data.forecast
            
            
        })
    })
    
})