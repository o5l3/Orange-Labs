export default function Terms() {
  return (
    <div style={{ backgroundColor: 'var(--bg)', color: 'var(--fg)' }}>
      <section className="py-20 px-4 sm:px-6" style={{ borderBottom: '1px solid var(--surface-3)' }}>
        <div className="max-w-3xl mx-auto">
          <div
            className="inline-block px-3 py-1 text-xs font-semibold rounded-full mb-6 tracking-wider"
            style={{
              backgroundColor: 'rgba(249,115,22,0.12)',
              color: 'var(--accent)',
              border: '1px solid rgba(249,115,22,0.3)',
            }}
          >
            LEGAL
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: 'var(--fg)' }}>
            서비스 이용약관
          </h1>
          <p className="text-sm" style={{ color: 'var(--fg-dim)' }}>
            시행일: 2025년 1월 1일 &nbsp;|&nbsp; 최종 수정일: 2025년 1월 1일
          </p>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6">
        <div
          className="max-w-3xl mx-auto space-y-12 text-sm leading-relaxed"
          style={{ color: 'var(--fg-strong)' }}
        >
          {/* 1 */}
          <div>
            <h2 className="text-lg font-bold mb-4" style={{ color: 'var(--fg)' }}>
              제1조 (목적)
            </h2>
            <p>
              본 약관은 오렌지랩스(주)(이하 "회사")가 제공하는 Orange The Client 및 관련 서비스(이하
              "서비스")의 이용 조건 및 절차, 회사와 이용자 간의 권리·의무 및 책임 사항을 규정함을
              목적으로 합니다.
            </p>
          </div>

          {/* 2 */}
          <div>
            <h2 className="text-lg font-bold mb-4" style={{ color: 'var(--fg)' }}>
              제2조 (정의)
            </h2>
            <ul className="space-y-3 list-disc list-inside" style={{ color: 'var(--fg-muted)' }}>
              <li>
                "서비스"란 회사가 제공하는 Orange The Client 소프트웨어, 웹사이트, API 및 관련 기술
                지원 서비스 일체를 말합니다.
              </li>
              <li>
                "이용자"란 본 약관에 동의하고 회사가 제공하는 서비스를 이용하는 기업 또는 개인을
                말합니다.
              </li>
              <li>"계정"이란 이용자가 서비스를 이용하기 위해 설정한 고유 식별 정보를 말합니다.</li>
              <li>
                "콘텐츠"란 이용자가 서비스를 이용하면서 생성, 업로드, 저장하는 데이터, 파일, 정보
                등을 말합니다.
              </li>
            </ul>
          </div>

          {/* 3 */}
          <div>
            <h2 className="text-lg font-bold mb-4" style={{ color: 'var(--fg)' }}>
              제3조 (약관의 효력 및 변경)
            </h2>
            <p className="mb-3">
              본 약관은 서비스를 이용하고자 하는 모든 이용자에게 적용됩니다. 회사는 합리적인 사유가
              발생할 경우 약관을 변경할 수 있으며, 변경 시 적용일자 및 변경 사유를 명시하여 서비스
              화면에 그 적용일자 7일 전부터 공지합니다.
            </p>
            <p style={{ color: 'var(--fg-muted)' }}>
              이용자가 변경된 약관에 동의하지 않을 경우, 서비스 이용을 중단하고 계약을 해지할 수
              있습니다. 변경 이후에도 서비스를 계속 이용하는 경우 변경된 약관에 동의한 것으로
              간주합니다.
            </p>
          </div>

          {/* 4 */}
          <div>
            <h2 className="text-lg font-bold mb-4" style={{ color: 'var(--fg)' }}>
              제4조 (서비스의 제공 및 변경)
            </h2>
            <p className="mb-3">회사는 다음 서비스를 제공합니다.</p>
            <ul className="space-y-2 list-disc list-inside mb-3" style={{ color: 'var(--fg-muted)' }}>
              <li>엔드포인트 성능·장애 모니터링 소프트웨어(Orange The Client) 라이선스 제공</li>
              <li>기술 지원 및 유지보수 서비스</li>
              <li>소프트웨어 업데이트 및 패치 제공</li>
              <li>데모 및 POC(개념 검증) 서비스</li>
              <li>기타 회사가 추가 개발하거나 제휴를 통해 제공하는 서비스</li>
            </ul>
            <p style={{ color: 'var(--fg-muted)' }}>
              회사는 서비스의 품질 향상을 위해 서비스 내용을 변경할 수 있으며, 이 경우 변경 내용을
              사전에 공지합니다.
            </p>
          </div>

          {/* 5 */}
          <div>
            <h2 className="text-lg font-bold mb-4" style={{ color: 'var(--fg)' }}>
              제5조 (서비스 이용 계약의 성립)
            </h2>
            <p>
              서비스 이용 계약은 이용자가 본 약관에 동의하고 서비스 이용 신청을 한 후, 회사가 이를
              승낙함으로써 성립합니다. 회사는 다음 각 호에 해당하는 경우 승낙을 거부하거나 사후에
              이용 계약을 해지할 수 있습니다.
            </p>
            <ul className="mt-3 space-y-2 list-disc list-inside" style={{ color: 'var(--fg-muted)' }}>
              <li>실명이 아니거나 타인의 정보를 이용한 경우</li>
              <li>허위 정보를 기재하거나 회사가 요청한 내용을 기재하지 않은 경우</li>
              <li>관련 법령에 위반되는 목적으로 서비스를 이용하는 경우</li>
              <li>기타 회사가 정한 이용 신청 요건이 충족되지 않은 경우</li>
            </ul>
          </div>

          {/* 6 */}
          <div>
            <h2 className="text-lg font-bold mb-4" style={{ color: 'var(--fg)' }}>
              제6조 (이용자의 의무)
            </h2>
            <p className="mb-3">이용자는 다음 행위를 하여서는 안 됩니다.</p>
            <ul className="space-y-2 list-disc list-inside" style={{ color: 'var(--fg-muted)' }}>
              <li>
                서비스를 통해 취득한 정보를 회사의 사전 승낙 없이 복제, 유통, 상업적으로 이용하는
                행위
              </li>
              <li>회사의 저작권, 특허권 등 지식재산권을 침해하는 행위</li>
              <li>서비스를 역컴파일, 역분석, 분해하거나 소스 코드를 추출하려는 시도</li>
              <li>회사의 동의 없이 제3자에게 라이선스를 재판매·재배포하는 행위</li>
              <li>서비스의 정상적인 운영을 방해하는 행위</li>
              <li>기타 관련 법령 또는 본 약관을 위반하는 행위</li>
            </ul>
          </div>

          {/* 7 */}
          <div>
            <h2 className="text-lg font-bold mb-4" style={{ color: 'var(--fg)' }}>
              제7조 (지식재산권)
            </h2>
            <p>
              서비스 및 서비스와 관련하여 회사가 제작한 콘텐츠에 대한 저작권 및 기타 지식재산권은
              회사에 귀속됩니다. 이용자는 회사가 명시적으로 허용한 범위를 초과하여 서비스를 복제,
              전송, 출판, 배포, 방송하거나 기타 방법에 의하여 영리 목적으로 이용하거나 제3자에게
              이용하게 하여서는 안 됩니다.
            </p>
          </div>

          {/* 8 */}
          <div>
            <h2 className="text-lg font-bold mb-4" style={{ color: 'var(--fg)' }}>
              제8조 (요금 및 결제)
            </h2>
            <p className="mb-3">
              서비스 이용에 따른 요금은 회사가 별도로 정한 요금 정책에 따릅니다. 유료 서비스 이용 시
              이용자는 해당 요금을 계약에서 정한 방식으로 납부하여야 합니다.
            </p>
            <ul className="space-y-2 list-disc list-inside" style={{ color: 'var(--fg-muted)' }}>
              <li>요금은 계약 체결 시 확정된 금액을 기준으로 합니다.</li>
              <li>요금 변경 시 회사는 변경 30일 전에 사전 고지합니다.</li>
              <li>
                이용자의 귀책 사유로 인한 서비스 미이용의 경우 요금 환불이 불가할 수 있습니다.
              </li>
            </ul>
          </div>

          {/* 9 */}
          <div>
            <h2 className="text-lg font-bold mb-4" style={{ color: 'var(--fg)' }}>
              제9조 (서비스 중단)
            </h2>
            <p>
              회사는 다음 각 호에 해당하는 경우 서비스 제공을 일시적으로 중단할 수 있으며, 이 경우
              사전에 공지합니다. 단, 불가피한 사유가 있는 경우 사후 공지할 수 있습니다.
            </p>
            <ul className="mt-3 space-y-2 list-disc list-inside" style={{ color: 'var(--fg-muted)' }}>
              <li>서비스용 설비의 보수·점검·교체 및 고장</li>
              <li>전기통신사업법에 규정된 기간통신사업자가 전기통신 서비스를 중지했을 경우</li>
              <li>천재지변, 전쟁, 테러 등 불가항력적 사유</li>
              <li>기타 서비스 제공이 불가능한 상황 발생 시</li>
            </ul>
          </div>

          {/* 10 */}
          <div>
            <h2 className="text-lg font-bold mb-4" style={{ color: 'var(--fg)' }}>
              제10조 (책임의 제한)
            </h2>
            <p className="mb-3">
              회사는 천재지변 또는 이에 준하는 불가항력으로 인하여 서비스를 제공할 수 없는 경우에는
              서비스 제공에 관한 책임이 면제됩니다.
            </p>
            <p style={{ color: 'var(--fg-muted)' }}>
              회사는 이용자의 귀책 사유로 인한 서비스 이용의 장애, 이용자가 서비스를 이용하여
              기대하는 수익을 상실한 것에 대하여 책임을 지지 않습니다. 또한 회사는 이용자가 서비스를
              이용하면서 얻은 자료로 인한 손해에 관하여 책임을 지지 않습니다.
            </p>
          </div>

          {/* 11 */}
          <div>
            <h2 className="text-lg font-bold mb-4" style={{ color: 'var(--fg)' }}>
              제11조 (분쟁 해결)
            </h2>
            <p>
              서비스와 관련하여 회사와 이용자 사이에 분쟁이 발생한 경우, 회사와 이용자는 분쟁의
              해결을 위해 성실히 협의합니다. 협의가 이루어지지 않을 경우 소비자기본법에 따른
              한국소비자원의 조정 또는 관련 법령에서 정한 분쟁 해결 기관의 조정에 따를 수 있습니다.
            </p>
          </div>

          {/* 12 */}
          <div>
            <h2 className="text-lg font-bold mb-4" style={{ color: 'var(--fg)' }}>
              제12조 (준거법 및 재판 관할)
            </h2>
            <p>
              본 약관의 해석 및 분쟁 해결에 관해서는 대한민국 법을 준거법으로 합니다. 회사와 이용자
              간에 발생한 분쟁에 관한 소송은 민사소송법상 관할 법원에 제소합니다.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h2 className="text-lg font-bold mb-4" style={{ color: 'var(--fg)' }}>
              제13조 (문의처)
            </h2>
            <div
              className="rounded-xl p-5"
              style={{ backgroundColor: 'var(--surface-2)', border: '1px solid var(--border-2)' }}
            >
              <div className="space-y-2" style={{ color: 'var(--fg-muted)' }}>
                <div>
                  <span className="font-semibold" style={{ color: 'var(--fg)' }}>
                    회사명:{' '}
                  </span>
                  오렌지랩스(주)
                </div>
                <div>
                  <span className="font-semibold" style={{ color: 'var(--fg)' }}>
                    이메일:{' '}
                  </span>
                  contact@orangesys.co.kr
                </div>
                <div>
                  <span className="font-semibold" style={{ color: 'var(--fg)' }}>
                    운영 시간:{' '}
                  </span>
                  평일 09:00 ~ 18:00 (공휴일 제외)
                </div>
              </div>
            </div>
          </div>

          <div
            className="rounded-xl p-5 text-xs"
            style={{ backgroundColor: 'var(--surface-2)', border: '1px solid var(--border-2)', color: 'var(--fg-dim)' }}
          >
            본 약관은 2025년 1월 1일부터 시행됩니다. 이전 서비스 이용약관은 회사에 문의하시면
            확인하실 수 있습니다.
          </div>
        </div>
      </section>
    </div>
  );
}
