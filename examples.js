// Sora 프롬프트 예제 및 템플릿

class SoraExamples {
    static getExamplePrompts() {
        return [
            {
                name: "도시의 안개 속 고양이",
                category: "동물/자연",
                data: {
                    projectTitle: "도시의 안개 속 고양이",
                    overallStyle: "시네마틱 장면",
                    sceneOverview: "안개 낀 새벽 도시에서 고양이가 홀로 걷는 고요하고 신비로운 장면",
                    characterName: "거리의 고양이",
                    characterDescription: "3살 정도의 길고양이, 회색 털, 밝은 눈동자, 약간 젖은 모습, 외로움과 호기심이 섞인 표정, 목에는 낡은 방울이 달린 목걸이",
                    location: "도심의 좁은 골목길",
                    timeWeather: "새벽 4시경, 짙은 안개와 이슬비",
                    environmentDetails: "희미한 가로등빛과 네온사인의 반사, 물웅덩이에 비친 빛 반사, 공중에 떠다니는 먼지 입자",
                    actions: "천천히 걷는다, 발소리가 물웅덩이에서 은은하게 울린다, 가끔 뒤를 돌아본다",
                    cameraMovement: "슬로우 트래킹",
                    cameraAngle: "로우앵글"
                }
            },
            {
                name: "사막의 로봇 여행자",
                category: "SF/판타지",
                data: {
                    projectTitle: "사막의 로봇 여행자",
                    overallStyle: "SF 미래 장면",
                    sceneOverview: "광활한 사막에서 낡은 로봇이 멀리 떠오르는 태양을 향해 걸어가는 장면",
                    characterName: "방랑자 로봇",
                    characterDescription: "낡고 녹슨 휴머노이드 로봇, 파란색 LED 눈, 부분적으로 손상된 외장, 결단력 있는 움직임",
                    location: "광활한 사막 평원",
                    timeWeather: "일출 시간, 맑은 날씨",
                    environmentDetails: "황금빛 모래언덕, 수평선 너머 떠오르는 태양, 로봇의 그림자가 길게 늘어짐",
                    actions: "꾸준히 앞으로 걷는다, 가끔 멈춰서 주위를 둘러본다, LED 눈이 깜박인다",
                    cameraMovement: "팬샷",
                    cameraAngle: "와이드샷"
                }
            },
            {
                name: "마법의 숲 속 요정",
                category: "판타지",
                data: {
                    projectTitle: "마법의 숲 속 요정",
                    overallStyle: "판타지 장면",
                    sceneOverview: "신비로운 숲에서 요정이 꽃들 사이를 날아다니며 마법을 부리는 환상적인 장면",
                    characterName: "숲의 요정",
                    characterDescription: "작고 우아한 요정, 반짝이는 날개, 연두색 드레스, 밝고 순수한 표정, 손에서 반짝이는 마법 가루",
                    location: "마법의 숲 깊은 곳",
                    timeWeather: "한낮, 나무 사이로 스며드는 햇빛",
                    environmentDetails: "무성한 나뭇잎 사이로 내려오는 신비로운 빛줄기, 형형색색의 꽃들, 공중에 떠다니는 반짝이는 입자들",
                    actions: "우아하게 날아다닌다, 꽃에 마법을 부린다, 반짝이는 가루를 흩뿌린다",
                    cameraMovement: "오비탈 샷",
                    cameraAngle: "아이레벨"
                }
            },
            {
                name: "도시 야경의 드론 비행",
                category: "도시/현대",
                data: {
                    projectTitle: "도시 야경의 드론 비행",
                    overallStyle: "다큐멘터리 스타일",
                    sceneOverview: "밤의 도시 상공을 드론이 비행하며 화려한 네온사인과 야경을 담는 장면",
                    characterName: "촬영 드론",
                    characterDescription: "검은색 드론, LED 표시등, 매끄러운 비행 자세, 안정적인 움직임",
                    location: "대도시 중심가 상공",
                    timeWeather: "밤 10시경, 맑은 날씨",
                    environmentDetails: "화려한 네온사인, 자동차 헤드라이트 궤적, 고층 빌딩의 불빛들, 도시의 활기찬 에너지",
                    actions: "부드럽게 비행한다, 건물들 사이를 지나간다, 360도 회전하며 전경을 담는다",
                    cameraMovement: "고정 샷",
                    cameraAngle: "하이앵글"
                }
            },
            {
                name: "해변의 석양과 서퍼",
                category: "스포츠/자연",
                data: {
                    projectTitle: "해변의 석양과 서퍼",
                    overallStyle: "영화 예고편 스타일",
                    sceneOverview: "석양이 지는 바다에서 서퍼가 파도를 타는 역동적이고 아름다운 장면",
                    characterName: "서퍼",
                    characterDescription: "20대 남성, 검게 탄 피부, 웨트슈트 착용, 집중된 표정, 균형감 있는 자세",
                    location: "열대 해변, 큰 파도가 치는 바다",
                    timeWeather: "석양 시간, 쾌청한 날씨",
                    environmentDetails: "황금빛으로 물든 바다, 거대한 파도, 수평선 너머 석양, 물방울이 튀는 효과",
                    actions: "파도를 탄다, 균형을 잡는다, 파도와 함께 움직인다",
                    cameraMovement: "슬로우 트래킹",
                    cameraAngle: "클로즈업"
                }
            }
        ];
    }

    static getStyleTemplates() {
        return {
            "시네마틱 장면": {
                description: "영화같은 고품질 영상미",
                suggestions: ["드라마틱한 조명", "자연스러운 움직임", "감정적 몰입감"]
            },
            "3D 애니메이션": {
                description: "픽사 스타일의 3D 애니메이션",
                suggestions: ["밝고 생동감 있는 색상", "과장된 표현", "귀여운 캐릭터"]
            },
            "영화 예고편 스타일": {
                description: "역동적이고 임팩트 있는 영상",
                suggestions: ["빠른 편집", "드라마틱한 음악", "강렬한 시각적 효과"]
            },
            "다큐멘터리 스타일": {
                description: "현실적이고 자연스러운 촬영",
                suggestions: ["자연광 활용", "관찰적 시점", "실제적인 움직임"]
            },
            "판타지 장면": {
                description: "마법적이고 환상적인 세계",
                suggestions: ["신비로운 빛 효과", "초자연적 요소", "꿈같은 분위기"]
            },
            "SF 미래 장면": {
                description: "미래적이고 기술적인 환경",
                suggestions: ["네온 조명", "금속적 질감", "하이테크 분위기"]
            }
        };
    }

    static getCameraMovements() {
        return {
            "고정 샷": "카메라가 움직이지 않는 안정적인 촬영",
            "슬로우 트래킹": "피사체를 따라 천천히 움직이는 촬영",
            "팬샷": "좌우로 회전하며 넓은 시야를 보여주는 촬영",
            "줌인/줌아웃": "점진적으로 확대하거나 축소하는 촬영",
            "오비탈 샷": "피사체 주위를 원형으로 돌며 촬영"
        };
    }

    static getCameraAngles() {
        return {
            "아이레벨": "눈높이에서 촬영하는 자연스러운 앵글",
            "로우앵글": "낮은 위치에서 올려다보는 앵글",
            "하이앵글": "높은 위치에서 내려다보는 앵글",
            "클로즈업": "피사체에 가까이 접근한 촬영",
            "와이드샷": "넓은 시야로 전체적인 풍경을 담는 촬영"
        };
    }

    static getPromptTips() {
        return [
            {
                title: "구체적인 묘사 사용",
                content: "모호한 표현보다는 구체적이고 상세한 묘사를 사용하세요. '아름다운 풍경' 대신 '석양빛이 물든 산봉우리와 안개 낀 계곡'"
            },
            {
                title: "감정과 분위기 표현",
                content: "캐릭터의 감정 상태와 전체적인 분위기를 명확히 기술하세요. '슬픈 표정', '신비로운 분위기' 등"
            },
            {
                title: "조명과 색상 정보",
                content: "조명의 방향, 색온도, 그림자 등을 구체적으로 명시하세요. '따뜻한 황금빛', '차가운 네온 블루' 등"
            },
            {
                title: "움직임의 질감 묘사",
                content: "단순한 동작보다는 움직임의 질감을 표현하세요. '걷는다' 대신 '천천히 터벅터벅 걷는다'"
            },
            {
                title: "카메라 워크 활용",
                content: "적절한 카메라 움직임으로 영상에 역동성을 더하세요. 감정에 따라 앵글을 선택하세요."
            }
        ];
    }

    static generateRandomPrompt() {
        const examples = this.getExamplePrompts();
        const randomIndex = Math.floor(Math.random() * examples.length);
        return examples[randomIndex];
    }

    static validatePromptData(data) {
        const requiredFields = ['projectTitle', 'sceneOverview', 'characterName', 'location'];
        const errors = [];

        requiredFields.forEach(field => {
            if (!data[field] || data[field].trim().length === 0) {
                errors.push(`${field}은 필수 항목입니다.`);
            }
        });

        if (data.projectTitle && data.projectTitle.length > 100) {
            errors.push('프로젝트 제목은 100자 이내로 입력해주세요.');
        }

        if (data.sceneOverview && data.sceneOverview.length < 10) {
            errors.push('장면 개요는 최소 10자 이상 입력해주세요.');
        }

        return {
            isValid: errors.length === 0,
            errors: errors
        };
    }

    static optimizePromptForSora(promptText) {
        // Sora에 최적화된 프롬프트 생성
        let optimized = promptText;

        // 불필요한 단어 제거
        const removeWords = ['매우', '정말', '아주', '너무'];
        removeWords.forEach(word => {
            const regex = new RegExp(`\\b${word}\\b`, 'gi');
            optimized = optimized.replace(regex, '');
        });

        // 중복 공백 제거
        optimized = optimized.replace(/\s+/g, ' ').trim();

        // 길이 제한 (Sora 권장 길이)
        if (optimized.length > 500) {
            optimized = optimized.substring(0, 497) + '...';
        }

        return optimized;
    }
}

// 전역 접근을 위한 클래스 내보내기
window.SoraExamples = SoraExamples;
