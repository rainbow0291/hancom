import urllib  # URL 요청 
import json    # JSON 데이터 처리용 
import pandas as pd  # 데이터 프레임 생성 및 데이터 처리용 
import urllib.request # URL 요청2 

# 함수화
 # 함수명 : its_cctv
 # 파라미터: 1개 => cctv_index
 # return : test_url


def its_cctv(cctv_index=77):
    key = "###"
    Type = "its"
    getType = "json"

    minX = float(120.95) 
    maxX = float(127.02) 
    minY = float(30.55) 
    maxY = float(37.69) 

    url_cctv = (
    f"https://openapi.its.go.kr:9443/cctvInfo"
    f"?apiKey={key}&type={Type}&cctvType=1"
    f"&minX={minX}&maxX={maxX}"
    f"&minY={minY}&maxY={maxY}"
    f"&getType={getType}"
    )
    response = urllib.request.urlopen(url_cctv)
    json_str = response.read().decode('utf-8')
    json_object = json.loads(json_str)
    cctv_play = pd.json_normalize(json_object["response"]["data"])
    test_url = cctv_play["cctvurl"][cctv_index] 
    print(f"선택된 CCTV URL : {test_url},  CCTV 번호 : {cctv_index}")

    return test_url