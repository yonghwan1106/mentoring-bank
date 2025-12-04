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
  | 'mental-wellness'       // 마음 건강 (신규)
  // 청년 → 시니어
  | 'smartphone'            // 스마트폰
  | 'life-it'               // 생활 IT
  | 'sns'                   // SNS
  | 'practical-tech'        // 실용 기술
  | 'ai-basics'             // AI 활용
  | 'digital-safety'        // 디지털 안전 (신규)
  // 양방향 (신규)
  | 'companionship';        // 안부/정서교류

export const SKILL_CATEGORIES: Record<SkillCategory, { name: string; icon: string; direction: 'senior-to-youth' | 'youth-to-senior' | 'bidirectional' }> = {
  // 시니어 → 청년
  'traditional-cooking': { name: '전통 요리', icon: '🍳', direction: 'senior-to-youth' },
  'life-skills': { name: '생활 기술', icon: '🔧', direction: 'senior-to-youth' },
  'traditional-culture': { name: '전통 문화', icon: '🎨', direction: 'senior-to-youth' },
  'life-experience': { name: '인생 경험', icon: '💡', direction: 'senior-to-youth' },
  'mental-wellness': { name: '마음 건강', icon: '🧘', direction: 'senior-to-youth' },
  // 청년 → 시니어
  'smartphone': { name: '스마트폰', icon: '📱', direction: 'youth-to-senior' },
  'life-it': { name: '생활 IT', icon: '💻', direction: 'youth-to-senior' },
  'sns': { name: 'SNS', icon: '📸', direction: 'youth-to-senior' },
  'practical-tech': { name: '실용 기술', icon: '🛒', direction: 'youth-to-senior' },
  'ai-basics': { name: 'AI 활용', icon: '🤖', direction: 'youth-to-senior' },
  'digital-safety': { name: '디지털 안전', icon: '🛡️', direction: 'youth-to-senior' },
  // 양방향
  'companionship': { name: '안부/정서교류', icon: '💕', direction: 'bidirectional' },
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

// 지역 정보 (전국 광역시/도)
export const REGIONS = [
  '서울특별시',
  '부산광역시',
  '대구광역시',
  '인천광역시',
  '광주광역시',
  '대전광역시',
  '울산광역시',
  '세종특별자치시',
  '경기도',
  '강원특별자치도',
  '충청북도',
  '충청남도',
  '전북특별자치도',
  '전라남도',
  '경상북도',
  '경상남도',
  '제주특별자치도',
  '전체',
] as const;

export type Region = typeof REGIONS[number];

// 하위 호환성을 위한 별칭
export const DISTRICTS = REGIONS;
export type District = Region;
