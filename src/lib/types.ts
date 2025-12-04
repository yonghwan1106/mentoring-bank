// 멘토 프로필 타입
export interface Mentor {
  id: string;
  name: string;
  age: number;
  generation: 'senior' | 'youth';
  profileImage: string;
  location: string;
  district: string;
  bio: string;
  skills: Skill[];
  rating: number;
  reviewCount: number;
  mentoringCount: number;
  badges: Badge[];
  joinedAt: string;
  verified: boolean;
}

// 재능/스킬 타입
export interface Skill {
  id: string;
  name: string;
  category: SkillCategory;
  description: string;
}

// 스킬 카테고리
export type SkillCategory =
  // 시니어 → 청년
  | 'traditional-cooking'    // 전통 요리
  | 'life-skills'           // 생활 기술
  | 'traditional-culture'   // 전통 문화
  | 'life-experience'       // 인생 경험
  // 청년 → 시니어
  | 'smartphone'            // 스마트폰
  | 'life-it'               // 생활 IT
  | 'sns'                   // SNS
  | 'practical-tech'        // 실용 기술
  | 'ai-basics';            // AI 활용

export const SKILL_CATEGORIES: Record<SkillCategory, { name: string; icon: string; direction: 'senior-to-youth' | 'youth-to-senior' }> = {
  'traditional-cooking': { name: '전통 요리', icon: '🍳', direction: 'senior-to-youth' },
  'life-skills': { name: '생활 기술', icon: '🔧', direction: 'senior-to-youth' },
  'traditional-culture': { name: '전통 문화', icon: '🎨', direction: 'senior-to-youth' },
  'life-experience': { name: '인생 경험', icon: '💡', direction: 'senior-to-youth' },
  'smartphone': { name: '스마트폰', icon: '📱', direction: 'youth-to-senior' },
  'life-it': { name: '생활 IT', icon: '💻', direction: 'youth-to-senior' },
  'sns': { name: 'SNS', icon: '📸', direction: 'youth-to-senior' },
  'practical-tech': { name: '실용 기술', icon: '🛒', direction: 'youth-to-senior' },
  'ai-basics': { name: 'AI 활용', icon: '🤖', direction: 'youth-to-senior' },
};

// 멘토링 프로그램 타입
export interface Mentoring {
  id: string;
  mentorId: string;
  mentor: Mentor;
  title: string;
  description: string;
  category: SkillCategory;
  duration: number; // 분 단위
  creditCost: number; // 필요 크레딧
  location: string;
  district: string;
  isOnline: boolean;
  maxParticipants: number;
  currentParticipants: number;
  schedule: MentoringSchedule[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  tags: string[];
  rating: number;
  reviewCount: number;
  views: number;
  createdAt: string;
  status: 'active' | 'full' | 'completed' | 'cancelled';
}

// 멘토링 일정 타입
export interface MentoringSchedule {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
  available: boolean;
}

// 배지 타입
export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earnedAt: string;
}

// 후기 타입
export interface Review {
  id: string;
  mentoringId: string;
  mentoring: Mentoring;
  reviewerId: string;
  reviewer: Mentor;
  rating: number;
  content: string;
  tags: string[];
  likes: number;
  createdAt: string;
}

// 사용자 크레딧 타입
export interface UserCredits {
  userId: string;
  balance: number;
  totalEarned: number;
  totalSpent: number;
  history: CreditTransaction[];
}

// 크레딧 거래 내역
export interface CreditTransaction {
  id: string;
  type: 'earn' | 'spend' | 'bonus';
  amount: number;
  description: string;
  mentoringId?: string;
  createdAt: string;
}

// 커뮤니티 게시글 타입
export interface CommunityPost {
  id: string;
  authorId: string;
  author: Mentor;
  type: 'review' | 'story' | 'tip' | 'meetup';
  title: string;
  content: string;
  images?: string[];
  mentoringId?: string;
  likes: number;
  comments: Comment[];
  tags: string[];
  createdAt: string;
}

// 댓글 타입
export interface Comment {
  id: string;
  authorId: string;
  author: Mentor;
  content: string;
  likes: number;
  createdAt: string;
}

// 지역 정보
export const DISTRICTS = [
  '수지구',
  '기흥구',
  '처인구',
  '전체',
] as const;

export type District = typeof DISTRICTS[number];
