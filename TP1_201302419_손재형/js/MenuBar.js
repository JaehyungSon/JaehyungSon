var flag_open = 0; //0은 dropdownlist가 닫혀있는상태, 1은 열려있는상태
var use_flag = 0; //버튼이 눌렸고, animation효과가 작동중인것을 나타내는 변수, 0은 사용할수 있는상태, 1은 사용중인상태
var dropdown_height = 0; //height의 애니메이션 효과를 주기위한 변수
var dropdownlist; //dropdown리스트 아이콘의 ID를 가져올 변수

function click_dropdown(x) {

  if (use_flag == 0) { //dropdown리스트가 사용중이지 않을때만 버튼을 눌렀을때 작동한다.
    use_flag = 1; //사용하지 않는 상태라면 1로 바꾸어주어 애니메이션이 진행중임을 표시해준다.

    x.classList.toggle("change"); //dropdown아이콘의 모양을 변경해준다.
    if (flag_open == 0) { //리스트가 열려있지 않은 상태라면
      flag_open = 1; //리스트가 열림을 표시해준다.
      dropdownlist.style.display = "block"; //none으로 숨겨뒀던 dropdownlist를 block형식으로 보여준다.
      var id = setInterval(frame, 2); //0.002초마다 1번씩 반복하도록 설정한다.
      function frame() {
        if (dropdown_height > 137) {
          clearInterval(id); //dropdown리스트의 높이가 137보다 크다면 반복을 멈춘다.
          use_flag = 0; //사용중이 아님을 표시해준다.
        }
        //2씩 height를 늘려가며 dropdown list를 표시해준다. (애니메이션 효과)
        dropdown_height = dropdown_height + 2;
        dropdownlist.style.height = dropdown_height + "px";
      }
    } else { //드랍다운 리스트가 열려있는 상태이다.
      flag_open = 0; //리스트가 닫힘을 표시해준다.
      var id = setInterval(frame, 2); //0.002초마다 1번씩 반복하도록 설정한다.
      function frame() {
        if (dropdown_height <= 0) { //dropdown의 높이가 0보다 작을경우, 즉 전부 닫혔을경우
          clearInterval(id); //반복을 종료하고, display를 none으로 설정해준다.
          dropdownlist.style.display = "none";
          use_flag = 0; //사용중이 아님을 표시해준다.
        }
        //height를 2씩줄여주어 dropdown_list를 표시해준다. (애니메이션 효과)
        dropdown_height = dropdown_height - 2;
        dropdownlist.style.height = dropdown_height + "px";
      }
    }
  }
}
//초기 dropdown.js가 html에서 로드될경우에 실행할 코드이다.
//dropdownlist의 Id를 가져와 변수에 저장해준다.
function init_dropdown() {
  dropdownlist = document.getElementById("dropdownlist");
  //메뉴바를 fixed해놓으면 공간을 차지하지 않는데, 이때 빈공간의 크기를 지정해주어 이미지슬라이드가 짤리지 않도록 설정해준다.
  document.getElementById("bar_space").style.height =document.getElementById("Bar").offsetHeight+"px";
}
function Menu_bar_size(){
  document.getElementById("bar_space").style.height =document.getElementById("Bar").offsetHeight+"px";
}
