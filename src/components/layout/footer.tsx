import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold">
                멘
              </div>
              <span className="font-bold">멘토링 뱅크</span>
            </div>
            <p className="text-sm text-muted-foreground">
              세대를 잇는 재능 교환 플랫폼
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              가르침은 배움이 되고,<br />
              세대는 하나가 됩니다.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold mb-4">서비스</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/explore" className="hover:text-primary transition-colors">멘토링 찾기</Link></li>
              <li><Link href="/register-talent" className="hover:text-primary transition-colors">재능 등록</Link></li>
              <li><Link href="/community" className="hover:text-primary transition-colors">커뮤니티</Link></li>
              <li><Link href="/dashboard" className="hover:text-primary transition-colors">내 활동</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">정보</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/about" className="hover:text-primary transition-colors">프로젝트 소개</Link></li>
              <li><Link href="/about#how-it-works" className="hover:text-primary transition-colors">이용 방법</Link></li>
              <li><Link href="/about#faq" className="hover:text-primary transition-colors">자주 묻는 질문</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">문의</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>용인시 시민사회비서관실</li>
              <li>sanoramyun8@gmail.com</li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
          <p>제4회 시민 공감大 아이디어 공모전 출품작</p>
          <p className="mt-2 md:mt-0">
            &copy; 2024 멘토링 뱅크. 용인블루 팀.
          </p>
        </div>
      </div>
    </footer>
  );
}
