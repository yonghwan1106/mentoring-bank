'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  Coins,
  Clock,
  Users,
  MapPin,
  Video,
  Calendar,
  Lightbulb,
  AlertCircle,
} from 'lucide-react';
import { SKILL_CATEGORIES, DISTRICTS } from '@/lib/types';
import { CURRENT_USER } from '@/lib/mock-data';

type Step = 1 | 2 | 3 | 4;

interface FormData {
  category: string;
  title: string;
  description: string;
  district: string;
  duration: string;
  maxParticipants: string;
  creditCost: string;
  isOnline: boolean;
  schedules: { day: string; time: string }[];
}

export default function RegisterTalentPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    category: '',
    title: '',
    description: '',
    district: CURRENT_USER.district,
    duration: '60',
    maxParticipants: '3',
    creditCost: '2',
    isOnline: false,
    schedules: [{ day: '', time: '' }],
  });

  const seniorToYouthCategories = Object.entries(SKILL_CATEGORIES)
    .filter(([, v]) => v.direction === 'senior-to-youth');
  const youthToSeniorCategories = Object.entries(SKILL_CATEGORIES)
    .filter(([, v]) => v.direction === 'youth-to-senior');

  const updateFormData = (field: keyof FormData, value: string | boolean | { day: string; time: string }[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const addSchedule = () => {
    setFormData((prev) => ({
      ...prev,
      schedules: [...prev.schedules, { day: '', time: '' }],
    }));
  };

  const removeSchedule = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      schedules: prev.schedules.filter((_, i) => i !== index),
    }));
  };

  const updateSchedule = (index: number, field: 'day' | 'time', value: string) => {
    setFormData((prev) => ({
      ...prev,
      schedules: prev.schedules.map((s, i) => (i === index ? { ...s, [field]: value } : s)),
    }));
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
  };

  const progressValue = (step / 4) * 100;

  const days = ['월요일', '화요일', '수요일', '목요일', '금요일', '토요일', '일요일'];
  const times = [
    '09:00', '10:00', '11:00', '12:00', '13:00', '14:00',
    '15:00', '16:00', '17:00', '18:00', '19:00', '20:00',
  ];

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="max-w-md w-full text-center">
          <CardContent className="pt-8 pb-8">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-2xl font-bold mb-2">등록 완료!</h2>
            <p className="text-muted-foreground mb-6">
              멘토링이 성공적으로 등록되었습니다.<br />
              멘티들의 신청을 기다려보세요!
            </p>
            <div className="p-4 bg-muted rounded-lg mb-6 text-left">
              <h3 className="font-semibold mb-2">{formData.title}</h3>
              <div className="text-sm text-muted-foreground space-y-1">
                <p>카테고리: {formData.category && SKILL_CATEGORIES[formData.category as keyof typeof SKILL_CATEGORIES]?.name}</p>
                <p>지역: {formData.district}</p>
                <p>크레딧: {formData.creditCost}크레딧</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="flex-1" asChild>
                <Link href="/dashboard">대시보드로 이동</Link>
              </Button>
              <Button className="flex-1" asChild>
                <Link href="/explore">멘토링 보기</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="border-b bg-muted/30 py-6">
        <div className="container mx-auto px-4">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            대시보드로 돌아가기
          </Link>

          <h1 className="text-2xl lg:text-3xl font-bold mb-2">재능 등록하기</h1>
          <p className="text-muted-foreground">
            나만의 재능을 이웃과 나누고 크레딧을 얻어보세요.
          </p>

          {/* Progress */}
          <div className="mt-6">
            <div className="flex justify-between text-sm mb-2">
              <span>단계 {step}/4</span>
              <span>{progressValue.toFixed(0)}% 완료</span>
            </div>
            <Progress value={progressValue} />
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="py-8">
        <div className="container mx-auto px-4 max-w-2xl">
          {/* Step 1: Category */}
          {step === 1 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm">
                    1
                  </span>
                  카테고리 선택
                </CardTitle>
                <CardDescription>
                  나누고 싶은 재능의 카테고리를 선택해주세요.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {CURRENT_USER.generation === 'senior' ? (
                  <>
                    <div>
                      <h3 className="font-medium mb-3 text-sm text-muted-foreground">
                        시니어가 청년에게 가르칠 수 있는 재능
                      </h3>
                      <div className="grid grid-cols-2 gap-2">
                        {seniorToYouthCategories.map(([key, value]) => (
                          <button
                            key={key}
                            onClick={() => updateFormData('category', key)}
                            className={`p-4 rounded-lg border text-left transition-all ${
                              formData.category === key
                                ? 'border-primary bg-primary/5'
                                : 'hover:border-primary/50'
                            }`}
                          >
                            <span className="text-2xl">{value.icon}</span>
                            <p className="font-medium mt-1">{value.name}</p>
                          </button>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <h3 className="font-medium mb-3 text-sm text-muted-foreground">
                        청년이 시니어에게 가르칠 수 있는 재능
                      </h3>
                      <div className="grid grid-cols-2 gap-2">
                        {youthToSeniorCategories.map(([key, value]) => (
                          <button
                            key={key}
                            onClick={() => updateFormData('category', key)}
                            className={`p-4 rounded-lg border text-left transition-all ${
                              formData.category === key
                                ? 'border-primary bg-primary/5'
                                : 'hover:border-primary/50'
                            }`}
                          >
                            <span className="text-2xl">{value.icon}</span>
                            <p className="font-medium mt-1">{value.name}</p>
                          </button>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                <div className="flex justify-end">
                  <Button
                    onClick={() => setStep(2)}
                    disabled={!formData.category}
                  >
                    다음
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 2: Basic Info */}
          {step === 2 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm">
                    2
                  </span>
                  기본 정보
                </CardTitle>
                <CardDescription>
                  멘토링의 제목과 설명을 입력해주세요.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">멘토링 제목 *</Label>
                  <Input
                    id="title"
                    placeholder="예: 30년 요리 경험으로 알려드리는 전통 한식의 맛"
                    value={formData.title}
                    onChange={(e) => updateFormData('title', e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">
                    매력적인 제목으로 멘티의 관심을 끌어보세요!
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">상세 설명 *</Label>
                  <Textarea
                    id="description"
                    placeholder="어떤 내용을 가르쳐주실 건가요? 멘티들에게 기대할 수 있는 것들을 알려주세요."
                    className="min-h-[150px]"
                    value={formData.description}
                    onChange={(e) => updateFormData('description', e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">
                    {formData.description.length}/500자
                  </p>
                </div>

                <div className="p-4 bg-muted/50 rounded-lg">
                  <div className="flex items-start gap-2">
                    <Lightbulb className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium text-sm">좋은 설명 작성 팁</p>
                      <ul className="text-sm text-muted-foreground mt-1 space-y-1">
                        <li>• 어떤 경험/지식을 가지고 계신지 소개해주세요</li>
                        <li>• 멘토링 후 멘티가 얻을 수 있는 것을 명확히 해주세요</li>
                        <li>• 필요한 준비물이 있다면 미리 알려주세요</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between">
                  <Button variant="outline" onClick={() => setStep(1)}>
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    이전
                  </Button>
                  <Button
                    onClick={() => setStep(3)}
                    disabled={!formData.title || !formData.description}
                  >
                    다음
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 3: Details */}
          {step === 3 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm">
                    3
                  </span>
                  세부 설정
                </CardTitle>
                <CardDescription>
                  멘토링 진행 방식을 설정해주세요.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>지역</Label>
                    <Select
                      value={formData.district}
                      onValueChange={(v) => updateFormData('district', v)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {DISTRICTS.filter(d => d !== '전체').map((district) => (
                          <SelectItem key={district} value={district}>
                            {district}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>소요 시간</Label>
                    <Select
                      value={formData.duration}
                      onValueChange={(v) => updateFormData('duration', v)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="30">30분</SelectItem>
                        <SelectItem value="60">60분</SelectItem>
                        <SelectItem value="90">90분</SelectItem>
                        <SelectItem value="120">120분</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>최대 인원</Label>
                    <Select
                      value={formData.maxParticipants}
                      onValueChange={(v) => updateFormData('maxParticipants', v)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1명 (1:1)</SelectItem>
                        <SelectItem value="2">2명</SelectItem>
                        <SelectItem value="3">3명</SelectItem>
                        <SelectItem value="5">5명</SelectItem>
                        <SelectItem value="10">10명</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>크레딧 (1회 기준)</Label>
                    <Select
                      value={formData.creditCost}
                      onValueChange={(v) => updateFormData('creditCost', v)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 크레딧</SelectItem>
                        <SelectItem value="2">2 크레딧</SelectItem>
                        <SelectItem value="3">3 크레딧</SelectItem>
                        <SelectItem value="4">4 크레딧</SelectItem>
                        <SelectItem value="5">5 크레딧</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="isOnline"
                    checked={formData.isOnline}
                    onCheckedChange={(checked) => updateFormData('isOnline', checked as boolean)}
                  />
                  <Label htmlFor="isOnline" className="cursor-pointer">
                    온라인 진행 가능 (화상회의 등)
                  </Label>
                </div>

                <div className="flex justify-between">
                  <Button variant="outline" onClick={() => setStep(2)}>
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    이전
                  </Button>
                  <Button onClick={() => setStep(4)}>
                    다음
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 4: Schedule & Confirm */}
          {step === 4 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm">
                    4
                  </span>
                  일정 및 확인
                </CardTitle>
                <CardDescription>
                  가능한 일정을 추가하고 최종 확인해주세요.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Schedule */}
                <div className="space-y-3">
                  <Label>가능한 일정</Label>
                  {formData.schedules.map((schedule, index) => (
                    <div key={index} className="flex gap-2">
                      <Select
                        value={schedule.day}
                        onValueChange={(v) => updateSchedule(index, 'day', v)}
                      >
                        <SelectTrigger className="flex-1">
                          <SelectValue placeholder="요일 선택" />
                        </SelectTrigger>
                        <SelectContent>
                          {days.map((day) => (
                            <SelectItem key={day} value={day}>{day}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Select
                        value={schedule.time}
                        onValueChange={(v) => updateSchedule(index, 'time', v)}
                      >
                        <SelectTrigger className="flex-1">
                          <SelectValue placeholder="시간 선택" />
                        </SelectTrigger>
                        <SelectContent>
                          {times.map((time) => (
                            <SelectItem key={time} value={time}>{time}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {formData.schedules.length > 1 && (
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => removeSchedule(index)}
                        >
                          ✕
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button variant="outline" onClick={addSchedule} className="w-full">
                    + 일정 추가
                  </Button>
                </div>

                {/* Summary */}
                <div className="p-4 bg-muted rounded-lg space-y-4">
                  <h3 className="font-semibold">등록 정보 요약</h3>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <p className="text-muted-foreground">카테고리</p>
                      <p className="font-medium">
                        {formData.category && SKILL_CATEGORIES[formData.category as keyof typeof SKILL_CATEGORIES]?.icon}{' '}
                        {formData.category && SKILL_CATEGORIES[formData.category as keyof typeof SKILL_CATEGORIES]?.name}
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">지역</p>
                      <p className="font-medium">{formData.district}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">소요 시간</p>
                      <p className="font-medium">{formData.duration}분</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">최대 인원</p>
                      <p className="font-medium">{formData.maxParticipants}명</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">크레딧</p>
                      <p className="font-medium">{formData.creditCost} 크레딧</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">온라인</p>
                      <p className="font-medium">{formData.isOnline ? '가능' : '오프라인만'}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-sm">제목</p>
                    <p className="font-medium">{formData.title}</p>
                  </div>
                </div>

                <div className="p-4 border border-yellow-200 bg-yellow-50 rounded-lg">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-sm text-yellow-800">등록 전 확인사항</p>
                      <ul className="text-sm text-yellow-700 mt-1 space-y-1">
                        <li>• 등록된 멘토링은 수정할 수 있습니다</li>
                        <li>• 멘티 신청 시 알림을 받게 됩니다</li>
                        <li>• 멘토링 완료 시 크레딧이 지급됩니다</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between">
                  <Button variant="outline" onClick={() => setStep(3)}>
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    이전
                  </Button>
                  <Button onClick={handleSubmit}>
                    <CheckCircle className="w-4 h-4 mr-2" />
                    등록하기
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </section>
    </div>
  );
}
