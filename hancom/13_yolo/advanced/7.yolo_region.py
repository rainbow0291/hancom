from ultralytics import solutions 
import cv2

# 1. 비디오 경로 설정
stream_url = "http://210.99.70.120:1935/live/cctv001.stream/playlist.m3u8"
cap = cv2.VideoCapture(stream_url)

# 2. 구역 좌표 설정
region_points = {
    "region-01" : [(192,175),(180,410),(439,386),(273,168)]
}

# 3. 모델 로드 및 구역 객체 생성
yolo_region = solutions.RegionCounter(
    model="yolo11n.pt",
    show=False,
    region=region_points, 
    conf=0.4    # 임계값(신뢰도)    
)

# 4. 프레임 처리
while cap.isOpened():
    success, frame = cap.read()
    if not success:
        print("프레임 읽기 실패")
        break 

    # 4-1. 프레임 크기 조정

    re_frame = cv2.resize(frame, (640,480))

    # 4-2. 구역 내 객체 수 계산 
    results = yolo_region(re_frame)

    # 4-3. 프레임 표시(시각화)
    cv2.imshow("Region", results.plot_im)

    # 4-4. q키를 눌러서 종료
    if cv2.waitKey(1) & 0xFF == ("q"):
        print("q키 눌러서 종료")
        break 

# 5. 자원 해제 

cap.release()
cv2.destroyAllWindows() 