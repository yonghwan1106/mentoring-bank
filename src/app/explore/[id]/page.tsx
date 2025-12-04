'use client';

import { useParams, notFound } from 'next/navigation';
import Link from 'next/link';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  ArrowLeft,
  Clock,
  Star,
  MapPin,
  Coins,
  Users,
  Video,
  CheckCircle,
  Calendar,
  Heart,
  Share2,
  MessageCircle,
  Award,
  BookOpen,
} from 'lucide-react';
import { MENTORINGS, REVIEWS, CURRENT_USER_CREDITS } from '@/lib/mock-data';
import { SKILL_CATEGORIES } from '@/lib/types';

export default function MentoringDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const [isApplyDialogOpen, setIsApplyDialogOpen] = useState(false);
  const [isApplied, setIsApplied] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);

  const mentoring = MENTORINGS.find((m) => m.id === id);

  if (!mentoring) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">멘토링을 찾을 수 없습니다</h1>
          <Button asChild>
            <Link href="/explore">목록으로 돌아가기</Link>
          </Button>
        </div>
      </div>
    );
  }

  const categoryInfo = SKILL_CATEGORIES[mentoring.category];
  const mentorReviews = REVIEWS.filter((r) => r.mentoring.mentorId === mentoring.mentorId).slice(0, 5);
  const relatedMentorings = MENTORINGS.filter(
    (m) => m.category === mentoring.category && m.id !== mentoring.id
  ).slice(0, 3);

  const handleApply = () => {
    setIsApplied(true);
    setIsApplyDialogOpen(false);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="border-b bg-muted/30 py-6">
        <div className="container mx-auto px-4">
          <Link
            href="/explore"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            목록으로 돌아가기
          </Link>

          <div className="flex flex-col lg:flex-row gap-6">
            {/* Main Info */}
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-3">
                <Badge variant={mentoring.mentor.generation === 'senior' ? 'default' : 'secondary'}>
                  {categoryInfo.icon} {categoryInfo.name}
                </Badge>
                {mentoring.isOnline && (
                  <Badge variant="outline">
                    <Video className="w-3 h-3 mr-1" />
                    온라인 가능
                  </Badge>
                )}
                {mentoring.status === 'full' && (
                  <Badge variant="destructive">마감</Badge>
                )}
              </div>

              <h1 className="text-2xl lg:text-3xl font-bold mb-4">{mentoring.title}</h1>

              {/* Meta Info */}
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                <div className="flex items-center gap-1.5">
                  <MapPin className="h-4 w-4" />
                  <span>{mentoring.district}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4" />
                  <span>{mentoring.duration}분 / 회</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span>{mentoring.rating} ({mentoring.reviewCount}개 후기)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Users className="h-4 w-4" />
                  <span>{mentoring.currentParticipants}/{mentoring.maxParticipants}명</span>
                </div>
              </div>

              {/* Mentor Card */}
              <Link href={`/profile/${mentoring.mentorId}`}>
                <Card className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-14 w-14 border-2">
                        <AvatarImage src={mentoring.mentor.profileImage} />
                        <AvatarFallback className="text-lg">{mentoring.mentor.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-lg">{mentoring.mentor.name}</span>
                          {mentoring.mentor.verified && (
                            <CheckCircle className="w-4 h-4 text-primary" />
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {mentoring.mentor.generation === 'senior' ? '시니어' : '청년'} · {mentoring.mentor.age}세 · {mentoring.mentor.district}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="flex items-center gap-1">
                            <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm">{mentoring.mentor.rating}</span>
                          </div>
                          <span className="text-muted-foreground">·</span>
                          <span className="text-sm text-muted-foreground">
                            멘토링 {mentoring.mentor.mentoringCount}회
                          </span>
                        </div>
                      </div>
                      <ArrowLeft className="w-5 h-5 rotate-180 text-muted-foreground" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </div>

            {/* Apply Card */}
            <div className="lg:w-80">
              <Card className="sticky top-20">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-muted-foreground">크레딧</span>
                    <div className="flex items-center gap-2 text-2xl font-bold text-primary">
                      <Coins className="w-6 h-6" />
                      {mentoring.creditCost}
                    </div>
                  </div>

                  <div className="space-y-3 mb-6 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">보유 크레딧</span>
                      <span className="font-medium">{CURRENT_USER_CREDITS.balance} 크레딧</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">진행 방식</span>
                      <span className="font-medium">{mentoring.isOnline ? '온라인/오프라인' : '오프라인'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">모집 현황</span>
                      <span className="font-medium">{mentoring.currentParticipants}/{mentoring.maxParticipants}명</span>
                    </div>
                  </div>

                  {isApplied ? (
                    <Button className="w-full" disabled>
                      <CheckCircle className="w-4 h-4 mr-2" />
                      신청 완료
                    </Button>
                  ) : mentoring.status === 'full' ? (
                    <Button className="w-full" disabled>
                      마감되었습니다
                    </Button>
                  ) : (
                    <Dialog open={isApplyDialogOpen} onOpenChange={setIsApplyDialogOpen}>
                      <DialogTrigger asChild>
                        <Button className="w-full">멘토링 신청하기</Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>멘토링 신청</DialogTitle>
                          <DialogDescription>
                            이 멘토링에 {mentoring.creditCost} 크레딧을 사용하여 신청하시겠습니까?
                          </DialogDescription>
                        </DialogHeader>
                        <div className="py-4">
                          <div className="p-4 bg-muted rounded-lg space-y-2">
                            <div className="flex justify-between">
                              <span>현재 보유 크레딧</span>
                              <span className="font-medium">{CURRENT_USER_CREDITS.balance}</span>
                            </div>
                            <div className="flex justify-between text-primary">
                              <span>차감 크레딧</span>
                              <span className="font-medium">-{mentoring.creditCost}</span>
                            </div>
                            <hr />
                            <div className="flex justify-between font-semibold">
                              <span>신청 후 잔액</span>
                              <span>{CURRENT_USER_CREDITS.balance - mentoring.creditCost}</span>
                            </div>
                          </div>
                        </div>
                        <DialogFooter>
                          <Button variant="outline" onClick={() => setIsApplyDialogOpen(false)}>
                            취소
                          </Button>
                          <Button onClick={handleApply}>신청하기</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  )}

                  <div className="flex gap-2 mt-3">
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={() => setIsFavorited(!isFavorited)}
                    >
                      <Heart className={`w-4 h-4 mr-1 ${isFavorited ? 'fill-red-500 text-red-500' : ''}`} />
                      찜하기
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <Share2 className="w-4 h-4 mr-1" />
                      공유
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Tabs defaultValue="intro" className="space-y-6">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="intro">소개</TabsTrigger>
                  <TabsTrigger value="schedule">일정</TabsTrigger>
                  <TabsTrigger value="reviews">후기 ({mentorReviews.length})</TabsTrigger>
                </TabsList>

                {/* Intro Tab */}
                <TabsContent value="intro">
                  <Card>
                    <CardHeader>
                      <CardTitle>멘토링 소개</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="whitespace-pre-wrap text-muted-foreground leading-relaxed">
                        {mentoring.description}
                      </p>

                      <div className="mt-6 pt-6 border-t">
                        <h4 className="font-semibold mb-3">이런 분께 추천해요</h4>
                        <ul className="space-y-2 text-muted-foreground">
                          <li className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-primary" />
                            {categoryInfo.name}에 관심 있는 분
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-primary" />
                            기초부터 차근차근 배우고 싶은 분
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-primary" />
                            {mentoring.mentor.generation === 'senior' ? '시니어의 경험과 지혜' : '청년의 최신 트렌드'}를 배우고 싶은 분
                          </li>
                        </ul>
                      </div>

                      <div className="mt-6 pt-6 border-t">
                        <h4 className="font-semibold mb-3">진행 방식</h4>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="p-4 bg-muted rounded-lg">
                            <Clock className="w-5 h-5 text-primary mb-2" />
                            <p className="font-medium">소요 시간</p>
                            <p className="text-sm text-muted-foreground">회당 {mentoring.duration}분</p>
                          </div>
                          <div className="p-4 bg-muted rounded-lg">
                            <Users className="w-5 h-5 text-primary mb-2" />
                            <p className="font-medium">인원</p>
                            <p className="text-sm text-muted-foreground">최대 {mentoring.maxParticipants}명</p>
                          </div>
                          <div className="p-4 bg-muted rounded-lg">
                            <MapPin className="w-5 h-5 text-primary mb-2" />
                            <p className="font-medium">장소</p>
                            <p className="text-sm text-muted-foreground">{mentoring.district}</p>
                          </div>
                          <div className="p-4 bg-muted rounded-lg">
                            <Video className="w-5 h-5 text-primary mb-2" />
                            <p className="font-medium">온라인</p>
                            <p className="text-sm text-muted-foreground">{mentoring.isOnline ? '가능' : '불가'}</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Schedule Tab */}
                <TabsContent value="schedule">
                  <Card>
                    <CardHeader>
                      <CardTitle>가능한 일정</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {mentoring.schedule.map((slot, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                                <Calendar className="w-5 h-5 text-primary" />
                              </div>
                              <div>
                                <p className="font-medium">{slot.date}</p>
                                <p className="text-sm text-muted-foreground">{slot.startTime} - {slot.endTime}</p>
                              </div>
                            </div>
                            <Badge variant={slot.available ? 'outline' : 'secondary'}>
                              {slot.available ? '예약 가능' : '마감'}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Reviews Tab */}
                <TabsContent value="reviews">
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle>수강 후기</CardTitle>
                        <div className="flex items-center gap-2">
                          <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                          <span className="text-xl font-bold">{mentoring.rating}</span>
                          <span className="text-muted-foreground">({mentoring.reviewCount}개)</span>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      {mentorReviews.length === 0 ? (
                        <div className="text-center py-8 text-muted-foreground">
                          <MessageCircle className="w-12 h-12 mx-auto mb-2 opacity-50" />
                          <p>아직 후기가 없습니다.</p>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {mentorReviews.map((review) => (
                            <div key={review.id} className="p-4 border rounded-lg">
                              <div className="flex items-start justify-between mb-3">
                                <div className="flex items-center gap-3">
                                  <Avatar className="h-10 w-10">
                                    <AvatarImage src={review.reviewer.profileImage} />
                                    <AvatarFallback>{review.reviewer.name[0]}</AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <p className="font-medium">{review.reviewer.name}</p>
                                    <p className="text-sm text-muted-foreground">{review.createdAt}</p>
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
                              <p className="text-muted-foreground mb-3">{review.content}</p>
                              <div className="flex flex-wrap gap-1">
                                {review.tags.map((tag) => (
                                  <Badge key={tag} variant="secondary" className="text-xs">
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Mentor Badges */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Award className="w-5 h-5 text-primary" />
                    멘토 배지
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {mentoring.mentor.badges.map((badge) => (
                      <div
                        key={badge.id}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-muted text-sm"
                      >
                        <span>{badge.icon}</span>
                        <span>{badge.name}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Related Mentorings */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-primary" />
                    비슷한 멘토링
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {relatedMentorings.map((m) => (
                      <Link key={m.id} href={`/explore/${m.id}`}>
                        <div className="p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                          <p className="font-medium text-sm line-clamp-1">{m.title}</p>
                          <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                            <span>{m.mentor.name}</span>
                            <span>·</span>
                            <div className="flex items-center gap-0.5">
                              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                              {m.rating}
                            </div>
                            <span>·</span>
                            <span>{m.creditCost} 크레딧</span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
