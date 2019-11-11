getCallbacks = async () => {
  return await fetch(`http://localhost:3000/callbacks`)
    .then(res => res.json())
    .then(data => data);
};

let callbackBlock = document.querySelector('#v-pills-callback');

callbackBlock.addEventListener('click', function(e) {
  if (e.target.classList.contains('btn-remove')) {
    let id = e.target.parentNode.parentNode.querySelector('.id').value;
    fetch(`http://localhost:3000/callbacks/${id}`, {
      method: 'DELETE'
    })
      .then(res => res.text())
      .then(() => window.history.go());
  }
});
