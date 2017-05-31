var slide_count = 0; //현재 이미지 슬라이드에서 순서를 표시할 변수
var flag = 0; //이미지 애니메이션이 진행중인지 아닌지를 표시할 변수(1일경우 이미지 애니메이션 진행중)
var slide_element; //이미지들의 정보를 저장할 변수

/*이미지 슬라이드 설명
이미지 슬라이드는 모든 이미지를 가로로 펼쳐놓고, left값을 이동하면서 애니메이션 효과를 구현하였음*/

function right_Move(move_count = 1) { //move_count는 몇개의 이미지를 이동할것인지를 지정해준다. 기본적으로 1개의 이미지이동을 설정해준다.
  if (slide_element.length > 1) { //이미지가 1개이하일때 애니메이션 기능을 사용하지 않는다. (예외처리)
    var position = 0; //해당 변수는 기준으로부터 몇 px이동할것인지, 즉 애니메이션 기능을 부여하기위한 변수이다.
    if (flag == 0) { //이미지 애니메이션이 진행중이 아닐경우에만 이미지 이동이 가능하도록 설정
      flag = 1; //이미지 애니메이션이 진행중임을 표시해준다.
      var id = setInterval(frame, 1); //0.001초마다 1번씩 반복문이 작동하도록 한다.
    }

    function frame() { //이미지의 slide를 구현한 부분이다.
      if (slide_count == slide_element.length - 1) { //이미지가 마지막 이미지일때 cycle형식을 구현한 부분
        if (position >= innerWidth * move_count - 10) { //이미지가 대략적으로 원하는만큼의 위치로 이동하였다면 반복을 멈춘다.
          clearInterval(id);

          for (var i = 1; i < slide_element.length; i++) { //이미지가 마지막일 경우임으로 index 0번째의 이미지는 마지막에 붙여주기위해 반복문에서 제외한다.
            slide_element[i].style.left = (innerWidth * i) - (slide_count * innerWidth) - innerWidth * move_count + 'px'; //index 0을 제외한 모든 이미지를 정확한 위치에 지정해주는 부분이다.
          }
          slide_element[0].style.left = (innerWidth * slide_element.length) - (slide_count * innerWidth) - innerWidth * move_count + 'px'; //index 0은 마지막 이미지의 우측에 붙여준다.
          document.getElementById("img_button" + slide_count).src = "./img/slide_button/img_button.png"; //이미지 하단의 img_button의 이미지를 선택 안된 이미지로 변경해준다.
          slide_count = 0; //마지막 이미지에서 첫번째 이미지로 바뀌는 부분이기때문에 slide_count값을 0으로 지정해준다.
          document.getElementById("img_button" + slide_count).src = "./img/slide_button/img_select_button.png"; //이미지 하단의 img_button의 이미지를 선택 된 이미지로 변경해준다.
          flag = 0; //애니메이션이 종료되었음을 표시해준다.
        } else { //이미지가 원하는 위치에 도달하지 못하였을때, 이동 애니메이션을 하는 부분이다.
          position = position + (innerWidth / 100) * move_count;
          /*position을 화면의 width(innerWidth)/100을 해준값에 이동해야하는 이미지 갯수를 곱해주어서 계산한다.
          innerWidth /100을 해주는 이유는 브라우저의 크기에 상관없이 일정한 속도의 애니메이션 효과를 주기 위해서이다.
          move_count를 곱해주는 이유는 이동해야하는 이미지의 갯수를 곱해주어 일정한 시간내에 애니메이션을 끝내주기 위해서이다.  */
          slide_element[0].style.left = (innerWidth * slide_element.length) - (slide_count * innerWidth) - position + 'px'; //index 0은 마지막 이미지의 우측에서 오는것처럼 보여주기 위해 따로 선언해주었다..
          for (var i = 1; i < slide_element.length; i++) { //index 0을 제외한 모든 이미지에 애니메이션을 지정해주는 부분이다.
            slide_element[i].style.left = (innerWidth * i) - (slide_count * innerWidth) - position + 'px'; //
            div_and_img_size(i); //애니메이션 동작중에 브라우저의 크기가 바뀔경우에도 원활한 작동을 하도록 하는 함수이다. 이미지의 width와 height를 브라우저의 크기에 맞춰서 지정해주는 함수이다.
          }
        }
      } else { //이미지가 마지막 이미지가 아닐때 애니메이션을 주는 부분이다.
        if (position >= innerWidth * move_count - 10) { //이미지가 대략적으로 원하는만큼의 위치로 이동하였다면 반복을 멈춘다.
          clearInterval(id);

          for (var i = 0; i < slide_element.length; i++) { //모든 이미지를 정확한 위치에 지정해주는 부분이다.
            slide_element[i].style.left = (innerWidth * i) - (slide_count * innerWidth) - innerWidth * move_count + 'px';
          }
          document.getElementById("img_button" + slide_count).src = "./img/slide_button/img_button.png"; //이미지 하단의 img_button의 이미지를 선택 안된 이미지로 변경해준다.
          slide_count = slide_count + move_count; //slide_count를 이동한 만큼의 숫자를 더해서 변경해준다.
          document.getElementById("img_button" + slide_count).src = "./img/slide_button/img_select_button.png"; //이미지 하단의 img_button의 이미지를 선택 된 이미지로 변경해준다.
          flag = 0; //애니메이션이 종료되었음을 표시해준다.
        } else { //이미지가 원하는 위치에 도달하지 못하였을때, 이동 애니메이션을 하는 부분이다.
          position = position + (innerWidth / 100) * move_count;
          /*position을 화면의 width(innerWidth)/100을 해준값에 이동해야하는 이미지 갯수를 곱해주어서 계산한다.
          innerWidth /100을 해주는 이유는 브라우저의 크기에 상관없이 일정한 속도의 애니메이션 효과를 주기 위해서이다.
          move_count를 곱해주는 이유는 이동해야하는 이미지의 갯수를 곱해주어 일정한 시간내에 애니메이션을 끝내주기 위해서이다.  */
          for (var i = 0; i < slide_element.length; i++) { //모든 이미지에 애니메이션을 지정해주는 부분이다.
            slide_element[i].style.left = (innerWidth * i) - (slide_count * innerWidth) - position + 'px';
            div_and_img_size(i); //애니메이션 동작중에 브라우저의 크기가 바뀔경우에도 원활한 작동을 하도록 하는 함수이다. 이미지의 width와 height를 브라우저의 크기에 맞춰서 지정해주는 함수이다.
          }
        }
      }
    }
  }
}

//right_Move의 반대이다.
function left_Move(move_count = 1) { //move_count는 몇개의 이미지를 이동할것인지를 지정해준다. 기본적으로 1개의 이미지이동을 설정해준다.
  var position = 0; //해당 변수는 기준으로부터 몇 px이동할것인지, 즉 애니메이션 기능을 부여하기위한 변수이다.

  if (flag == 0) { //이미지 애니메이션이 진행중이 아닐경우에만 이미지 이동이 가능하도록 설정
    flag = 1; //이미지 애니메이션이 진행중임을 표시해준다.
    var id = setInterval(frame, 1); //0.001초마다 1번씩 반복문이 작동하도록 한다.
  }

  function frame() { //이미지의 slide를 구현한 부분이다.
    if (slide_count == 0) { //이미지가 첫번째 이미지일때 cycle형식을 구현한 부분이다.
      if (position >= innerWidth * move_count - 10) { //이미지가 대략적으로 원하는만큼의 위치로 이동하였다면 반복을 멈춘다.
        clearInterval(id);

        slide_element[slide_element.length - 1].style.left = (innerWidth * -1) - (slide_count * innerWidth) + innerWidth * move_count + 'px'; //마지막 이미지는 처음 부분에 붙여준다.
        for (var i = 0; i < slide_element.length - 1; i++) { //이미지가 첫번째 경우임으로 마지막 이미지는 처음부분에 붙여주기위해 반복문에서 제외한다.
          slide_element[i].style.left = (innerWidth * i) - (slide_count * innerWidth) + innerWidth * move_count + 'px'; //마지막 이미지를 제외한 모든 이미지를 정확한 위치에 지정해주는 부분이다.
        }
        document.getElementById("img_button" + slide_count).src = "./img/slide_button/img_button.png"; //이미지 하단의 img_button의 이미지를 선택 안된 이미지로 변경해준다.
        slide_count = slide_element.length - 1; //slide_count는 마지막 부분으로 이동한 것임으로 마지막 index를 가르키도록 한다.
        document.getElementById("img_button" + slide_count).src = "./img/slide_button/img_select_button.png"; //이미지 하단의 img_button의 이미지를 선택 된 이미지로 변경해준다.
        flag = 0; //애니메이션이 종료되었음을 표시해준다.
      } else { //이미지가 원하는 위치에 도달하지 못하였을때, 이동 애니메이션을 하는 부분이다.
        position = position + (innerWidth / 100) * move_count; //right_Move와 동일
        slide_element[slide_element.length - 1].style.left = (innerWidth * -1) - (slide_count * innerWidth) + position + 'px'; //마지막 이미지는 좌측에서 오는것처럼 보여주기 위해 따로 선언해주었다..
        for (var i = 0; i < slide_element.length - 1; i++) { //마지막 이미지를 제외한 모든 이미지에 애니메이션을 지정해주는 부분이다.
          slide_element[i].style.left = (innerWidth * i) - (slide_count * innerWidth) + position + 'px';
          div_and_img_size(i); //애니메이션 동작중에 브라우저의 크기가 바뀔경우에도 원활한 작동을 하도록 하는 함수이다. 이미지의 width와 height를 브라우저의 크기에 맞춰서 지정해주는 함수이다.
        }
      }
    } else {
      if (position >= innerWidth * move_count - 10) { //이미지가 대략적으로 원하는만큼의 위치로 이동하였다면 반복을 멈춘다.
        clearInterval(id);

        for (var i = 0; i < slide_element.length; i++) { //모든 이미지를 정확한 위치에 지정해주는 부분이다.
          slide_element[i].style.left = (innerWidth * i) - (slide_count * innerWidth) + innerWidth * move_count + 'px';
        }
        document.getElementById("img_button" + slide_count).src = "./img/slide_button/img_button.png"; //이미지 하단의 img_button의 이미지를 선택 안된 이미지로 변경해준다.
        slide_count = slide_count - move_count; //slide_count를 이동한 만큼의 숫자를 빼서 변경해준다.
        document.getElementById("img_button" + slide_count).src = "./img/slide_button/img_select_button.png"; //이미지 하단의 img_button의 이미지를 선택 된 이미지로 변경해준다.
        flag = 0; //애니메이션이 종료되었음을 표시해준다.
      } else { //이미지가 원하는 위치에 도달하지 못하였을때, 이동 애니메이션을 하는 부분이다.
        position = position + (innerWidth / 100) * move_count; //right_Move와 동일
        for (var i = 0; i < slide_element.length; i++) { //모든 이미지에 애니메이션을 지정해주는 부분이다.
          slide_element[i].style.left = (innerWidth * i) - (slide_count * innerWidth) + position + 'px';
          div_and_img_size(i); //애니메이션 동작중에 브라우저의 크기가 바뀔경우에도 원활한 작동을 하도록 하는 함수이다. 이미지의 width와 height를 브라우저의 크기에 맞춰서 지정해주는 함수이다.
        }
      }
    }
  }
}

function window_size_change() { //브라우저의 크기가 변경되었을때마다 이미지의 위치와 크기를 지정해주기위한 함수이다.
  if (flag == 0) { //애니메이션 기능이 작동중일때는, 애니메이션내에서 변경해주기때문에 작동할 필요가 없다.
    for (var i = 0; i < slide_element.length; i++) { //모든이미지의 left값을 알맞게 바꾸어준다.
      slide_element[i].style.left = (innerWidth * i) - (slide_count * innerWidth) + 'px';
      div_and_img_size(i); //브라우저의 크기에 맞춰 이미지의 크기를 변경해주는 함수이다.
    }
  }
}

function add_img_button(img_index) { //이미지 하단의 이미지버튼을 만들어주는 함수이다. 이미지버튼은 list로 구성되어있다. 매개변수로 몇번째 이미지버튼을 만들것인지의 index가 들어온다.
  var li_tag = document.createElement("li"); //li테그의 Element Node를 만들어준다.
  var a_tag = document.createElement("img"); //img테그의 Element Node를 만들어준다.
  a_tag.id = "img_button" + img_index; //id를 지정해준다.
  li_tag.appendChild(a_tag); //a테그를 li테그의 자식으로 추가해준다.

  var element = document.getElementById("img_button"); //이미지버튼들의 부모(ul테그)의 ID를 가져온다.
  element.appendChild(li_tag); //ul테그에 만들어준 버튼을 추가해준다.
  if (img_index == 0) { //초기시작이 index 0 부터 시작하기때문에 0일경우에는 선택된 버튼을사용하고, 0이 아닐경우에는 선택되지 않은 버튼을 지정한다.
    document.getElementById("img_button" + img_index).src = "./img/slide_button/img_select_button.png";
  } else {
    document.getElementById("img_button" + img_index).src = "./img/slide_button/img_button.png";
  }
  document.getElementById("img_button" + img_index).setAttribute("onclick", "image_button(" + img_index + ")"); //이미지 버튼을 눌렀을시의 함수를 설정해준다.
}

function div_and_img_size(i) { //브라우저의 크기에따라 이미지의 크기를 지정해주는 부분이다.
  var Image_Slide = document.getElementById("div_image"); //이미지를 자식으로 가지고있는 div의 id를 가져온다.
  slide_element[i].style.width = innerWidth + 'px'; //이미지의 width 크기를 브라우저의 width크기와 일치시켜준다
  slide_element[i].style.height = innerWidth / 3 + 'px'; //이미지의 height크기를 브라우저의 height크기와 일치시켜준다.
  Image_Slide.style.width = innerWidth + 'px'; //div의 width 크기를 브라우저의 width크기와 일치시켜준다
  Image_Slide.style.height = innerWidth / 3 + 'px'; //div의 height크기를 브라우저의 height크기와 일치시켜준다.
}

function auto_right() { //자동으로 5초마다 오른쪽으로 이동하도록 설정해준다.
  setInterval(frame, 5000);

  function frame() {
    right_Move();
  }
}

function image_button(dest) { //이미지 버튼을 눌렀을시이다. 매개변수로 이동하고자하는 이미지의 index가 들어온다.
  if (flag == 0) { //이미지 애니메이션이 작동되고있지 않을때만 가능하도록 한다.
    if (slide_count > dest) { //현재 이미지의 위치가 이동하고자하는 이미지의 index보다 크다면 left로 slide_count-dest 만큼 이동한다.
      left_Move(slide_count - dest);
    } else if (slide_count < dest) { //현재 이미지의 위치가 이동하고자하는 이미지의 index보다 작다면 right로 dest-slide_count 만큼 이동한다.
      right_Move(dest - slide_count);
    }
    //둘다 아닐경우는 현재 이미지와 똑같은 index이기때문에 아무것도 하지 않는다.
  }
}
//초기 img_slide.js가 html에서 로드될경우에 실행할 코드이다.
function init_imgslide() {
  slide_element = document.getElementsByClassName("slide_img"); //js내에서 사용할 slide_element값을 가져와 변수에 저장해준다.
  for (var i = 0; i < slide_element.length; i++) { //이미지슬라이드에서 이미지들의 초기 위치를 지정해준다.
    slide_element[i].style.left = (innerWidth * i) - (slide_count * innerWidth) + 'px';
    div_and_img_size(i); //브라우저의 크기에따라 이미지의 크기를 지정해준다.
    slide_element[i].style.visibility = "visible"; //설정이 완료된 이미지를 visible상태로 바꾸어주어 표시해준다.
    add_img_button(i); //해당 index의 이미지버튼을 만들어준다.
  }
  auto_right(); //자동으로 오른쪽으로 이동하도록 하는 함수를 호출해준다.
}
