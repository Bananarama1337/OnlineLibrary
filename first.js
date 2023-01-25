let myLibrary = [];

const btn = document.querySelector('#submit_btn');
const container = document.querySelector('#container');
const nameInput = document.querySelector('#book_name');
const authorInput = document.querySelector('#book_author');
const pagesInput = document.querySelector('#book_pages');

/* Конструктор книги */
function Book(){
    this.name = nameInput.value;
    this.author = authorInput.value;
    this.pages = pagesInput.value;
    this.read = document.querySelector('input[name="read_state"]:checked').value;
};

Book.prototype.toString = function(){
    return this.name + ' by ' + this.author + ', ' + this.pages + ', ' + this.read;
}

function addBookLibrary(){
    if (nameInput.value.length == 0){
        alert('Вы не ввели название книги');
        return
    } else if (authorInput.value.length == 0){
        alert('Вы не ввели имя автора');
        return
    } else if (pagesInput.value.length == 0){
        alert('Вы не ввели количество стрниц в книге');
        return
    } else{
        myLibrary.push(new Book());
    }
}

btn.addEventListener('click', () =>{
    addBookLibrary();
    createBookWrap(myLibrary);
});

/* Удаление книги */

function deleteBook(event){
    myLibrary.splice(Number(event.target.getAttribute('class')) - 1, 1);
    createBookWrap(myLibrary);
}

/* Изменение состояния прочтения книги */
function changeReadState(event){
    /* Меняем символ read */
    event.target.classList.toggle('fa-check');
    event.target.classList.toggle('fa-times');

    /* Меняем состояние read в списке */
    if (event.target.classList[1] == 'fa-times'){
        myLibrary[count-2].read = 'not read';
    } else if (event.target.classList[1] == 'fa-check'){
        myLibrary[count-2].read = 'read';
    }
}

/* Анимация удаления карточки */
function deleteWrap(event){
    let wrap = document.getElementsByClassName(`book_wrap ${event.target.getAttribute('class').slice(-1)}`);
    wrap[0].style.transition = '0.5s ease';
    wrap[0].style.transform = 'scale(0.01, 0.01)';
}

/* Создаем карточку для книги */
function createBookWrap(list){
    while (container.firstChild){
        container.removeChild(container.lastChild);
    }

    count = 0;
    for (elem of list){
        count++;
        const wrapDiv = document.createElement('div');
        container.appendChild(wrapDiv);
        wrapDiv.classList.add('book_wrap');
        wrapDiv.classList.add(`${count}`);

        const bookName = document.createElement('p');
        bookName.textContent = elem.name;
        bookName.style.fontStyle = 'italic';
        const authorName = document.createElement('p');
        authorName.textContent = 'by ' + elem.author;
        authorName.style.borderBottom = '1px solid white'
        const pagesNum = document.createElement('p');
        pagesNum.textContent = elem.pages + ' pages';

        /* Добавление состояния прочтения книги */
        const readState = document.createElement('p');
        const character = document.createElement('i');
        if (elem.read == 'read'){
            character.classList.add('fas');
            character.classList.add('fa-check');
        } else if (elem.read == 'not read'){
            character.classList.add('fas');
            character.classList.add('fa-times');
        }
        readState.addEventListener('click', changeReadState);
        wrapDiv.appendChild(readState);
        readState.appendChild(character);

        wrapDiv.appendChild(bookName);
        wrapDiv.appendChild(authorName);
        wrapDiv.appendChild(pagesNum);
        wrapDiv.appendChild(readState);

        /* Добавляем кнопку для удаления карточки */

        let deleteBtn = document.createElement('button');
        deleteBtn.classList.add('deleteBtn');
        deleteBtn.classList.add(`${count}`);
        deleteBtn.textContent = 'Delete';
        wrapDiv.appendChild(deleteBtn);
        deleteBtn.addEventListener('click', (event) => {
            deleteWrap(event);
            if (setTimeout(()=> {deleteBook(event)}, 500)){
            }
        });
    }
}

