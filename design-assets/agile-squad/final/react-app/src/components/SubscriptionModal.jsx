// 구독 오버레이: 상품 선택 → 번들 할인 계산 → 확인 → 결제 완료.
import { useState } from 'react';
import { products, discountRate, formatKRW } from '../data/products';

export default function SubscriptionModal({ open, onClose, onSubscribed }) {
  const [selected, setSelected] = useState(() => new Set());
  const [newMemberSelected, setNewMemberSelected] = useState(true);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [success, setSuccess] = useState(null); // { orderId, dateStr, items, final, next }

  // 파생 계산값.
  const items = products.filter((p) => selected.has(p.id));
  const subtotal = items.reduce((s, p) => s + p.price, 0);
  const rate = discountRate(selected.size);
  const discAmt = Math.round(subtotal * rate);
  const final = subtotal - discAmt;
  // 신규 회원 혜택 쿠폰과 한경 디지털 에디션의 그리드 위치를 서로 교체.
  const gridProducts = [...products.slice(1), products[0]];

  function toggle(id) {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  function handleClose() {
    setConfirmOpen(false);
    if (success) {
      // 결제 완료 후 닫는 경우(외부 클릭 / X버튼 / 확인 버튼) 모두 동일하게 구독을 확정한다.
      onSubscribed?.();
      setSelected(new Set());
      setNewMemberSelected(true);
      setSuccess(null);
    }
    onClose();
  }

  function handlePay() {
    setConfirmOpen(false);
    const now = new Date();
    const orderId =
      'HK-' + now.getFullYear() + String(now.getMonth() + 1).padStart(2, '0') +
      String(now.getDate()).padStart(2, '0') + '-' + (Math.floor(Math.random() * 9000) + 1000);
    const dateStr =
      `${now.getFullYear()}.${String(now.getMonth() + 1).padStart(2, '0')}.${String(now.getDate()).padStart(2, '0')} ` +
      `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    const next = new Date(now.getFullYear(), now.getMonth() + 1, now.getDate());
    setSuccess({ orderId, dateStr, items, final, next });
  }

  if (!open) return null;

  return (
    <div className="sub-overlay open" onClick={(e) => e.target === e.currentTarget && handleClose()}>
      <div className="sub-modal">
        <div className="sub-header">
          <div>
            <div className="sub-header-kicker">한경 프리미엄 · 구독 선택</div>
            <div className="sub-header-title">원하는 혜택만 골라 담는 한경 유료구독</div>
          </div>
          <button className="sub-close-btn" onClick={handleClose} aria-label="닫기"><i className="ti ti-x" aria-hidden="true"></i></button>
        </div>

        {/* 선택/요약 화면 (결제 완료 전) */}
        {!success && (
          <div className="sub-body">
            <div className="sub-left">
              <h2>불필요한 정보는 걷어내고<br />당신의 콘텐츠만 골라 담으세요</h2>
              <p className="sub-subtitle">다중 선택 시 최대 30% 번들 할인 적용 · 첫 달 무료 체험 가능</p>
              <div className="sub-grid">
                <div
                  className={'sub-new-member' + (newMemberSelected ? ' sel' : '')}
                  onClick={() => setNewMemberSelected((v) => !v)}
                >
                  <div className="sub-new-top">
                    <div className="sub-new-icon-group">
                      <div className="sub-new-icon"><i className="ti ti-ticket" aria-hidden="true"></i></div>
                      <span className="sub-new-badge">신규 회원 혜택</span>
                    </div>
                    <div className="sub-new-check"><span className="sub-new-checkmark">✓</span></div>
                  </div>
                  <div className="sub-new-title">첫 달 구독료 0원 쿠폰</div>
                  <div className="sub-new-desc">첫 달 0원 쿠폰으로 한경의 프리미엄 콘텐츠를 경험해보세요. (1/1)</div>
                </div>
                {gridProducts.map((p) => (
                  <div
                    key={p.id}
                    className={'sub-card' + (selected.has(p.id) ? ' sel' : '')}
                    onClick={() => toggle(p.id)}
                  >
                    <div className="sub-card-top">
                      <div className="sub-icon" style={{ background: p.bg, color: p.ic }}><i className={'ti ' + p.icon} aria-hidden="true"></i></div>
                      <div className="sub-check"><span className="sub-checkmark">✓</span></div>
                    </div>
                    <div className="sub-card-name">{p.name}</div>
                    <div className="sub-card-desc">{p.desc}</div>
                    <div className="sub-card-price">{p.price.toLocaleString('ko-KR')}<span>원/월</span></div>
                  </div>
                ))}
              </div>
            </div>

            <div className="sub-right">
              <div className="sub-summary-ttl">
                <i className="ti ti-shopping-cart" aria-hidden="true"></i> 구독 요약
                {rate > 0 && <span className="sub-disc-badge">{Math.round(rate * 100)}% 할인 중</span>}
              </div>

              {(selected.size === 0 && !newMemberSelected)
                ? <div className="sub-empty">구독하실 상품을 선택해 주세요</div>
                : (
                  <div className="sub-items">
                    {items.map((p) => (
                      <div className="sub-item" key={p.id}>
                        <span className="sub-item-name">{p.name}</span>
                        <span className="sub-item-price">{p.price.toLocaleString('ko-KR')}원</span>
                        <button className="sub-rm" onClick={(e) => { e.stopPropagation(); toggle(p.id); }} aria-label="삭제"><i className="ti ti-x" aria-hidden="true"></i></button>
                      </div>
                    ))}
                    {newMemberSelected && (
                      <div className="sub-item">
                        <span className="sub-item-name">첫 달 구독료 0원 쿠폰</span>
                        <span className="sub-item-price">0원</span>
                        <button className="sub-rm" onClick={(e) => { e.stopPropagation(); setNewMemberSelected(false); }} aria-label="삭제"><i className="ti ti-x" aria-hidden="true"></i></button>
                      </div>
                    )}
                  </div>
                )}

              <div className="sub-divider"></div>
              <div className="sub-price-rows">
                <div className="sub-price-row"><span>상품 소계</span><span>{formatKRW(subtotal)}</span></div>
                <div className="sub-price-row disc"><span>번들 할인 (최대 30%)</span><span>-{formatKRW(discAmt)}</span></div>
                <div className="sub-price-row total">
                  <span>최종 결제 금액</span>
                  <span style={{ color: '#3182f6' }}>{final.toLocaleString('ko-KR')} <small style={{ fontSize: 12, fontWeight: 500, color: '#8b95a1' }}>원/월</small></span>
                </div>
              </div>
              <button className="sub-cta" disabled={selected.size === 0 && !newMemberSelected} onClick={() => setConfirmOpen(true)}>구독하기</button>
              <p className="sub-note">구독 시작 후 7일 이내 미사용 시 전액 환불 가능합니다.</p>
            </div>
          </div>
        )}

        {/* 결제 완료 화면 */}
        {success && (
          <div className="sub-success show">
            <div className="sub-success-icon"><i className="ti ti-check" aria-hidden="true"></i></div>
            <h3>결제가 완료되었습니다!</h3>
            <p className="sub-success-meta">주문번호: {success.orderId}  |  결제일시: {success.dateStr}</p>
            <div className="sub-success-card">
              <div className="sub-success-card-ttl"><i className="ti ti-shopping-cart" aria-hidden="true"></i> 구독 요약</div>
              <div className="sub-s-items">
                {success.items.map((p) => (
                  <div className="sub-s-item" key={p.id}>
                    <div>
                      <div className="sub-s-item-name">{p.name}</div>
                      <div className="sub-s-item-sub">월 정기 구독</div>
                    </div>
                    <span>{p.price.toLocaleString('ko-KR')}원</span>
                  </div>
                ))}
              </div>
              <div className="sub-s-hr"></div>
              <div className="sub-s-total"><span className="lbl">총 결제 금액</span><span>{success.final.toLocaleString('ko-KR')}원</span></div>
              <div className="sub-next-date">
                <i className="ti ti-calendar" aria-hidden="true"></i> 다음 결제 예정일: {success.next.getFullYear()}년 {success.next.getMonth() + 1}월 {success.next.getDate()}일
              </div>
            </div>
            <button className="sub-success-close" onClick={handleClose}>확인 후 기사로 돌아가기</button>
          </div>
        )}

        {/* 결제 확인 다이얼로그 */}
        {confirmOpen && (
          <div className="sub-confirm open">
            <div className="sub-confirm-box">
              <h3>이대로 구독하시겠습니까?</h3>
              <p>등록하신 결제 수단으로 매월 자동 결제됩니다.</p>
              <div className="sub-confirm-items">
                {items.map((p) => (
                  <div className="sub-confirm-item" key={p.id}><b>{p.name}</b><span>{p.price.toLocaleString('ko-KR')}원</span></div>
                ))}
                {rate > 0 && (
                  <>
                    <div className="sub-confirm-hr"></div>
                    <div className="sub-confirm-item">
                      <span style={{ color: '#16a34a', fontWeight: 700 }}>번들 할인 {Math.round(rate * 100)}%</span>
                      <span style={{ color: '#16a34a', fontWeight: 700 }}>-{formatKRW(discAmt)}</span>
                    </div>
                  </>
                )}
                <div className="sub-confirm-hr"></div>
                <div className="sub-confirm-total"><span>최종 결제 금액</span><span>{final.toLocaleString('ko-KR')}원/월</span></div>
              </div>
              <div className="sub-confirm-actions">
                <button className="btn-cancel" onClick={() => setConfirmOpen(false)}>취소</button>
                <button className="btn-pay" onClick={handlePay}>결제하기</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
