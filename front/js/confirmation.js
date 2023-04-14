const orderId = getOrderId()
displayOrderId(orderId)
deleteAllStorage()


function getOrderId() {
    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString)
    return urlParams.get("orderId")
}


function displayOrderId(orderId) {
    const elementOrderId = document.getElementById("orderId")
    elementOrderId.textContent = orderId
}

function deleteAllStorage() {
    const storage = window.localStorage
    storage.clear()
}

