export default function Privacy() {
  return (
    <div style={{ backgroundColor: '#111114', color: '#f1f1f3' }}>
      <section className="py-20 px-4 sm:px-6" style={{ borderBottom: '1px solid #1f1f28' }}>
        <div className="max-w-3xl mx-auto">
          <div
            className="inline-block px-3 py-1 text-xs font-semibold rounded-full mb-6 tracking-wider"
            style={{
              backgroundColor: 'rgba(249,115,22,0.12)',
              color: '#f97316',
              border: '1px solid rgba(249,115,22,0.3)',
            }}
          >
            LEGAL
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: '#f1f1f3' }}>
            개인정보처리방침
          </h1>
          <p className="text-sm" style={{ color: '#6b7280' }}>
            시행일: 2025년 1월 1일 &nbsp;|&nbsp; 최종 수정일: 2025년 1월 1일
          </p>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6">
        <div
          className="max-w-3xl mx-auto space-y-12 text-sm leading-relaxed"
          style={{ color: '#d1d5db' }}
        >
          {/* 1 */}
          <div>
            <h2 className="text-lg font-bold mb-4" style={{ color: '#f1f1f3' }}>
              제1조 (개인정보의 처리 목적)
            </h2>
            <p>
              오렌지랩스(주)(이하 "회사")는 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고
              있는 개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며, 이용 목적이 변경되는
              경우에는 개인정보 보호법 제18조에 따라 별도의 동의를 받는 등 필요한 조치를 이행할
              예정입니다.
            </p>
            <ul className="mt-3 space-y-2 list-disc list-inside" style={{ color: '#9ca3af' }}>
              <li>서비스 제공 및 계약 이행 (제품 데모 요청, 견적 문의, 기술 지원)</li>
              <li>회원 가입 및 관리 (본인 확인, 서비스 이용 관리)</li>
              <li>마케팅 및 광고 활용 (이벤트·신제품 정보 제공, 뉴스레터 발송) — 별도 동의 시</li>
              <li>고충 처리 및 분쟁 해결</li>
            </ul>
          </div>

          {/* 2 */}
          <div>
            <h2 className="text-lg font-bold mb-4" style={{ color: '#f1f1f3' }}>
              제2조 (처리하는 개인정보의 항목)
            </h2>
            <p className="mb-3">회사는 서비스 제공을 위해 아래의 개인정보를 수집·처리합니다.</p>
            <div
              className="rounded-xl p-5 space-y-3"
              style={{ backgroundColor: '#16161d', border: '1px solid #2a2a36' }}
            >
              <div>
                <span className="font-semibold" style={{ color: '#f97316' }}>
                  필수 항목:{' '}
                </span>
                <span style={{ color: '#9ca3af' }}>이름, 회사명, 직책, 이메일 주소, 전화번호</span>
              </div>
              <div>
                <span className="font-semibold" style={{ color: '#f97316' }}>
                  선택 항목:{' '}
                </span>
                <span style={{ color: '#9ca3af' }}>부서, 관심 제품·서비스, 문의 내용</span>
              </div>
              <div>
                <span className="font-semibold" style={{ color: '#f97316' }}>
                  자동 수집 항목:{' '}
                </span>
                <span style={{ color: '#9ca3af' }}>
                  IP 주소, 쿠키, 방문 일시, 서비스 이용 기록, 브라우저 정보
                </span>
              </div>
            </div>
          </div>

          {/* 3 */}
          <div>
            <h2 className="text-lg font-bold mb-4" style={{ color: '#f1f1f3' }}>
              제3조 (개인정보의 처리 및 보유 기간)
            </h2>
            <p>
              회사는 법령에 따른 개인정보 보유·이용 기간 또는 정보주체로부터 개인정보를 수집 시에
              동의받은 개인정보 보유·이용 기간 내에서 개인정보를 처리·보유합니다.
            </p>
            <ul className="mt-3 space-y-2 list-disc list-inside" style={{ color: '#9ca3af' }}>
              <li>서비스 문의 및 상담 기록: 수집일로부터 3년</li>
              <li>계약 및 청약 철회 기록: 5년 (전자상거래 등에서의 소비자 보호에 관한 법률)</li>
              <li>대금 결제 및 재화 공급 기록: 5년</li>
              <li>소비자 불만 및 분쟁 처리 기록: 3년</li>
            </ul>
          </div>

          {/* 4 */}
          <div>
            <h2 className="text-lg font-bold mb-4" style={{ color: '#f1f1f3' }}>
              제4조 (개인정보의 제3자 제공)
            </h2>
            <p>
              회사는 정보주체의 개인정보를 제1조(개인정보의 처리 목적)에서 명시한 범위 내에서만
              처리하며, 정보주체의 동의, 법률의 특별한 규정 등 개인정보 보호법 제17조 및 제18조에
              해당하는 경우에만 개인정보를 제3자에게 제공합니다. 현재 회사는 개인정보를 제3자에게
              제공하고 있지 않습니다.
            </p>
          </div>

          {/* 5 */}
          <div>
            <h2 className="text-lg font-bold mb-4" style={{ color: '#f1f1f3' }}>
              제5조 (개인정보 처리 위탁)
            </h2>
            <p className="mb-3">
              회사는 서비스 향상을 위해 아래와 같이 개인정보 처리 업무를 위탁하고 있습니다.
            </p>
            <div className="rounded-xl overflow-hidden" style={{ border: '1px solid #2a2a36' }}>
              <table className="w-full text-xs" style={{ color: '#9ca3af' }}>
                <thead>
                  <tr style={{ backgroundColor: '#16161d', borderBottom: '1px solid #2a2a36' }}>
                    <th className="text-left px-4 py-3 font-semibold" style={{ color: '#f1f1f3' }}>
                      수탁업체
                    </th>
                    <th className="text-left px-4 py-3 font-semibold" style={{ color: '#f1f1f3' }}>
                      위탁 업무 내용
                    </th>
                    <th className="text-left px-4 py-3 font-semibold" style={{ color: '#f1f1f3' }}>
                      보유 및 이용 기간
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '1px solid #2a2a36' }}>
                    <td className="px-4 py-3">이메일 발송 서비스 제공사</td>
                    <td className="px-4 py-3">이메일 발송 및 관리</td>
                    <td className="px-4 py-3">위탁 계약 종료 시까지</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3">클라우드 인프라 제공사</td>
                    <td className="px-4 py-3">서버 운영 및 데이터 보관</td>
                    <td className="px-4 py-3">위탁 계약 종료 시까지</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* 6 */}
          <div>
            <h2 className="text-lg font-bold mb-4" style={{ color: '#f1f1f3' }}>
              제6조 (정보주체의 권리·의무 및 행사 방법)
            </h2>
            <p className="mb-3">
              정보주체는 회사에 대해 언제든지 다음 각 호의 개인정보 보호 관련 권리를 행사할 수
              있습니다.
            </p>
            <ul className="space-y-2 list-disc list-inside" style={{ color: '#9ca3af' }}>
              <li>개인정보 열람 요구</li>
              <li>오류 등이 있을 경우 정정 요구</li>
              <li>삭제 요구</li>
              <li>처리 정지 요구</li>
            </ul>
            <p className="mt-3" style={{ color: '#9ca3af' }}>
              위 권리 행사는 회사에 대해 서면, 전화, 전자우편, 모사전송(FAX) 등을 통하여 하실 수
              있으며 회사는 이에 대해 지체 없이 조치하겠습니다.
            </p>
          </div>

          {/* 7 */}
          <div>
            <h2 className="text-lg font-bold mb-4" style={{ color: '#f1f1f3' }}>
              제7조 (개인정보의 파기)
            </h2>
            <p>
              회사는 개인정보 보유 기간의 경과, 처리 목적 달성 등 개인정보가 불필요하게 되었을
              때에는 지체없이 해당 개인정보를 파기합니다. 전자적 파일 형태의 정보는 기술적 방법을
              사용하여 복원이 불가능하도록 영구 삭제하며, 종이에 출력된 개인정보는 분쇄기로
              분쇄하거나 소각하여 파기합니다.
            </p>
          </div>

          {/* 8 */}
          <div>
            <h2 className="text-lg font-bold mb-4" style={{ color: '#f1f1f3' }}>
              제8조 (개인정보의 안전성 확보 조치)
            </h2>
            <p className="mb-3">
              회사는 개인정보의 안전성 확보를 위해 다음과 같은 조치를 취하고 있습니다.
            </p>
            <ul className="space-y-2 list-disc list-inside" style={{ color: '#9ca3af' }}>
              <li>관리적 조치: 내부 관리 계획 수립·시행, 정기적 직원 교육</li>
              <li>
                기술적 조치: 개인정보 처리 시스템 접근 권한 관리, 접근 통제 시스템 설치, 고유 식별
                정보의 암호화, 보안 프로그램 설치
              </li>
              <li>물리적 조치: 전산실, 자료 보관실 등의 접근 통제</li>
            </ul>
          </div>

          {/* 9 */}
          <div>
            <h2 className="text-lg font-bold mb-4" style={{ color: '#f1f1f3' }}>
              제9조 (쿠키의 설치·운영 및 거부)
            </h2>
            <p>
              회사는 이용자에게 개별적인 맞춤 서비스를 제공하기 위해 이용 정보를 저장하고 수시로
              불러오는 '쿠키(cookie)'를 사용합니다. 이용자는 웹 브라우저 옵션 설정을 통해 쿠키 허용,
              차단 등의 선택이 가능하나, 쿠키 저장을 거부할 경우 일부 서비스 이용에 어려움이 발생할
              수 있습니다.
            </p>
          </div>

          {/* 10 */}
          <div>
            <h2 className="text-lg font-bold mb-4" style={{ color: '#f1f1f3' }}>
              제10조 (개인정보 보호책임자)
            </h2>
            <p className="mb-3">
              회사는 개인정보 처리에 관한 업무를 총괄해서 책임지고, 정보주체의 개인정보 관련 불만
              처리 및 피해 구제 등을 위하여 아래와 같이 개인정보 보호책임자를 지정하고 있습니다.
            </p>
            <div
              className="rounded-xl p-5"
              style={{ backgroundColor: '#16161d', border: '1px solid #2a2a36' }}
            >
              <div className="space-y-2" style={{ color: '#9ca3af' }}>
                <div>
                  <span className="font-semibold" style={{ color: '#f1f1f3' }}>
                    성명:{' '}
                  </span>
                  김범진
                </div>
                <div>
                  <span className="font-semibold" style={{ color: '#f1f1f3' }}>
                    직책:{' '}
                  </span>
                  대표이사
                </div>
                <div>
                  <span className="font-semibold" style={{ color: '#f1f1f3' }}>
                    연락처:{' '}
                  </span>
                  contact@orangesys.co.kr
                </div>
              </div>
            </div>
          </div>

          {/* 11 */}
          <div>
            <h2 className="text-lg font-bold mb-4" style={{ color: '#f1f1f3' }}>
              제11조 (개인정보 처리방침 변경)
            </h2>
            <p>
              이 개인정보처리방침은 시행일로부터 적용되며, 법령 및 방침에 따른 변경 내용의 추가,
              삭제 및 정정이 있는 경우에는 변경 사항의 시행 7일 전부터 공지사항을 통하여 고지할
              것입니다.
            </p>
          </div>

          <div
            className="rounded-xl p-5 text-xs"
            style={{ backgroundColor: '#16161d', border: '1px solid #2a2a36', color: '#6b7280' }}
          >
            본 방침은 2025년 1월 1일부터 시행됩니다. 이전 개인정보처리방침은 회사에 문의하시면
            확인하실 수 있습니다.
          </div>
        </div>
      </section>
    </div>
  );
}
