document.addEventListener('DOMContentLoaded', function () {
    const watchForm = document.getElementById('watch-form');
    const watchList = document.getElementById('watch-list');
    const modal = document.getElementById('modal');
    const modalContent = document.getElementById('modal-content');

    let watches = [];

   
function displayWatches() {
    watchList.innerHTML = '';
    watches.forEach((watch, index) => {
        const watchElement = document.createElement('div');
        watchElement.classList.add('watch');
        watchElement.innerHTML = `
            <div class="watch-image-container">
                ${watch.photo ? `<img src="${watch.photo}" alt="${watch.brand} ${watch.model}" class="watch-photo">` : ''}
            </div>
            <strong>${watch.brand} ${watch.model}</strong> (${watch.year}), ${watch.style}, $${watch.price.toFixed(2)}
            <button class="edit-button" data-index="${index}">Редактировать</button>
            <button class="delete-button" data-index="${index}">Удалить</button>
        `;
        watchList.appendChild(watchElement);
    });
}


document.getElementById('watch-form').addEventListener('submit', function(event) {
    event.preventDefault();

  
    const brand = document.getElementById('brand').value;
    const model = document.getElementById('model').value;
    const year = document.getElementById('year').value;
    const style = document.getElementById('style').value;
    const price = document.getElementById('price').value;
    const photoFile = document.getElementById('photo').files[0];

    
    if (photoFile) {
       
        const photoURL = URL.createObjectURL(photoFile);
        
    }

    
    if (brand && model && year && style && price) {
        watches.push({ brand, model, year, style, price, photo: photoURL || '' });
        displayWatches();
    } else {
        alert('Пожалуйста, введите корректные данные.');
    }
});
 
function addWatch(brand, model, year, style, price, photo) {
    const watch = {
        brand: brand,
        model: model,
        year: year,
        style: style,
        price: parseFloat(price),
        photo: photo 
    };
    watches.push(watch);
    displayWatches();

    showModal(watch);
}
  
function editWatch(index) {
    const watch = watches[index];
    const brand = prompt('Введите новую марку:', watch.brand);
    const model = prompt('Введите новую модель:', watch.model);
    const year = parseInt(prompt('Введите новый год выпуска:', watch.year));
    const style = prompt('Введите новый стиль:', watch.style);
    const price = parseFloat(prompt('Введите новую цену ($):', watch.price));
    const photo = prompt('Введите URL новой фотографии:', watch.photo || '');

    if (brand && model && !isNaN(year) && style && !isNaN(price)) {
        watches[index] = { brand, model, year, style, price, photo };
        displayWatches();
    } else {
        alert('Пожалуйста, введите корректные данные.');
    }
}
  
    function deleteWatch(index) {
        watches.splice(index, 1);
        displayWatches();
    }

 
watchForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const brand = watchForm.querySelector('#brand').value;
    const model = watchForm.querySelector('#model').value;
    const year = parseInt(watchForm.querySelector('#year').value);
    const style = watchForm.querySelector('#style').value;
    const price = parseFloat(watchForm.querySelector('#price').value);
    const photoInput = watchForm.querySelector('#photo');
    let photo = null;

 
    if (photoInput.files && photoInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function (e) {
            photo = e.target.result;
            addWatch(brand, model, year, style, price, photo);
        };
        reader.readAsDataURL(photoInput.files[0]);
    } else {
        addWatch(brand, model, year, style, price, photo);
    }

    if (brand && model && !isNaN(year) && style && !isNaN(price)) {
        watchForm.reset();
    } else {
        alert('Пожалуйста, заполните все поля корректно.');
    }
});
   
    modal.addEventListener('click', function (event) {
        if (event.target === modal || event.target.classList.contains('close')) {
            modal.style.display = 'none';
        }
    });


function showModal(watch) {
    modal.style.display = 'block';
    modalContent.innerHTML = `
        <p><strong>Марка:</strong> ${watch.brand}</p>
        <p><strong>Модель:</strong> ${watch.model}</p>
        <p><strong>Год выпуска:</strong> ${watch.year}</p>
        <p><strong>Стиль:</strong> ${watch.style}</p>
        <p><strong>Цена ($):</strong> ${watch.price.toFixed(2)}</p>
        <!-- Отображение фотографии -->
        <div class="modal-image-container">
            ${watch.photo ? `<img src="${watch.photo}" alt="${watch.brand} ${watch.model}" class="watch-photo">` : ''}
        </div>
    `;
}


    watchList.addEventListener('click', function (event) {
        if (event.target.classList.contains('edit-button')) {
            const index = event.target.dataset.index;
            editWatch(index);
        } else if (event.target.classList.contains('delete-button')) {
            const index = event.target.dataset.index;
            deleteWatch(index);
        }
    });

 
    displayWatches();
});