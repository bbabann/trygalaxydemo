// 체험 카드 데이터: 새 체험을 추가하려면 이 배열에 항목만 추가하면 됩니다.
const EXPERIENCES = [
  {
    id: "exp1",
    title: "My FanCam",
    description: "8초 영상을 촬영하고 원하는 인물을 골라 1:1 정사각형 팬캠으로 만들어보세요.",
    link: "experiences/exp1.html",
  },
  {
    id: "exp2",
    title: "Palm Selfie",
    description: "후면 카메라로 시작해 셔터를 누르면 전면 셀피 카메라로 전환됩니다.",
    link: "experiences/exp2.html",
  },
  {
    id: "exp3",
    title: "Privacy Display",
    description: "폰을 좌우로 기울이면 기울인 각도에 따라 화면이 점점 검게 가려집니다.",
    link: "experiences/exp3.html",
  },
  {
    id: "exp4",
    title: "Smart Switch",
    description: "화면을 탭할 때마다 iOS와 Galaxy의 스마트 스위치 진행 화면이 번갈아 넘어갑니다.",
    link: "experiences/exp4.html",
  },
  {
    id: "exp5",
    title: "AR Try-On",
    description: "워치·반지·안경을 손목/손가락/얼굴에 맞춰 띄워보는 AR 체험 프로토타입입니다.",
    link: "experiences/exp5.html",
  },
  {
    id: "exp6",
    title: "체험 6",
    description: "체험 6에 대한 간단한 설명을 적어주세요.",
    link: "experiences/exp6.html",
  },
];

function renderCards() {
  const grid = document.getElementById("card-grid");
  if (!grid) return;

  grid.innerHTML = EXPERIENCES.map(
    (exp) => `
      <a class="card" href="${exp.link}" data-id="${exp.id}">
        <h2>${exp.title}</h2>
        <p>${exp.description}</p>
      </a>
    `
  ).join("");
}

document.addEventListener("DOMContentLoaded", renderCards);
