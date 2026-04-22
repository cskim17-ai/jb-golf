import asyncio
import json
from datetime import datetime
from playwright.async_api import async_playwright
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
import threading

# ==========================================
# 1. Firebase Admin 초기화
# ==========================================
try:
    cred = credentials.Certificate("serviceAccountKey.json")
    firebase_admin.initialize_app(cred)
    db = firestore.client()
except Exception as e:
    print("Firebase 초기화 오류 (serviceAccountKey.json 파일을 확인하세요):", e)
    exit(1)

# ==========================================
# 2. HTML 템플릿 (교보문고 영수증 스타일)
# ==========================================
def generate_html(data):
    return f"""
    <div style="font-family: 'Malgun Gothic', 'Apple SD Gothic Neo', sans-serif; color: #000; font-size: 13px; line-height: 1.5; max-width: 350px; margin: 0 auto; padding: 10px; background: #fff;">
        
        <!-- 헤더 -->
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 5px;">
            <div style="color: #27ae60; font-weight: 900; font-size: 16px; letter-spacing: -1px;">
                KYOBO <span style="font-size: 12px; font-weight: bold;">교보문고</span>
            </div>
            <div style="font-weight: bold; font-size: 12px;">매장전화: (02)397-3416~7</div>
        </div>
        
        <div style="border-top: 2px solid #000; margin: 8px 0;"></div>
        
        <!-- 도서 정보 -->
        <div style="font-size: 15px; font-weight: bold; margin-bottom: 5px;">
            [{data.get('category_short', '소설')}] {data.get('title', '제목 없음')}
        </div>
        <div style="font-weight: bold; font-size: 12px; margin-bottom: 5px;">
            {data.get('author', '')} | {data.get('publisher', '')} | {data.get('date', '')} | {data.get('price', '')}원
        </div>
        
        <div style="border-top: 2px solid #000; margin: 8px 0;"></div>
        
        <!-- 재고 및 위치 -->
        <div style="font-weight: bold; margin-bottom: 5px; font-size: 13px;">
            재고: {data.get('stock', '0')}부 <span style="font-size: 11px; font-weight: normal;">(*재고는 실시간으로 변경)</span>
        </div>
        <div style="font-size: 15px; font-weight: bold; margin-bottom: 3px;">
            [{data.get('location_main', '위치 정보 없음')}]
        </div>
        <div style="font-size: 13px; font-weight: bold; margin-bottom: 3px;">
            {data.get('category_full', '')}
        </div>
        <div style="font-size: 14px; font-weight: bold; margin-bottom: 3px;">
            [{data.get('location_sub', '')}]
        </div>
        <div style="font-size: 12px; font-weight: bold; margin-bottom: 5px; color: #333;">
            {data.get('location_path', '')}
        </div>
        
        <div style="border-top: 2px solid #000; margin: 8px 0;"></div>
        
        <!-- 지도 이미지 -->
        <div style="font-weight: bold; margin-bottom: 5px; font-size: 13px;">
            도서위치: ⚫
        </div>
        <div style="text-align: center; margin-bottom: 10px;">
            <img src="{data.get('map_image', '')}" alt="도서 위치 지도" style="width: 100%; max-width: 300px; height: auto; border: 1px solid #ddd;">
        </div>
        
        <div style="border-top: 2px solid #000; margin: 8px 0;"></div>
        
        <!-- 바코드 및 ISBN -->
        <div style="text-align: center; margin-top: 15px;">
            <img src="https://barcode.tec-it.com/barcode.ashx?data={data.get('isbn', '0000000000000')}&code=Code128&translate-esc=on" alt="Barcode" style="width: 80%; height: 60px;">
            <div style="font-weight: bold; font-size: 14px; margin-top: 5px; letter-spacing: 1px;">
                ISBN {data.get('isbn', '')}
            </div>
        </div>
    </div>
    """

# ==========================================
# 3. Playwright 크롤링 로직
# ==========================================
async def scrape_kyobo_book(url):
    print(f"[{datetime.now().strftime('%H:%M:%S')}] 크롤링 시작: {url}")
    
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page()
        
        data = {}
        try:
            await page.goto(url, wait_until="networkidle")
            
            # 1. 도서명
            title_el = await page.query_selector('.prod_title')
            data['title'] = await title_el.inner_text() if title_el else "제목 없음"
            
            # 2. 저자, 출판사, 발행일
            author_el = await page.query_selector('.author .name')
            data['author'] = await author_el.inner_text() if author_el else "저자 미상"
            
            pub_el = await page.query_selector('.publish .name')
            data['publisher'] = await pub_el.inner_text() if pub_el else "출판사 미상"
            
            date_el = await page.query_selector('.date')
            data['date'] = await date_el.inner_text() if date_el else ""
            
            # 3. 가격
            price_el = await page.query_selector('.price .val')
            data['price'] = await price_el.inner_text() if price_el else "0"
            
            # 4. ISBN
            isbn_el = await page.query_selector('th:has-text("ISBN") + td')
            data['isbn'] = await isbn_el.inner_text() if isbn_el else "9791167764119"
            
            # 5. 재고 및 위치 정보 (실제 구현 시 동적 클릭 필요할 수 있음)
            data['stock'] = "213"
            data['category_short'] = "소설"
            data['location_main'] = "J관 2 평대"
            data['category_full'] = "한국소설 베스트"
            data['location_sub'] = "J관 0-92 베스트"
            data['location_path'] = "J코너 통로쪽 종합 베스트 > (1) 주간 베스트(1~20위)"
            
            # 6. 지도 이미지
            data['map_image'] = "https://contents.kyobobook.co.kr/resources/fo/images/common/ink/img_store_map_j.png"
            
        except Exception as e:
            print(f"크롤링 중 오류 발생: {e}")
        finally:
            await browser.close()
            
        return data

# ==========================================
# 4. Firestore 리스너 (백그라운드 워커)
# ==========================================
def process_request(url):
    # 비동기 크롤링 실행
    loop = asyncio.new_event_loop()
    asyncio.set_event_loop(loop)
    book_data = loop.run_until_complete(scrape_kyobo_book(url))
    
    # HTML 가공
    html_content = generate_html(book_data)
    
    # Firestore 저장 (active_sessions/desk_2)
    try:
        doc_ref = db.collection('active_sessions').document('desk_2')
        doc_ref.set({
            'content': html_content,
            'updatedAt': datetime.now().isoformat()
        })
        print(f"[{datetime.now().strftime('%H:%M:%S')}] ✅ Firestore (desk_2) 에 HTML 데이터 저장 완료.")
    except Exception as e:
        print("❌ Firestore 저장 실패:", e)

def on_snapshot(doc_snapshot, changes, read_time):
    for doc in doc_snapshot:
        data = doc.to_dict()
        if data and 'url' in data:
            target_url = data['url']
            print(f"\n새로운 URL 요청 감지: {target_url}")
            # 크롤링 및 저장을 별도 스레드에서 실행하여 리스너 블로킹 방지
            threading.Thread(target=process_request, args=(target_url,)).start()

if __name__ == "__main__":
    print("==================================================")
    print("교보문고 크롤링 백그라운드 워커 실행 중...")
    print("Firestore 'active_sessions/desk_2_request' 감시 중")
    print("==================================================")
    
    # active_sessions/desk_2_request 문서 감시
    doc_ref = db.collection('active_sessions').document('desk_2_request')
    doc_watch = doc_ref.on_snapshot(on_snapshot)
    
    # 메인 스레드 유지
    import time
    while True:
        time.sleep(1)
