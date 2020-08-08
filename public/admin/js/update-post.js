{
  let articlesBlock = document.querySelector('.articles');
  let updateForm = document.querySelector('.update-post-form');
  // Search for the input 
  let titleInp = document.querySelector('#update-title');
  let textArea = document.querySelector('#update-text');
  let id;

  articlesBlock.addEventListener('click', async function(e){
    // Check if the user clicked the button remove or not
    // Check if that button has the "btn-remove" class if not the click event will be ignored
    // e means event , it has a property called target , which stores the element which is clicked
    if(e.target.classList.contains('btn-edit')) {
        id = e.target.parentNode.parentNode.querySelector('.id').value;
        let postInfo = await fetch('http://localhost:3000/posts/' + id)
             .then((resp) => resp.json())
             .then((data) => data)
      
      // fill in the form with thr current title now
      titleInp.value = postInfo.title;
      // Fill in the form with the current text of the post
      
      textArea.value = postInfo.text; 
       //  when the button is clicked two classes will be swapped
    let articlesTab = document.getElementById('v-pills-articles');
    articlesTab.classList.remove('show');
    articlesTab.classList.remove('active');
    let updateTab = document.getElementById('v-pills-update-post');
    updateTab.classList.add('show');
    updateTab.classList.add('active');
    }

  })


  updateForm.addEventListener('submit', function(e){
      e.preventDefault();
    //   This function will take the title input and area
    fetch('http://localhost:3000/posts/' + id, {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            title: titleInp.value,
            text: textArea.value,
            description:  textArea.value.substring(0,  textArea.value.indexOf('.') + 1)
        })
    }).then((resp) => resp.text())
      .then(()=> window.history.go());
  })
}