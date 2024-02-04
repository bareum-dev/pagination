const url = 'https://jsonplaceholder.typicode.com/posts';

const posts = document.querySelector('.posts');
const pagination = document.querySelector('.pagination');



// getData
async function getData() {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

// getStart
async function getStart() {
  const data = await getData();
  let currentPage = 0;
  let postsPerPage = 10;

  displayData(data, postsPerPage, currentPage);
  displayPagination(data, postsPerPage);
  getActive();
}

getStart();

// displayData
function displayData(data, postsPerPage, page) {
  posts.textContent = '';

  let start = postsPerPage * page;
  let end = start + postsPerPage;

  const paginatedData = data.slice(start, end);

  paginatedData.forEach((el) => {
    const post = document.createElement('article');
    post.textContent = el.title;

    posts.appendChild(post);
  })
}

// displayPagination
function displayPagination(data, postsPerPage) {
  pagination.textContent = '';

  const pagesCount = Math.ceil(data.length / postsPerPage);

  const ul = document.createElement('ul');

  for (let i = 0; i < pagesCount; i += 1) {
    const li = document.createElement('li');
    li.classList.add('pagination__item');
    li.textContent = i + 1;
    li.setAttribute('data-page', `${i + 1}`);

    ul.appendChild(li);

    li.addEventListener('click', (e) => {
      currentPage = i;
      displayData(data, postsPerPage, currentPage);

      const page = +e.target.textContent;
      getActive(page);
    })
  }

  pagination.appendChild(ul);
}

function getActive(page = 1) {
  const lis = document.querySelectorAll('li.pagination__item');
  lis.forEach((el) => {
    if (el.classList.contains('active')) el.classList.remove('active');
  })

  document.querySelector(`[data-page="${page}"]`).classList.add('active');
}