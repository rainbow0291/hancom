from ultralytics import YOLO
import cv2 

model = YOLO('yolo11n.pt')

results = model('input_params.jpg', classes=[60, 75])

result_image = results[0].plot()

output_image_path = "./result_vase.jpg"
cv2.imwrite(output_image_path, result_image)
print(f"예측 결과 이미지가 잘 저장 되었습니다. {output_image_path}")
