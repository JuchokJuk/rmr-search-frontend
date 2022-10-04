const requestsList = document.getElementById("request-list");
const downloadButton = document.getElementById("download-button");
const caption = document.getElementById("caption");

let requests;

(async () => {
  let dataLoaded;
  try {
    requests = await getRequests();
    dataLoaded = true;
  } catch (e) {
    dataLoaded = false;
  }

  // const loadingTime = 1000;
  // setTimeout(() => {
    if (dataLoaded) {
      if(requests.length > 0){
        successHandler();
      }else{
        emptyDataHandller()
      }
    } else {
      failureHandler();
    }
  // }, loadingTime);
})();

function successHandler() {
  requestsList.classList.remove("request-list_hidden");
  for (const request of requests) {
    const item = htmlToElement(
      `<div class="request-list__item">${request}</div>`
    );
    requestsList.appendChild(item);
  }

  const captionText = createCaption();
  caption.classList.add("header__caption_hidden");
  setTimeout(() => {
    caption.innerText = captionText;
    caption.classList.remove("header__caption_hidden");
  }, 200);

  const csv = requests.join("\r\n");

  downloadButton.setAttribute(
    "href",
    "data:text/csv;charset=utf-8,%EF%BB%BF" + encodeURIComponent(csv)
  );
  downloadButton.setAttribute("download", captionText);
  downloadButton.classList.remove("header__exel_disabled");
}

function emptyDataHandller(){
  caption.classList.add("header__caption_hidden");
  setTimeout(() => {
    caption.innerText = "Пока что, никто ничего не искал";
    caption.classList.remove("header__caption_hidden");
  }, 200);
}

function failureHandler() {
  caption.classList.add("header__caption_hidden");
  setTimeout(() => {
    caption.innerText = "Не удалось загрузить историю запросов :(";
    caption.classList.remove("header__caption_hidden");
  }, 200);
}

function format(date) {
  return date.toLocaleDateString("ru-US", {
    month: "long",
    day: "numeric",
  });
}

function createCaption() {
  let date = new Date();
  const month = date.getMonth();

  date.setMonth(month - 1);
  if (date.getMonth() == month) {
    date.setDate(0);
  }
  date.setHours(0, 0, 0, 0);

  const monthAgo = format(date);

  const currentDate = format(new Date());

  const caption = `История запросов c ${monthAgo} по ${currentDate}`;
  return caption;
}
