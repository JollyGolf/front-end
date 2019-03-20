const html = document.getElementsByTagName("html")[0];
const body = document.getElementsByTagName('body')[0];
const wrapper = document.getElementsByClassName('wrapper-flexbox')[0];
const item = document.getElementsByClassName('item');

/* Всплытие [stage 3] */

html.onclick = ((event) => {
  alert("target = " + event.target.className + ", this = "+ event.currentTarget.tagName +", addEvent = "+ event.type + ", type = bubbling");
});
body.onclick = ((event) => {
  alert("target = " + event.target.className + ", this = "+ event.currentTarget.tagName +", addEvent = "+ event.type + ", type = bubbling");
});
root.onclick = ((event) => {
  alert("target = " + event.target.className + ", this = "+ event.currentTarget.getAttribute("id") +", addEvent = "+ event.type + ", type = bubbling");
});
wrapper.onclick = ((event) => {
  alert("target = " + event.target.className + ", this = "+ event.currentTarget.classList +", addEvent = "+ event.type + ", type = bubbling");
});
for(let i = 0; i < item.length; i++) {
  item[i].onclick = ((event) => {
    alert("target = " + event.target.className + ", this = "+ event.currentTarget.classList +", addEvent = "+ event.type + ", type = bubbling");
  });
}

/* Перехват [stage 1] */

html.addEventListener("click", () => { 
  alert("target = " + event.target.className 
  	+ ", this = "+ event.currentTarget.tagName 
  	+ ", addEvent = "+ event.type 
  	+ ", type = capturing"
  );
}, true);

body.addEventListener("click", () => { 
  alert("target = " + event.target.className 
  	+ ", this = "+ event.currentTarget.tagName 
  	+ ", addEvent = "+ event.type 
  	+ ", type = capturing"
  );
}, true);

root.addEventListener("click", () => { 
  alert("target = " + event.target.className 
  	+ ", this = "+ event.currentTarget.getAttribute("id") 
  	+", addEvent = "+ event.type 
  	+ ", type = capturing");
}, true);

wrapper.addEventListener("click", () => { 
  alert("target = " + event.target.className 
  	+ ", this = "+ event.currentTarget.classList 
  	+", addEvent = "+ event.type 
  	+ ", type = capturing"
  );
}, true);

for(let i = 0; i < item.length; i++) {
  item[i].addEventListener("click", () => {
    alert("target = " + event.target.className 
      + ", this = "+ event.currentTarget.classList 
      +", addEvent = "+ event.type 
      + ", type = capturing"
    );
  }, true);
}

/* Отмена всплития одного или нескольких обработчиков 

document.getElementsByClassName('item')[56].event.stopPropagation();   
document.getElementsByClassName('item')[78].event.stopImmediatePropagation();

*/