//UI 출력하는 파일
class UI {
  //profile이 들어갈 영역 인스턴스 및 초기화?
  constructor() {
    this.profile = document.getElementById('profile');
  }

  // Display profile in UI 프로필ui 만드는덴가
  //유저프로필 출력
  showProfile(user) {
    this.profile.innerHTML = `
      <div class="card card-body mb-3">
        <div class="row">
          <div class="col-md-3">
            <img class="img-fluid mb-2" src="${user.avatar_url}">
            <a href="${user.html_url}" target="_blank" class="btn btn-primary btn-block mb-4">View Profile</a>
          </div>
          <div class="col-md-9">
            <span class="badge badge-primary">Public Repos: ${user.public_repos}</span>
            <span class="badge badge-secondary">Public Gists: ${user.public_gists}</span>
            <span class="badge badge-success">Followers: ${user.followers}</span>
            <span class="badge badge-info">Following: ${user.following}</span>
            <br><br>
            <ul class="list-group">
              <li class="list-group-item">Company: ${user.company}</li>
              <li class="list-group-item">Website/Blog: ${user.blog}</li>
              <li class="list-group-item">Location: ${user.location}</li>
              <li class="list-group-item">Member Since: ${user.created_at}</li>
            </ul>
          </div>
        </div>
      </div>
      <h3 class="page-heading mb-3">Latest Repos</h3>
      <div id="repos"></div>
      <h3 class="page-heading mb-3">Latest Grass</h3>
      <div class="card card-body mb-2">
        <div id="grass" style="overflow: scroll"></div>
      </div>
    `;
  }

  // Show user repos
  //유저 레포지토리 출력..인데 뭐지
  showRepos(repos) {
    let output = '';
    //레포지토리 정보배열을 forEach 돌려서 각각 출력이네.. 
    repos.forEach(function(repo) {
      output += `
        <div class="card card-body mb-2">
          <div class="row">
            <div class="col-md-6">
              <a href="${repo.html_url}" target="_blank">${repo.name}</a>
            </div>
            <div class="col-md-6">
            <span class="badge badge-primary">Stars: ${repo.stargazers_count}</span>
            <span class="badge badge-secondary">Watchers: ${repo.watchers_count}</span>
            <span class="badge badge-success">Forks: ${repo.forms_count}</span>
            </div>
          </div>
        </div>
        `;
    });
    // Output repos 위에 만든걸 실제 html 안에 넣어주기
    document.getElementById('repos').innerHTML = output;
    
  }

  showGrass(user){
    document.getElementById('grass').innerHTML = `
    <img src="https://ghchart.rshah.org/${user}" alt="잔디 이미지"/>
    `;
  }

  // 이건 작은 창 띄우는거
  // Show alert message
  showAlert(message, className) {
    //일단 지금 나와있는 작은 창 다 지우고 시작
    // Clear any remaining alerts
    this.clearAlert();
    // Create div 우선 div만들고
    const div  =  document.createElement('div');
    //인자로 받은것들 다 할당해주고
    // Add classes 
    div.className = className;
    // Add text
    div.appendChild(document.createTextNode(message));
    // Get parent
    const container =  document.querySelector('.searchContainer');
    // Get search box
    const search = document.querySelector('.search');
    //container 밑에 서치바 전에 넣어줌
    // Insert alert
    container.insertBefore(div, search);

    //3초뒤에 메세지 지움
    // Timeout after 3 sec
    setTimeout(() => {
      this.clearAlert();
    }, 3000);
  }

  // Clear alert message
  clearAlert() {
    const currentAlert = document.querySelector('.alert');

    if(currentAlert){
      currentAlert.remove();
    }
  }

  // Clear profile
  clearProfile() {
    this.profile.innerHTML = '';
  }
}