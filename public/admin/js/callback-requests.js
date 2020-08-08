// create a function for getting all the callback request from the Db
// This function will get the posts from db to the client
async function getCallbackRequests() {
    return await fetch('http://localhost:3000/callback-requests')
         .then((response) => response.json())
         .then((data) => data);
 }

//  Delete request for the callback request
 let requestsBlock = document.querySelector('#v-pills-callback');

 requestsBlock.addEventListener('click', function(e){
    // Check if the user clicked the button remove or not
    // Check if that button has the "btn-remove" class if not the click event will be ignored
    // e means event , it has a property called target , which stores the element which is clicked
    if(e.target.classList.contains('btn-remove')) {
        // The we have to delete the button form the database 
        let id = e.target.parentNode.parentNode.querySelector('.id').value;
        // delete the post with this id number
        fetch('http://localhost:3000/callback-requests/' + id, {
            method: 'DELETE'
        }).then((resp) => resp.text())
          .then(() => window.history.go()); //This will will refresh the webpage
    }

})
