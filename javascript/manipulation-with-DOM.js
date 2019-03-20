const root = document.getElementById("root");
//console.log(root);
let wrapperDiv = document.createElement("div");
root.appendChild(wrapperDiv); 
let textWrapperDiv = document.createTextNode("XMPL");
wrapperDiv.appendChild(textWrapperDiv);
wrapperDiv.innerHTML = '';
wrapperDiv.className = 'wrapper-flexbox';

for(let i = 0; i < 200; i++) {
  let elementDiv = document.createElement("div");
  let textItem = document.createTextNode('item-'+i);
  elementDiv.setAttribute('data-id', i);
  elementDiv.appendChild(textItem);
  wrapperDiv.appendChild(elementDiv);
  elementDiv.setAttribute('id', i);
  elementDiv.className = 'item item-'+i;
}