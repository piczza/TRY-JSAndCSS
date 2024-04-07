// Init Github github.js의 Github 클래스를 가져와 인스턴스 생성
const github = new Github;
// Init UI ui.js의 UI클래서 가져와서 인스턴스생성
const ui = new UI;

// Search input 이건 서치바 가져오는거고
const searchUser = document.getElementById('searchUser');

// Search input event listener 검색창에서 키를 눌렀다 뗄 때
searchUser.addEventListener('keyup', (e) => {
  //Get input text 유저 e의 정보값을 넣기
  const userText = e.target.value;
  //그래서 e의 정보값이 존재한다면
  if(userText !== ''){
   // Make http call github.js의 Github클래스의 getUser의 인수값에 유저 e의 정보를 넣어 비동기로 불러옴
   github.getUser(userText)
   //불러오는데 성공했을 때
    .then(data => {
      //그게 '찾지 못했음'이라는 정보라면
      if(data.profile.message === 'Not Found') {
        // Show alert
        ui.showAlert('User not found', 'alert alert-danger');
      } else {
        //그게 제대로 된 정보라면
        // Show profile
        ui.showProfile(data.profile);
        ui.showRepos(data.repos);
        ui.showGrass(userText);
      }
    })
  } else {
    //불러오는데 실패했다면
    // Clear profile
    ui.clearProfile();
  }
}); 

