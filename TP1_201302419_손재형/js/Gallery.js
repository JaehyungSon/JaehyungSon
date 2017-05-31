/*갤러리 이미지는 div가 가장 밖에서 감싸고있고, div안에는 이미지와 x버튼으로 구성되어있다.*/

var Gallery_img_div; //이미지를 감싸고있는 div를 가져오기위한 변수
var Gallery_img; //이미지를 가져오기위한 변수
var delete_imgs = []; //삭제한 이미지를 저장해둘 배열

//초기 Gallery.js가 html에서 로드될경우에 실행할 코드이다.
function init_Gallery() {

  Gallery_img_div = document.getElementsByClassName("Gallery_img_div"); //img를 감싸고있는 div들(class가 Gallery_img_div)을 가져와서 변수에 넣어준다.
  Gallery_img = document.getElementsByClassName("Gallery_img"); //img들(class가 Gallery_img)을 가져와 변수에 넣어준다.

  /*아래의 반복문은 이미지 div내에 x버튼을 만들어주는 부분, 각 index에 해당하는 이미지에 커서를 올렸을시에
  이미지에대한 설명이 이미지위에 뜨는것을 처리하기위한 함수를 추가해주는 부분이다.*/

  for (var i = 0; i < Gallery_img_div.length; i++) { //갤러리의 이미지의 갯수만큼 반복한다.

    //img_tag는 이미지를 삭제하는 버튼을 의미한다.
    var img_tag = document.createElement("img"); //img태그를 가진 Element Node를 만들어준다.
    img_tag.id = "img_delete_button" + i; //img태그의 id를 지정해준다.
    img_tag.src = "./img/modal_button/x.PNG"; //img태그에 src를 설정해준다.
    img_tag.setAttribute("class", "img_delete_button"); //img_tag.class가 작동하지 않아서, setAttribute를통해서 class를 지정해주었다.
    img_tag.setAttribute("onclick", "delete_img(" + i + ")"); //img_tag를 클릭했을시, 즉 이미지의 x버튼을 눌렀을시 함수호출을 지정해주었다.
    Gallery_img_div[i].appendChild(img_tag); //만들어준 x버튼을 알맞는 div의 자식노드에 추가시켜준다.

    //아래의 modal부분은 이미지 위에 마우스를 올리거나, 마우스를 치웠을때를 지정해주는 부분이다.
    var modal = document.createElement("div"); //div태그를 가진 Element Node를 만들어준다.
    modal.id = "img_modal_button" + i; //id를 지정해준다.
    modal.setAttribute("class", "img_modal_button"); //class를 지정해준다.
    modal.setAttribute("onmouseover", "mouseover(" + i + ")"); //마우스를 해당 div위에 올렸을 시에 함수를 지정해준다.
    modal.setAttribute("onmouseout", "mouseout(" + i + ")"); //마우스를 해당 div위에서 나왓을 시에 함수를 지정해준다.
    modal.setAttribute("onclick", "modal_open(" + i + ")"); //해당 div를 클릭하였을때 호출할 함수를 지정해준다.

    //modal_text는 이미지 위의 네모상자위에 택스트를 적어주어야하는데, 이때 네모상자를 만들기 위해 사용한다.
    var modal_text = document.createElement("div"); //div태그를 가진 Element Node를 만들어준다.
    modal_text.id = "img_modal_text" + i; //id를 지정해준다.
    modal_text.setAttribute("class", "img_modal_text"); //class를 지정해준다.
    modal_text.appendChild(document.createTextNode(Gallery_img[i].getAttribute("alt"))); //div내의 택스트 Element Node를 만들어주고, 내용은 해당 이미지의 'alt'태그의 속성값을 넣어준다.
    modal.appendChild(modal_text); //해당 text를 입력한 div를 modal의 child에 붙여준다.
    Gallery_img_div[i].appendChild(modal);  //만들어준 div를 알맞는 이미지div의 자식 노드에 추가시켜준다.

    Gallery_img[i].setAttribute("onmouseover", "mouseover(" + i + ")");  //마우스를 해당 이미지위에 올렸을 시에 함수를 지정해준다.
    Gallery_img[i].setAttribute("onmouseout", "mouseout(" + i + ")"); //마우스를 해당 이미지위에서 나왔을 시에 함수를 지정해준다.
    Gallery_img[i].setAttribute("onclick", "modal_open(" + i + ")");  //해당 이미지를 클릭하였을때의 함수를 지정해준다.


  }
  load_data();  //localStorage에 저장해두었던 정보를 불러오는 함수를 실행한다.
}

function delete_img(img_index) {  //이미지를 삭제, 즉 x버튼을 눌렀을때의 함수이다. 매개변수로 이미지의 index가 들어온다.
  Gallery_img_div[img_index].style.display = "none";  //이미지의 index에 해당하는 div를 display='none' 처리해주어 화면에서 삭제해준다.
  delete_imgs[img_index] = 1; //삭제해준 이미지를 배열에 표시해준다.
  save_data();  //localStorage에 삭제한 정보를 저장하는 함수를 실행한다.
}

function mouseover(img_index) { //마우스를 이미지위에 올렸을시에 함수이다. 매개변수로 이미지의 index가 들어온다.
  Gallery_img[img_index].style.opacity = "0.6"; //이미지의 투명도를 주어 과제의 요구사항과 같은 효과를 준다.
  document.getElementById("img_modal_button" + img_index).style.visibility = "visible"; //이미지의 정보를 표시해주는 div를 visible상태로 바꿔준다.

}

function mouseout(img_index) {  //마우스를 이미지위에서 나왔을시에 함수이다. 매개변수로 이미지의 index가 들어온다.
  Gallery_img[img_index].style.opacity = "1"; //이미지를 투명하게 해준것을 다시 원상복구 시켜준다
  document.getElementById("img_modal_button" + img_index).style.visibility = "hidden"; //이미지의 정보를 표시해 주는 div를 hidden상태로 바꾸어준다.

}

var current_modal_index;  //모달창에서 현재 몇번째 index의 이미지를 보고있는지를 표시할 변수이다.

/* 모달 구조 설명
모달창은 position을 fixed로 지정해주어 브라우저의 위에 뜨도록 하였으며,
width와 height를 100%로 지정해주어 반투명한 화면을 구성하였음
반투명한 화면위에 이미지를 띄워주고, 좌측 우측 버튼을 배치 및 중앙에 이미지가 표시되도록 구성*/

function modal_open(img_index) {  //모달창을 띄우는 함수이다. 매개변수로 이미지의 index가 들어온다.
  document.getElementById("modal_background").style.display = "block";  //modal창의 background(불투명한 div)를 보이도록 설정한다.
  document.getElementById("modal").style.display = "block"; //modal창의 이미지를 보이도록 설정한다.
  document.getElementById("modal_left_button").style.display = "block"; //modal창의 최즉 이동 버튼이 보이도록 설정한다.
  document.getElementById("modal_right_button").style.display = "block";//modal창의 우즉 이동 버튼이 보이도록 설정한다.
  document.getElementById("modal_img").src = document.getElementsByClassName("Gallery_img")[img_index].src; //매개변수로 들어온 index의 이미지를 모달창의 이미지로 설정해준다.
  current_modal_index = img_index;  //현재 이미지의 index를 지정해주어 left 혹은 right 이동을 할때 사용한다.
}

function modal_close(img_index) { //모달창을 닫는 함수이다. 매개변수로 이미지의 index가 들어온다.
  document.getElementById("modal_background").style.display = "none"; //modal창의 background(불투명한 div)를 안보이도록 설정한다.
  document.getElementById("modal").style.display = "none";//modal창의 이미지를 안보이도록 설정한다.
  document.getElementById("modal_right_button").style.display = "none";//modal창의 우즉 이동 버튼이 안보이도록 설정한다.
  document.getElementById("modal_left_button").style.display = "none";//modal창의 최즉 이동 버튼이 안보이도록 설정한다.
}

function modal_left_click() {//모달창에서 left버튼을 눌렀을때의 함수이다.
  if (current_modal_index == 0) { //현재 index가 0이라면, 즉 이미지의 맨 첫번째라면
    current_modal_index = Gallery_img.length; //이미지의 마지막 부분 + 1 으로 이동한다.
  }
  current_modal_index = current_modal_index - 1;  //current_modal_index를 1을 빼주어 이전 인덱스로 이동한다.
  while (delete_imgs[current_modal_index] == true) {  //현재 current_modal_index가 삭제를 확인하기위한 인덱스에 표시되어있다면, 왼쪽으로 한칸씩 더 이동하는 반복문이다.
    if (current_modal_index == 0) { //현재 index가 0이라면, 즉 이미지의 맨 첫번째라면
      current_modal_index = Gallery_img.length;//이미지의 마지막 부분 + 1 으로 이동한다.
    }
    current_modal_index = current_modal_index - 1;//current_modal_index를 1을 빼주어 이전 인덱스로 이동한다.
  }
  document.getElementById("modal_img").src = document.getElementsByClassName("Gallery_img")[current_modal_index].src; //modal창의 이미지를 변경해준다.
}

function modal_right_click() {//모달창에서 right버튼을 눌렀을때의 함수이다.
  current_modal_index = current_modal_index + 1;  //current_modal_index에 1을 더해주어 다음 인덱스로 이동한다.
  if (current_modal_index == Gallery_img.length) {  //current_modal_index가 최대 index+1(총 갯수)라면 index 0으로 이동한다.
    current_modal_index = 0;
  }

  while (delete_imgs[current_modal_index] == true) {  //현재 current_modal_index가 삭제를 확인하기위한 인덱스에 표시되어있다면, 오른쪽으로 한칸씩 더 이동하는 반복문이다.
    current_modal_index = current_modal_index + 1; //current_modal_index에 1을 더해주어 다음 인덱스로 이동한다.
    if (current_modal_index == Gallery_img.length) { //current_modal_index가 최대 index+1(총 갯수)라면 index 0으로 이동한다.
      current_modal_index = 0;
    }
  }
  document.getElementById("modal_img").src = document.getElementsByClassName("Gallery_img")[current_modal_index].src; //modal창의 이미지를 변경해준다.
}

function save_data() {  //localStorage에 저장해주는 함수이다.
  localStorage.delete_imgs = JSON.stringify(delete_imgs); //localStorage에는 string형만 저장되기때문에 배열을 string형으로 변환시켜서 localStorage에 저장해준다.
}

function load_data() { //localStorage를 불러오는 함수이다.
  delete_imgs = JSON.parse(localStorage.delete_imgs); //localStorage에 string형으로 저장된 배열을 파싱해주어 다시 배열로 만들어준다.
  for (var i = 0; i < Gallery_img_div.length; i++) {  //저장된 데이터를 보고, 삭제한 이미지는 또다시 삭제하여 종료하기 이전과 동일
    if (delete_imgs[i] == true) {
      delete_img(i);
    }
  }
}
