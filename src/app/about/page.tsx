import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  ArrowRight,
  Users,
  Clock,
  Target,
  Heart,
  Lightbulb,
  CheckCircle,
  TrendingUp,
  Building2,
  Calendar,
  Coins,
  RefreshCw,
  Shield,
  Award,
  Globe,
  Sparkles,
} from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-primary/10 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="secondary" className="mb-6 px-4 py-1.5">
              <Sparkles className="w-4 h-4 mr-1.5" />
              제4회 시민 공감大 아이디어 공모전 출품작
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
              프로젝트 소개
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              <strong className="text-primary">멘토링 뱅크</strong>는 AI 시대, 세대가 함께 성장하는
              양방향 멘토링 플랫폼입니다. 스킬 교환을 넘어 고독 해소와 정서적 연결까지.
            </p>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-4">제안 배경</Badge>
              <h2 className="text-3xl font-bold mb-4">왜 필요한가요?</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <Card className="border-destructive/20">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center gap-2">
                    <Target className="w-5 h-5 text-destructive" />
                    현재 문제점
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-destructive/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-destructive">1</span>
                    </div>
                    <div>
                      <p className="font-medium">초고령사회 본격 진입</p>
                      <p className="text-sm text-muted-foreground">2025년 65세 이상 인구 <strong>1천만 명</strong> 돌파</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-destructive/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-destructive">2</span>
                    </div>
                    <div>
                      <p className="font-medium">중장년 고독사 위기</p>
                      <p className="text-sm text-muted-foreground">2024년 고독사 3,924명, 50~60대 남성 집중</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-destructive/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-destructive">3</span>
                    </div>
                    <div>
                      <p className="font-medium">청년 취업난 + 세대 갈등</p>
                      <p className="text-sm text-muted-foreground">청년 취업 36개월 연속 감소, 정년 연장 논의</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-destructive/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-destructive">4</span>
                    </div>
                    <div>
                      <p className="font-medium">AI 시대 신디지털 격차</p>
                      <p className="text-sm text-muted-foreground">스마트폰 넘어 생성형 AI 활용 격차 확대</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-primary/20">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center gap-2">
                    <Lightbulb className="w-5 h-5 text-primary" />
                    기존 정책의 한계
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-primary">!</span>
                    </div>
                    <div>
                      <p className="font-medium">일방향적 지원 구조</p>
                      <p className="text-sm text-muted-foreground">시니어를 수혜자로만 인식, 역량 활용 미흡</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-primary">!</span>
                    </div>
                    <div>
                      <p className="font-medium">세대간 접점 부재</p>
                      <p className="text-sm text-muted-foreground">세대별 분리된 프로그램 운영</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-primary">!</span>
                    </div>
                    <div>
                      <p className="font-medium">지속성 부족</p>
                      <p className="text-sm text-muted-foreground">일회성 프로그램, 자발적 참여 동기 미흡</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-4">솔루션</Badge>
              <h2 className="text-3xl font-bold mb-4">멘토링 뱅크의 해결책</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                시간은행 개념을 활용한 양방향 재능 교환 시스템으로
                세대 간 연결고리를 만듭니다.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <RefreshCw className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">AI 동반 성장</h3>
                  <p className="text-sm text-muted-foreground">
                    세대가 함께 AI를 배우며<br />
                    서로 도우며 성장하는 관계
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Heart className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">고독 해소</h3>
                  <p className="text-sm text-muted-foreground">
                    안부 멘토링으로<br />
                    외로움 극복과 정서적 연결
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Coins className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">시간 크레딧</h3>
                  <p className="text-sm text-muted-foreground">
                    1시간 교류하면<br />
                    1시간 배울 수 있는 크레딧
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section id="how-it-works" className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-4">이용 방법</Badge>
              <h2 className="text-3xl font-bold mb-4">어떻게 이용하나요?</h2>
            </div>

            <div className="space-y-8">
              <div className="flex flex-col md:flex-row gap-6 items-center">
                <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                  <span className="text-3xl font-bold text-primary-foreground">1</span>
                </div>
                <div className="text-center md:text-left">
                  <h3 className="text-xl font-bold mb-2">회원가입 & 크레딧 받기</h3>
                  <p className="text-muted-foreground">
                    간단한 회원가입만 하면 바로 <strong>3 크레딧</strong>을 드립니다.
                    이 크레딧으로 바로 배움을 시작할 수 있어요.
                  </p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-6 items-center">
                <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                  <span className="text-3xl font-bold text-primary-foreground">2</span>
                </div>
                <div className="text-center md:text-left">
                  <h3 className="text-xl font-bold mb-2">멘토링 찾기 & 신청</h3>
                  <p className="text-muted-foreground">
                    배우고 싶은 재능을 검색하고, 멘토를 찾아 신청하세요.
                    온라인/오프라인 중 편한 방식을 선택할 수 있어요.
                  </p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-6 items-center">
                <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                  <span className="text-3xl font-bold text-primary-foreground">3</span>
                </div>
                <div className="text-center md:text-left">
                  <h3 className="text-xl font-bold mb-2">멘토링 진행</h3>
                  <p className="text-muted-foreground">
                    약속된 시간에 멘토링을 진행합니다.
                    멘토링 완료 후 상호 평가를 남겨주세요.
                  </p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-6 items-center">
                <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                  <span className="text-3xl font-bold text-primary-foreground">4</span>
                </div>
                <div className="text-center md:text-left">
                  <h3 className="text-xl font-bold mb-2">내 재능 나누기 & 크레딧 적립</h3>
                  <p className="text-muted-foreground">
                    이번엔 내가 멘토가 되어 재능을 나눠보세요.
                    1시간 멘토링을 제공하면 <strong>1 크레딧</strong>이 적립됩니다.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Exchange Categories */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-4">재능 카테고리</Badge>
              <h2 className="text-3xl font-bold mb-4">어떤 재능을 교환하나요?</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardHeader className="bg-primary/5">
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    시니어 → 청년
                  </CardTitle>
                  <CardDescription>삶의 지혜와 전통 기술</CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">💡</span>
                      <div>
                        <p className="font-medium">인생 경험</p>
                        <p className="text-sm text-muted-foreground">경제위기 생존법, 취업 면접, 인간관계</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">🧘</span>
                      <div>
                        <p className="font-medium">마음 건강</p>
                        <p className="text-sm text-muted-foreground">명상, 스트레스 관리, 긍정 마인드</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">🍳</span>
                      <div>
                        <p className="font-medium">전통 요리/집밥</p>
                        <p className="text-sm text-muted-foreground">김장, 1인분 집밥 레시피</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">🎨</span>
                      <div>
                        <p className="font-medium">전통 문화</p>
                        <p className="text-sm text-muted-foreground">서예, 사군자, 다도</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="bg-primary/5">
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    청년 → 시니어
                  </CardTitle>
                  <CardDescription>AI 시대 디지털 역량</CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">🤖</span>
                      <div>
                        <p className="font-medium">AI 활용</p>
                        <p className="text-sm text-muted-foreground">ChatGPT, AI 사진편집, AI 건강정보</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">🛡️</span>
                      <div>
                        <p className="font-medium">디지털 안전</p>
                        <p className="text-sm text-muted-foreground">보이스피싱 예방, 스팸 차단</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">📱</span>
                      <div>
                        <p className="font-medium">스마트폰/생활IT</p>
                        <p className="text-sm text-muted-foreground">키오스크, 배달앱, 인터넷 뱅킹</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">📸</span>
                      <div>
                        <p className="font-medium">SNS/숏폼</p>
                        <p className="text-sm text-muted-foreground">유튜브, 릴스, 가족앨범 공유</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Expected Benefits */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-4">기대 효과</Badge>
              <h2 className="text-3xl font-bold mb-4">무엇이 달라지나요?</h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-4 px-4 font-semibold">구분</th>
                    <th className="text-left py-4 px-4 font-semibold text-muted-foreground">As-Is (현재)</th>
                    <th className="text-left py-4 px-4 font-semibold text-primary">To-Be (개선)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-4 px-4 font-medium">시니어</td>
                    <td className="py-4 px-4 text-muted-foreground">사회적 고립, 고독사 위험</td>
                    <td className="py-4 px-4 text-primary">정기적 교류, 외로움 해소</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-4 px-4 font-medium">청년</td>
                    <td className="py-4 px-4 text-muted-foreground">취업난, 인생 멘토 부재</td>
                    <td className="py-4 px-4 text-primary">위기 극복 지혜, 정서적 지지</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-4 px-4 font-medium">AI 격차</td>
                    <td className="py-4 px-4 text-muted-foreground">시니어 AI 소외</td>
                    <td className="py-4 px-4 text-primary">세대 동반 AI 학습</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-4 px-4 font-medium">세대 관계</td>
                    <td className="py-4 px-4 text-muted-foreground">갈등과 단절</td>
                    <td className="py-4 px-4 text-primary">상호 이해와 다정함</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Implementation Plan */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-4">추진 계획</Badge>
              <h2 className="text-3xl font-bold mb-4">어떻게 실현하나요?</h2>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">1단계: 파일럿 운영 (6개월)</CardTitle>
                      <CardDescription>수도권 3개 광역시도 시범 운영</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1">
                    <li>서울, 경기, 인천 시범 운영</li>
                    <li>주민센터, 복지관 연계 홍보</li>
                    <li>초기 사용자 피드백 수집</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                      <Building2 className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">2단계: 광역시 확대 (12개월)</CardTitle>
                      <CardDescription>6대 광역시 및 세종시 확대</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1">
                    <li>부산, 대구, 대전, 광주, 울산, 세종 확대</li>
                    <li>지자체별 맞춤 운영</li>
                    <li>성과 지표 관리 체계 구축</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                      <Globe className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">3단계: 전국 확산 (지속)</CardTitle>
                      <CardDescription>전국 17개 광역시도 전면 확대</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1">
                    <li>9개 도 지역 확대 (강원, 충북, 충남, 전북, 전남, 경북, 경남, 제주)</li>
                    <li>광역-기초 연계 운영 체계</li>
                    <li>한국형 시간은행 모델 확립</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="outline" className="mb-4">제안 팀</Badge>
            <h2 className="text-3xl font-bold mb-8">시민연결</h2>

            <Card className="max-w-md mx-auto">
              <CardContent className="pt-6">
                <p className="text-muted-foreground mb-6">
                  대한민국 시민사회 활성화를 위해 모인 시민 팀입니다.
                  세대를 연결하고 지역 공동체를 강화하는 정책 아이디어를 제안합니다.
                </p>
                <div className="flex justify-center gap-4">
                  <Badge>대표: 박용환</Badge>
                  <Badge variant="secondary">팀원: 김현실</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            함께 만들어가요
          </h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            멘토링 뱅크는 시민 여러분의 참여로 완성됩니다.<br />
            지금 바로 프로토타입을 체험해보세요.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/explore">
                멘토링 둘러보기
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10" asChild>
              <Link href="/dashboard">내 대시보드</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
