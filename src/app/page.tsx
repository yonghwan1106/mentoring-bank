import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  ArrowRight,
  Users,
  Clock,
  Star,
  Heart,
  Sparkles,
  RefreshCw,
  Shield,
  TrendingUp,
  Coins,
} from 'lucide-react';
import { STATS, MENTORINGS, REVIEWS } from '@/lib/mock-data';
import { SKILL_CATEGORIES } from '@/lib/types';

export default function HomePage() {
  const featuredMentorings = MENTORINGS.slice(0, 6);
  const recentReviews = REVIEWS.slice(0, 3);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-primary/10 py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="secondary" className="mb-6 px-4 py-1.5">
              <Sparkles className="w-4 h-4 mr-1.5" />
              제4회 시민 공감大 아이디어 공모전 출품작
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              <span className="text-primary">멘토링</span> 뱅크
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-4">
              세대를 잇는 재능 교환 플랫폼
            </p>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              시니어의 삶의 지혜와 청년의 디지털 역량을 교환합니다.<br />
              <strong className="text-foreground">가르침은 배움이 되고, 세대는 하나가 됩니다.</strong>
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/explore">
                  멘토링 둘러보기
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/about">프로젝트 소개</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-primary/10 rounded-full blur-2xl" />
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
      </section>

      {/* Stats Section */}
      <section className="py-12 border-y bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary">{STATS.totalMentors}</div>
              <div className="text-sm text-muted-foreground mt-1">등록 멘토</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary">{STATS.totalHoursExchanged.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground mt-1">교환된 시간 (크레딧)</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary">{STATS.averageRating}</div>
              <div className="text-sm text-muted-foreground mt-1">평균 만족도</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary">{STATS.monthlyActiveUsers}</div>
              <div className="text-sm text-muted-foreground mt-1">월간 활성 사용자</div>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">어떻게 이용하나요?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              1시간 가르치면 1시간 배울 수 있는 <strong className="text-foreground">시간 크레딧</strong> 시스템
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="relative overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-primary/10 rounded-bl-full" />
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Coins className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>1. 크레딧 받기</CardTitle>
                <CardDescription>
                  가입 시 3 크레딧을 무료로 받아요.<br />
                  내 재능을 나누면 크레딧이 쌓여요.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="relative overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-primary/10 rounded-bl-full" />
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <RefreshCw className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>2. 재능 교환하기</CardTitle>
                <CardDescription>
                  크레딧으로 배우고 싶은 멘토링을 신청하세요.<br />
                  내 재능을 가르치면 크레딧을 얻어요.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="relative overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-primary/10 rounded-bl-full" />
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Heart className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>3. 세대와 연결되기</CardTitle>
                <CardDescription>
                  멘토링을 통해 세대를 뛰어넘는 소통을 해요.<br />
                  서로에게 배우며 함께 성장해요.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">어떤 재능을 교환할 수 있나요?</h2>
            <p className="text-muted-foreground">세대별 강점을 살린 재능 카테고리</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Senior to Youth */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="secondary">시니어 → 청년</Badge>
                </div>
                <CardTitle className="text-xl">삶의 지혜와 전통</CardTitle>
                <CardDescription>
                  오랜 경험에서 우러나온 소중한 지식을 전합니다
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {Object.entries(SKILL_CATEGORIES)
                    .filter(([, v]) => v.direction === 'senior-to-youth')
                    .map(([key, value]) => (
                      <div key={key} className="flex items-center gap-2 p-2 rounded-lg bg-muted">
                        <span className="text-2xl">{value.icon}</span>
                        <span className="text-sm font-medium">{value.name}</span>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>

            {/* Youth to Senior */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="secondary">청년 → 시니어</Badge>
                </div>
                <CardTitle className="text-xl">디지털 역량</CardTitle>
                <CardDescription>
                  편리한 디지털 세상을 함께 경험합니다
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {Object.entries(SKILL_CATEGORIES)
                    .filter(([, v]) => v.direction === 'youth-to-senior')
                    .map(([key, value]) => (
                      <div key={key} className="flex items-center gap-2 p-2 rounded-lg bg-muted">
                        <span className="text-2xl">{value.icon}</span>
                        <span className="text-sm font-medium">{value.name}</span>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Mentorings */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2">인기 멘토링</h2>
              <p className="text-muted-foreground">지금 가장 인기 있는 멘토링을 만나보세요</p>
            </div>
            <Button variant="outline" asChild className="hidden sm:flex">
              <Link href="/explore">
                전체 보기
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredMentorings.map((mentoring) => {
              const categoryInfo = SKILL_CATEGORIES[mentoring.category];
              return (
                <Card key={mentoring.id} className="group hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <Badge variant={mentoring.mentor.generation === 'senior' ? 'default' : 'secondary'}>
                        {categoryInfo.icon} {categoryInfo.name}
                      </Badge>
                      {mentoring.isOnline && (
                        <Badge variant="outline">온라인</Badge>
                      )}
                    </div>
                    <CardTitle className="text-lg mt-2 group-hover:text-primary transition-colors">
                      {mentoring.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-3 mb-4">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={mentoring.mentor.profileImage} />
                        <AvatarFallback>{mentoring.mentor.name[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium text-sm">{mentoring.mentor.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {mentoring.mentor.generation === 'senior' ? '시니어' : '청년'} · {mentoring.mentor.district}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span>{mentoring.rating}</span>
                        <span>({mentoring.reviewCount})</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{mentoring.duration}분</span>
                      </div>
                      <div className="flex items-center gap-1 text-primary font-medium">
                        <Coins className="h-4 w-4" />
                        <span>{mentoring.creditCost} 크레딧</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="text-center mt-8 sm:hidden">
            <Button variant="outline" asChild>
              <Link href="/explore">
                전체 보기
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">참여자 후기</h2>
            <p className="text-muted-foreground">멘토링 뱅크를 통해 세대를 연결한 분들의 이야기</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {recentReviews.map((review) => (
              <Card key={review.id}>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-1 mb-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(review.rating)
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-200'
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4">{review.content}</p>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={review.reviewer.profileImage} />
                      <AvatarFallback>{review.reviewer.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="text-sm font-medium">{review.reviewer.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {review.reviewer.generation === 'senior' ? '시니어' : '청년'} · {review.reviewer.age}세
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">왜 멘토링 뱅크인가요?</h2>
            <p className="text-muted-foreground">기존 봉사활동과는 다른 새로운 접근</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <RefreshCw className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">양방향 교환</h3>
                <p className="text-sm text-muted-foreground">
                  일방적 지원이 아닌<br />서로 가르치고 배우는 관계
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">세대 통합</h3>
                <p className="text-sm text-muted-foreground">
                  세대 간 격차를 좁히고<br />상호 이해를 높이는 소통
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">신뢰 기반</h3>
                <p className="text-sm text-muted-foreground">
                  평가 시스템과 인증 배지로<br />안전한 만남을 보장
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">지속 가능</h3>
                <p className="text-sm text-muted-foreground">
                  크레딧 시스템으로<br />자발적 참여가 이어지는 구조
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            지금 바로 시작하세요
          </h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            가입 즉시 3 크레딧을 드립니다.<br />
            당신의 재능이 누군가에게 큰 도움이 됩니다.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/explore">
                멘토링 둘러보기
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10" asChild>
              <Link href="/register-talent">내 재능 등록하기</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
