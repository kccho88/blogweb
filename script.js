// script.js

const uploadArea = document.getElementById('uploadArea');
const fileInput = document.getElementById('fileInput');
const analyzeButton = document.getElementById('analyzeButton');
const mainContent = document.getElementById('mainContent');
const loadingSection = document.getElementById('loadingSection');
const resultsSection = document.getElementById('resultsSection');

// 1. 파일 선택 이벤트
uploadArea.addEventListener('click', () => {
    fileInput.click();
});

fileInput.addEventListener('change', (event) => {
    // 파일 선택 시 버튼 활성화 및 미리보기 표시 로직 추가 (생략)
    if (event.target.files.length > 0) {
        analyzeButton.disabled = false;
        console.log("File selected: ", event.target.files[0].name);
    } else {
        analyzeButton.disabled = true;
    }
});

// 2. 분석 버튼 클릭 이벤트 (핵심 기능)
analyzeButton.addEventListener('click', async () => {
    const file = fileInput.files[0];
    if (!file) {
        alert("분석할 이미지를 먼저 선택해주세요.");
        return;
    }

    // 로딩 상태 표시
    mainContent.style.display = 'none';
    loadingSection.classList.add('show');
    resultsSection.classList.remove('show');
    
    // --- 백엔드 API 호출 ---
    const formData = new FormData();
    formData.append('file', file);
    // formData.append('user_gender', document.querySelector('input[name="gender"]:checked').value);
    
    // **경고: 이 URL은 사용자님이 직접 배포한 백엔드 서버의 주소여야 합니다.**
    const BACKEND_URL = "http://localhost:5000/analyze"; // 예시 Flask 주소

    try {
        const response = await fetch(BACKEND_URL, {
            method: 'POST',
            body: formData
        });

        const result = await response.json();
        
        if (response.ok && result.success) {
            // 3. 분석 성공 시 결과 업데이트
            updateResults(result.data); // 결과 화면에 데이터 채우는 함수 호출
        } else {
            alert("분석 실패: " + (result.error || "서버 오류"));
        }

    } catch (error) {
        console.error('API 호출 중 오류 발생:', error);
        alert("네트워크 오류 또는 서버 접속 실패.");
    } finally {
        // 로딩 상태 숨기기 및 결과 섹션 표시
        loadingSection.classList.remove('show');
        resultsSection.classList.add('show');
    }
});

// 4. 결과 화면 업데이트 함수 (데이터를 HTML에 반영)
function updateResults(data) {
    // 예시: 칼로리 표시
    document.getElementById('caloriesDisplay').textContent = `${data.total_calories} Kcal`;
    
    // 예시: 건강 평가 등급
    const gradeElement = document.getElementById('healthGrade');
    gradeElement.textContent = data.assessment;
    gradeElement.className = `health-grade grade-${data.assessment.toLowerCase()}`;
    
    // 기타 데이터(매크로 영양소, 상세 표 등)를 DOM에 반영하는 로직이 여기에 포함됩니다.
}
