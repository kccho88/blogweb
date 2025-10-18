// =================================
// 음식 영양 분석 앱 - 백엔드 로직
// =================================

// 설정 상수
const GEMINI_API_KEY = 'AIzaSyB_jD-bgWSOwjXNGlVIvERs6F5TW3KQ5kc';
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';
const SPREADSHEET_ID = '1nC9Qv2vxz8XCDGTO-keFfkTFBqOqHOLgtyz_exA3wLA';
const SHEET_NAME = '출력결과';

// 웹 앱 진입점
function doGet() {
  return HtmlService.createTemplateFromFile('index')
    .evaluate()
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
    .addMetaTag('viewport', 'width=device-width, initial-scale=1.0');
}

// HTML 파일 include 함수
function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

// 이미지 분석 메인 함수
function analyzeFood(imageDataArray, gender, ageGroup, activityLevel) {
  try {
    const sessionId = Utilities.getUuid();
    const timestamp = new Date();
    
    // 이미지 저장 및 Gemini API 호출
    const imageFiles = saveImagesToDrive(imageDataArray, sessionId);
    const analysisResult = callGeminiAPI(imageDataArray, gender, ageGroup, activityLevel);
    
    // 구글 시트에 결과 저장
    const sheetData = prepareSheetData(
      timestamp, sessionId, gender, ageGroup, 
      imageFiles.length, analysisResult
    );
    saveToSheet(sheetData);
    
    return {
      success: true,
      sessionId: sessionId,
      result: analysisResult
    };
    
  } catch (error) {
    console.error('분석 중 오류:', error);
    return {
      success: false,
      error: error.toString()
    };
  }
}

// Gemini API 호출 함수
function callGeminiAPI(imageDataArray, gender, ageGroup, activityLevel) {
  const prompt = createAnalysisPrompt(gender, ageGroup, activityLevel);
  
  const requestBody = {
    contents: [{
      parts: [
        { text: prompt },
        ...imageDataArray.map(imageData => ({
          inline_data: {
            mime_type: "image/jpeg",
            data: imageData.split(',')[1] // base64 부분만 추출
          }
        }))
      ]
    }],
    generationConfig: {
      temperature: 0.4,
      topK: 32,
      topP: 1,
      maxOutputTokens: 2048
    }
  };

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    payload: JSON.stringify(requestBody)
  };

  const response = UrlFetchApp.fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, options);
  const responseData = JSON.parse(response.getContentText());
  
  if (!responseData.candidates || !responseData.candidates[0]) {
    throw new Error('Gemini API 응답이 올바르지 않습니다.');
  }
  
  const analysisText = responseData.candidates[0].content.parts[0].text;
  return parseGeminiResponse(analysisText);
}

// 분석 프롬프트 생성
function createAnalysisPrompt(gender, ageGroup, activityLevel) {
  const dailyCalories = getDailyCaloriesRecommendation(gender, ageGroup, activityLevel);
  
  return `
당신은 전문 영양사입니다. 업로드된 음식 사진을 분석하여 다음 정보를 JSON 형태로 정확히 제공해주세요.

분석 대상: ${gender}, ${ageGroup}, 활동량: ${activityLevel}
일일 권장 칼로리: ${dailyCalories}kcal

다음 JSON 형식으로만 응답해주세요:

{
  "foods": ["음식명1", "음식명2"],
  "totalCalories": 숫자,
  "carbohydrates": 숫자,
  "protein": 숫자,
  "fat": 숫자,
  "sugar": 숫자,
  "sodium": 숫자,
  "dailyCalorieRatio": 숫자,
  "macroRatio": "탄수화물:단백질:지방",
  "healthGrade": "매우좋음|좋음|보통|주의|위험",
  "recommendations": "구체적인 건강 조언 (200자 이내)",
  "positivePoints": ["좋은점1", "좋은점2"],
  "concerns": ["주의점1", "주의점2"]
}

모든 수치는 그램(g) 또는 밀리그램(mg) 단위로 제공하고, 일일권장량 대비 비율을 계산해주세요.
`;
}

// Gemini 응답 파싱
function parseGeminiResponse(responseText) {
  try {
    // JSON 부분만 추출
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('JSON 형식을 찾을 수 없습니다.');
    }
    
    const jsonData = JSON.parse(jsonMatch[0]);
    
    return {
      foods: jsonData.foods || [],
      totalCalories: jsonData.totalCalories || 0,
      carbohydrates: jsonData.carbohydrates || 0,
      protein: jsonData.protein || 0,
      fat: jsonData.fat || 0,
      sugar: jsonData.sugar || 0,
      sodium: jsonData.sodium || 0,
      dailyCalorieRatio: jsonData.dailyCalorieRatio || 0,
      macroRatio: jsonData.macroRatio || "0:0:0",
      healthGrade: jsonData.healthGrade || "보통",
      recommendations: jsonData.recommendations || "",
      positivePoints: jsonData.positivePoints || [],
      concerns: jsonData.concerns || []
    };
    
  } catch (error) {
    console.error('응답 파싱 오류:', error);
    throw new Error('AI 분석 결과를 해석할 수 없습니다.');
  }
}

// 일일 권장 칼로리 계산
function getDailyCaloriesRecommendation(gender, ageGroup, activityLevel) {
  const baseCalories = {
    '남성': {
      '10대': 2700, '20대': 2600, '30대': 2500, 
      '40대': 2400, '50대': 2200, '60대이상': 2000
    },
    '여성': {
      '10대': 2200, '20대': 2100, '30대': 2000, 
      '40대': 1900, '50대': 1800, '60대이상': 1600
    }
  };
  
  const activityMultiplier = {
    '좌식': 0.9,
    '보통': 1.0,
    '활발': 1.2
  };
  
  const base = baseCalories[gender][ageGroup] || 2000;
  const multiplier = activityMultiplier[activityLevel] || 1.0;
  
  return Math.round(base * multiplier);
}

// 이미지를 구글 드라이브에 저장
function saveImagesToDrive(imageDataArray, sessionId) {
  const folder = DriveApp.getRootFolder();
  const savedFiles = [];
  
  imageDataArray.forEach((imageData, index) => {
    try {
      const blob = Utilities.newBlob(
        Utilities.base64Decode(imageData.split(',')[1]),
        'image/jpeg',
        `food_analysis_${sessionId}_${index + 1}.jpg`
      );
      
      const file = folder.createFile(blob);
      savedFiles.push({
        id: file.getId(),
        name: file.getName(),
        url: file.getUrl()
      });
    } catch (error) {
      console.error(`이미지 ${index + 1} 저장 실패:`, error);
    }
  });
  
  return savedFiles;
}

// 시트 데이터 준비
function prepareSheetData(timestamp, sessionId, gender, ageGroup, fileCount, analysisResult) {
  return [
    timestamp,
    sessionId,
    gender,
    ageGroup,
    fileCount,
    analysisResult.foods.join(', '),
    analysisResult.totalCalories,
    analysisResult.carbohydrates,
    analysisResult.protein,
    analysisResult.fat,
    analysisResult.sugar,
    analysisResult.sodium,
    analysisResult.dailyCalorieRatio,
    analysisResult.macroRatio,
    analysisResult.healthGrade,
    analysisResult.recommendations
  ];
}

// 구글 시트에 데이터 저장
function saveToSheet(data) {
  try {
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    let sheet = spreadsheet.getSheetByName(SHEET_NAME);
    
    // 시트가 없으면 생성
    if (!sheet) {
      sheet = spreadsheet.insertSheet(SHEET_NAME);
      
      // 헤더 추가
      const headers = [
        '타임스탬프', '세션ID', '성별', '나이대', '업로드파일수',
        '음식명목록', '총칼로리(kcal)', '탄수화물(g)', '단백질(g)',
        '지방(g)', '당류(g)', '나트륨(mg)', '권장칼로리대비(%)',
        '탄단지비율', '건강도평가', 'AI추천사항'
      ];
      sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    }
    
    // 데이터 추가
    sheet.appendRow(data);
    
    return true;
  } catch (error) {
    console.error('시트 저장 오류:', error);
    throw new Error('데이터 저장에 실패했습니다.');
  }
}

// 테스트 함수
function testAnalyzeFood() {
  // 테스트용 더미 이미지 데이터
  const testImageData = ['data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/'];
  
  const result = analyzeFood(
    testImageData,
    '남성',
    '30대',
    '보통'
  );
  
  console.log('테스트 결과:', result);
  return result;
}
