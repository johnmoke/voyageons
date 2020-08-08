let AddpostBtn = document.querySelector('.create-post-btn');
let logOutBtn = document.querySelector('.log-out-btn');



document.addEventListener('DOMContentLoaded', async function(){
  // The below functions are to be called when the page load
  addPosts();
  addCallbackRequests();
  addEmails();
})

AddpostBtn.addEventListener('click', function(){
  //  when the button is clicked two classes will be swapped
  let articlesTab = document.getElementById('v-pills-articles');
  articlesTab.classList.remove('show');
  articlesTab.classList.remove('active');
  let createTab = document.getElementById('v-pills-create-post');
  createTab.classList.add('show');
  createTab.classList.add('active');
})

async function addPosts(){
   // We call the getPosts Function
   let posts = await getPosts();
   //Search for the div with class articles
   let articles = document.querySelector('.articles');
   //Ensure that this div is always empty 
   articles.innerHTML = '';
   // Create the order number to be used for the id of post
   let i = 1;
   posts.forEach((post) => {
         let postHTML = `
         <article class="d-flex justify-content-between align-items-center article-inline">
           <div class="num w5">${i++}</div>
           <input class="id" type="hidden" value="${post.id}">
           <div class="name w30">${post.title}</div>	
           <div class="date w30">${post.date}</div>
           <div class="country w20">${post.country}</div>
           <div class="edit w10"><button class="btn btn-link btn-edit">Edit</button></div>
           <div class="remove w5"><button class="btn btn-link btn-remove">X</button></div>
         </article>`;
       //   Add articles to the empty div 
       articles.insertAdjacentHTML('beforeend', postHTML);
   });
}

async function addCallbackRequests(){
   // We get all the getrequest from the database
   let requests = await getCallbackRequests(); 
   //Search for the div with class articles
   let requestsBlock = document.querySelector('#v-pills-callback');
   //Ensure that this div is always empty before using it
   requestsBlock.innerHTML = '';
   // Create the order number to be used for the id of post
   let i = 1;
   requests.forEach((request) => {
         let requestHTML = `
         <article class="d-flex justify-content-between align-items-center article-inline">
           <div class="num w5">${i++}</div>
           <input class="id" type="hidden" value="${request.id}">
           <div class="name w60">${request.phoneNumber}</div>	
           <div class="date w30">${request.date}</div>
           <div class="remove w5"><button class="btn btn-link btn-remove">X</button></div>
         </article>`;
       //   Add articles to the empty div 
       requestsBlock.insertAdjacentHTML('beforeend', requestHTML);
   })
}

async function addEmails(){
   // We get all the getrequest from the database
   let requests = await getEmails(); 
   //Search for the tab that should activate the display of the mails
   let requestsBlock = document.querySelector('#v-pills-mails');
   //Ensure that this div is always empty before using it
   requestsBlock.innerHTML = '';
   // Create the order number to be used for the id of post
   let i = 1;
   requests.forEach((request) => {
         let requestHTML = `
         <article class="d-flex justify-content-between align-items-center article-inline">
           <div class="num w5">${i++}</div>
           <input class="id" type="hidden" value="${request.id}">
           <div class="name w30">${request.name}</div>	
           <div class="email w30">${request.email}</div>
           <div class="date w30">${request.date}</div>
           <div class="remove w5"><button class="btn btn-link btn-remove">X</button></div>
           <div class="text w100">${request.text}</div>
         </article>`;
       //   Add articles to the empty div 
       requestsBlock.insertAdjacentHTML('beforeend', requestHTML);
   });
}

logOutBtn.addEventListener('click', function(){
  // delete cookie
  document.cookie.split(";").forEach(function(c) { document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); });
  window.location.href = '/';
})