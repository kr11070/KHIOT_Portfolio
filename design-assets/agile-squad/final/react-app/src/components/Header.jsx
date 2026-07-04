// 상단 헤더: 유틸리티 바 + 로고 + 내비게이션 + 지수 티커.
import { useEffect, useRef, useState } from 'react';

const tickers = [
  { name: '코스피200', val: '1,330.57', chg: '-8.50%', dir: 'down' },
  { name: 'S&P 500', val: '7,357.49', chg: '-0.01%', dir: 'down' },
  { name: '나스닥', val: '25,358.60', chg: '-0.46%', dir: 'down' },
  { name: '다우존스', val: '51,920.62', chg: '+0.14%', dir: 'up' },
  { name: '반도체', val: '13,940.87', chg: '+3.59%', dir: 'up' },
  { name: '독일 DAX', val: '24,930.50', chg: '+0.50%', dir: 'up' },
];

const navItems = ['경제', '산업', '사회', '코리아마켓', '글로벌마켓', '집코노미', '국제', '유통', '오피니언'];

export default function Header({ onSubOpen, isPremium }) {
  const navRef = useRef(null);
  const [navHidden, setNavHidden] = useState(false);

  useEffect(() => {
    const el = navRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setNavHidden(!entry.isIntersecting && entry.boundingClientRect.top < 0),
      { threshold: 0 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div className={'hk-float-search' + (navHidden ? ' show' : '')}>
        <svg className="hk-float-logo" width="66" height="33" viewBox="0 0 66 33" fill="none" role="img" aria-label="한경" xmlns="http://www.w3.org/2000/svg">
          <g clipPath="url(#hk-float-logo-clip)">
            <path fillRule="evenodd" clipRule="evenodd" d="M13.769 20.8421H7.73097C8.22637 21.637 8.46933 22.5494 8.43097 23.4707V29.2099C8.43097 31.122 9.13697 31.6614 11.198 31.6614H29.942V29.5871H13.769V20.8421ZM20.341 2.79578H13.241V0.0878906H7.38297C7.80634 0.727605 8.00152 1.47826 7.93997 2.23006V2.79578H0.839966V4.87006H5.47997C4.40774 5.55684 3.53005 6.48056 2.92347 7.56064C2.31688 8.64073 1.99983 9.84436 1.99997 11.0665C2.01531 12.1008 2.24988 13.1218 2.68986 14.0693C3.12985 15.0169 3.76637 15.8719 4.56199 16.5841C5.3576 17.2963 6.29624 17.8513 7.32269 18.2164C8.34914 18.5816 9.44268 18.7495 10.539 18.7103C11.6374 18.7512 12.7335 18.5848 13.7627 18.2207C14.792 17.8566 15.7337 17.3022 16.5325 16.5901C17.3313 15.878 17.971 15.0225 18.4142 14.0739C18.8573 13.1254 19.0949 12.1029 19.113 11.0665C19.1116 9.84369 18.7924 8.63981 18.1833 7.56023C17.5742 6.48066 16.6937 5.55829 15.619 4.87383H20.342V2.79955L20.341 2.79578ZM10.541 16.6152C8.20797 16.6152 6.64097 14.3524 6.61997 11.0929C6.63597 7.83629 8.19997 5.57343 10.537 5.57343C12.892 5.57343 14.476 7.83629 14.497 11.092C14.477 14.3486 12.892 16.6152 10.537 16.6152H10.541ZM28.73 0.777119H22.695C23.283 1.2344 23.435 2.49312 23.435 3.44729V22.6816H26.5C28 22.6816 28.735 22.0433 28.735 20.4545V10.2302H33.96V8.15592H28.73V0.777119ZM54.563 3.99415C54.614 3.75182 54.6063 3.50175 54.5405 3.2626C54.4748 3.02346 54.3526 2.80139 54.1831 2.61296C54.0136 2.42453 53.8012 2.2746 53.5618 2.17435C53.3223 2.07409 53.0619 2.0261 52.8 2.03395H38.678V4.11766H49.193C49.193 11.4719 44.593 16.1174 36.893 17.3591L37.849 18.7517C47.803 17.6203 53.834 13.2068 54.565 3.99415M65.448 0.814834H59.362C60.0259 1.55798 60.3617 2.5132 60.3 3.48312V5.77521H54.773V7.85515H60.3V10.861H54.587V12.9296H60.3V17.6778C58.9003 17.0916 57.3845 16.7924 55.853 16.8C50.7 16.8 46.373 20.0576 46.303 24.7983C46.373 29.5427 50.703 32.8022 55.854 32.8022C61.029 32.8022 65.375 29.5418 65.454 24.7983C65.454 24.7106 65.444 24.6248 65.44 24.5371L65.454 24.5447V0.814834H65.448ZM55.848 30.6374C53.079 30.6374 51.219 28.2567 51.188 24.8313C51.218 21.4031 53.078 19.0195 55.848 19.0195C58.653 19.0195 60.533 21.404 60.559 24.8322C60.532 28.2567 58.653 30.6365 55.847 30.6365L55.848 30.6374Z" fill="#143C7E" />
          </g>
          <defs>
            <clipPath id="hk-float-logo-clip">
              <rect width="66" height="33" fill="white" />
            </clipPath>
          </defs>
        </svg>
        <input className="hk-float-input" type="text" placeholder="AI 검색" />
        <button className="hk-float-btn">검색</button>
      </div>

      <div className="hk-utility">
        <div className="hk-utility-left">
          <span className="hk-util-date">2026.06.29</span>
          <span className="hk-util-item"><i className="ti ti-book" aria-hidden="true"></i>신문보기</span>
          <span className="hk-util-item"><span className="hk-util-badge">한경 tv</span></span>
          <span className="hk-util-item wsj">WSJ</span>
          <span className="hk-util-item">KED GLOBAL</span>
        </div>
        <span className="hk-utility-right">로그인</span>
      </div>

      <div className="hk-logo-row">
        <svg className="hk-logo" viewBox="0 0 80.399 19.6" role="img" aria-label="한국경제" xmlns="http://www.w3.org/2000/svg">
          <g fill="#142C67">
            <path d="M37.3,1.5c0-0.7-0.601-1.1-1.2-1.1H23.5v1.2h10.699v2.8c0,1.1-0.1,2.1-0.399,3H21.199v1.3h7.4v2.4h-5.3v1.2h10.899v6.5H36c0.899,0,1.3-0.301,1.3-1.301v-5.3c0-0.7-0.5-1.1-1.101-1.1h-4.5V8.7h7.7V7.4h-3c0.5-0.7,0.9-2,0.9-3.1V1.5L37.3,1.5z" />
            <path d="M7.5,12.4H4c0.3,0.3,0.399,1,0.399,1.6v3.5C4.399,18.7,4.8,19,6,19h10.8V17.8h-9.4v-5.4H7.5z" />
            <path d="M11.3,1.6H7.199V0H3.8C4,0.2,4.1,0.8,4.1,1.3v0.3H0v1.2h2.699c-1.199,0.8-2,2.1-2,3.7c0,2.7,2.301,4.6,4.9,4.6c2.7,0,4.9-1.9,5-4.6c0-1.6-0.8-2.9-2-3.7h2.7V1.6z M5.6,9.9c-1.4,0-2.3-1.4-2.3-3.3c0-2,0.899-3.3,2.3-3.3s2.3,1.4,2.3,3.3C7.899,8.5,7,9.9,5.6,9.9z" />
            <path d="M16.1,0.4h-3.5c0.3,0.3,0.4,1,0.4,1.6v11.6h1.8c0.899,0,1.3-0.4,1.3-1.3V6.1h3V4.9h-3C16.1,4.8,16.1,0.4,16.1,0.4z" />
            <path d="M77,0.4c0.399,0.3,0.6,1,0.6,1.6v17H79c1,0,1.399-0.6,1.399-1.6v-17H77L77,0.4z" />
            <path d="M73.5,6.3h-3v1.2h3v9.7h1.3c1,0,1.399-0.6,1.399-1.7V0.4h-3.3c0.4,0.3,0.5,1,0.5,1.6L73.5,6.3L73.5,6.3z" />
            <path d="M52.3,2.3c0.1-0.7-0.3-1.2-1-1.2h-8.2v1.3h6.1c0,4.4-2.699,7.2-7.1,8l0.6,0.8C48.399,10.5,51.8,7.8,52.3,2.3" />
            <path d="M58.6,0.4h-3.5c0.4,0.3,0.5,1,0.5,1.6v1.4h-3.2v1.3h3.2v1.7h-3.3v1.2h3.3V10.5c-0.8-0.3-1.7-0.5-2.6-0.5c-3,0-5.5,2-5.5,4.8c0,2.899,2.5,4.8,5.5,4.8s5.5-2,5.6-4.8c0-0.101,0-0.101,0-0.2l0,0V0.4z M53,18.3c-1.601,0-2.7-1.4-2.7-3.5c0-2.101,1.1-3.5,2.7-3.5c1.6,0,2.699,1.399,2.699,3.5C55.699,16.9,54.6,18.3,53,18.3z" />
            <path d="M71.399,2.2c0-0.8-0.5-1.1-1.1-1.1h-7.2v1.3h5.3c0,3.8-2.7,6.3-6.6,7.7c4.3,0.7,7.5,2.8,9.7,5.899v-3.8c-1.801-1.399-3.801-2.2-5.7-2.5C68.699,8.5,71.399,4.8,71.399,2.2" />
          </g>
        </svg>
      </div>

      <nav className="hk-nav" ref={navRef}>
        <button
          className={'hk-trial-btn' + (isPremium ? ' hk-trial-btn--hidden' : '')}
          onClick={onSubOpen}
          aria-hidden={isPremium}
          tabIndex={isPremium ? -1 : 0}
        >
          <i className="ti ti-sparkles" aria-hidden="true" style={{ fontSize: 13 }}></i>유료 구독 체험하기
        </button>
        <div className="hk-nav-menu">
          {navItems.map((item) => (
            <a key={item} className={'hk-nav-item' + (item === '사회' ? ' active' : '')}>
              {item}
            </a>
          ))}
          <span className="hk-nav-all"><i className="ti ti-menu-2" aria-hidden="true"></i>전체메뉴</span>
        </div>
        <span className="hk-nav-search"><i className="ti ti-search" aria-hidden="true"></i></span>
      </nav>

      <div className="hk-ticker">
        <div className="hk-ticker-track">
          <div className="hk-ticker-track-inner">
            {[...tickers, ...tickers].map((t, i) => (
              <div className="hk-tick" key={t.name + '-' + i}>
                <span className="hk-tick-name">{t.name}</span>
                <span className="hk-tick-val">{t.val}</span>
                <span className={'hk-tick-chg ' + t.dir}>
                  {t.caret && <i className="ti ti-caret-down-filled" aria-hidden="true" style={{ fontSize: 10 }}></i>}
                  {t.chg}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="hk-tick hk-tick-fx">
          <span className="hk-tick-name">환율 USD/KRW</span>
          <span className="hk-tick-val">1,545.25</span>
        </div>
      </div>
    </>
  );
}
