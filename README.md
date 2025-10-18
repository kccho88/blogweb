<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>🍽️ 음식 영양 분석기</title>
    <style>
        /* =========== 기본 스타일 =========== */
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            padding: 20px;
            color: #333;
        }

        .container {
            max-width: 800px;
            margin: 0 auto;
            background: rgba(255, 255, 255, 0.95);
            border-radius: 20px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
            backdrop-filter: blur(10px);
            overflow: hidden;
        }

        /* =========== 헤더 =========== */
        .header {
            background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
            color: white;
            padding: 30px;
            text-align: center;
        }

        .header h1 {
            font-size: 2.5em;
            margin-bottom: 10px;
            font-weight: 700;
        }

        .header p {
            font-size: 1.1em;
            opacity: 0.9;
        }

        /* =========== 메인 컨텐츠 =========== */
        .main-content {
            padding: 40px;
        }

        .section {
            margin-bottom: 40px;
            padding: 30px;
            background: white;
            border-radius: 15px;
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
            border: 1px solid rgba(0, 0, 0, 0.05);
        }

        .section-title {
            font-size: 1.5em;
            font-weight: 600;
            margin-bottom: 20px;
            color: #333;
            display: flex;
            align-items: center;
            gap: 10px;
        }

        /* =========== 개인정보 입력 =========== */
        .user-info {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 25px;
        }

        .form-group {
            display: flex;
            flex-direction: column;
            gap: 10px;
        }

        .form-group label {
            font-weight: 600;
            color: #555;
            font-size: 1.1em;
        }

        .radio-group {
            display: flex;
            gap: 20px;
            flex-wrap: wrap;
        }

        .radio-item {
            display: flex;
            align-items: center;
            gap: 8px;
            cursor: pointer;
            padding: 10px 15px;
            border: 2px solid #e1e5e9;
            border-radius: 10px;
            transition: all 0.3s ease;
        }

        .radio-item:hover {
            border-color: #4facfe;
            background: rgba(79, 172, 254, 0.1);
        }

        .radio-item input[type="radio"]:checked + label {
            color: #4facfe;
            font-weight: 600;
        }

        .radio-item input[type="radio"]:checked {
            accent-color: #4facfe;
        }

        select {
            padding: 12px 15px;
            border: 2px solid #e1e5e9;
            border-radius: 10px;
            font-size: 1em;
            transition: border-color 0.3s ease;
            background: white;
        }

        select:focus {
            outline: none;
            border-color: #4facfe;
            box-shadow: 0 0 0 3px rgba(79, 172, 254, 0.1);
        }

        /* =========== 파일 업로드 =========== */
        .upload-area {
            border: 3px dashed #4facfe;
            border-radius: 15px;
            padding: 40px;
            text-align: center;
            background: rgba(79, 172, 254, 0.05);
            transition: all 0.3s ease;
            cursor: pointer;
            position: relative;
        }

        .upload-area:hover {
            border-color: #00f2fe;
            background: rgba(79, 172, 254, 0.1);
        }

        .upload-area.dragover {
            border-color: #00f2fe;
            background: rgba(0, 242, 254, 0.1);
            transform: scale(1.02);
        }

        .upload-icon {
            font-size: 3em;
            margin-bottom: 15px;
            color: #4facfe;
        }

        .upload-text {
            font-size: 1.2em;
            color: #666;
            margin-bottom: 15px;
        }

        .upload-hint {
            font-size: 0.9em;
            color: #999;
            font-style: italic;
        }

        #fileInput {
            display: none;
        }

        .file-button {
            background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
            color: white;
            padding: 12px 25px;
            border: none;
            border-radius: 25px;
            cursor: pointer;
            font-size: 1em;
            font-weight: 600;
            margin-top: 15px;
            transition: transform 0.3s ease;
        }

        .file-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(79, 172, 254, 0.4);
        }

        /* =========== 파일 미리보기 =========== */
        .preview-container {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
            gap: 15px;
            margin-top: 20px;
        }

        .preview-item {
            position: relative;
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        }

        .preview-image {
            width: 100%;
            height: 120px;
            object-fit: cover;
        }

        .preview-remove {
            position: absolute;
            top: 5px;
            right: 5px;
            background: rgba(255, 0, 0, 0.8);
            color: white;
            border: none;
            border-radius: 50%;
            width: 25px;
            height: 25px;
            cursor: pointer;
            font-size: 12px;
        }

        /* =========== 분석 버튼 =========== */
        .analyze-button {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 18px 40px;
            border: none;
            border-radius: 50px;
            font-size: 1.2em;
            font-weight: 600;
            cursor: pointer;
            width: 100%;
            margin-top: 30px;
            transition: all 0.3s ease;
            box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
        }

        .analyze-button:hover {
            transform: translateY(-3px);
            box-shadow: 0 12px 35px rgba(102, 126, 234, 0.4);
        }

        .analyze-button:disabled {
            opacity: 0.6;
            cursor: not-allowed;
            transform: none;
        }

        /* =========== 로딩 상태 =========== */
        .loading {
            display: none;
            text-align: center;
            padding: 40px;
        }

        .loading.show {
            display: block;
        }

        .loading-spinner {
            width: 50px;
            height: 50px;
            border: 5px solid #e1e5e9;
            border-top: 5px solid #4facfe;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin: 0 auto 20px;
        }

        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }

        .loading-text {
            font-size: 1.1em;
            color: #666;
        }

        /* =========== 결과 섹션 =========== */
        .results {
            display: none;
        }

        .results.show {
            display: block;
        }

        .food-list {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
            margin-bottom: 20px;
        }

        .food-item {
            background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
            color: white;
            padding: 8px 15px;
            border-radius: 20px;
            font-size: 0.9em;
            font-weight: 500;
        }

        .nutrition-summary {
            background: linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%);
            padding: 25px;
            border-radius: 15px;
            margin-bottom: 25px;
        }

        .calories-display {
            font-size: 2.5em;
            font-weight: 700;
            color: #e74c3c;
            text-align: center;
            margin-bottom: 15px;
        }

        .progress-bar {
            background: rgba(255, 255, 255, 0.3);
            border-radius: 10px;
            height: 20px;
            margin-bottom: 15px;
            overflow: hidden;
        }

        .progress-fill {
            height: 100%;
            background: linear-gradient(90deg, #4facfe, #00f2fe);
            border-radius: 10px;
            transition: width 0.8s ease;
        }

        .nutrition-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            margin-bottom: 25px;
        }

        .nutrition-item {
            background: white;
            padding: 20px;
            border-radius: 10px;
            text-align: center;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
        }

        .nutrition-icon {
            font-size: 2em;
            margin-bottom: 10px;
        }

        .nutrition-value {
            font-size: 1.5em;
            font-weight: 600;
            color: #333;
        }

        .nutrition-label {
            color: #666;
            font-size: 0.9em;
        }

        .health-assessment {
            background: white;
            padding: 25px;
            border-radius: 15px;
            border-left: 5px solid #4facfe;
        }

        .health-grade {
            display: inline-block;
            padding: 8px 15px;
            border-radius: 20px;
            font-weight: 600;
            margin-bottom: 15px;
        }

        .grade-excellent { background: #d4edda; color: #155724; }
        .grade-good { background: #d1ecf1; color: #0c5460; }
        .grade-normal { background: #fff3cd; color: #856404; }
        .grade-caution { background: #f8d7da; color: #721c24; }
        .grade-danger { background: #f5c6cb; color: #721c24; }

        .recommendations {
            margin-top: 20px;
        }

        .rec-section {
            margin-bottom: 15px;
        }

        .rec-title {
            font-weight: 600;
            margin-bottom: 8px;
            display: flex;
            align-items: center;
            gap: 8px;
        }

        .rec-list {
            list-style: none;
            padding-left: 25px;
        }

        .rec-list li {
            margin-bottom: 5px;
            position: relative;
        }

        .rec-list li:before {
            content: "•";
            position: absolute;
            left: -15px;
            color: #4facfe;
            font-weight: bold;
        }

        /* =========== 상세 영양표 =========== */
        .nutrition-table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
            background: white;
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
        }

        .nutrition-table th,
        .nutrition-table td {
            padding: 15px;
            text-align: left;
            border-bottom: 1px solid #e1e5e9;
        }

        .nutrition-table th {
            background: #f8f9fa;
            font-weight: 600;
            color: #333;
        }

        .nutrition-table tr:hover {
            background: rgba(79, 172, 254, 0.05);
        }

        /* =========== 액션 버튼들 =========== */
        .action-buttons {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 15px;
            margin-top: 30px;
        }

        .action-btn {
            padding: 12px 20px;
            border: none;
            border-radius: 25px;
            cursor: pointer;
            font-weight: 600;
            transition: all 0.3s ease;
        }

        .btn-primary {
            background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
            color: white;
        }

        .btn-secondary {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
        }

        .action-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        }

        /* =========== 반응형 디자인 =========== */
        @media (max-width: 768px) {
            body {
                padding: 10px;
            }

            .container {
                border-radius: 15px;
            }

            .header {
                padding: 20px;
            }

            .header h1 {
                font-size: 2em;
            }

            .main-content {
                padding: 20px;
            }

            .section {
                padding: 20px;
            }

            .user-info {
                grid-template-columns: 1fr;
            }

            .radio-group {
                justify-content: center;
            }

            .upload-area {
                padding: 30px 20px;
            }

            .calories-display {
                font-size: 2em;
            }

            .nutrition-grid {
                grid-template-columns: 1fr;
            }

            .action-buttons {
                grid-template-columns: 1fr;
            }
        }

        @media (max-width: 480px) {
            .header h1 {
                font-size: 1.8em;
            }

            .section-title {
                font-size: 1.3em;
            }

            .upload-area {
                padding: 20px 15px;
            }

            .upload-text {
                font-size: 1em;
            }

            .preview-container {
                grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
            }

            .preview-image {
                height: 80px;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <!-- 헤더 -->
        <div class="header">
            <h1>🍽️ 음식 영양 분석기</h1>
            <p>AI가 분석하는 맞춤형 영양 정보</p>
        </div>

        <div class="main-content">
            <!-- 1. 개인정보 입력 섹션 -->
            <div class="section" id="userInfoSection">
                <h2 class="section-title">👤 기본정보</h2>
                <div class="user-info">
                    <div class="form-group">
                        <label>성별</label>
                        <div class="radio-group">
                            <div class="radio-item">
                                <input type="radio" id="male" name="gender" value="남성" checked>
                                <label for="male">👨 남성</label>
                            </div>
                            <div class="radio-item">
                                <input type="radio" id="female" name="gender" value="여성">
                                <label for="female">👩 여성</label>
                            </div>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label for="ageGroup">나이대</label>
                        <select id="ageGroup">
                            <option value="10대">10대</option>
                            <option value="20대" selected>20대</option>
                            <option value="30대">30대</option>
                            <option value="40대">40대</option>
                            <option value="50대">50대</option>
                            <option value="60대이상">60대 이상</option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label for="activityLevel">활동량</label>
                        <select id="activityLevel">
                            <option value="좌식">좌식 (사무직, 학생)</option>
                            <option value="보통" selected>보통 (가벼운 운동)</option>
                            <option value="활발">활발 (규칙적 운동)</option>
                        </select>
                    </div>
                </div>
            </div>

            <!-- 2. 사진 업로드 섹션 -->
            <div class="section" id="uploadSection">
                <h2 class="section-title">📸 음식 사진 업로드</h2>
                <div class="upload-area" id="uploadArea">
                    <div class="upload-icon">📷</div>
                    <div class="upload-text">사진을 드래그하거나 버튼을 클릭하세요</div>
                    <div class="upload-hint">💡 팁: 음식 전체가 잘 보이도록 찍어주세요 (최대 5장)</div>
                    <button class="file-button" onclick="document.getElementById('fileInput').click()">
                        📁 파일 선택
                    </button>
                    <input type="file" id="fileInput" multiple accept="image/*">
                </div>
                
                <div class="preview-container" id="previewContainer">
                    <!-- 미리보기 이미지들이 여기에 표시됩니다 -->
                </div>
                
                <button class="analyze-button" id="analyzeBtn" onclick="analyzeFood()" disabled>
                    🔍 음식 분석하기
                </button>
            </div>

            <!-- 3. 분석 진행 섹션 -->
            <div class="loading" id="loadingSection">
                <div class="loading-spinner"></div>
                <div class="loading-text" id="loadingText">🔍 음식 인식중...</div>
            </div>

            <!-- 4. 분석 결과 섹션 -->
            <div class="results" id="resultsSection">
                <!-- 4-1. 음식 인식 결과 -->
                <div class="section">
                    <h2 class="section-title">🍜 인식된 음식</h2>
                    <div class="food-list" id="foodList">
                        <!-- 음식 목록이 여기에 표시됩니다 -->
                    </div>
                </div>

                <!-- 4-2. 핵심 영양정보 대시보드 -->
                <div class="section">
                    <h2 class="section-title">📊 영양 정보 요약</h2>
                    <div class="nutrition-summary">
                        <div class="calories-display" id="caloriesDisplay">0 kcal</div>
                        <div class="progress-bar">
                            <div class="progress-fill" id="calorieProgress" style="width: 0%"></div>
                        </div>
                        <div style="text-align: center; color: #666; margin-bottom: 20px;">
                            일일 권장량 대비: <span id="dailyRatio">0%</span>
                        </div>
                        
                        <div class="nutrition-grid" id="nutritionGrid">
                            <!-- 영양소 정보가 여기에 표시됩니다 -->
                        </div>
                    </div>
                </div>

                <!-- 4-3. 개인맞춤 건강 평가 -->
                <div class="section">
                    <h2 class="section-title" id="personalizedTitle">💊 맞춤 분석</h2>
                    <div class="health-assessment">
                        <div class="health-grade" id="healthGrade">🟡 보통</div>
                        
                        <div class="recommendations">
                            <div class="rec-section" id="positiveSection">
                                <div class="rec-title">✅ 좋은점</div>
                                <ul class="rec-list" id="positiveList"></ul>
                            </div>
                            
                            <div class="rec-section" id="concernsSection">
                                <div class="rec-title">⚠️ 주의점</div>
                                <ul class="rec-list" id="concernsList"></ul>
                            </div>
                            
                            <div class="rec-section">
                                <div class="rec-title">💡 추천사항</div>
                                <p id="recommendationsText">분석 중...</p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 4-4. 상세 영양성분표 -->
                <div class="section">
                    <h2 class="section-title">📋 상세 영양성분</h2>
                    <table class="nutrition-table">
                        <thead>
                            <tr>
                                <th>영양소</th>
                                <th>함량</th>
                                <th>권장량 대비</th>
                            </tr>
                        </thead>
                        <tbody id="nutritionTableBody">
                            <!-- 상세 영양 정보가 여기에 표시됩니다 -->
                        </tbody>
                    </table>
                </div>

                <!-- 5. 액션 버튼들 -->
                <div class="action-buttons">
                    <button class="action-btn btn-primary" onclick="resetAnalysis()">
                        🔄 다시 분석하기
                    </button>
                    <button class="action-btn btn-secondary" onclick="shareResults()">
                        📱 결과 공유하기
                    </button>
                    <button class="action-btn btn-secondary" onclick="viewChart()">
                        📊 영양 차트 보기
                    </button>
                    <button class="action-btn btn-secondary" onclick="saveResults()">
                        💾 결과 저장
                    </button>
                </div>
            </div>
        </div>
    </div>

    <script>
        // 전역 변수
        let selectedFiles = [];
        let analysisResult = null;

        // 페이지 로드 시 초기화
        document.addEventListener('DOMContentLoaded', function() {
            initializeApp();
        });

        // 앱 초기화
        function initializeApp() {
            setupFileUpload();
            setupDragAndDrop();
            updateAnalyzeButton();
        }

        // 파일 업로드 설정
        function setupFileUpload() {
            const fileInput = document.getElementById('fileInput');
            fileInput.addEventListener('change', handleFileSelect);
        }

        // 드래그 앤 드롭 설정
        function setupDragAndDrop() {
            const uploadArea = document.getElementById('uploadArea');
            
            uploadArea.addEventListener('dragover', function(e) {
                e.preventDefault();
                uploadArea.classList.add('dragover');
            });
            
            uploadArea.addEventListener('dragleave', function(e) {
                e.preventDefault();
                uploadArea.classList.remove('dragover');
            });
            
            uploadArea.addEventListener('drop', function(e) {
                e.preventDefault();
                uploadArea.classList.remove('dragover');
                
                const files = Array.from(e.dataTransfer.files);
                addFiles(files);
            });
        }

        // 파일 선택 처리
        function handleFileSelect(e) {
            const files = Array.from(e.target.files);
            addFiles(files);
        }

        // 파일 추가
        function addFiles(files) {
            const imageFiles = files.filter(file => file.type.startsWith('image/'));
            
            if (selectedFiles.length + imageFiles.length > 5) {
                alert('최대 5장까지만 업로드할 수 있습니다.');
                return;
            }
            
            imageFiles.forEach(file => {
                if (selectedFiles.length < 5) {
                    selectedFiles.push(file);
                }
            });
            
            updatePreview();
            updateAnalyzeButton();
        }

        // 미리보기 업데이트
        function updatePreview() {
            const container = document.getElementById('previewContainer');
            container.innerHTML = '';
            
            selectedFiles.forEach((file, index) => {
                const reader = new FileReader();
                reader.onload = function(e) {
                    const previewItem = document.createElement('div');
                    previewItem.className = 'preview-item';
                    previewItem.innerHTML = `
                        <img src="${e.target.result}" class="preview-image" alt="음식 사진">
                        <button class="preview-remove" onclick="removeFile(${index})">×</button>
                    `;
                    container.appendChild(previewItem);
                };
                reader.readAsDataURL(file);
            });
        }

        // 파일 제거
        function removeFile(index) {
            selectedFiles.splice(index, 1);
            updatePreview();
            updateAnalyzeButton();
        }

        // 분석 버튼 상태 업데이트
        function updateAnalyzeButton() {
            const analyzeBtn = document.getElementById('analyzeBtn');
            analyzeBtn.disabled = selectedFiles.length === 0;
        }

        // 음식 분석 실행
        async function analyzeFood() {
            if (selectedFiles.length === 0) {
                alert('분석할 음식 사진을 업로드해주세요.');
                return;
            }

            // UI 상태 변경
            showLoading();
            
            try {
                // 이미지를 Base64로 변환
                const imageDataArray = await Promise.all(
                    selectedFiles.map(file => convertToBase64(file))
                );
                
                // 사용자 정보 수집
                const gender = document.querySelector('input[name="gender"]:checked').value;
                const ageGroup = document.getElementById('ageGroup').value;
                const activityLevel = document.getElementById('activityLevel').value;
                
                // 로딩 텍스트 업데이트
                updateLoadingText('📊 영양성분 계산중...');
                
                // Google Apps Script 함수 호출
                google.script.run
                    .withSuccessHandler(handleAnalysisSuccess)
                    .withFailureHandler(handleAnalysisError)
                    .analyzeFood(imageDataArray, gender, ageGroup, activityLevel);
                    
            } catch (error) {
                console.error('분석 중 오류:', error);
                handleAnalysisError(error);
            }
        }

        // 파일을 Base64로 변환
        function convertToBase64(file) {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = () => resolve(reader.result);
                reader.onerror = reject;
                reader.readAsDataURL(file);
            });
        }

        // 로딩 표시
        function showLoading() {
            document.getElementById('uploadSection').style.display = 'none';
            document.getElementById('loadingSection').classList.add('show');
            document.getElementById('resultsSection').classList.remove('show');
        }

        // 로딩 텍스트 업데이트
        function updateLoadingText(text) {
            document.getElementById('loadingText').textContent = text;
        }

        // 분석 성공 처리
        function handleAnalysisSuccess(response) {
            console.log('분석 완료:', response);
            
            if (response.success) {
                analysisResult = response.result;
                displayResults(analysisResult);
                hideLoading();
                showResults();
            } else {
                handleAnalysisError(response.error);
            }
        }

        // 분석 실패 처리
        function handleAnalysisError(error) {
            console.error('분석 실패:', error);
            hideLoading();
            alert('분석 중 오류가 발생했습니다. 다시 시도해주세요.\n오류: ' + error);
            document.getElementById('uploadSection').style.display = 'block';
        }

        // 로딩 숨기기
        function hideLoading() {
            document.getElementById('loadingSection').classList.remove('show');
        }

        // 결과 표시
        function showResults() {
            document.getElementById('resultsSection').classList.add('show');
        }

        // 결과 화면 구성
        function displayResults(result) {
            displayFoodList(result.foods);
            displayNutritionSummary(result);
            displayHealthAssessment(result);
            displayNutritionTable(result);
        }

        // 음식 목록 표시
        function displayFoodList(foods) {
            const container = document.getElementById('foodList');
            container.innerHTML = '';
            
            foods.forEach(food => {
                const foodItem = document.createElement('div');
                foodItem.className = 'food-item';
                foodItem.textContent = food;
                container.appendChild(foodItem);
            });
        }

        // 영양 요약 표시
        function displayNutritionSummary(result) {
            // 칼로리 표시
            document.getElementById('caloriesDisplay').textContent = `${result.totalCalories} kcal`;
            document.getElementById('dailyRatio').textContent = `${result.dailyCalorieRatio}%`;
            
            // 진행바 업데이트
            const progressBar = document.getElementById('calorieProgress');
            progressBar.style.width = `${Math.min(result.dailyCalorieRatio, 100)}%`;
            
            // 영양소 그리드 표시
            const nutritionGrid = document.getElementById('nutritionGrid');
            nutritionGrid.innerHTML = `
                <div class="nutrition-item">
                    <div class="nutrition-icon">🍞</div>
                    <div class="nutrition-value">${result.carbohydrates}g</div>
                    <div class="nutrition-label">탄수화물</div>
                </div>
                <div class="nutrition-item">
                    <div class="nutrition-icon">🥩</div>
                    <div class="nutrition-value">${result.protein}g</div>
                    <div class="nutrition-label">단백질</div>
                </div>
                <div class="nutrition-item">
                    <div class="nutrition-icon">🧈</div>
                    <div class="nutrition-value">${result.fat}g</div>
                    <div class="nutrition-label">지방</div>
                </div>
                <div class="nutrition-item">
                    <div class="nutrition-icon">🍯</div>
                    <div class="nutrition-value">${result.sugar}g</div>
                    <div class="nutrition-label">당류</div>
                </div>
                <div class="nutrition-item">
                    <div class="nutrition-icon">🧂</div>
                    <div class="nutrition-value">${result.sodium}mg</div>
                    <div class="nutrition-label">나트륨</div>
                </div>
            `;
        }

        // 건강 평가 표시
        function displayHealthAssessment(result) {
            const gender = document.querySelector('input[name="gender"]:checked').value;
            const ageGroup = document.getElementById('ageGroup').value;
            
            // 제목 업데이트
            document.getElementById('personalizedTitle').textContent = `💊 ${ageGroup} ${gender} 맞춤 분석`;
            
            // 건강도 등급 표시
            const healthGrade = document.getElementById('healthGrade');
            const gradeClass = getGradeClass(result.healthGrade);
            healthGrade.className = `health-grade ${gradeClass}`;
            healthGrade.textContent = getGradeEmoji(result.healthGrade) + ' ' + result.healthGrade;
            
            // 좋은점 표시
            const positiveList = document.getElementById('positiveList');
            positiveList.innerHTML = '';
            result.positivePoints.forEach(point => {
                const li = document.createElement('li');
                li.textContent = point;
                positiveList.appendChild(li);
            });
            
            // 주의점 표시
            const concernsList = document.getElementById('concernsList');
            concernsList.innerHTML = '';
            result.concerns.forEach(concern => {
                const li = document.createElement('li');
                li.textContent = concern;
                concernsList.appendChild(li);
            });
            
            // 추천사항 표시
            document.getElementById('recommendationsText').textContent = result.recommendations;
        }

        // 상세 영양표 표시
        function displayNutritionTable(result) {
            const tbody = document.getElementById('nutritionTableBody');
            tbody.innerHTML = `
                <tr>
                    <td>열량</td>
                    <td>${result.totalCalories} kcal</td>
                    <td>${result.dailyCalorieRatio}%</td>
                </tr>
                <tr>
                    <td>탄수화물</td>
                    <td>${result.carbohydrates} g</td>
                    <td>${calculatePercentage(result.carbohydrates, 324)}%</td>
                </tr>
                <tr>
                    <td>단백질</td>
                    <td>${result.protein} g</td>
                    <td>${calculatePercentage(result.protein, 55)}%</td>
                </tr>
                <tr>
                    <td>지방</td>
                    <td>${result.fat} g</td>
                    <td>${calculatePercentage(result.fat, 65)}%</td>
                </tr>
                <tr>
                    <td>당류</td>
                    <td>${result.sugar} g</td>
                    <td>${calculatePercentage(result.sugar, 100)}%</td>
                </tr>
                <tr>
                    <td>나트륨</td>
                    <td>${result.sodium} mg</td>
                    <td>${calculatePercentage(result.sodium, 2000)}%</td>
                </tr>
            `;
        }

        // 백분율 계산
        function calculatePercentage(value, dailyValue) {
            return Math.round((value / dailyValue) * 100);
        }

        // 등급 클래스 반환
        function getGradeClass(grade) {
            const gradeMap = {
                '매우좋음': 'grade-excellent',
                '좋음': 'grade-good',
                '보통': 'grade-normal',
                '주의': 'grade-caution',
                '위험': 'grade-danger'
            };
            return gradeMap[grade] || 'grade-normal';
        }

        // 등급 이모지 반환
        function getGradeEmoji(grade) {
            const emojiMap = {
                '매우좋음': '🟢',
                '좋음': '🔵',
                '보통': '🟡',
                '주의': '🟠',
                '위험': '🔴'
            };
            return emojiMap[grade] || '🟡';
        }

        // 다시 분석하기
        function resetAnalysis() {
            selectedFiles = [];
            analysisResult = null;
            
            document.getElementById('fileInput').value = '';
            document.getElementById('previewContainer').innerHTML = '';
            document.getElementById('resultsSection').classList.remove('show');
            document.getElementById('uploadSection').style.display = 'block';
            
            updateAnalyzeButton();
        }

        // 결과 공유하기
        function shareResults() {
            if (!analysisResult) return;
            
            const shareText = `🍽️ 음식 영양 분석 결과\n\n` +
                `📊 총 칼로리: ${analysisResult.totalCalories}kcal\n` +
                `🍞 탄수화물: ${analysisResult.carbohydrates}g\n` +
                `🥩 단백질: ${analysisResult.protein}g\n` +
                `🧈 지방: ${analysisResult.fat}g\n\n` +
                `💊 건강도: ${analysisResult.healthGrade}\n` +
                `💡 ${analysisResult.recommendations}`;
            
            if (navigator.share) {
                navigator.share({
                    title: '음식 영양 분석 결과',
                    text: shareText
                });
            } else {
                navigator.clipboard.writeText(shareText).then(() => {
                    alert('결과가 클립보드에 복사되었습니다!');
                });
            }
        }

        // 영양 차트 보기
        function viewChart() {
            if (!analysisResult) return;
            
            const chartWindow = window.open('', '_blank', 'width=600,height=400');
            chartWindow.document.write(`
                <html>
                <head><title>영양 차트</title></head>
                <body>
                    <h2>영양성분 차트</h2>
                    <p>차트 기능은 추후 업데이트 예정입니다.</p>
                    <button onclick="window.close()">닫기</button>
                </body>
                </html>
            `);
        }

        // 결과 저장
        function saveResults() {
            if (!analysisResult) return;
            
            const dataStr = JSON.stringify(analysisResult, null, 2);
            const dataBlob = new Blob([dataStr], {type: 'application/json'});
            
            const link = document.createElement('a');
            link.href = URL.createObjectURL(dataBlob);
            link.download = `nutrition_analysis_${new Date().toISOString().slice(0,10)}.json`;
            link.click();
        }
    </script>
</body>
</html>
