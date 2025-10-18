# app.py

import os
from flask import Flask, request, jsonify
from werkzeug.utils import secure_filename
import requests # 외부 API 통신을 위한 라이브러리

# 필요한 환경 변수 설정
UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}
NUTRITION_API_KEY = os.environ.get('NUTRITION_API_KEY') # 실제 API 키는 환경 변수에서 가져옵니다.
NUTRITION_API_URL = "YOUR_NUTRITION_ANALYSIS_API_ENDPOINT" # 사용하려는 API의 URL

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

def allowed_file(filename):
    """허용된 파일 확장자 확인"""
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def analyze_image_with_api(file_path):
    """
    외부 AI 영양 분석 API와 연동하여 영양 정보를 가져오는 함수.
    이 부분은 선택한 실제 API의 요구 사항에 따라 크게 달라집니다.
    """
    try:
        # 1. 파일을 API 서버로 전송
        with open(file_path, 'rb') as f:
            files = {'image': f}
            
            # 2. API 요청 헤더 및 데이터 설정 (예시)
            headers = {
                'Authorization': f'Bearer {NUTRITION_API_KEY}',
                # API에 따라 다른 데이터가 필요할 수 있습니다.
            }

            # 3. API 호출
            response = requests.post(NUTRITION_API_URL, headers=headers, files=files)
            response.raise_for_status() # HTTP 오류가 발생하면 예외 발생

            # 4. API 응답 파싱
            api_data = response.json()
            
            # --- API 응답을 프론트엔드에서 요구하는 형식으로 가공 ---
            # API에서 얻은 데이터를 기반으로 칼로리, 단백질, 지방 등을 추출합니다.
            
            # **임시 Mock 데이터** (실제 API 응답으로 대체 필요)
            processed_results = {
                "detected_foods": ["닭가슴살 샐러드", "오렌지 주스"],
                "total_calories": api_data.get('total_calories', 450), 
                "macronutrients": {
                    "protein": api_data.get('protein_g', 35),
                    "fat": api_data.get('fat_g', 15),
                    "carbs": api_data.get('carb_g', 40)
                },
                "assessment": "Excellent",
                "recommendations": [
                    "식이섬유 섭취를 늘리세요.",
                    "탄수화물 출처를 통곡물로 바꾸세요."
                ],
                "detailed_nutrition": [
                    {"nutrient": "나트륨", "amount": "150mg", "daily_percent": "8%"},
                    {"nutrient": "비타민 C", "amount": "45mg", "daily_percent": "45%"}
                ]
            }

            return processed_results

    except requests.exceptions.RequestException as e:
        print(f"API 호출 오류 발생: {e}")
        return None
    except Exception as e:
        print(f"처리 중 오류 발생: {e}")
        return None
    finally:
        # 분석 후 업로드된 파일 정리 (선택 사항)
        os.remove(file_path)


@app.route('/analyze', methods=['POST'])
def analyze_meal():
    """음식 이미지 분석 엔드포인트"""
    
    # 1. 파일 검증
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400
    
    # 2. 사용자 입력 데이터 (옵션)
    # 프론트엔드에서 전송된 사용자 정보(성별, 나이, 활동량 등)를 여기서 받습니다.
    # user_data = request.form 
    
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(file_path)
        
        # 3. 이미지 분석 실행
        analysis_results = analyze_image_with_api(file_path)

        if analysis_results:
            # 4. 분석 결과 반환
            return jsonify({
                "success": True, 
                "data": analysis_results
            })
        else:
            return jsonify({"error": "Failed to get nutrition analysis from API"}), 500

    return jsonify({"error": "File type not allowed"}), 400

# 개발 환경에서 실행 시
if __name__ == '__main__':
    # 보안상의 이유로 실제 운영 환경에서는 Flask의 내장 서버를 사용하지 마십시오.
    # 운영 환경에서는 Gunicorn, uWSGI와 같은 WSGI 서버를 사용합니다.
    app.run(debug=True)
