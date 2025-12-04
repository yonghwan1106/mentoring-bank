'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  ArrowLeft,
  Star,
  MapPin,
  Calendar,
  Award,
  Users,
  MessageCircle,
  Heart,
  Share2,
  CheckCircle,
  Clock,
  Coins,
  Video,
  GraduationCap,
  BookOpen,
} from 'lucide-react';
import { MENTORS, MENTORINGS, REVIEWS } from '@/lib/mock-data';
import { SKILL_CATEGORIES } from '@/lib/types';

export default function ProfilePage() {
  const params = useParams();
  const id = params.id as string;
  const [isFollowing, setIsFollowing] = useState(false);

  const mentor = MENTORS.find((m) => m.id === id);

  if (!mentor) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">프로필을 찾을 수 없습니다</h1>
          <Button asChild>
            <Link href="/explore">멘토링 찾기로 돌아가기</Link>
          </Button>
        </div>
      </div>
    );
  }

  const mentorMentorings = MENTORINGS.filter((m) => m.mentorId === mentor.id);
  const mentorReviews = REVIEWS.filter((r) => r.mentoring.mentorId === mentor.id);

  // 활동 통계
  const totalMentees = mentorMentorings.reduce((acc, m) => acc + m.currentParticipants, 0);
  const avgRating = mentor.rating;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="border-b bg-gradient-to-br from-primary/5 to-primary/10 py-8">
        <div className="container mx-auto px-4">
          <Link
            href="/explore"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            뒤로가기
          </Link>

          <div className="flex flex-col md:flex-row gap-6 items-start">
            {/* Avatar & Basic Info */}
            <div className="flex flex-col items-center md:items-start">
              <Avatar className="h-28 w-28 border-4 border-background shadow-lg">
                <AvatarImage src={mentor.profileImage} />
                <AvatarFallback className="text-3xl">{mentor.name[0]}</AvatarFallback>
              </Avatar>
            </div>

            <div className="flex-1 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                <h1 className="text-2xl font-bold">{mentor.name}</h1>
                {mentor.verified && (
                  <CheckCircle className="w-5 h-5 text-primary" />
                )}
              </div>
              <p className="text-muted-foreground mb-3">
                {mentor.generation === 'senior' ? '시니어' : '청년'} · {mentor.age}세 · {mentor.district}
              </p>

              {/* Stats */}
              <div className="flex flex-wrap justify-center md:justify-start gap-4 mb-4">
                <div className="flex items-center gap-1.5">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">{avgRating}</span>
                  <span className="text-muted-foreground text-sm">({mentor.reviewCount})</span>
                </div>
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <GraduationCap className="w-5 h-5" />
                  <span>멘토링 {mentor.mentoringCount}회</span>
                </div>
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <Users className="w-5 h-5" />
                  <span>멘티 {totalMentees}명</span>
                </div>
              </div>

              {/* Skills */}
              <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-4">
                {mentor.skills.map((skill) => (
                  <Badge key={skill.id} variant="secondary">
                    {skill.name}
                  </Badge>
                ))}
              </div>

              {/* Actions */}
              <div className="flex justify-center md:justify-start gap-2">
                <Button
                  variant={isFollowing ? 'secondary' : 'default'}
                  onClick={() => setIsFollowing(!isFollowing)}
                >
                  <Heart className={`w-4 h-4 mr-2 ${isFollowing ? 'fill-current' : ''}`} />
                  {isFollowing ? '팔로잉' : '팔로우'}
                </Button>
                <Button variant="outline">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  메시지
                </Button>
                <Button variant="outline" size="icon">
                  <Share2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <Tabs defaultValue="mentorings" className="space-y-6">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="mentorings">멘토링 ({mentorMentorings.length})</TabsTrigger>
                  <TabsTrigger value="reviews">후기 ({mentorReviews.length})</TabsTrigger>
                  <TabsTrigger value="about">소개</TabsTrigger>
                </TabsList>

                {/* Mentorings Tab */}
                <TabsContent value="mentorings">
                  {mentorMentorings.length === 0 ? (
                    <Card>
                      <CardContent className="text-center py-12">
                        <BookOpen className="w-12 h-12 mx-auto mb-4 text-muted-foreground/50" />
                        <h3 className="text-lg font-semibold mb-2">등록된 멘토링이 없습니다</h3>
                        <p className="text-muted-foreground">
                          아직 등록된 멘토링이 없습니다.
                        </p>
                      </CardContent>
                    </Card>
                  ) : (
                    <div className="space-y-4">
                      {mentorMentorings.map((mentoring) => {
                        const categoryInfo = SKILL_CATEGORIES[mentoring.category];
                        return (
                          <Link key={mentoring.id} href={`/explore/${mentoring.id}`}>
                            <Card className="hover:shadow-md transition-shadow cursor-pointer">
                              <CardContent className="p-6">
                                <div className="flex items-start justify-between gap-4">
                                  <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-2">
                                      <Badge variant={mentor.generation === 'senior' ? 'default' : 'secondary'}>
                                        {categoryInfo.icon} {categoryInfo.name}
                                      </Badge>
                                      {mentoring.isOnline && (
                                        <Badge variant="outline">
                                          <Video className="w-3 h-3 mr-1" />
                                          온라인
                                        </Badge>
                                      )}
                                      {mentoring.status === 'full' && (
                                        <Badge variant="destructive">마감</Badge>
                                      )}
                                    </div>
                                    <h3 className="font-semibold text-lg mb-2">{mentoring.title}</h3>
                                    <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                                      <div className="flex items-center gap-1">
                                        <MapPin className="w-4 h-4" />
                                        {mentoring.district}
                                      </div>
                                      <div className="flex items-center gap-1">
                                        <Clock className="w-4 h-4" />
                                        {mentoring.duration}분
                                      </div>
                                      <div className="flex items-center gap-1">
                                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                        {mentoring.rating}
                                      </div>
                                      <div className="flex items-center gap-1">
                                        <Users className="w-4 h-4" />
                                        {mentoring.currentParticipants}/{mentoring.maxParticipants}
                                      </div>
                                    </div>
                                  </div>
                                  <div className="text-right">
                                    <div className="flex items-center gap-1 text-primary font-semibold">
                                      <Coins className="w-4 h-4" />
                                      {mentoring.creditCost}
                                    </div>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </TabsContent>

                {/* Reviews Tab */}
                <TabsContent value="reviews">
                  {mentorReviews.length === 0 ? (
                    <Card>
                      <CardContent className="text-center py-12">
                        <MessageCircle className="w-12 h-12 mx-auto mb-4 text-muted-foreground/50" />
                        <h3 className="text-lg font-semibold mb-2">아직 후기가 없습니다</h3>
                        <p className="text-muted-foreground">
                          첫 번째 후기를 남겨보세요!
                        </p>
                      </CardContent>
                    </Card>
                  ) : (
                    <div className="space-y-4">
                      {mentorReviews.map((review) => (
                        <Card key={review.id}>
                          <CardContent className="p-6">
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
                            <div className="flex items-center justify-between">
                              <div className="flex flex-wrap gap-1">
                                {review.tags.map((tag) => (
                                  <Badge key={tag} variant="secondary" className="text-xs">
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                              <Link
                                href={`/explore/${review.mentoring.id}`}
                                className="text-sm text-primary hover:underline"
                              >
                                멘토링 보기 →
                              </Link>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </TabsContent>

                {/* About Tab */}
                <TabsContent value="about">
                  <Card>
                    <CardHeader>
                      <CardTitle>자기소개</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground whitespace-pre-wrap leading-relaxed">
                        {mentor.bio}
                      </p>

                      <div className="mt-6 pt-6 border-t">
                        <h4 className="font-semibold mb-4">보유 스킬</h4>
                        <div className="flex flex-wrap gap-2">
                          {mentor.skills.map((skill) => (
                            <Badge key={skill.id} variant="outline" className="px-3 py-1">
                              {skill.name}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="mt-6 pt-6 border-t">
                        <h4 className="font-semibold mb-4">활동 지역</h4>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <MapPin className="w-5 h-5" />
                          <span>{mentor.district}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Badges */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Award className="w-5 h-5 text-primary" />
                    획득 배지
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {mentor.badges.length === 0 ? (
                    <p className="text-muted-foreground text-sm">아직 획득한 배지가 없습니다.</p>
                  ) : (
                    <div className="space-y-3">
                      {mentor.badges.map((badge) => (
                        <div
                          key={badge.id}
                          className="flex items-center gap-3 p-3 rounded-lg bg-muted"
                        >
                          <span className="text-2xl">{badge.icon}</span>
                          <div>
                            <p className="font-medium text-sm">{badge.name}</p>
                            <p className="text-xs text-muted-foreground">{badge.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Stats */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">활동 통계</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">총 멘토링</span>
                      <span className="font-semibold">{mentor.mentoringCount}회</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">평균 평점</span>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-semibold">{avgRating}</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">총 후기</span>
                      <span className="font-semibold">{mentor.reviewCount}개</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">등록 멘토링</span>
                      <span className="font-semibold">{mentorMentorings.length}개</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">가입일</span>
                      <span className="font-semibold">{mentor.joinedAt}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Contact */}
              <Card>
                <CardContent className="pt-6">
                  <Button className="w-full mb-2">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    메시지 보내기
                  </Button>
                  <p className="text-xs text-center text-muted-foreground">
                    궁금한 점이 있으면 언제든 문의하세요
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
