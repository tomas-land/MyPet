
let rezultatas = document.getElementById('rezultatas');
let cardholder = document.querySelector('.cardholder')
let selectBreed = document.getElementById('selectBreed');
// let selectBreedGroup = document.getElementById('selectBreedGroup');
let searchInput = document.getElementById('search');
let optionShowAllBreeds = document.querySelector('.showAllBreeds');
let noResults = document.getElementById('no-results');



let printCards = (breed) => {


    let optionBreed = document.createElement('option');
    optionBreed.classList.add('option');
    optionBreed.innerHTML = breed.name;
    optionBreed.setAttribute('value', breed.id)
    selectBreed.appendChild(optionBreed);

    let card = document.createElement('div');
    card.classList.add('card');
    cardholder.appendChild(card);
    let dog_image = document.createElement('img');
    dog_image.classList.add('dog-image');
    dog_image.style.backgroundImage = 'url(' + breed.image.url + ')'
    card.appendChild(dog_image);
    let dog_name = document.createElement('div');
    dog_name.classList.add('dog-name');
    dog_name.innerHTML = breed.name;
    card.appendChild(dog_name);
    let dog_bred_for = document.createElement('div');
    dog_bred_for.classList.add('dog-info');
    dog_bred_for.innerHTML = 'Bred for: ' + breed.bred_for;
    card.appendChild(dog_bred_for);
    let dog_breed_group = document.createElement('div');
    dog_breed_group.classList.add('dog-info');
    dog_breed_group.innerHTML = 'Breed group: ' + breed.breed_group;
    card.appendChild(dog_breed_group);


}

// Fetching data from API and prints all cards 
fetch('https://api.thedogapi.com/v1/breeds?limit=100', {
        headers: {
            'x-api-key': '574f5e20-249b-405a-9869-7ff632d0226d'
        }
    })
    .then(results => {
        return results.json();
    }).then((data) => {
        results = data;
        results.forEach(breed => {
            printCards(breed);
        })
    })

// Debounce 
    const debounce = (func, wait) => {
        let timeout;
      
        return function executedFunction(...args) {
          const later = () => {
            clearTimeout(timeout);
            func(...args);
          };
      
          clearTimeout(timeout);
          timeout = setTimeout(later, wait);
        };
      };

// Search breed name on keyup
searchInput.addEventListener('keyup', debounce(() => {
    cardholder.innerHTML = '';
    let counter = 0;
    results.forEach(breed => {

        if (breed.name.toLowerCase().startsWith(searchInput.value.toLowerCase())) {
            printCards(breed);
            counter++
        }
    })
    if (counter == 0) {
        noResults.style.display = 'block';
    } else {
        noResults.style.display = 'none';
    }
},500))

// Show all or single card of breed from select
selectBreed.addEventListener('change', () => {
    if (selectBreed.value == 'showall') {
        cardholder.innerHTML = '';
        results.forEach(breed => {
            printCards(breed)
        })
    } else {
        fetch(`https://api.thedogapi.com/v1/images/search?breed_ids=${selectBreed.value}`, {
                headers: {
                    'x-api-key': '574f5e20-249b-405a-9869-7ff632d0226d'
                }
            })
            .then(results => {
                return results.json();
            }).then((data) => {
                let oneBreed = data;
                console.log(oneBreed);
                cardholder.innerHTML = '';
                let card = document.createElement('div');
                card.classList.add('card', 'single-breed-card', 'col-12');
                cardholder.appendChild(card);
                let dog_image = document.createElement('img');
                dog_image.classList.add('dog-image', 'single-breed-image');
                dog_image.style.backgroundImage = 'url(' + oneBreed[0].url + ')'
                card.appendChild(dog_image);
                let dog_name = document.createElement('div');
                dog_name.classList.add('dog-name');
                dog_name.innerHTML = oneBreed[0].breeds[0].name;
                card.appendChild(dog_name);
                let dog_bred_for = document.createElement('div');
                dog_bred_for.classList.add('dog-info');
                dog_bred_for.innerHTML = 'Bred for: ' + oneBreed[0].breeds[0].bred_for;
                card.appendChild(dog_bred_for);
                let dog_breed_group = document.createElement('div');
                dog_breed_group.classList.add('dog-info');
                dog_breed_group.innerHTML = 'Breed group: ' + oneBreed[0].breeds[0].breed_group;
                card.appendChild(dog_breed_group);
            })
    }
})

// Show breed group by select
selectBreedGroup.addEventListener('change', () => {
    if (selectBreedGroup.value == 'showall') {
        cardholder.innerHTML = '';
        results.forEach(breed => {
            printCards(breed);
        })
    } else {
        var filteredResults = results.filter(function (breed) {
            return breed.breed_group === selectBreedGroup.value;
        });
        cardholder.innerHTML = '';
        filteredResults.forEach(breed => {
            printCards(breed);
        })
    }
})

//Jquery scroll to top
var btn = $('#button');

$(window).scroll(function() {
  if ($(window).scrollTop() > 300) {
    btn.addClass('show');
  } else {
    btn.removeClass('show');
  }
});

btn.on('click', function(e) {
  e.preventDefault();
  $('html, body').animate({scrollTop:0}, 0);
});
