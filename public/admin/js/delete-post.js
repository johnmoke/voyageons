let articlesBlock = document.querySelector('.articles');

articlesBlock.addEventListener('click', function(e){
    // Check if the user clicked the button remove or not
    // Check if that button has the "btn-remove" class if not the click event will be ignored
    // e means event , it has a property called target , which stores the element which is clicked
    if(e.target.classList.contains('btn-remove')) {
        // The we have to delete the button form the database 
        let id = e.target.parentNode.parentNode.querySelector('.id').value;
        // delete the post with this id number
        fetch('http://localhost:3000/posts/' + id, {
            method: 'DELETE'
        }).then((resp) => resp.text())
          .then(() => window.history.go()); //This line returns the user to the main page
    }

})