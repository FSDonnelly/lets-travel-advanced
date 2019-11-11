let addPostBtn = document.querySelector(`.create-post-btn`);

document.addEventListener('DOMContentLoaded', async () => {
  addPost();
  addCallbackRequest();
  addEmails();
});

addPostBtn.addEventListener('click', () => {
  let articlesTab = document.getElementById('v-pills-articles');
  articlesTab.classList.remove('show');
  articlesTab.classList.remove('active');

  let createTab = document.getElementById('v-pills-create-post');
  createTab.classList.add('show');
  createTab.classList.add('active');
});

addPost = async () => {
  let posts = await getPosts();
  let articles = document.querySelector('.articles');
  articles.innerHTML = '';
  let i = 1;
  posts.forEach(post => {
    let postHTML = `<article
                        class="d-flex justify-content-between align-items-center article-inline"
                      >
                        <div class="num w5">${i++}</div>
                        <input class='id' type='hidden' value='${post.id}'>
                        <div class="name w30">${post.title}</div>
                        <div class="date w30">${post.date}</div>
                        <div class="country w20">${post.country}</div>
                        <div class="edit w10">
                          <button class="btn btn-link btn-edit">Edit</button>
                        </div>
                        <div class="remove w5">
                          <button class="btn btn-link btn-remove">X</button>
                        </div>
                      </article>`;
    articles.insertAdjacentHTML('beforeend', postHTML);
  });
};

addCallbackRequest = async () => {
  let callbacks = await getCallbacks();
  let cbRequests = document.querySelector('#v-pills-callback');
  cbRequests.innerHTML = '';
  let i = 1;
  callbacks.forEach(callback => {
    let callbackHTML = `<article
                        class="d-flex justify-content-between align-items-center article-inline"
                      >
                        <div class="num w5">${i++}</div>
                        <input class='id' type='hidden' value='${callback.id}'>
                        <div class="name w60">${callback.phoneNumber}</div>
                        <div class="date w30">${callback.date}</div>
                        <div class="remove w5">
                          <button class="btn btn-link btn-remove">X</button>
                        </div>
                      </article>`;
    cbRequests.insertAdjacentHTML('beforeend', callbackHTML);
  });
};

addEmails = async () => {
  let emails = await getEmails();
  let emailsRequests = document.querySelector('#v-pills-mails');
  emailsRequests.innerHTML = '';
  let i = 1;
  emails.forEach(email => {
    let emailHTML = `<article
                        class="d-flex justify-content-between align-items-center article-inline"
                      >
                        <div class="num w5">${i++}</div>
                        <input class='id' type='hidden' value='${email.id}'>
                        <div class="name w30">${email.name}</div>
                        <div class="email w30">${email.email}</div>
                    
                        <div class="date w30">${email.date}</div>
                        <div class="remove w5">
                          <button class="btn btn-link btn-remove">X</button>
                        </div>
                            <div class="text w100">${email.text}</div>
                      </article>`;
    emailsRequests.insertAdjacentHTML('beforeend', emailHTML);
  });
};
