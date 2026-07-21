import cv2 

#1. 비디오 경로 설정 
stream_url = "http://210.99.70.120:1935/live/cctv001.stream/playlist.m3u8"
cap = cv2.VideoCapture(stream_url)

# 2. 구역 좌표 설정
region_points = {
    "region-01" : [(192,175),(180,410),(439,386),(273,168)],
    "region-02" : [(192,175),(180,410),(439,386),(273,168)],
    "region-03" : [(192,175),(180,410),(439,386),(273,168)]
}

#2. 마우스 이벤트 처리 함수 정의
points = [] 
def mouse_callback(event, x, y, flags, param):
    if event == cv2.EVENT_LBUTTONDOWN: # 좌 클릭 이벤트 감지 
        points.append((x,y))
        print(f"클릭된 좌표는 {x,y}입니다.")
#3. 윈도우 창 설정 및 함수 등록
cv2.namedWindow("Get_X_Y", cv2.WINDOW_NORMAL)
cv2.setMouseCallback("Get_X_Y", mouse_callback)

#4. 비디오 프레임 처리 
while cap.isOpened():
    success, frame = cap.read()
    if not success: 
        print("프레임 못 읽음!")
        break 

    # 4-1. 프레임 크기 조정 
    re_frame = cv2.resize(frame, (640,480))
    
    # 4-2. 프레임 시각화
    cv2.imshow("GET_X_Y", re_frame)

    # 4-3. q키 눌러서 종료
    if cv2.waitKey(20) & 0xFF == ord('q'):
        print("q키 눌러서 종료")
        break 

#5. 자원 해제
cap.release()
cv2.destroyAllWindows() 

#좌상단, 좌하단, 우하단, 우상단 
#1번, 2번, 3번, 4번