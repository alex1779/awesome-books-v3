import Book from './class.js';

class Library {
  constructor() {
    this.books = JSON.parse(localStorage.getItem('MY-Library')) || [];
    this.section = document.querySelector('#book-list');
    this.form = document.querySelector('#form');
    this.title = document.querySelector('#title');
    this.author = document.querySelector('#author');
    this.addButton = document.getElementById('add-book-btn');

    this.addButton.addEventListener('click', () => this.addBook());
    this.getBooks();
  }

  addBook() {
    const bookTitle = this.title.value;
    const bookAuthor = this.author.value;
    const objBook = new Book(bookTitle, bookAuthor);
    this.books.push(objBook);
    this.saveToLocalStorage();
    this.getBooks();
    this.clearInputs();
  }

  removeBook(title, author) {
    this.books = this.books.filter(
      (objBook) => objBook.title !== title || objBook.author !== author,
    );
    this.saveToLocalStorage();
    this.getBooks();
  }

  // Local Storage
  saveToLocalStorage() {
    localStorage.setItem('MY-Library', JSON.stringify(this.books));
  }

  getBooks() {
    this.section.innerHTML = '';
    this.books.forEach((book) => {
      const div = document.createElement('div');
      const removeButton = document.createElement('button');
      removeButton.innerText = 'Remove';
      removeButton.className ='btn remove-btn'
        removeButton.addEventListener('click', () => {
          this.removeBook(book.title, book.author)
        });
        div.textContent = `${book.title} by ${book.author}`;
        div.appendChild(removeButton);
        div.className = 'tr';
        this.section.appendChild(div);
    });

    }

    clearInputs(){
      this.title.value = "";
      this.author.value = "";
  }

}

// let listBooks
const listBooks = new Library();

// ====================== NAVIGATION =========================
function displayTime() {
  const option = {
    month: 'long',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  };
  const today = new Date();
  let date = today.toLocaleString('en-US', option);
  date = date.replace(' at', ',');
  document.getElementById('date').innerHTML = date;
  setTimeout(displayTime, 1000);
}
displayTime();

// MENUS
const listMenuLink = document.querySelector('#m-list');
const addMenuLink = document.querySelector('#m-add');
const contactMenuLink = document.querySelector('#m-contact');
// Get all the section
// const mainSection = document.querySelector('.main-section');
const sections = document.querySelectorAll('section');
const pageTitle = document.querySelector('#page-title');
// Menu Links
const listLink = document.querySelector('#m-list a');
const addLink = document.querySelector('#m-add a');
const contactLink = document.querySelector('#m-contact a');

function displaySection(sectionToDisp) {
  sections.forEach((section) => {
    if (sectionToDisp === 'book-list') {
      pageTitle.style.display = 'block';
      if (!listLink.classList.contains('active')) {
        listLink.classList.add('active');
      }
      addLink.classList.remove('active');
      contactLink.classList.remove('active');
    } else if (sectionToDisp === 'add-book') {
      if (!addLink.classList.contains('active')) {
        addLink.classList.add('active');
      }

      listLink.classList.remove('active');
      contactLink.classList.remove('active');
      pageTitle.style.display = 'none';
    } else {
      if (!contactLink.classList.contains('active')) {
        contactLink.classList.add('active');
      }

      addLink.classList.remove('active');
      listLink.classList.remove('active');
      pageTitle.style.display = 'none';
    }

    if (section.id === sectionToDisp) {
      section.classList.remove('hide-section');
      section.classList.add('show-section');
    } else {
      section.classList.remove('show-section');
      section.classList.add('hide-section');
    }
  });
}

listMenuLink.addEventListener('click', () => {
  displaySection('book-list');
});

addMenuLink.addEventListener('click', () => {
  displaySection('add-book');
});

contactMenuLink.addEventListener('click', () => {
  displaySection('contact');
});
