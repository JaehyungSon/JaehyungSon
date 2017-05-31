var content_count = 0; //해당 방명록이 몇번째로 등록되는것인지를 표시하기위해 사용하는 변수

function Guestbook_write() { //방명록의 등록하기 버튼을 눌렀을시의 함수이다.
  var writer = document.getElementById("writer_name").value; //작성자 이름을 가져와서 저장해준다.
  var context = document.getElementById("writer_content").value; //작성한 내용을 가져와서 저장해준다.
  var GuestBook_content = document.getElementById("GuestBook_content"); //작성자의 이름과 작성한 내용을 표시할 공간의 id를 가져온다.

  //방명록에 글을 작성하면 작성한 글을 추가해줄 Node들이다.
  var tr_content = document.createElement("tr"); //tr테그의 Element Node를 만들어준다.
  var td_writer = document.createElement("td"); //td테그의 Element Node를 만들어준다.  (작성자 이름)
  var td_context = document.createElement("td"); //td테그의 Element Node를 만들어준다.  (작성한 내용)

  //방명록에 글을 작성하면, 답글을 작성할 수 있는 버튼을 만드는 부분이다.
  var tr_submit_button = document.createElement("tr"); //tr테그의 Element Node를 만들어준다.
  var td_submit_button = document.createElement("td"); //td테그의 Element Node를 만들어준다.
  var submit_button = document.createElement("input"); //input테그의 Element Node를 만들어준다.

  td_writer.setAttribute("class", "gray_color"); //class를 지정해준다.
  td_context.setAttribute("class", "content"); //class를 지정해준다.
  td_writer.appendChild(document.createTextNode("작성자 : " + writer)); //받아온 작성자의 이름을 양식에 맞춰서 Text노드로 만들어 붙여준다.
  td_context.appendChild(document.createTextNode(context)); //받아온 작성한 내용을 TextNode로 만들어 붙여준다.

  //답글 등록을 위한 버튼을 설정해주는 부분이다.
  submit_button.setAttribute("class", "reply"); //class를 지정해준다.
  submit_button.setAttribute("value", "답글 등록하기"); //value값을 지정해준다.
  submit_button.setAttribute("type", "submit"); //type을 submit으로 지정해준다.
  submit_button.setAttribute("onclick", "Guestbook_reply(" + content_count + ")"); //content_count를 이용하여 onclick시 함수를 지정해준다.
  td_submit_button.setAttribute("colspan", "2"); //테이블을 병합해준다.
  td_submit_button.setAttribute("class", "reply_table"); //클레스를 지정해준다.
  td_submit_button.id = ("reply_content_area" + content_count); //content_count를 이용하여 id값을 지정해준다.

  //아래의 두줄은 답글 등록하기버튼과 해당 열을 지정해주는 부분이다.
  td_submit_button.appendChild(submit_button); //답글 등록하기 버튼을 td테그의 자식에 넣어준다.
  tr_submit_button.appendChild(td_submit_button); //td테그를 tr테그의 자식에 넣어준다.

  //아래의 두줄은 작성자 이름과 작성내용을 해당 열에 지정해주는 부분이다.
  tr_content.appendChild(td_writer); //작성자 이름을 해당열의 자식에 넣어준다.
  tr_content.appendChild(td_context); //작성한 내용을 해당열의 자식에 넣어준다.

  GuestBook_content.appendChild(tr_content); //화면에 표시하기위해 GuestBook_content의 자식에 작성자 이름과 작성한 내용을 추기해준다.
  GuestBook_content.appendChild(tr_submit_button); //화면에 표시하기위해 GuestBook_content의 자식에 답글입력하기 버튼을 추기해준다.
  document.getElementById("writer_name").value = ""; //이전에 입력한 작성자명을 지워준다.
  document.getElementById("writer_content").value = ""; //이전에 입력한 작성내용을 지워준다.
  content_count++; //개시글이 추가됨을 표시해준다.
}

function Guestbook_reply(index) { //답글을 다는 함수이다. 매개변수로 개시글의 index가 들어온다.
  var reply_content = prompt("답글 내용을 입력하세요. (url주소일경우 url주소만 입력해주세요.)"); //prompt창을 띄워 사용자로부터 입력값을 받아온다.
  if (reply_content != null) { //답글을 입력하지 않았을경우 예외처리
    document.getElementsByClassName("reply_table")[index].childNodes[0].style.display = "none"; //답글은 1회만 받으면 되기때문에 답글 등록하기 버튼을 화면에서 삭제시켜준다.

    document.getElementsByClassName("reply_table")[index].appendChild(document.createTextNode("답변 : " + reply_content)); //답변을 답글 등록하기가 있던 table에 추가시켜준다.
    document.getElementsByClassName("reply_table")[index].style.backgroundColor = "#A6A6A6"; //과제의 양식에 맞춰 배경색을 변경해준다.
    document.getElementsByClassName("reply_table")[index].style.textAlign = "left"; //과제의 양식에 맞춰 왼쪽정렬을 해준다.
    document.getElementsByClassName("reply_table")[index].style.paddingLeft = "5%"; //과제의 양식에 맞춰 왼쪽에 들여쓰기를 해준다.
    document.getElementsByClassName("reply_table")[index].style.border = "solid 1px black"; //과제의 양식에 맞춰 테두리를 지정해준다.

    /*OpenGraph Protocol 부분*/
    if (reply_content.substring(0, 7) == "http://") { //답글의 앞부분이 http://로 시작할 시에만 작동

      //오픈그래프 프로토콜부분의 html 생성 및 붙이는 과정
      var OpenGraph_div = document.createElement("div");
      var OpenGraph_img_div = document.createElement("div");
      var OpenGraph_img = document.createElement("img");

      var OpenGraph_context_div = document.createElement("div");
      var OpenGraph_title_h2 = document.createElement("h2");
      var OpenGraph_description_span = document.createElement("span");

      OpenGraph_div.setAttribute("class", "OpenGraph_div");
      OpenGraph_img.setAttribute("id", "icon" + index);
      OpenGraph_img.setAttribute("style", "width:90px");

      OpenGraph_title_h2.setAttribute("id", "title" + index);
      OpenGraph_title_h2.setAttribute("style", "display:inline-block");
      OpenGraph_description_span.setAttribute("id", "description" + index);
      OpenGraph_description_span.setAttribute("style", "display:block");
      OpenGraph_context_div.setAttribute("style", "display:inline-block");
      OpenGraph_img_div.setAttribute("style", "display:inline-block");

      OpenGraph_img_div.appendChild(OpenGraph_img);
      OpenGraph_div.appendChild(OpenGraph_img_div);

      OpenGraph_context_div.appendChild(OpenGraph_title_h2);
      OpenGraph_context_div.appendChild(OpenGraph_description_span);
      OpenGraph_div.appendChild(OpenGraph_context_div);

      document.getElementsByClassName("reply_table")[index].appendChild(OpenGraph_div);
      //오픈그래프 프로토콜 함수를 호출
      OpenGraph_view(index, reply_content);
    }
  }
}
