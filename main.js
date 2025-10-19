// Sora 프롬프트 생성기 메인 JavaScript

class SoraPromptGenerator {
    constructor() {
        this.initializeElements();
        this.bindEvents();
        this.loadSampleData();
    }

    initializeElements() {
        // 폼 요소들
        this.form = document.getElementById('promptForm');
        this.generateBtn = document.getElementById('generateBtn');
        this.copyBtn = document.getElementById('copyBtn');
        this.copyFinalPromptBtn = document.getElementById('copyFinalPromptBtn');
        this.exampleBtn = document.getElementById('exampleBtn');
        this.clearBtn = document.getElementById('clearBtn');
        
        // 모달 요소들
        this.exampleModal = document.getElementById('exampleModal');
        this.closeExampleModal = document.getElementById('closeExampleModal');
        this.exampleList = document.getElementById('exampleList');
        
        // 입력 필드들
        this.projectTitle = document.getElementById('projectTitle');
        this.overallStyle = document.getElementById('overallStyle');
        this.sceneOverview = document.getElementById('sceneOverview');
        this.characterName = document.getElementById('characterName');
        this.characterDescription = document.getElementById('characterDescription');
        this.location = document.getElementById('location');
        this.timeWeather = document.getElementById('timeWeather');
        this.environmentDetails = document.getElementById('environmentDetails');
        this.actions = document.getElementById('actions');
        this.cameraMovement = document.getElementById('cameraMovement');
        this.cameraAngle = document.getElementById('cameraAngle');
        this.videoLength = document.getElementById('videoLength');
        this.videoFormat = document.getElementById('videoFormat');
        
        // 결과 표시 요소들
        this.jsonPreview = document.getElementById('jsonPreview');
        this.finalPromptSection = document.getElementById('finalPromptSection');
        this.finalPrompt = document.getElementById('finalPrompt');
    }

    bindEvents() {
        // 생성 버튼 이벤트
        this.generateBtn.addEventListener('click', () => this.generatePrompt());
        
        // 복사 버튼 이벤트들
        this.copyBtn.addEventListener('click', () => this.copyJsonPrompt());
        
        // 저장/불러오기 버튼 이벤트들
        const saveBtn = document.getElementById('savePromptBtn');
        const loadBtn = document.getElementById('loadPromptBtn');
        const exportBtn = document.getElementById('exportPromptBtn');
        
        if (saveBtn) saveBtn.addEventListener('click', () => this.saveCurrentPrompt());
        if (loadBtn) loadBtn.addEventListener('click', () => this.showSavedPrompts());
        if (exportBtn) exportBtn.addEventListener('click', () => this.exportPrompt());

        // 🆕 Gemini AI 관련 이벤트들
        const geminiImproveBtn = document.getElementById('geminiImproveBtn');
        const copyGeminiPromptBtn = document.getElementById('copyGeminiPromptBtn');
        const useGeminiPromptBtn = document.getElementById('useGeminiPromptBtn');
        
        if (geminiImproveBtn) geminiImproveBtn.addEventListener('click', () => this.improveWithGemini());
        if (copyGeminiPromptBtn) copyGeminiPromptBtn.addEventListener('click', () => this.copyGeminiPrompt());
        if (useGeminiPromptBtn) useGeminiPromptBtn.addEventListener('click', () => this.useGeminiPrompt());

        // Gemini API 모달 이벤트들
        const closeGeminiApiModal = document.getElementById('closeGeminiApiModal');
        const saveGeminiApiKey = document.getElementById('saveGeminiApiKey');
        const testGeminiApiKey = document.getElementById('testGeminiApiKey');
        
        if (closeGeminiApiModal) closeGeminiApiModal.addEventListener('click', () => this.hideGeminiApiModal());
        if (saveGeminiApiKey) saveGeminiApiKey.addEventListener('click', () => this.saveGeminiApiKey());
        if (testGeminiApiKey) testGeminiApiKey.addEventListener('click', () => this.testGeminiApiKey());
        this.copyFinalPromptBtn.addEventListener('click', () => this.copyFinalPrompt());
        
        // 예제 및 초기화 버튼
        this.exampleBtn.addEventListener('click', () => this.showExampleModal());
        this.clearBtn.addEventListener('click', () => this.clearForm());
        
        // 모달 이벤트들
        this.closeExampleModal.addEventListener('click', () => this.hideExampleModal());
        this.exampleModal.addEventListener('click', (e) => {
            if (e.target === this.exampleModal) {
                this.hideExampleModal();
            }
        });
        
        // 실시간 입력 감지 (선택적)
        const inputs = this.form.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('input', () => this.validateForm());
        });
        
        // 엔터키로 생성하기 방지
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.generatePrompt();
        });
        
        // ESC 키로 모달 닫기
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.hideExampleModal();
            }
        });
    }

    loadSampleData() {
        // 샘플 데이터 로드 (선택적)
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get('sample') === 'true') {
            this.loadSamplePrompt();
        }
    }

    loadSamplePrompt() {
        this.projectTitle.value = "도시의 안개 속 고양이";
        this.overallStyle.value = "시네마틱 장면";
        this.sceneOverview.value = "안개 낀 새벽 도시에서 고양이가 홀로 걷는 고요하고 신비로운 장면";
        this.characterName.value = "거리의 고양이";
        this.characterDescription.value = "3살 정도의 길고양이, 회색 털, 밝은 눈동자, 약간 젖은 모습, 외로움과 호기심이 섞인 표정";
        this.location.value = "도심의 좁은 골목길";
        this.timeWeather.value = "새벽 4시경, 짙은 안개와 이슬비";
        this.environmentDetails.value = "희미한 가로등빛과 네온사인의 반사, 물웅덩이에 비친 빛";
        this.actions.value = "천천히 걷는다, 발소리가 물웅덩이에서 은은하게 울린다, 가끔 뒤를 돌아본다";
        this.cameraMovement.value = "슬로우 트래킹";
        this.cameraAngle.value = "로우앵글";
    }

    validateForm() {
        const requiredFields = [
            this.projectTitle,
            this.sceneOverview,
            this.characterName,
            this.location
        ];

        let isValid = true;
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.classList.add('input-error');
                field.classList.remove('input-success');
            } else {
                field.classList.remove('input-error');
                field.classList.add('input-success');
            }
        });

        return isValid;
    }

    generatePrompt() {
        // 버튼 로딩 상태
        this.showLoading(true);

        try {
            // 폼 유효성 검사
            if (!this.validateForm()) {
                this.showError('필수 항목을 모두 입력해주세요.');
                this.showLoading(false);
                return;
            }

            // JSON 프롬프트 생성
            const jsonPrompt = this.createJsonPrompt();
            
            // JSON 미리보기 표시
            this.displayJsonPreview(jsonPrompt);
            
            // 최종 프롬프트 생성
            const finalPrompt = this.createFinalPrompt(jsonPrompt);
            this.displayFinalPrompt(finalPrompt);
            
            // 복사 버튼 활성화
            this.copyBtn.classList.remove('opacity-0', 'pointer-events-none');
            
            // 내보내기 버튼도 활성화
            const exportBtn = document.getElementById('exportPromptBtn');
            if (exportBtn) {
                exportBtn.classList.remove('opacity-0', 'pointer-events-none');
            }

            // 🆕 Gemini 개선 버튼도 활성화
            const geminiBtn = document.getElementById('geminiImproveBtn');
            if (geminiBtn) {
                geminiBtn.classList.remove('opacity-0', 'pointer-events-none');
            }
            this.finalPromptSection.classList.remove('hidden');
            
            // 품질 점수 표시
            this.displayQualityScore();
            
            // 성공 메시지
            this.showSuccess('프롬프트가 성공적으로 생성되었습니다!');
            
        } catch (error) {
            console.error('프롬프트 생성 중 오류:', error);
            this.showError('프롬프트 생성 중 오류가 발생했습니다.');
        } finally {
            this.showLoading(false);
        }
    }

    createJsonPrompt() {
        const jsonData = {
            "video_prompt": {
                "project_title": this.projectTitle.value.trim(),
                "overall_style": this.getStyleDescription(),
                "scene_overview": this.sceneOverview.value.trim(),
                "characters": [
                    {
                        "name": this.characterName.value.trim(),
                        "description": this.characterDescription.value.trim(),
                        "emotion": this.extractEmotionFromDescription()
                    }
                ],
                "environment": {
                    "location": this.location.value.trim(),
                    "time_weather": this.timeWeather.value.trim(),
                    "lighting_details": this.environmentDetails.value.trim()
                },
                "actions": this.parseActions(),
                "camera_work": {
                    "movement": this.cameraMovement.value || "고정 샷",
                    "angle": this.cameraAngle.value || "아이레벨",
                    "focus": "주요 캐릭터에 초점"
                },
                "technical_specs": {
                    "length": this.videoLength.value,
                    "format": this.videoFormat.value,
                    "quality": "최고 품질"
                },
                "language": "Korean"
            }
        };

        return jsonData;
    }

    getStyleDescription() {
        const baseStyle = this.overallStyle.value || "시네마틱 장면";
        const additionalStyles = [];
        
        if (this.environmentDetails.value.includes('네온')) {
            additionalStyles.push('네온 조명 효과');
        }
        if (this.timeWeather.value.includes('안개')) {
            additionalStyles.push('안개 효과');
        }
        if (this.timeWeather.value.includes('새벽') || this.timeWeather.value.includes('밤')) {
            additionalStyles.push('저조도 촬영');
        }

        return additionalStyles.length > 0 
            ? `${baseStyle}, ${additionalStyles.join(', ')}`
            : baseStyle;
    }

    extractEmotionFromDescription() {
        const description = this.characterDescription.value.toLowerCase();
        const emotions = [];
        
        if (description.includes('외로') || description.includes('lonely')) emotions.push('외로움');
        if (description.includes('호기') || description.includes('curious')) emotions.push('호기심');
        if (description.includes('슬프') || description.includes('sad')) emotions.push('슬픔');
        if (description.includes('행복') || description.includes('happy')) emotions.push('행복');
        if (description.includes('두려') || description.includes('fear')) emotions.push('두려움');
        
        return emotions.length > 0 ? emotions.join(', ') : '중립적 감정';
    }

    parseActions() {
        const actionText = this.actions.value.trim();
        if (!actionText) return ["천천히 움직인다"];
        
        return actionText.split(/[,，\n]/)
            .map(action => action.trim())
            .filter(action => action.length > 0);
    }

    createFinalPrompt(jsonData) {
        const vp = jsonData.video_prompt;
        
        let prompt = `${vp.overall_style}\n\n`;
        prompt += `${vp.scene_overview}\n\n`;
        
        if (vp.characters && vp.characters[0]) {
            const char = vp.characters[0];
            prompt += `주인공: ${char.name}\n`;
            prompt += `외모와 감정: ${char.description}\n\n`;
        }
        
        prompt += `환경: ${vp.environment.location}\n`;
        prompt += `시간과 날씨: ${vp.environment.time_weather}\n`;
        prompt += `조명과 세부사항: ${vp.environment.lighting_details}\n\n`;
        
        prompt += `동작: ${vp.actions.join(', ')}\n\n`;
        
        prompt += `카메라 연출: ${vp.camera_work.movement}, ${vp.camera_work.angle}\n`;
        prompt += `초점: ${vp.camera_work.focus}\n\n`;
        
        prompt += `영상 길이: ${vp.technical_specs.length}\n`;
        prompt += `해상도: ${vp.technical_specs.format}\n`;
        prompt += `품질: ${vp.technical_specs.quality}`;

        return prompt;
    }

    displayJsonPreview(jsonData) {
        const formattedJson = this.formatJsonWithColors(jsonData);
        this.jsonPreview.innerHTML = `<pre>${formattedJson}</pre>`;
        this.jsonPreview.classList.add('animate-slide-in');
    }

    formatJsonWithColors(obj) {
        const jsonString = JSON.stringify(obj, null, 2);
        
        return jsonString
            .replace(/(".*?"):/g, '<span class="json-key">$1</span>:')
            .replace(/: (".*?")/g, ': <span class="json-string">$1</span>')
            .replace(/: (\d+)/g, ': <span class="json-number">$1</span>')
            .replace(/: (true|false)/g, ': <span class="json-boolean">$1</span>')
            .replace(/: (null)/g, ': <span class="json-null">$1</span>');
    }

    displayFinalPrompt(prompt) {
        this.finalPrompt.textContent = prompt;
        this.finalPrompt.classList.add('animate-slide-in');
    }

    async copyJsonPrompt() {
        try {
            const jsonText = this.jsonPreview.textContent;
            await navigator.clipboard.writeText(jsonText);
            this.showCopySuccess(this.copyBtn);
        } catch (error) {
            console.error('복사 실패:', error);
            this.showError('복사에 실패했습니다.');
        }
    }

    async copyFinalPrompt() {
        try {
            const promptText = this.finalPrompt.textContent;
            await navigator.clipboard.writeText(promptText);
            this.showCopySuccess(this.copyFinalPromptBtn);
        } catch (error) {
            console.error('복사 실패:', error);
            this.showError('복사에 실패했습니다.');
        }
    }

    showCopySuccess(button) {
        const originalText = button.innerHTML;
        button.innerHTML = '<i class="fas fa-check"></i><span>복사 완료!</span>';
        button.classList.remove('bg-blue-600', 'hover:bg-blue-700', 'bg-green-600', 'hover:bg-green-700');
        button.classList.add('bg-green-500');
        
        setTimeout(() => {
            button.innerHTML = originalText;
            button.classList.remove('bg-green-500');
            
            if (button.id === 'copyBtn') {
                button.classList.add('bg-blue-600', 'hover:bg-blue-700');
            } else {
                button.classList.add('bg-green-600', 'hover:bg-green-700');
            }
        }, 2000);
    }

    showLoading(show) {
        if (show) {
            this.generateBtn.innerHTML = '<div class="spinner mr-2"></div><span>생성 중...</span>';
            this.generateBtn.disabled = true;
        } else {
            this.generateBtn.innerHTML = '<i class="fas fa-magic"></i><span>Sora 프롬프트 생성</span>';
            this.generateBtn.disabled = false;
        }
    }

    showSuccess(message) {
        this.showMessage(message, 'success');
    }

    showError(message) {
        this.showMessage(message, 'error');
    }

    showMessage(message, type) {
        // 기존 메시지 제거
        const existingMessage = document.querySelector('.message-popup');
        if (existingMessage) {
            existingMessage.remove();
        }

        const messageDiv = document.createElement('div');
        messageDiv.className = `message-popup fixed top-4 right-4 z-50 px-6 py-4 rounded-lg shadow-lg transition-all duration-300 ${
            type === 'success' 
                ? 'bg-green-600 text-white' 
                : 'bg-red-600 text-white'
        }`;
        
        messageDiv.innerHTML = `
            <div class="flex items-center space-x-2">
                <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
                <span>${message}</span>
            </div>
        `;

        document.body.appendChild(messageDiv);

        // 3초 후 자동 제거
        setTimeout(() => {
            messageDiv.style.opacity = '0';
            messageDiv.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (messageDiv.parentNode) {
                    messageDiv.parentNode.removeChild(messageDiv);
                }
            }, 300);
        }, 3000);
    }

    // 예제 모달 관련 메서드
    showExampleModal() {
        this.populateExampleList();
        this.exampleModal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }

    hideExampleModal() {
        this.exampleModal.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }

    populateExampleList() {
        const examples = SoraExamples.getExamplePrompts();
        
        this.exampleList.innerHTML = examples.map((example, index) => `
            <div class="bg-white/5 rounded-lg p-4 border border-white/10 cursor-pointer hover:bg-white/10 transition-colors"
                 onclick="window.SoraPromptGenerator.getInstance().loadExample(${index})">
                <div class="flex items-center justify-between mb-2">
                    <h4 class="text-white font-medium">${example.name}</h4>
                    <span class="text-xs text-gray-400 bg-white/10 px-2 py-1 rounded">${example.category}</span>
                </div>
                <p class="text-gray-300 text-sm mb-3">${example.data.sceneOverview}</p>
                <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-2 text-xs text-gray-400">
                        <span><i class="fas fa-palette mr-1"></i>${example.data.overallStyle}</span>
                        <span><i class="fas fa-user mr-1"></i>${example.data.characterName}</span>
                    </div>
                    <button class="text-purple-400 hover:text-purple-300 text-sm">
                        <i class="fas fa-download mr-1"></i>사용하기
                    </button>
                </div>
            </div>
        `).join('');
    }

    loadExample(index) {
        const examples = SoraExamples.getExamplePrompts();
        const example = examples[index];
        
        if (!example) return;
        
        // 폼 필드에 예제 데이터 입력
        this.projectTitle.value = example.data.projectTitle || '';
        this.overallStyle.value = example.data.overallStyle || '';
        this.sceneOverview.value = example.data.sceneOverview || '';
        this.characterName.value = example.data.characterName || '';
        this.characterDescription.value = example.data.characterDescription || '';
        this.location.value = example.data.location || '';
        this.timeWeather.value = example.data.timeWeather || '';
        this.environmentDetails.value = example.data.environmentDetails || '';
        this.actions.value = example.data.actions || '';
        this.cameraMovement.value = example.data.cameraMovement || '';
        this.cameraAngle.value = example.data.cameraAngle || '';
        
        // 모달 닫기
        this.hideExampleModal();
        
        // 성공 메시지
        this.showSuccess(`"${example.name}" 예제가 로드되었습니다!`);
        
        // 폼 유효성 검사
        this.validateForm();
    }

    clearForm() {
        if (confirm('모든 입력 내용을 초기화하시겠습니까?')) {
            this.form.reset();
            
            // 결과 섹션 초기화
            this.jsonPreview.innerHTML = `
                <div class="text-gray-400 text-center py-12">
                    <i class="fas fa-lightbulb text-4xl mb-4 opacity-50"></i>
                    <p>좌측 폼을 작성하고 '프롬프트 생성' 버튼을 클릭하세요.</p>
                    <p class="text-sm mt-2">전문적인 Sora 프롬프트가 자동 생성됩니다.</p>
                </div>
            `;
            
            this.finalPromptSection.classList.add('hidden');
            this.copyBtn.classList.add('opacity-0', 'pointer-events-none');
            
            // 내보내기 버튼도 비활성화
            const exportBtn = document.getElementById('exportPromptBtn');
            if (exportBtn) {
                exportBtn.classList.add('opacity-0', 'pointer-events-none');
            }

            // 🆕 Gemini 개선 버튼도 비활성화
            const geminiBtn = document.getElementById('geminiImproveBtn');
            if (geminiBtn) {
                geminiBtn.classList.add('opacity-0', 'pointer-events-none');
            }
            
            // 품질 점수 섹션도 숨기기
            const qualitySection = document.getElementById('qualityScore');
            if (qualitySection) {
                qualitySection.classList.add('hidden');
            }
            
            // 폼 유효성 검사 초기화
            const inputs = this.form.querySelectorAll('input, textarea, select');
            inputs.forEach(input => {
                input.classList.remove('input-error', 'input-success');
            });
            
            this.showSuccess('폼이 초기화되었습니다.');
        }
    }

    // 고급 프롬프트 최적화 메서드
    optimizePrompt(prompt) {
        // SoraExamples 클래스의 최적화 메서드 사용
        return SoraExamples.optimizePromptForSora(prompt);
    }

    // 프롬프트 품질 점수 계산 (고급 버전)
    calculatePromptQuality() {
        let score = 0;
        const maxScore = 100;
        
        // 필수 항목 체크 (40점)
        if (this.projectTitle.value.trim()) {
            score += 8;
            // 제목 길이 보너스 (적절한 길이: 10-50자)
            const titleLength = this.projectTitle.value.trim().length;
            if (titleLength >= 10 && titleLength <= 50) score += 2;
        }
        
        if (this.sceneOverview.value.trim()) {
            score += 12;
            // 장면 설명 품질 보너스
            const overview = this.sceneOverview.value.trim();
            if (overview.length >= 30) score += 3;
            if (overview.includes('에서') || overview.includes('하는')) score += 2;
        }
        
        if (this.characterName.value.trim()) score += 8;
        if (this.characterDescription.value.trim()) {
            score += 12;
            // 캐릭터 묘사 세부성 체크
            const desc = this.characterDescription.value.trim();
            if (desc.length >= 20) score += 2;
            if (desc.includes('나이') || desc.includes('외모') || desc.includes('의상')) score += 3;
        }
        
        // 선택 항목 체크 (40점)
        if (this.location.value.trim()) {
            score += 8;
            // 위치 구체성 보너스
            if (this.location.value.trim().length >= 10) score += 2;
        }
        
        if (this.timeWeather.value.trim()) {
            score += 8;
            // 시간/날씨 조합 보너스
            const timeWeather = this.timeWeather.value.trim();
            if (timeWeather.includes('시') || timeWeather.includes('날씨') || timeWeather.includes('분위기')) score += 2;
        }
        
        if (this.environmentDetails.value.trim()) {
            score += 8;
            // 환경 세부사항 보너스
            if (this.environmentDetails.value.trim().length >= 15) score += 2;
        }
        
        if (this.actions.value.trim()) {
            score += 8;
            // 행동 묘사 보너스
            const actions = this.actions.value.trim();
            if (actions.includes('천천히') || actions.includes('빠르게') || actions.includes('조심스럽게')) score += 2;
        }
        if (this.cameraMovement.value) score += 4;
        if (this.cameraAngle.value) score += 4;
        
        // 세부 사항 점수 (20점)
        const detailLength = this.characterDescription.value.length + this.environmentDetails.value.length;
        if (detailLength > 100) score += 10;
        if (detailLength > 200) score += 5;
        if (detailLength > 300) score += 5;
        
        return Math.min(score, maxScore);
    }

    // 🆕 프롬프트 저장 기능
    saveCurrentPrompt() {
        const formData = this.collectFormData();
        if (!formData.projectTitle) {
            this.showError('프로젝트 제목을 입력해주세요.');
            return;
        }

        const savedPrompts = this.getSavedPrompts();
        const promptId = Date.now().toString();
        
        const promptData = {
            id: promptId,
            name: formData.projectTitle,
            data: formData,
            savedAt: new Date().toLocaleString('ko-KR'),
            quality: this.calculatePromptQuality()
        };

        savedPrompts.push(promptData);
        localStorage.setItem('soraPrompts', JSON.stringify(savedPrompts));
        
        this.showSuccess(`"${formData.projectTitle}" 프롬프트가 저장되었습니다!`);
    }

    // 🆕 저장된 프롬프트 목록 표시
    showSavedPrompts() {
        const savedPrompts = this.getSavedPrompts();
        
        if (savedPrompts.length === 0) {
            this.showError('저장된 프롬프트가 없습니다.');
            return;
        }

        // 저장된 프롬프트 모달 생성
        const modalHtml = `
            <div id="savedPromptsModal" class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                <div class="bg-gray-900 rounded-xl max-w-4xl w-full max-h-[80vh] overflow-y-auto">
                    <div class="flex items-center justify-between p-6 border-b border-gray-700">
                        <div class="flex items-center space-x-3">
                            <i class="fas fa-save text-purple-400 text-xl"></i>
                            <h3 class="text-xl font-bold text-white">저장된 프롬프트</h3>
                        </div>
                        <button id="closeSavedModal" class="text-gray-400 hover:text-white">
                            <i class="fas fa-times text-xl"></i>
                        </button>
                    </div>
                    <div class="p-6">
                        <div class="grid gap-4">
                            ${savedPrompts.map(prompt => `
                                <div class="bg-gray-800 rounded-lg p-4 border border-gray-700 hover:border-purple-500/50 transition-colors">
                                    <div class="flex items-start justify-between">
                                        <div class="flex-1">
                                            <div class="flex items-center space-x-3 mb-2">
                                                <h4 class="text-white font-medium">${prompt.name}</h4>
                                                <div class="flex items-center space-x-2">
                                                    <span class="text-xs px-2 py-1 rounded-full ${prompt.quality >= 80 ? 'bg-green-600' : prompt.quality >= 60 ? 'bg-yellow-600' : 'bg-red-600'} text-white">
                                                        품질: ${prompt.quality}점
                                                    </span>
                                                    <span class="text-xs text-gray-400">${prompt.savedAt}</span>
                                                </div>
                                            </div>
                                            <p class="text-gray-300 text-sm mb-3">${prompt.data.sceneOverview || '장면 설명 없음'}</p>
                                            <div class="flex items-center space-x-4 text-xs text-gray-400">
                                                <span><i class="fas fa-palette mr-1"></i>${prompt.data.overallStyle || '미정'}</span>
                                                <span><i class="fas fa-user mr-1"></i>${prompt.data.characterName || '미정'}</span>
                                                <span><i class="fas fa-map-marker-alt mr-1"></i>${prompt.data.location || '미정'}</span>
                                            </div>
                                        </div>
                                        <div class="flex space-x-2 ml-4">
                                            <button onclick="window.SoraPromptGenerator.getInstance().loadSavedPrompt('${prompt.id}')" 
                                                    class="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded text-sm">
                                                <i class="fas fa-download mr-1"></i>불러오기
                                            </button>
                                            <button onclick="window.SoraPromptGenerator.getInstance().deleteSavedPrompt('${prompt.id}')" 
                                                    class="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm">
                                                <i class="fas fa-trash mr-1"></i>삭제
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', modalHtml);
        
        // 모달 닫기 이벤트
        document.getElementById('closeSavedModal').addEventListener('click', () => {
            document.getElementById('savedPromptsModal').remove();
        });
    }

    // 🆕 저장된 프롬프트 불러오기
    loadSavedPrompt(promptId) {
        const savedPrompts = this.getSavedPrompts();
        const prompt = savedPrompts.find(p => p.id === promptId);
        
        if (!prompt) {
            this.showError('프롬프트를 찾을 수 없습니다.');
            return;
        }

        // 폼에 데이터 채우기
        this.fillFormWithData(prompt.data);
        
        // 모달 닫기
        const modal = document.getElementById('savedPromptsModal');
        if (modal) modal.remove();
        
        this.showSuccess(`"${prompt.name}" 프롬프트가 불러와졌습니다!`);
    }

    // 🆕 저장된 프롬프트 삭제
    deleteSavedPrompt(promptId) {
        if (!confirm('이 프롬프트를 삭제하시겠습니까?')) return;
        
        let savedPrompts = this.getSavedPrompts();
        savedPrompts = savedPrompts.filter(p => p.id !== promptId);
        localStorage.setItem('soraPrompts', JSON.stringify(savedPrompts));
        
        // 모달 새로고침
        const modal = document.getElementById('savedPromptsModal');
        if (modal) {
            modal.remove();
            this.showSavedPrompts();
        }
        
        this.showSuccess('프롬프트가 삭제되었습니다.');
    }

    // 🆕 프롬프트 내보내기 (다양한 형식)
    exportPrompt() {
        const formData = this.collectFormData();
        if (!formData.projectTitle) {
            this.showError('먼저 프롬프트를 생성해주세요.');
            return;
        }

        const exportOptions = [
            { name: 'JSON 파일', format: 'json' },
            { name: 'TXT 파일 (최종 프롬프트)', format: 'txt' },
            { name: 'Markdown 파일', format: 'md' }
        ];

        const modalHtml = `
            <div id="exportModal" class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                <div class="bg-gray-900 rounded-xl max-w-md w-full">
                    <div class="flex items-center justify-between p-6 border-b border-gray-700">
                        <div class="flex items-center space-x-3">
                            <i class="fas fa-download text-blue-400 text-xl"></i>
                            <h3 class="text-xl font-bold text-white">프롬프트 내보내기</h3>
                        </div>
                        <button id="closeExportModal" class="text-gray-400 hover:text-white">
                            <i class="fas fa-times text-xl"></i>
                        </button>
                    </div>
                    <div class="p-6">
                        <div class="space-y-3">
                            ${exportOptions.map(option => `
                                <button onclick="window.SoraPromptGenerator.getInstance().downloadPrompt('${option.format}')"
                                        class="w-full bg-gray-800 hover:bg-gray-700 text-white p-3 rounded-lg text-left transition-colors">
                                    <i class="fas fa-file-${option.format === 'json' ? 'code' : option.format === 'txt' ? 'alt' : 'text'} mr-3 text-blue-400"></i>
                                    ${option.name}
                                </button>
                            `).join('')}
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', modalHtml);
        
        document.getElementById('closeExportModal').addEventListener('click', () => {
            document.getElementById('exportModal').remove();
        });
    }

    // 🆕 프롬프트 파일 다운로드
    downloadPrompt(format) {
        const formData = this.collectFormData();
        const jsonData = this.generateJSONPrompt(formData);
        const finalPrompt = this.optimizePrompt(this.generateFinalPrompt(formData));
        
        let content = '';
        let filename = `${formData.projectTitle || 'sora-prompt'}-${Date.now()}`;
        
        switch(format) {
            case 'json':
                content = JSON.stringify(jsonData, null, 2);
                filename += '.json';
                break;
            case 'txt':
                content = finalPrompt;
                filename += '.txt';
                break;
            case 'md':
                content = this.generateMarkdownContent(formData, jsonData, finalPrompt);
                filename += '.md';
                break;
        }

        const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        // 모달 닫기
        const modal = document.getElementById('exportModal');
        if (modal) modal.remove();
        
        this.showSuccess(`${format.toUpperCase()} 파일이 다운로드되었습니다!`);
    }

    // 🆕 Markdown 컨텐츠 생성
    generateMarkdownContent(formData, jsonData, finalPrompt) {
        return `# ${formData.projectTitle}

## 프로젝트 정보
- **생성일**: ${new Date().toLocaleString('ko-KR')}
- **품질 점수**: ${this.calculatePromptQuality()}점

## 최종 프롬프트
\`\`\`
${finalPrompt}
\`\`\`

## JSON 구조
\`\`\`json
${JSON.stringify(jsonData, null, 2)}
\`\`\`

## 상세 정보

### 기본 설정
- **전체 스타일**: ${formData.overallStyle || '미정'}
- **장면 개요**: ${formData.sceneOverview || '미정'}

### 캐릭터/주체
- **이름**: ${formData.characterName || '미정'}
- **설명**: ${formData.characterDescription || '미정'}

### 환경/배경
- **위치**: ${formData.location || '미정'}
- **시간/날씨**: ${formData.timeWeather || '미정'}
- **세부사항**: ${formData.environmentDetails || '미정'}

### 액션/카메라
- **행동**: ${formData.actions || '미정'}
- **카메라 움직임**: ${formData.cameraMovement || '미정'}
- **카메라 앵글**: ${formData.cameraAngle || '미정'}

---
*Generated by Sora 프롬프트 생성기*`;
    }

    // 🆕 헬퍼 메서드들
    getSavedPrompts() {
        try {
            return JSON.parse(localStorage.getItem('soraPrompts') || '[]');
        } catch {
            return [];
        }
    }

    fillFormWithData(data) {
        Object.keys(data).forEach(key => {
            const element = document.getElementById(key);
            if (element) {
                element.value = data[key] || '';
            }
        });
        this.validateForm();
    }

    collectFormData() {
        return {
            projectTitle: this.projectTitle.value.trim(),
            overallStyle: this.overallStyle.value,
            sceneOverview: this.sceneOverview.value.trim(),
            characterName: this.characterName.value.trim(),
            characterDescription: this.characterDescription.value.trim(),
            location: this.location.value.trim(),
            timeWeather: this.timeWeather.value.trim(),
            environmentDetails: this.environmentDetails.value.trim(),
            actions: this.actions.value.trim(),
            cameraMovement: this.cameraMovement.value,
            cameraAngle: this.cameraAngle.value,
            videoLength: this.videoLength.value,
            videoFormat: this.videoFormat.value
        };
    }

    // 🆕 품질 점수 표시 기능
    displayQualityScore() {
        const score = this.calculatePromptQuality();
        const qualitySection = document.getElementById('qualityScore');
        const scoreValue = document.getElementById('scoreValue');
        const scoreGrade = document.getElementById('scoreGrade');
        const scoreBar = document.getElementById('scoreBar');
        const scoreDescription = document.getElementById('scoreDescription');
        
        if (!qualitySection) return;

        // 점수에 따른 등급 및 색상 결정
        let grade, color, barColor, description;
        
        if (score >= 90) {
            grade = 'S+'; color = 'text-yellow-300'; barColor = 'bg-gradient-to-r from-yellow-400 to-yellow-600';
            description = '완벽한 프롬프트! Sora에서 최고 품질의 영상을 생성할 수 있습니다.';
        } else if (score >= 80) {
            grade = 'A+'; color = 'text-green-400'; barColor = 'bg-gradient-to-r from-green-400 to-green-600';
            description = '우수한 프롬프트입니다. 고품질 영상 생성이 가능합니다.';
        } else if (score >= 70) {
            grade = 'A'; color = 'text-blue-400'; barColor = 'bg-gradient-to-r from-blue-400 to-blue-600';
            description = '좋은 프롬프트입니다. 만족스러운 결과를 얻을 수 있습니다.';
        } else if (score >= 60) {
            grade = 'B+'; color = 'text-purple-400'; barColor = 'bg-gradient-to-r from-purple-400 to-purple-600';
            description = '양호한 프롬프트입니다. 더 많은 세부사항을 추가하면 개선됩니다.';
        } else if (score >= 50) {
            grade = 'B'; color = 'text-orange-400'; barColor = 'bg-gradient-to-r from-orange-400 to-orange-600';
            description = '기본적인 프롬프트입니다. 캐릭터나 환경 설명을 더 자세히 해보세요.';
        } else {
            grade = 'C'; color = 'text-red-400'; barColor = 'bg-gradient-to-r from-red-400 to-red-600';
            description = '프롬프트를 더 상세하게 작성해주세요. 필수 항목들을 채워보세요.';
        }

        // UI 업데이트
        qualitySection.classList.remove('hidden');
        scoreValue.textContent = `${score}점`;
        scoreValue.className = `text-2xl font-bold ${color}`;
        scoreGrade.textContent = grade;
        scoreGrade.className = `text-sm ${color}`;
        
        // 프로그레스 바 애니메이션
        setTimeout(() => {
            scoreBar.style.width = `${score}%`;
            scoreBar.className = `h-3 rounded-full transition-all duration-500 ${barColor}`;
        }, 100);
        
        scoreDescription.textContent = description;

        // 개선 제안 추가
        const suggestions = this.getQualityImprovementSuggestions();
        if (suggestions.length > 0) {
            scoreDescription.innerHTML += `<br><br><strong>개선 제안:</strong><br>• ${suggestions.join('<br>• ')}`;
        }
    }

    // 🆕 품질 개선 제안
    getQualityImprovementSuggestions() {
        const suggestions = [];
        
        if (!this.projectTitle.value.trim()) {
            suggestions.push('프로젝트 제목을 입력하세요');
        }
        
        if (!this.sceneOverview.value.trim()) {
            suggestions.push('장면 개요를 작성하세요');
        } else if (this.sceneOverview.value.trim().length < 30) {
            suggestions.push('장면 개요를 더 자세히 작성하세요 (30자 이상)');
        }
        
        if (!this.characterDescription.value.trim()) {
            suggestions.push('캐릭터 설명을 추가하세요');
        } else if (this.characterDescription.value.trim().length < 20) {
            suggestions.push('캐릭터 설명을 더 상세하게 작성하세요');
        }
        
        if (!this.environmentDetails.value.trim()) {
            suggestions.push('환경 세부사항을 추가하세요');
        }
        
        if (!this.actions.value.trim()) {
            suggestions.push('행동/움직임을 설명하세요');
        }
        
        if (!this.cameraMovement.value) {
            suggestions.push('카메라 움직임을 선택하세요');
        }
        
        if (!this.cameraAngle.value) {
            suggestions.push('카메라 앵글을 선택하세요');
        }

        return suggestions.slice(0, 3); // 최대 3개까지만 표시
    }

    // 🆕 ==================== GEMINI AI 관련 메서드들 ====================

    // Gemini로 프롬프트 개선
    async improveWithGemini() {
        const apiKey = localStorage.getItem('geminiApiKey');
        
        if (!apiKey) {
            this.showGeminiApiModal();
            return;
        }

        const finalPrompt = document.getElementById('finalPrompt').textContent;
        if (!finalPrompt) {
            this.showError('먼저 프롬프트를 생성해주세요.');
            return;
        }

        try {
            this.showGeminiLoading(true);
            
            const improvedResult = await this.callGeminiAPI(apiKey, finalPrompt);
            
            if (improvedResult.success) {
                this.displayGeminiResult(improvedResult.improvedPrompt, improvedResult.analysis);
                this.showSuccess('Gemini AI가 프롬프트를 성공적으로 개선했습니다!');
            } else {
                // 구체적인 오류 처리
                let errorMessage = improvedResult.error;
                if (errorMessage.includes('API_KEY_INVALID')) {
                    errorMessage = 'API 키가 유효하지 않습니다. 올바른 Gemini API 키를 입력해주세요.';
                } else if (errorMessage.includes('PERMISSION_DENIED')) {
                    errorMessage = 'API 키에 Gemini 모델 접근 권한이 없습니다.';
                } else if (errorMessage.includes('QUOTA_EXCEEDED')) {
                    errorMessage = 'API 사용량이 초과되었습니다. 잠시 후 다시 시도해주세요.';
                }
                this.showError(`Gemini API 오류: ${errorMessage}`);
            }
        } catch (error) {
            console.error('Gemini API 오류:', error);
            this.showError(`연결 오류: ${error.message}. 인터넷 연결을 확인해주세요.`);
        } finally {
            this.showGeminiLoading(false);
        }
    }

    // Gemini API 호출
    async callGeminiAPI(apiKey, originalPrompt) {
        const promptForGemini = `
당신은 전문적인 AI 영상 프롬프트 개선 전문가입니다. 
아래 Sora용 영상 프롬프트를 분석하고 개선해주세요.

**원본 프롬프트:**
"${originalPrompt}"

**개선 요청사항:**
1. 더 구체적이고 상세한 묘사로 개선
2. 영상의 감정적 임팩트 강화
3. 시각적 디테일과 분위기 향상
4. 카메라 워크와 조명 효과 최적화
5. Sora AI가 이해하기 쉬운 명확한 언어 사용

**응답 형식:**
{
  "improved_prompt": "개선된 프롬프트 텍스트",
  "analysis": "개선 사항과 변경 이유에 대한 설명"
}

JSON 형식으로만 응답해주세요.
`;

        try {
            console.log('Gemini API 호출 시작...');
            
            // 최신 Gemini API 엔드포인트 사용
            const response = await fetch(`https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [{
                            text: promptForGemini
                        }]
                    }],
                    generationConfig: {
                        temperature: 0.7,
                        topK: 40,
                        topP: 0.95,
                        maxOutputTokens: 1024,
                    }
                })
            });

            if (!response.ok) {
                const errorText = await response.text();
                let errorMessage = `HTTP ${response.status}: ${response.statusText}`;
                
                try {
                    const errorData = JSON.parse(errorText);
                    if (errorData.error && errorData.error.message) {
                        errorMessage = errorData.error.message;
                    }
                } catch (e) {
                    // JSON 파싱 실패 시 기본 메시지 사용
                }
                
                throw new Error(errorMessage);
            }

            const data = await response.json();
            
            if (data.candidates && data.candidates[0] && data.candidates[0].content) {
                const responseText = data.candidates[0].content.parts[0].text;
                
                try {
                    // JSON 추출 (```json 태그 제거)
                    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
                    if (jsonMatch) {
                        const jsonResult = JSON.parse(jsonMatch[0]);
                        return {
                            success: true,
                            improvedPrompt: jsonResult.improved_prompt,
                            analysis: jsonResult.analysis
                        };
                    } else {
                        throw new Error('유효한 JSON 응답을 찾을 수 없습니다.');
                    }
                } catch (parseError) {
                    // JSON 파싱 실패 시 텍스트 그대로 사용
                    return {
                        success: true,
                        improvedPrompt: responseText,
                        analysis: 'Gemini AI가 프롬프트를 개선했지만 분석 정보를 추출할 수 없습니다.'
                    };
                }
            } else {
                throw new Error('Gemini API에서 유효한 응답을 받지 못했습니다.');
            }
        } catch (error) {
            return {
                success: false,
                error: error.message
            };
        }
    }

    // Gemini 결과 표시
    displayGeminiResult(improvedPrompt, analysis) {
        const resultSection = document.getElementById('geminiResultSection');
        const geminiPrompt = document.getElementById('geminiPrompt');
        const geminiAnalysis = document.getElementById('geminiAnalysis');
        
        if (resultSection && geminiPrompt && geminiAnalysis) {
            geminiPrompt.textContent = improvedPrompt;
            geminiAnalysis.innerHTML = analysis.replace(/\n/g, '<br>');
            resultSection.classList.remove('hidden');
            
            // 결과 섹션으로 스크롤
            resultSection.scrollIntoView({ behavior: 'smooth' });
        }
    }

    // Gemini API 설정 모달 표시
    showGeminiApiModal() {
        const modal = document.getElementById('geminiApiModal');
        const apiKeyInput = document.getElementById('geminiApiKey');
        
        if (modal) {
            // 기존 저장된 API 키 로드
            const savedApiKey = localStorage.getItem('geminiApiKey');
            if (savedApiKey && apiKeyInput) {
                apiKeyInput.value = savedApiKey;
            }
            
            modal.classList.remove('hidden');
            modal.classList.add('flex');
        }
    }

    // Gemini API 설정 모달 숨기기
    hideGeminiApiModal() {
        const modal = document.getElementById('geminiApiModal');
        if (modal) {
            modal.classList.add('hidden');
            modal.classList.remove('flex');
        }
    }

    // Gemini API 키 저장
    saveGeminiApiKey() {
        const apiKeyInput = document.getElementById('geminiApiKey');
        const statusDiv = document.getElementById('geminiApiStatus');
        
        if (!apiKeyInput || !apiKeyInput.value.trim()) {
            this.showGeminiApiStatus('API 키를 입력해주세요.', 'error');
            return;
        }

        const apiKey = apiKeyInput.value.trim();
        
        // API 키 유효성 검사 (기본적인)
        if (!apiKey.startsWith('AIza')) {
            this.showGeminiApiStatus('올바른 Google Gemini API 키 형식이 아닙니다.', 'error');
            return;
        }

        localStorage.setItem('geminiApiKey', apiKey);
        this.showGeminiApiStatus('API 키가 안전하게 저장되었습니다!', 'success');
        
        setTimeout(() => {
            this.hideGeminiApiModal();
        }, 1500);
    }

    // Gemini API 키 테스트
    async testGeminiApiKey() {
        const apiKeyInput = document.getElementById('geminiApiKey');
        
        if (!apiKeyInput || !apiKeyInput.value.trim()) {
            this.showGeminiApiStatus('API 키를 입력해주세요.', 'error');
            return;
        }

        const apiKey = apiKeyInput.value.trim();
        this.showGeminiApiStatus('API 키를 테스트하는 중...', 'info');

        try {
            // 간단한 테스트 요청
            const response = await fetch(`https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [{
                            text: '안녕하세요. 간단한 테스트입니다. "테스트 성공"이라고 답변해주세요.'
                        }]
                    }]
                })
            });

            if (response.ok) {
                const data = await response.json();
                if (data.candidates && data.candidates[0]) {
                    this.showGeminiApiStatus('✅ API 키가 정상 작동합니다!', 'success');
                } else {
                    this.showGeminiApiStatus('❌ API 응답이 예상과 다릅니다.', 'error');
                }
            } else {
                const errorData = await response.text();
                this.showGeminiApiStatus(`❌ API 오류 (${response.status}): ${response.statusText}`, 'error');
            }
        } catch (error) {
            this.showGeminiApiStatus(`❌ 연결 오류: ${error.message}`, 'error');
        }
    }

    // Gemini API 상태 메시지 표시
    showGeminiApiStatus(message, type) {
        const statusDiv = document.getElementById('geminiApiStatus');
        if (!statusDiv) return;

        const bgColor = {
            success: 'bg-green-600/20 border-green-600/50 text-green-300',
            error: 'bg-red-600/20 border-red-600/50 text-red-300',
            info: 'bg-blue-600/20 border-blue-600/50 text-blue-300'
        };

        statusDiv.innerHTML = `
            <div class="p-3 rounded-lg border ${bgColor[type]} text-sm">
                ${message}
            </div>
        `;
        statusDiv.classList.remove('hidden');
    }

    // Gemini 로딩 상태 표시
    showGeminiLoading(isLoading) {
        const btn = document.getElementById('geminiImproveBtn');
        if (!btn) return;

        if (isLoading) {
            btn.disabled = true;
            btn.innerHTML = `
                <div class="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                <span>Gemini 분석 중...</span>
            `;
        } else {
            btn.disabled = false;
            btn.innerHTML = `
                <i class="fas fa-robot"></i>
                <span>Gemini 수정하기</span>
            `;
        }
    }

    // Gemini 개선 프롬프트 복사
    copyGeminiPrompt() {
        const geminiPrompt = document.getElementById('geminiPrompt');
        if (!geminiPrompt || !geminiPrompt.textContent) {
            this.showError('복사할 개선된 프롬프트가 없습니다.');
            return;
        }

        navigator.clipboard.writeText(geminiPrompt.textContent)
            .then(() => {
                this.showSuccess('Gemini 개선 프롬프트가 클립보드에 복사되었습니다!');
            })
            .catch(() => {
                this.showError('프롬프트 복사에 실패했습니다.');
            });
    }

    // Gemini 개선 프롬프트를 메인 프롬프트로 사용
    useGeminiPrompt() {
        const geminiPrompt = document.getElementById('geminiPrompt');
        const finalPrompt = document.getElementById('finalPrompt');
        
        if (!geminiPrompt || !geminiPrompt.textContent) {
            this.showError('사용할 개선된 프롬프트가 없습니다.');
            return;
        }

        if (!finalPrompt) {
            this.showError('메인 프롬프트 영역을 찾을 수 없습니다.');
            return;
        }

        // 확인 메시지
        if (confirm('Gemini가 개선한 프롬프트를 메인 프롬프트로 교체하시겠습니까?')) {
            finalPrompt.textContent = geminiPrompt.textContent;
            this.showSuccess('개선된 프롬프트가 메인 프롬프트로 설정되었습니다!');
            
            // 메인 프롬프트로 스크롤
            finalPrompt.scrollIntoView({ behavior: 'smooth' });
        }
    }

    // 유틸리티 메서드
    static getInstance() {
        if (!SoraPromptGenerator.instance) {
            SoraPromptGenerator.instance = new SoraPromptGenerator();
        }
        return SoraPromptGenerator.instance;
    }
}

// DOM 로드 완료 후 초기화
document.addEventListener('DOMContentLoaded', () => {
    SoraPromptGenerator.getInstance();
});

// 전역 접근을 위한 인스턴스 내보내기
window.SoraPromptGenerator = SoraPromptGenerator;
