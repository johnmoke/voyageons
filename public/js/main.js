let callMeForm = document.querySelector('.call-me-form');
document.addEventListener('DOMContentLoaded', async function(){
    // We call the getPosts Function
    let posts = await getPosts();
    //Search for the div with class articles
    let articles = document.querySelector('.articles');
    //Ensure that this div is always empty 
    articles.innerHTML = '';
    posts.forEach((post) => {
          let postHTML = `
          <div class="col-4">
            <div class="card">
              <img class="card-img-top" src="${post.imageURL}" alt="${post.title}">
              <div class="card-body">
                  <h4 class="card-title">${post.title}</h4>
                  <p class="card-text">${post.description}</p>
                  <a href="/sight?id=${post.id}" class="btn btn-primary">Details</a>
              </div>
            </div>
      </div>`;
        //   Add articles to the empty div 
        articles.insertAdjacentHTML('beforeend', postHTML);
    });
})

callMeForm.addEventListener('submit', function(e){
  e.preventDefault();
  // search the input that has the phone number in it
  let phoneInp = callMeForm.querySelector('input');
  // make a post request to the server
  fetch('http://localhost:3000/callback-requests', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify({
      phoneNumber: phoneInp.value
    })
  }).then((resp) => resp.text()).then(() => alert('We will call you back as soon as possible'))
})