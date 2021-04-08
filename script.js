const timeEl = document.querySelector('.time'),
  dateEl = document.querySelector('.date'),
  quoteText = document.querySelector('.quote-text'),
  quoteAuthor = document.querySelector('.author'),
  greeting = document.querySelector('.greeting'),
  userName = document.querySelector('.user-name'),
  focus = document.querySelector('.focus');

// get the time
function timer() {
  const currentDate = new Date();
  const currentTime = currentDate.toLocaleString('default', {
    timeStyle: 'medium',
    hour12: 'true',
  });

  const currentDay = currentDate.toLocaleString('default', {
    dateStyle: 'full',
  });
  timeEl.innerHTML = currentTime;

  dateEl.innerText = currentDay;
  setTimeout(timer, 1000); // update the dom every second (countdown)
}

const displayQuote = () => {
  const generateRandomQuote = Math.floor(Math.random() * quotes.length);
  const getQuoteText = quotes[generateRandomQuote].text;
  const getQuoteAuthor = quotes[generateRandomQuote].author;

  quoteText.textContent = getQuoteText;
  quoteAuthor.textContent = getQuoteAuthor;

  setInterval(displayQuote, 600000); // displays new quote every ten minute
};

// fetch api data
const getData = () => {
  let quotes;
  const api = 'https://type.fit/api/quotes';
  fetch(api)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      this.quotes = data;
      displayQuote();
    })
    .catch((err) => console.log(`Request faild: ${err}`));
};

// change background image based on the time of the day
const changeBg = () => {
  const date = new Date();
  let currentHour = date.getHours();
  console.log(currentHour);

  if (currentHour < 12) {
    // morning
    document.body.style.backgroundImage = `url(${'https://images.pexels.com/photos/4056535/pexels-photo-4056535.jpeg?cs=srgb&dl=pexels-cottonbro-4056535.jpg&fm=jpg'})`;
    greeting.textContent = 'Good Morning';
  } else if (currentHour < 16) {
    // afternoon
    document.body.style.backgroundImage = `url(${'https://images.pexels.com/photos/4792498/pexels-photo-4792498.jpeg?cs=srgb&dl=pexels-anete-lusina-4792498.jpg&fm=jpg'})`;
    greeting.textContent = 'Good Afternoon';
  } else if (currentHour < 20) {
    document.body.style.backgroundImage = `url(${'https://images.pexels.com/photos/1048283/pexels-photo-1048283.jpeg?cs=srgb&dl=pexels-lisa-fotios-1048283.jpg&fm=jpg'})`;
    greeting.textContent = 'Good Evening';
  } else {
    // night
    document.body.style.backgroundImage = `url(${'https://images.pexels.com/photos/91216/pexels-photo-91216.jpeg?cs=srgb&dl=pexels-stefan-stefancik-91216.jpg&fm=jpg'})`;
    greeting.textContent = 'Good Night';
    document.body.style.color = 'white';
  }
};

// get user name
const getName = () => {
  if (localStorage.getItem('userName') === null) {
    userName.textContent = '[Enter Name]';
  } else {
    userName.textContent = localStorage.getItem('userName');
  }
};

window.addEventListener('load', getData);

// store user name in local storage
const setName = (e) => {
  if (e.type === 'keypress') {
    if (e.which == 13 || e.keyCode === 13) {
      localStorage.setItem('userName', e.target.innerText);
      userName.blur();
    }
  } else {
    localStorage.setItem('userName', e.target.innerText);
  }
};

userName.addEventListener('keypress', setName);
userName.addEventListener('blur', setName);
timer();
changeBg();
getName();
