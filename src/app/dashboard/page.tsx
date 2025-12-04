'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Coins,
  TrendingUp,
  TrendingDown,
  Gift,
  Star,
  Clock,
  Calendar,
  Award,
  Users,
  ArrowRight,
  CheckCircle,
  BookOpen,
  GraduationCap,
  Heart,
  Phone,
  Video,
} from 'lucide-react';
import {
  CURRENT_USER,
  CURRENT_USER_CREDITS,
  MENTORINGS,
  REVIEWS,
} from '@/lib/mock-data';

export default function DashboardPage() {
  // 내가 등록한 멘토링 (멘토로서)
  const myMentorings = MENTORINGS.filter(m => m.mentorId === CURRENT_USER.id).slice(0, 3);
  // 내가 신청한 멘토링 (멘티로서)
  const appliedMentorings = MENTORINGS.slice(0, 3);
  // 받은 후기
  const myReviews = REVIEWS.filter(r => r.mentoring.mentorId === CURRENT_USER.id).slice(0, 3);

  // 다음 레벨까지 필요한 멘토링 횟수
  const currentLevel = 5;
  const nextLevelRequirement = 30;
  const progressToNextLevel = (CURRENT_USER.mentoringCount / nextLevelRequirement) * 100;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="border-b bg-gradient-to-r from-primary/5 to-primary/10 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16 border-2 border-primary/20">
                <AvatarImage src={CURRENT_USER.profileImage} />
                <AvatarFallback className="text-xl">{CURRENT_USER.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-bold">{CURRENT_USER.name}님</h1>
                  {CURRENT_USER.verified && (
                    <CheckCircle className="w-5 h-5 text-primary" />
                  )}
                </div>
                <p className="text-muted-foreground">
                  Level {currentLevel} · {CURRENT_USER.generation === 'senior' ? '시니어' : '청년'} 멘토
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" asChild>
                <Link href="/register-talent">재능 등록하기</Link>
              </Button>
              <Button asChild>
                <Link href="/explore">멘토링 찾기</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {/* Credit Balance */}
          <Card className="col-span-2 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium flex items-center gap-2">
                <Coins className="w-5 h-5" />
                보유 크레딧
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold mb-2">
                {CURRENT_USER_CREDITS.balance}
                <span className="text-lg font-normal ml-1">크레딧</span>
              </div>
              <div className="flex gap-4 text-sm opacity-80">
                <span className="flex items-center gap-1">
                  <TrendingUp className="w-4 h-4" />
                  총 적립: {CURRENT_USER_CREDITS.totalEarned}
                </span>
                <span className="flex items-center gap-1">
                  <TrendingDown className="w-4 h-4" />
                  총 사용: {CURRENT_USER_CREDITS.totalSpent}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Mentoring Count */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <GraduationCap className="w-4 h-4" />
                제공한 멘토링
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{CURRENT_USER.mentoringCount}</div>
              <p className="text-xs text-muted-foreground">총 멘토링 횟수</p>
            </CardContent>
          </Card>

          {/* Rating */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Star className="w-4 h-4" />
                평점
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold flex items-center gap-1">
                {CURRENT_USER.rating}
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              </div>
              <p className="text-xs text-muted-foreground">{CURRENT_USER.reviewCount}개 후기</p>
            </CardContent>
          </Card>
        </div>

        {/* Level Progress */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Award className="w-5 h-5 text-primary" />
              레벨 현황
            </CardTitle>
            <CardDescription>
              다음 레벨까지 {nextLevelRequirement - CURRENT_USER.mentoringCount}회 멘토링이 필요합니다.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4 mb-2">
              <Badge variant="outline" className="text-lg px-3 py-1">
                Lv.{currentLevel}
              </Badge>
              <Progress value={progressToNextLevel} className="flex-1" />
              <Badge variant="secondary" className="text-lg px-3 py-1">
                Lv.{currentLevel + 1}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground text-center">
              {CURRENT_USER.mentoringCount} / {nextLevelRequirement} 멘토링 완료
            </p>
          </CardContent>
        </Card>

        {/* 안부 멘토링 - 고독 해소 섹션 */}
        <Card className="mb-8 border-pink-200 bg-gradient-to-r from-pink-50 to-rose-50">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Heart className="w-5 h-5 text-pink-500" />
                  안부 멘토링
                </CardTitle>
                <CardDescription>
                  정기적인 안부 확인으로 따뜻한 연결을 유지하세요
                </CardDescription>
              </div>
              <Badge className="bg-pink-500 hover:bg-pink-600">NEW</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              {/* 주간 안부 전화 */}
              <div className="p-4 rounded-lg bg-white border border-pink-100 hover:border-pink-300 transition-colors cursor-pointer">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center">
                    <Phone className="w-5 h-5 text-pink-500" />
                  </div>
                  <div>
                    <p className="font-medium">주간 안부 전화</p>
                    <p className="text-xs text-muted-foreground">10~15분 통화</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  일주일에 한 번, 따뜻한 안부를 나눠보세요
                </p>
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="text-pink-600 border-pink-200">
                    +3 크레딧
                  </Badge>
                  <span className="text-xs text-muted-foreground">이번 주 2회 가능</span>
                </div>
              </div>

              {/* 영상 안부 인사 */}
              <div className="p-4 rounded-lg bg-white border border-pink-100 hover:border-pink-300 transition-colors cursor-pointer">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center">
                    <Video className="w-5 h-5 text-rose-500" />
                  </div>
                  <div>
                    <p className="font-medium">영상 안부 인사</p>
                    <p className="text-xs text-muted-foreground">20~30분 화상</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  얼굴을 보며 더 깊은 대화를 나눠보세요
                </p>
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="text-rose-600 border-rose-200">
                    +5 크레딧
                  </Badge>
                  <span className="text-xs text-muted-foreground">이번 주 1회 가능</span>
                </div>
              </div>

              {/* 연결된 안부 친구 */}
              <div className="p-4 rounded-lg bg-white border border-pink-100">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                    <Users className="w-5 h-5 text-purple-500" />
                  </div>
                  <div>
                    <p className="font-medium">나의 안부 친구</p>
                    <p className="text-xs text-muted-foreground">정기 교류 중</p>
                  </div>
                </div>
                <div className="flex -space-x-2 mb-3">
                  <Avatar className="h-8 w-8 border-2 border-white">
                    <AvatarFallback className="text-xs bg-pink-100">김</AvatarFallback>
                  </Avatar>
                  <Avatar className="h-8 w-8 border-2 border-white">
                    <AvatarFallback className="text-xs bg-rose-100">이</AvatarFallback>
                  </Avatar>
                  <Avatar className="h-8 w-8 border-2 border-white">
                    <AvatarFallback className="text-xs bg-purple-100">박</AvatarFallback>
                  </Avatar>
                  <div className="h-8 w-8 rounded-full border-2 border-white bg-muted flex items-center justify-center text-xs text-muted-foreground">
                    +2
                  </div>
                </div>
                <Button variant="outline" size="sm" className="w-full text-pink-600 border-pink-200 hover:bg-pink-50">
                  안부 친구 찾기
                </Button>
              </div>
            </div>

            {/* 안부 멘토링 통계 */}
            <div className="mt-4 p-3 rounded-lg bg-white border border-pink-100">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <Heart className="w-4 h-4 text-pink-500" />
                  <span className="text-muted-foreground">이번 달 안부 교류</span>
                </div>
                <div className="flex items-center gap-4">
                  <span><strong>8</strong>회 안부 전화</span>
                  <span><strong>3</strong>회 영상 통화</span>
                  <Badge variant="secondary" className="bg-pink-100 text-pink-700">
                    고독 해소 히어로
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Badges */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Award className="w-5 h-5 text-primary" />
                  획득한 배지
                </CardTitle>
                <CardDescription>
                  {CURRENT_USER.badges.length}개의 배지를 획득했습니다.
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              {CURRENT_USER.badges.map((badge) => (
                <div
                  key={badge.id}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-muted"
                >
                  <span className="text-2xl">{badge.icon}</span>
                  <div>
                    <p className="text-sm font-medium">{badge.name}</p>
                    <p className="text-xs text-muted-foreground">{badge.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs defaultValue="credits" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="credits">크레딧 내역</TabsTrigger>
            <TabsTrigger value="mentoring">멘토링 관리</TabsTrigger>
            <TabsTrigger value="reviews">받은 후기</TabsTrigger>
          </TabsList>

          {/* Credits Tab */}
          <TabsContent value="credits">
            <Card>
              <CardHeader>
                <CardTitle>크레딧 거래 내역</CardTitle>
                <CardDescription>최근 크레딧 적립 및 사용 내역</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {CURRENT_USER_CREDITS.history.map((tx) => (
                    <div
                      key={tx.id}
                      className="flex items-center justify-between py-3 border-b last:border-0"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          tx.type === 'earn' ? 'bg-green-100 text-green-600' :
                          tx.type === 'spend' ? 'bg-red-100 text-red-600' :
                          'bg-blue-100 text-blue-600'
                        }`}>
                          {tx.type === 'earn' ? <TrendingUp className="w-5 h-5" /> :
                           tx.type === 'spend' ? <TrendingDown className="w-5 h-5" /> :
                           <Gift className="w-5 h-5" />}
                        </div>
                        <div>
                          <p className="font-medium">{tx.description}</p>
                          <p className="text-sm text-muted-foreground">{tx.createdAt}</p>
                        </div>
                      </div>
                      <div className={`font-bold ${
                        tx.type === 'earn' || tx.type === 'bonus' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {tx.type === 'earn' || tx.type === 'bonus' ? '+' : '-'}{tx.amount} 크레딧
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Mentoring Tab */}
          <TabsContent value="mentoring">
            <div className="grid md:grid-cols-2 gap-6">
              {/* 내가 제공하는 멘토링 */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <GraduationCap className="w-5 h-5" />
                      내가 제공하는 멘토링
                    </CardTitle>
                    <Button variant="outline" size="sm" asChild>
                      <Link href="/register-talent">
                        새 멘토링 등록
                      </Link>
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {myMentorings.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      <GraduationCap className="w-12 h-12 mx-auto mb-2 opacity-50" />
                      <p>등록한 멘토링이 없습니다.</p>
                      <Button variant="link" asChild>
                        <Link href="/register-talent">재능 등록하기</Link>
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {myMentorings.map((mentoring) => (
                        <div key={mentoring.id} className="flex items-center justify-between p-3 rounded-lg bg-muted">
                          <div>
                            <p className="font-medium">{mentoring.title}</p>
                            <p className="text-sm text-muted-foreground">
                              {mentoring.currentParticipants}/{mentoring.maxParticipants}명 신청
                            </p>
                          </div>
                          <Badge variant={mentoring.status === 'active' ? 'default' : 'secondary'}>
                            {mentoring.status === 'active' ? '진행중' : '마감'}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* 신청한 멘토링 */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <BookOpen className="w-5 h-5" />
                      신청한 멘토링
                    </CardTitle>
                    <Button variant="outline" size="sm" asChild>
                      <Link href="/explore">
                        멘토링 찾기
                      </Link>
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {appliedMentorings.map((mentoring) => (
                      <div key={mentoring.id} className="flex items-center justify-between p-3 rounded-lg bg-muted">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={mentoring.mentor.profileImage} />
                            <AvatarFallback>{mentoring.mentor.name[0]}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-sm">{mentoring.title}</p>
                            <p className="text-xs text-muted-foreground">
                              {mentoring.mentor.name} · {mentoring.schedule[0]?.date}
                            </p>
                          </div>
                        </div>
                        <Badge variant="outline">예정</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Reviews Tab */}
          <TabsContent value="reviews">
            <Card>
              <CardHeader>
                <CardTitle>받은 후기</CardTitle>
                <CardDescription>멘티들이 남긴 후기입니다.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {myReviews.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      <Star className="w-12 h-12 mx-auto mb-2 opacity-50" />
                      <p>아직 받은 후기가 없습니다.</p>
                    </div>
                  ) : (
                    myReviews.map((review) => (
                      <div key={review.id} className="p-4 rounded-lg border">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={review.reviewer.profileImage} />
                              <AvatarFallback>{review.reviewer.name[0]}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium text-sm">{review.reviewer.name}</p>
                              <p className="text-xs text-muted-foreground">{review.createdAt}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-1">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < Math.floor(review.rating)
                                    ? 'fill-yellow-400 text-yellow-400'
                                    : 'text-gray-200'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{review.content}</p>
                        <div className="flex flex-wrap gap-1">
                          {review.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
