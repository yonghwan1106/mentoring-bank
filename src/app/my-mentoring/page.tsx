'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
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
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Star,
  MapPin,
  Clock,
  Coins,
  Users,
  Video,
  Calendar,
  CheckCircle,
  XCircle,
  MessageCircle,
  GraduationCap,
  BookOpen,
  Plus,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  AlertCircle,
} from 'lucide-react';
import { MENTORINGS, CURRENT_USER, MENTORS } from '@/lib/mock-data';
import { SKILL_CATEGORIES } from '@/lib/types';

// 내가 등록한 멘토링 (멘토로서) - 목업으로 일부 선택
const myMentorings = MENTORINGS.slice(0, 3);

// 내가 신청한 멘토링 (멘티로서) - 목업으로 일부 선택
const appliedMentorings = MENTORINGS.slice(3, 8);

// 신청 받은 목록 (목업)
const pendingApplications = [
  {
    id: 'app1',
    mentoring: MENTORINGS[0],
    applicant: MENTORS[5],
    message: '안녕하세요! 요리에 관심이 많은 청년입니다. 기본기부터 배우고 싶습니다.',
    appliedAt: '2024-01-15',
    status: 'pending' as const,
  },
  {
    id: 'app2',
    mentoring: MENTORINGS[0],
    applicant: MENTORS[10],
    message: '어머니와 함께 요리하던 추억이 있어서 신청하게 되었습니다.',
    appliedAt: '2024-01-14',
    status: 'pending' as const,
  },
];

type ApplicationStatus = 'pending' | 'accepted' | 'rejected';

export default function MyMentoringPage() {
  const [filter, setFilter] = useState<string>('all');
  const [selectedApplication, setSelectedApplication] = useState<typeof pendingApplications[0] | null>(null);
  const [applicationDialogOpen, setApplicationDialogOpen] = useState(false);

  // 필터링된 내 멘토링
  const filteredMyMentorings = useMemo(() => {
    if (filter === 'all') return myMentorings;
    return myMentorings.filter((m) => m.status === filter);
  }, [filter]);

  const handleAcceptApplication = () => {
    // 실제로는 API 호출
    setApplicationDialogOpen(false);
    setSelectedApplication(null);
  };

  const handleRejectApplication = () => {
    // 실제로는 API 호출
    setApplicationDialogOpen(false);
    setSelectedApplication(null);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="border-b bg-muted/30 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">내 멘토링</h1>
              <p className="text-muted-foreground">
                멘토링 관리 및 신청 현황을 확인하세요.
              </p>
            </div>
            <Button asChild>
              <Link href="/register-talent">
                <Plus className="w-4 h-4 mr-2" />
                새 멘토링 등록
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-6 border-b">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <GraduationCap className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{myMentorings.length}</p>
                    <p className="text-sm text-muted-foreground">등록한 멘토링</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{appliedMentorings.length}</p>
                    <p className="text-sm text-muted-foreground">신청한 멘토링</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center">
                    <AlertCircle className="w-5 h-5 text-yellow-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{pendingApplications.length}</p>
                    <p className="text-sm text-muted-foreground">대기 중 신청</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{CURRENT_USER.mentoringCount}</p>
                    <p className="text-sm text-muted-foreground">완료한 멘토링</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="my-mentorings" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="my-mentorings">
                내가 등록한 멘토링
                <Badge variant="secondary" className="ml-2">{myMentorings.length}</Badge>
              </TabsTrigger>
              <TabsTrigger value="applied">
                내가 신청한 멘토링
                <Badge variant="secondary" className="ml-2">{appliedMentorings.length}</Badge>
              </TabsTrigger>
              <TabsTrigger value="applications">
                받은 신청
                {pendingApplications.length > 0 && (
                  <Badge variant="destructive" className="ml-2">{pendingApplications.length}</Badge>
                )}
              </TabsTrigger>
            </TabsList>

            {/* 내가 등록한 멘토링 */}
            <TabsContent value="my-mentorings">
              <div className="flex items-center justify-between mb-4">
                <Select value={filter} onValueChange={setFilter}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="상태 필터" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">전체</SelectItem>
                    <SelectItem value="active">진행중</SelectItem>
                    <SelectItem value="full">마감</SelectItem>
                    <SelectItem value="completed">완료</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {filteredMyMentorings.length === 0 ? (
                <Card>
                  <CardContent className="text-center py-12">
                    <GraduationCap className="w-12 h-12 mx-auto mb-4 text-muted-foreground/50" />
                    <h3 className="text-lg font-semibold mb-2">등록된 멘토링이 없습니다</h3>
                    <p className="text-muted-foreground mb-4">
                      재능을 등록하고 이웃과 나눠보세요!
                    </p>
                    <Button asChild>
                      <Link href="/register-talent">재능 등록하기</Link>
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-4">
                  {filteredMyMentorings.map((mentoring) => {
                    const categoryInfo = SKILL_CATEGORIES[mentoring.category];
                    return (
                      <Card key={mentoring.id} className="hover:shadow-md transition-shadow">
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <Badge variant="default">
                                  {categoryInfo.icon} {categoryInfo.name}
                                </Badge>
                                {mentoring.isOnline && (
                                  <Badge variant="outline">
                                    <Video className="w-3 h-3 mr-1" />
                                    온라인
                                  </Badge>
                                )}
                                <Badge
                                  variant={
                                    mentoring.status === 'active' ? 'default' :
                                    mentoring.status === 'full' ? 'secondary' :
                                    'outline'
                                  }
                                  className={
                                    mentoring.status === 'active' ? 'bg-green-500' : ''
                                  }
                                >
                                  {mentoring.status === 'active' ? '진행중' :
                                   mentoring.status === 'full' ? '마감' : '완료'}
                                </Badge>
                              </div>
                              <Link href={`/explore/${mentoring.id}`}>
                                <h3 className="font-semibold text-lg mb-2 hover:text-primary transition-colors">
                                  {mentoring.title}
                                </h3>
                              </Link>
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
                                  {mentoring.rating} ({mentoring.reviewCount})
                                </div>
                                <div className="flex items-center gap-1">
                                  <Users className="w-4 h-4" />
                                  {mentoring.currentParticipants}/{mentoring.maxParticipants}명
                                </div>
                                <div className="flex items-center gap-1">
                                  <Coins className="w-4 h-4" />
                                  {mentoring.creditCost} 크레딧
                                </div>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm" asChild>
                                <Link href={`/explore/${mentoring.id}`}>
                                  <Eye className="w-4 h-4 mr-1" />
                                  보기
                                </Link>
                              </Button>
                              <Button variant="outline" size="sm">
                                <Edit className="w-4 h-4 mr-1" />
                                수정
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              )}
            </TabsContent>

            {/* 내가 신청한 멘토링 */}
            <TabsContent value="applied">
              {appliedMentorings.length === 0 ? (
                <Card>
                  <CardContent className="text-center py-12">
                    <BookOpen className="w-12 h-12 mx-auto mb-4 text-muted-foreground/50" />
                    <h3 className="text-lg font-semibold mb-2">신청한 멘토링이 없습니다</h3>
                    <p className="text-muted-foreground mb-4">
                      관심있는 멘토링에 신청해보세요!
                    </p>
                    <Button asChild>
                      <Link href="/explore">멘토링 찾기</Link>
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-4">
                  {appliedMentorings.map((mentoring, index) => {
                    const categoryInfo = SKILL_CATEGORIES[mentoring.category];
                    const statuses = ['accepted', 'pending', 'pending', 'completed', 'rejected'];
                    const status = statuses[index % statuses.length];
                    return (
                      <Card key={mentoring.id} className="hover:shadow-md transition-shadow">
                        <CardContent className="p-6">
                          <div className="flex items-start gap-4">
                            {/* Mentor Avatar */}
                            <Link href={`/profile/${mentoring.mentorId}`}>
                              <Avatar className="h-12 w-12 border">
                                <AvatarImage src={mentoring.mentor.profileImage} />
                                <AvatarFallback>{mentoring.mentor.name[0]}</AvatarFallback>
                              </Avatar>
                            </Link>

                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <Badge variant="secondary">
                                  {categoryInfo.icon} {categoryInfo.name}
                                </Badge>
                                <Badge
                                  variant={
                                    status === 'accepted' ? 'default' :
                                    status === 'pending' ? 'outline' :
                                    status === 'completed' ? 'secondary' :
                                    'destructive'
                                  }
                                  className={status === 'accepted' ? 'bg-green-500' : ''}
                                >
                                  {status === 'accepted' ? '승인됨' :
                                   status === 'pending' ? '대기중' :
                                   status === 'completed' ? '완료' : '거절됨'}
                                </Badge>
                              </div>
                              <Link href={`/explore/${mentoring.id}`}>
                                <h3 className="font-semibold text-lg mb-1 hover:text-primary transition-colors">
                                  {mentoring.title}
                                </h3>
                              </Link>
                              <p className="text-sm text-muted-foreground mb-2">
                                {mentoring.mentor.name} · {mentoring.mentor.generation === 'senior' ? '시니어' : '청년'}
                              </p>
                              <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                                <div className="flex items-center gap-1">
                                  <Calendar className="w-4 h-4" />
                                  {mentoring.schedule[0]?.date || '일정 미정'}
                                </div>
                                <div className="flex items-center gap-1">
                                  <MapPin className="w-4 h-4" />
                                  {mentoring.district}
                                </div>
                                <div className="flex items-center gap-1">
                                  <Coins className="w-4 h-4" />
                                  {mentoring.creditCost} 크레딧
                                </div>
                              </div>
                            </div>

                            <div className="flex flex-col gap-2">
                              {status === 'accepted' && (
                                <Button size="sm">
                                  <MessageCircle className="w-4 h-4 mr-1" />
                                  대화하기
                                </Button>
                              )}
                              {status === 'completed' && (
                                <Button size="sm" variant="outline">
                                  <Star className="w-4 h-4 mr-1" />
                                  후기 작성
                                </Button>
                              )}
                              {status === 'pending' && (
                                <Button size="sm" variant="outline">
                                  신청 취소
                                </Button>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              )}
            </TabsContent>

            {/* 받은 신청 */}
            <TabsContent value="applications">
              {pendingApplications.length === 0 ? (
                <Card>
                  <CardContent className="text-center py-12">
                    <Users className="w-12 h-12 mx-auto mb-4 text-muted-foreground/50" />
                    <h3 className="text-lg font-semibold mb-2">받은 신청이 없습니다</h3>
                    <p className="text-muted-foreground">
                      멘티들의 신청을 기다려보세요!
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-4">
                  {pendingApplications.map((application) => (
                    <Card key={application.id} className="border-yellow-200 bg-yellow-50/50">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          {/* Applicant Avatar */}
                          <Link href={`/profile/${application.applicant.id}`}>
                            <Avatar className="h-12 w-12 border">
                              <AvatarImage src={application.applicant.profileImage} />
                              <AvatarFallback>{application.applicant.name[0]}</AvatarFallback>
                            </Avatar>
                          </Link>

                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <Link href={`/profile/${application.applicant.id}`} className="font-semibold hover:text-primary">
                                {application.applicant.name}
                              </Link>
                              <Badge variant="outline">
                                {application.applicant.generation === 'senior' ? '시니어' : '청년'}
                              </Badge>
                              <span className="text-sm text-muted-foreground">
                                · {application.appliedAt} 신청
                              </span>
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">
                              <span className="font-medium">신청 멘토링:</span>{' '}
                              <Link href={`/explore/${application.mentoring.id}`} className="hover:text-primary">
                                {application.mentoring.title}
                              </Link>
                            </p>
                            <div className="p-3 bg-white rounded-lg border text-sm">
                              "{application.message}"
                            </div>
                          </div>

                          <div className="flex flex-col gap-2">
                            <Button
                              size="sm"
                              onClick={() => {
                                setSelectedApplication(application);
                                setApplicationDialogOpen(true);
                              }}
                            >
                              <CheckCircle className="w-4 h-4 mr-1" />
                              수락
                            </Button>
                            <Button size="sm" variant="outline">
                              <XCircle className="w-4 h-4 mr-1" />
                              거절
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Application Dialog */}
      <Dialog open={applicationDialogOpen} onOpenChange={setApplicationDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>신청 수락</DialogTitle>
            <DialogDescription>
              {selectedApplication?.applicant.name}님의 신청을 수락하시겠습니까?
            </DialogDescription>
          </DialogHeader>
          {selectedApplication && (
            <div className="py-4">
              <div className="flex items-center gap-3 mb-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={selectedApplication.applicant.profileImage} />
                  <AvatarFallback>{selectedApplication.applicant.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">{selectedApplication.applicant.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {selectedApplication.applicant.generation === 'senior' ? '시니어' : '청년'} · {selectedApplication.applicant.age}세
                  </p>
                </div>
              </div>
              <div className="p-3 bg-muted rounded-lg text-sm">
                <p className="font-medium mb-1">신청 메시지</p>
                <p className="text-muted-foreground">"{selectedApplication.message}"</p>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setApplicationDialogOpen(false)}>
              취소
            </Button>
            <Button onClick={handleAcceptApplication}>
              수락하기
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
