//깃허브 정보 담는 파일
class Github {
  // Github의 유저 정보값이 담길 객체 인스턴스 생성 및 초기화 인데 대체 뭐지?
  //일단 대충 아무 값 줘서 초기화 한건지? 깃허브 정보값을 어떻게 알아서 가져오고 있는건지?
  //왼쪽 정보명이 지금 정한 변수명이고 오른쪽 정보값이 깃허브 내에서의 변수명? 인건지?
  constructor() {
    this.client_id = 'e932ba1d163e2d200af4';
    this.client_secret = '0e1ae9f3a7ec4b8dbdf6ab4108dd7af75030dfbb';
    this.repos_count = 5;
    this.repos_sort = 'created: asc';
  }

  //비동기로 깃허브 user의 프로필 불러오고->레포지토리불러오고->그 결과값을 객체로 리턴
  //인데 이 주소값은 어디서 나는건지?ㅠㅠ
  async getUser(user) {
    const profileResponse =
      await fetch(
        `https://api.github.com/users/${user}?client_id=${this.client_id}&client_secret=${this.client_secret}`
        );
        
    const repoResponse =
      await fetch(
       `https://api.github.com/users/${user}/repos?per_page=${this.repos_count}&sort=${this.repos_sort}&client_id=${this.client_id}&client_secret=${this.client_secret}`
       );

    const profile = await profileResponse.json();
    const repos = await repoResponse.json();

    return {
      profile,
      repos,
    }
  }
}