'use client';

import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Search,
  Heart,
  MessageCircle,
  Share2,
  ThumbsUp,
  PenSquare,
  TrendingUp,
  BookOpen,
  Lightbulb,
  Users,
  Star,
} from 'lucide-react';
import { COMMUNITY_POSTS, REVIEWS } from '@/lib/mock-data';
import type { CommunityPost } from '@/lib/types';

const POST_TYPE_INFO: Record<CommunityPost['type'], { label: string; icon: typeof BookOpen; color: string }> = {
  review: { label: '후기', icon: BookOpen, color: 'bg-blue-100 text-blue-700' },
  story: { label: '이야기', icon: Heart, color: 'bg-pink-100 text-pink-700' },
  tip: { label: '팁', icon: Lightbulb, color: 'bg-yellow-100 text-yellow-700' },
  meetup: { label: '모임', icon: Users, color: 'bg-green-100 text-green-700' },
};

export default function CommunityPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<string>('all');

  const filteredPosts = useMemo(() => {
    let posts = COMMUNITY_POSTS;

    // 탭 필터
    if (activeTab !== 'all') {
      posts = posts.filter(post => post.type === activeTab);
    }

    // 검색 필터
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      posts = posts.filter(post =>
        post.title.toLowerCase().includes(query) ||
        post.content.toLowerCase().includes(query) ||
        post.author.name.toLowerCase().includes(query)
      );
    }

    return posts;
  }, [searchQuery, activeTab]);

  // 인기 태그
  const popularTags = ['#봉사', '#환경', '#교육', '#나눔', '#청년', '#어린이', '#지역사회'];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="border-b bg-muted/30 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">커뮤니티</h1>
              <p className="text-muted-foreground">
                멘토링 경험을 나누고 이웃과 소통해보세요.
              </p>
            </div>
            <Button>
              <PenSquare className="w-4 h-4 mr-2" />
              글쓰기
            </Button>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="게시글 검색..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="all">전체</TabsTrigger>
                <TabsTrigger value="review">후기</TabsTrigger>
                <TabsTrigger value="story">이야기</TabsTrigger>
                <TabsTrigger value="tip">팁</TabsTrigger>
                <TabsTrigger value="meetup">모임</TabsTrigger>
              </TabsList>

              <TabsContent value={activeTab} className="mt-6">
                {filteredPosts.length === 0 ? (
                  <div className="text-center py-16">
                    <MessageCircle className="w-12 h-12 mx-auto mb-4 text-muted-foreground/50" />
                    <h3 className="text-lg font-semibold mb-2">게시글이 없습니다</h3>
                    <p className="text-muted-foreground">
                      첫 번째 게시글을 작성해보세요!
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredPosts.map((post) => {
                      const typeInfo = POST_TYPE_INFO[post.type];
                      const TypeIcon = typeInfo.icon;
                      return (
                        <Card key={post.id} className="hover:shadow-md transition-shadow cursor-pointer">
                          <CardContent className="p-6">
                            <div className="flex items-start gap-4">
                              <Avatar className="h-10 w-10">
                                <AvatarImage src={post.author.profileImage} />
                                <AvatarFallback>{post.author.name[0]}</AvatarFallback>
                              </Avatar>
                              <div className="flex-1 min-w-0">
                                {/* Author & Badge */}
                                <div className="flex items-center gap-2 mb-2">
                                  <span className="font-medium">{post.author.name}</span>
                                  <Badge variant="secondary" className={`text-xs ${typeInfo.color}`}>
                                    <TypeIcon className="w-3 h-3 mr-1" />
                                    {typeInfo.label}
                                  </Badge>
                                  <span className="text-sm text-muted-foreground">· {post.createdAt}</span>
                                </div>

                                {/* Title & Content */}
                                <h3 className="font-semibold mb-2">{post.title}</h3>
                                <p className="text-muted-foreground text-sm line-clamp-2 mb-3">
                                  {post.content}
                                </p>

                                {/* Tags */}
                                <div className="flex flex-wrap gap-1 mb-3">
                                  {post.tags.map((tag) => (
                                    <Badge key={tag} variant="outline" className="text-xs">
                                      #{tag}
                                    </Badge>
                                  ))}
                                </div>

                                {/* Actions */}
                                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                  <button className="flex items-center gap-1 hover:text-primary transition-colors">
                                    <ThumbsUp className="w-4 h-4" />
                                    <span>{post.likes}</span>
                                  </button>
                                  <button className="flex items-center gap-1 hover:text-primary transition-colors">
                                    <MessageCircle className="w-4 h-4" />
                                    <span>{post.comments.length}</span>
                                  </button>
                                  <button className="flex items-center gap-1 hover:text-primary transition-colors">
                                    <Share2 className="w-4 h-4" />
                                    <span>공유</span>
                                  </button>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Community Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  커뮤니티 현황
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">전체 게시물</span>
                    <span className="font-medium">{COMMUNITY_POSTS.length}개</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">오늘 새 글</span>
                    <span className="font-medium">5개</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">활성 사용자</span>
                    <span className="font-medium">128명</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Popular Tags */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">인기 태그</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {popularTags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Best Reviews */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-500" />
                  베스트 후기
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {REVIEWS.slice(0, 3).map((review) => (
                    <div key={review.id} className="border-b pb-3 last:border-0 last:pb-0">
                      <div className="flex items-center gap-2 mb-1">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={review.reviewer.profileImage} />
                          <AvatarFallback className="text-xs">{review.reviewer.name[0]}</AvatarFallback>
                        </Avatar>
                        <span className="text-sm font-medium">{review.reviewer.name}</span>
                        <div className="flex items-center gap-0.5 ml-auto">
                          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          <span className="text-xs">{review.rating}</span>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {review.content}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Guidelines */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">커뮤니티 가이드</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• 서로를 존중하며 대화해주세요</li>
                  <li>• 활동 경험을 진솔하게 공유해주세요</li>
                  <li>• 개인정보 보호에 유의해주세요</li>
                  <li>• 광고성 게시물은 삭제될 수 있습니다</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
