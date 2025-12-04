'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Search,
  Clock,
  Star,
  MapPin,
  Coins,
  Filter,
  Users,
  Video,
  CheckCircle,
} from 'lucide-react';
import { MENTORINGS } from '@/lib/mock-data';
import { SKILL_CATEGORIES, DISTRICTS } from '@/lib/types';
import { SkillCategory } from '@/lib/types';

export default function ExplorePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [districtFilter, setDistrictFilter] = useState<string>('전체');
  const [generationFilter, setGenerationFilter] = useState<string>('all');
  const [modeFilter, setModeFilter] = useState<string>('all');

  const filteredMentorings = useMemo(() => {
    return MENTORINGS.filter((mentoring) => {
      // 검색어 필터
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = mentoring.title.toLowerCase().includes(query);
        const matchesMentor = mentoring.mentor.name.toLowerCase().includes(query);
        const matchesCategory = SKILL_CATEGORIES[mentoring.category].name.toLowerCase().includes(query);
        if (!matchesTitle && !matchesMentor && !matchesCategory) return false;
      }

      // 카테고리 필터
      if (categoryFilter !== 'all' && mentoring.category !== categoryFilter) {
        return false;
      }

      // 지역 필터
      if (districtFilter !== '전체' && mentoring.district !== districtFilter) {
        return false;
      }

      // 세대 필터
      if (generationFilter !== 'all') {
        if (generationFilter === 'senior' && mentoring.mentor.generation !== 'senior') return false;
        if (generationFilter === 'youth' && mentoring.mentor.generation !== 'youth') return false;
      }

      // 온라인/오프라인 필터
      if (modeFilter !== 'all') {
        if (modeFilter === 'online' && !mentoring.isOnline) return false;
        if (modeFilter === 'offline' && mentoring.isOnline) return false;
      }

      return true;
    });
  }, [searchQuery, categoryFilter, districtFilter, generationFilter, modeFilter]);

  const seniorToYouthCategories = Object.entries(SKILL_CATEGORIES)
    .filter(([, v]) => v.direction === 'senior-to-youth');
  const youthToSeniorCategories = Object.entries(SKILL_CATEGORIES)
    .filter(([, v]) => v.direction === 'youth-to-senior');

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="border-b bg-muted/30 py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-2">멘토링 찾기</h1>
          <p className="text-muted-foreground">
            배우고 싶은 재능을 찾아보세요. 총 <strong className="text-primary">{MENTORINGS.length}개</strong>의 멘토링이 있습니다.
          </p>
        </div>
      </section>

      {/* Search & Filters */}
      <section className="border-b py-4 sticky top-16 bg-background z-40">
        <div className="container mx-auto px-4">
          {/* Search Bar */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="멘토링 제목, 멘토 이름, 카테고리로 검색..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-3">
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="카테고리" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">전체 카테고리</SelectItem>
                <SelectItem value="divider-1" disabled>
                  ── 시니어 → 청년 ──
                </SelectItem>
                {seniorToYouthCategories.map(([key, value]) => (
                  <SelectItem key={key} value={key}>
                    {value.icon} {value.name}
                  </SelectItem>
                ))}
                <SelectItem value="divider-2" disabled>
                  ── 청년 → 시니어 ──
                </SelectItem>
                {youthToSeniorCategories.map(([key, value]) => (
                  <SelectItem key={key} value={key}>
                    {value.icon} {value.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={districtFilter} onValueChange={setDistrictFilter}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="지역" />
              </SelectTrigger>
              <SelectContent>
                {DISTRICTS.map((district) => (
                  <SelectItem key={district} value={district}>
                    {district}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={generationFilter} onValueChange={setGenerationFilter}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="멘토 세대" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">전체</SelectItem>
                <SelectItem value="senior">시니어 멘토</SelectItem>
                <SelectItem value="youth">청년 멘토</SelectItem>
              </SelectContent>
            </Select>

            <Select value={modeFilter} onValueChange={setModeFilter}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="진행 방식" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">전체</SelectItem>
                <SelectItem value="online">온라인</SelectItem>
                <SelectItem value="offline">오프라인</SelectItem>
              </SelectContent>
            </Select>

            {(categoryFilter !== 'all' || districtFilter !== '전체' || generationFilter !== 'all' || modeFilter !== 'all' || searchQuery) && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setSearchQuery('');
                  setCategoryFilter('all');
                  setDistrictFilter('전체');
                  setGenerationFilter('all');
                  setModeFilter('all');
                }}
              >
                필터 초기화
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm text-muted-foreground">
              총 <strong>{filteredMentorings.length}개</strong>의 멘토링
            </p>
          </div>

          {filteredMentorings.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">검색 결과가 없습니다</h3>
              <p className="text-muted-foreground mb-4">
                다른 검색어나 필터를 시도해보세요.
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery('');
                  setCategoryFilter('all');
                  setDistrictFilter('전체');
                  setGenerationFilter('all');
                  setModeFilter('all');
                }}
              >
                필터 초기화
              </Button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMentorings.map((mentoring) => {
                const categoryInfo = SKILL_CATEGORIES[mentoring.category];
                return (
                  <Link key={mentoring.id} href={`/explore/${mentoring.id}`}>
                    <Card className="h-full group hover:shadow-lg transition-all hover:border-primary/50 cursor-pointer">
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between gap-2">
                          <Badge variant={mentoring.mentor.generation === 'senior' ? 'default' : 'secondary'}>
                            {categoryInfo.icon} {categoryInfo.name}
                          </Badge>
                          <div className="flex gap-1">
                            {mentoring.isOnline && (
                              <Badge variant="outline" className="text-xs">
                                <Video className="w-3 h-3 mr-1" />
                                온라인
                              </Badge>
                            )}
                          </div>
                        </div>
                        <CardTitle className="text-lg mt-2 group-hover:text-primary transition-colors line-clamp-2">
                          {mentoring.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        {/* Mentor Info */}
                        <div className="flex items-center gap-3 mb-4">
                          <Avatar className="h-10 w-10 border">
                            <AvatarImage src={mentoring.mentor.profileImage} />
                            <AvatarFallback>{mentoring.mentor.name[0]}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-1">
                              <span className="font-medium text-sm truncate">{mentoring.mentor.name}</span>
                              {mentoring.mentor.verified && (
                                <CheckCircle className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                              )}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {mentoring.mentor.generation === 'senior' ? '시니어' : '청년'} · {mentoring.mentor.age}세
                            </div>
                          </div>
                        </div>

                        {/* Meta Info */}
                        <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground mb-3">
                          <div className="flex items-center gap-1.5">
                            <MapPin className="h-3.5 w-3.5" />
                            <span>{mentoring.district}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Clock className="h-3.5 w-3.5" />
                            <span>{mentoring.duration}분</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                            <span>{mentoring.rating} ({mentoring.reviewCount})</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Users className="h-3.5 w-3.5" />
                            <span>{mentoring.currentParticipants}/{mentoring.maxParticipants}명</span>
                          </div>
                        </div>

                        {/* Credit Cost */}
                        <div className="flex items-center justify-between pt-3 border-t">
                          <div className="flex items-center gap-1.5 text-primary font-semibold">
                            <Coins className="h-4 w-4" />
                            <span>{mentoring.creditCost} 크레딧</span>
                          </div>
                          {mentoring.status === 'full' ? (
                            <Badge variant="secondary">마감</Badge>
                          ) : (
                            <Badge variant="outline" className="text-primary border-primary">
                              신청 가능
                            </Badge>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
