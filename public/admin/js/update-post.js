{
  let articlesBlock = document.querySelector('.articles');
  let updateForm = document.querySelector('.update-post-form');
  let titleInp = document.querySelector('#update-title');
  let textArea = document.querySelector('#update-text');
  let id;

  articlesBlock.addEventListener('click', async e => {
    if (e.target.classList.contains('btn-edit')) {
      id = e.target.parentNode.parentNode.querySelector('.id').value;
      let postInfo = await fetch(`http://localhost:3000/posts/${id}`)
        .then(res => res.json())
        .then(data => data);

      titleInp.value = postInfo.title;

      textArea.value = postInfo.text;

      let articlesTab = document.getElementById('v-pills-articles');
      articlesTab.classList.remove('show');
      articlesTab.classList.remove('active');

      let updateTab = document.getElementById('v-pills-update-post');
      updateTab.classList.add('show');
      updateTab.classList.add('active');
    }
  });

  updateForm.addEventListener('submit', e => {
    e.preventDefault();
    fetch(`http://localhost:3000/posts/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: titleInp.value,
        text: textArea.value
      })
    })
      .then(res => res.text())
      .then(() => window.history.go());
  });
}
