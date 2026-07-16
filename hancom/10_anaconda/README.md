# 아나콘다 설치하기 및 실행하기 

# 1. Windows 설치 순서

- 아카이브 페이지에서 Anaconda3-…-Windows-x86_64.exe 다운로드
- 설치 파일 더블클릭 → Next → I Agree → Just Me 선택
- 설치 경로 기본값 유지 → Next
- "Add Anaconda3 to my PATH" 체크 → Install → Finish

# 설치 확인

conda --version

conda info

python --version

# 2. 가상환경 생성 & 관리

환경 생성 — 기본 형식

conda create -n 환경이름 python=3.10

실전 예시

conda create -n cv_env python=3.10
conda create -n nlp_env python=3.9
conda create -n myproject python=3.11

버전 확인

python --version
conda --version

환경 활성화 / 비활성화

conda activate cv_env
conda deactivate

환경 목록 / 삭제

conda env list
conda env remove -n cv_env

Anaconda 유지보수

conda info
conda update conda
conda clean --all

# 3. pip 패키지 설치

설치

pip install package-name

# 4. pip 고급 명령어

다중 설치

pip install package1 package2 package3

파일에서 설치

pip install -r requirements.txt

특정 버전 설치

pip install package==1.2.3

업그레이드

pip install --upgrade package

패키지 목록 조회

pip list

# 5. 환경 파일로 공유하기

환경 내보내기

conda env export > environment.yml

환경 복원

conda env create -f environment.yml

# 6. pip freeze & pipreqs

pip freeze

pip freeze > requirements.txt

pipreqs (의존성만 자동 추출)

pipreqs --force --savepath=requirements.txt .

