from ultralytics import solutions 
import cv2 

# 1. 비디오 경로 설정
stream_url = "http://210.99.70.120:1935/live/cctv001.stream/playlist.m3u8"
cap = cv2.VideoCapture(stream_url)

# 2. 모델 로드 및 거리 계산 객체 생성 
distance = solutions.DistanceCalculation(
    model = "yolo11n.pt",
    show=True 
)

# 3. 프레임 처리 루프 

while cap.isOpened():
    success, frame = cap.read()
    if not success:
        print("프레임 읽기 실패")
        break

    # 3-1. 탐지 + 클릭 대상 중심점 거리 계산 (내부 처리)
    results = distance.process(frame)
    pixel_distance = results.pixels_distance
    # 3-2. q 키로 종료
    if cv2.waitKey(1) & 0xFF == ord("q"):
        print("q키를 눌러서 종료!!")
        break



# 5. 실습: 거리에 따른 상태 조건을 출력해주세요.
    if pixel_distance is None or pixel_distance == 0:
            print("[거리] ----px [상태] 입력 안됨")
            continue  
    if pixel_distance >= 150:
        status = "SAFE"
    elif pixel_distance >= 100:
        status = "NORMAL"
    else:        
        status = "DANGER"

    print(f"[거리] {pixel_distance}px [상태] {status}")

# 4. 자원 해제
cap.release()
cv2.destroyAllWindows()

