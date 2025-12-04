import {
  Mentor,
  Mentoring,
  Review,
  CommunityPost,
  Badge,
  SkillCategory,
  SKILL_CATEGORIES
} from './types';

// 한국 이름 생성용 데이터
const LAST_NAMES = ['김', '이', '박', '최', '정', '강', '조', '윤', '장', '임', '한', '오', '서', '신', '권', '황', '안', '송', '류', '홍'];
const FIRST_NAMES_MALE = ['민준', '서준', '예준', '도윤', '시우', '주원', '하준', '지호', '지후', '준서', '준우', '현우', '도현', '지훈', '건우', '우진', '선우', '서진', '민재', '현준', '영호', '성호', '태호', '정호', '재호'];
const FIRST_NAMES_FEMALE = ['서연', '서윤', '지우', '서현', '민서', '하은', '하윤', '윤서', '지민', '채원', '수아', '지아', '지윤', '다은', '은서', '예은', '수빈', '소율', '예린', '지안', '영숙', '순자', '영희', '정숙', '미숙'];

// 프로필 이미지 (placeholder)
const getProfileImage = (seed: number) => `https://api.dicebear.com/7.x/personas/svg?seed=${seed}`;

// 배지 목록
const BADGES: Badge[] = [
  { id: 'badge-1', name: '첫 만남', description: '첫 멘토링 완료', icon: '🌱', earnedAt: '2025-01-15' },
  { id: 'badge-2', name: '열정 멘토', description: '멘토링 5회 완료', icon: '🔥', earnedAt: '2025-02-20' },
  { id: 'badge-3', name: '인기 멘토', description: '평점 4.5 이상', icon: '⭐', earnedAt: '2025-03-10' },
  { id: 'badge-4', name: '소통왕', description: '후기 10개 작성', icon: '💬', earnedAt: '2025-04-05' },
  { id: 'badge-5', name: '세대 연결자', description: '다른 세대와 10회 교류', icon: '🤝', earnedAt: '2025-05-15' },
  { id: 'badge-6', name: '꾸준함', description: '3개월 연속 활동', icon: '📅', earnedAt: '2025-06-01' },
  { id: 'badge-7', name: '나눔 대가', description: '멘토링 20회 완료', icon: '👑', earnedAt: '2025-07-20' },
  { id: 'badge-8', name: '디지털 도우미', description: '디지털 멘토링 10회', icon: '📱', earnedAt: '2025-08-10' },
  { id: 'badge-9', name: '전통 수호자', description: '전통문화 멘토링 10회', icon: '🏛️', earnedAt: '2025-09-05' },
  { id: 'badge-10', name: '동네 영웅', description: '같은 지역 20회 활동', icon: '🦸', earnedAt: '2025-10-15' },
  { id: 'badge-11', name: 'AI 동반자', description: '세대 동반 AI 학습 5회 완료', icon: '🤖', earnedAt: '2025-11-01' },
  { id: 'badge-12', name: '따뜻한 안부', description: '안부 멘토링 10회 완료', icon: '💕', earnedAt: '2025-11-10' },
  { id: 'badge-13', name: '고독 해소 히어로', description: '정서 교류로 외로움 극복 도움', icon: '🌈', earnedAt: '2025-11-20' },
  { id: 'badge-14', name: '디지털 안전 지킴이', description: '디지털 안전 멘토링 5회', icon: '🛡️', earnedAt: '2025-12-01' },
];

// 시니어 멘토 스킬
const SENIOR_SKILLS: { category: SkillCategory; skills: { name: string; description: string }[] }[] = [
  {
    category: 'traditional-cooking',
    skills: [
      { name: '김장 담그기', description: '배추김치, 깍두기 등 전통 김장법' },
      { name: '떡 만들기', description: '송편, 인절미, 절편 등 전통 떡 제조' },
      { name: '장 담그기', description: '된장, 고추장, 간장 담그는 법' },
      { name: '전통 반찬', description: '나물, 젓갈, 장아찌 만들기' },
      { name: '명절 음식', description: '설, 추석 명절 음식 준비' },
      { name: '혼밥 집밥 레시피', description: '간단하고 건강한 1인분 요리법' },
    ]
  },
  {
    category: 'life-skills',
    skills: [
      { name: '옷 수선', description: '단추 달기, 바지 줄이기, 지퍼 교체' },
      { name: 'DIY 수리', description: '가구 조립, 간단한 배관, 페인트칠' },
      { name: '정원 가꾸기', description: '화초 관리, 텃밭 가꾸기, 분재' },
      { name: '뜨개질', description: '목도리, 장갑, 모자 뜨기' },
      { name: '홈인테리어', description: '공간 활용, 수납 정리 노하우' },
    ]
  },
  {
    category: 'traditional-culture',
    skills: [
      { name: '서예', description: '붓글씨, 한글서예, 한자서예' },
      { name: '사군자', description: '매난국죽 그리기' },
      { name: '한복 입기', description: '한복 입는 법, 고름 묶기, 관리법' },
      { name: '다도', description: '전통 차 우리기, 다례' },
      { name: '전통 놀이', description: '윷놀이, 제기차기, 팽이치기' },
    ]
  },
  {
    category: 'life-experience',
    skills: [
      { name: '자녀 교육', description: '자녀 양육 경험, 교육 철학 공유' },
      { name: '재테크 경험', description: '부동산, 저축, 투자 경험담' },
      { name: '인간관계', description: '직장생활, 가족관계, 이웃관계 노하우' },
      { name: '건강 관리', description: '건강 유지 비결, 운동, 식이요법' },
      { name: '은퇴 준비', description: '은퇴 후 생활 설계, 취미 찾기' },
      { name: '경제 위기 생존법', description: 'IMF, 금융위기 등 어려운 시기 극복 경험담' },
      { name: '취업/면접 노하우', description: '수십 년 직장생활에서 얻은 실전 조언' },
    ]
  },
  {
    category: 'mental-wellness',
    skills: [
      { name: '명상과 마음 다스리기', description: '마음을 안정시키는 명상법, 호흡법' },
      { name: '인생 상담', description: '삶의 고민을 나누고 조언해드려요' },
      { name: '스트레스 관리', description: '오랜 경험에서 얻은 스트레스 해소법' },
      { name: '긍정적 사고법', description: '어려움을 이겨내는 마음가짐' },
    ]
  },
];

// 청년 멘토 스킬
const YOUTH_SKILLS: { category: SkillCategory; skills: { name: string; description: string }[] }[] = [
  {
    category: 'smartphone',
    skills: [
      { name: '카카오톡', description: '메시지, 영상통화, 선물하기' },
      { name: '사진 관리', description: '사진 촬영, 편집, 앨범 정리' },
      { name: '앱 설치', description: '필요한 앱 찾기, 설치, 삭제' },
      { name: '스마트폰 기초', description: '기본 설정, 배터리 관리, 저장공간' },
      { name: '연락처 관리', description: '연락처 저장, 그룹 관리, 백업' },
    ]
  },
  {
    category: 'life-it',
    skills: [
      { name: '인터넷 뱅킹', description: '모바일 뱅킹, 이체, 공과금 납부' },
      { name: '키오스크', description: '무인주문기, 은행ATM, 발권기 사용' },
      { name: '배달앱', description: '배달의민족, 요기요 주문하기' },
      { name: '교통앱', description: '지하철, 버스, 택시앱 사용법' },
      { name: '예약 시스템', description: '병원, 음식점, 영화관 예약' },
    ]
  },
  {
    category: 'sns',
    skills: [
      { name: '유튜브', description: '영상 검색, 구독, 재생목록 관리' },
      { name: '인스타그램', description: '계정 만들기, 사진 올리기, 팔로우' },
      { name: '밴드', description: '모임 가입, 게시글 작성, 일정 관리' },
      { name: '네이버 카페', description: '카페 가입, 글쓰기, 댓글 달기' },
      { name: '블로그', description: '블로그 개설, 글 작성, 이웃 관리' },
      { name: '숏폼 영상 만들기', description: '릴스, 쇼츠로 재미있는 영상 제작' },
      { name: '가족 앨범 공유', description: '구글포토, 네이버 클라우드로 가족사진 공유' },
    ]
  },
  {
    category: 'practical-tech',
    skills: [
      { name: '화상통화', description: 'ZOOM, 카카오 영상통화, FaceTime' },
      { name: '온라인 쇼핑', description: '쿠팡, 네이버쇼핑, 가격비교' },
      { name: '클라우드', description: '사진 백업, 파일 공유, 저장공간 관리' },
      { name: '디지털 문서', description: '한글, 엑셀 기초, PDF 보기' },
      { name: '스마트홈', description: 'AI스피커, 스마트TV, IoT 기기' },
    ]
  },
  {
    category: 'ai-basics',
    skills: [
      { name: 'ChatGPT 활용', description: '대화형 AI로 궁금한 것 물어보기, 글쓰기 도움받기' },
      { name: 'AI 번역', description: '파파고, 구글번역으로 외국어 번역하기' },
      { name: 'AI 사진편집', description: 'AI로 사진 보정, 배경 제거, 복원하기' },
      { name: 'AI 음성비서', description: '시리, 빅스비, 구글 어시스턴트 활용법' },
      { name: 'AI 검색', description: 'AI 검색 엔진으로 더 똑똑하게 정보 찾기' },
      { name: 'AI로 손주 사진 꾸미기', description: 'AI 앱으로 사진을 예쁘게 편집, 콜라주 만들기' },
      { name: 'AI로 건강 정보 찾기', description: 'AI에게 건강 관련 궁금증 물어보기' },
      { name: 'AI 음성 메모', description: '말로 메모하고 AI가 정리해주는 앱 활용' },
      { name: '세대 동반 AI 학습', description: '청년-시니어가 함께 AI 과제 수행하기' },
    ]
  },
  {
    category: 'digital-safety',
    skills: [
      { name: 'AI 스팸 문자 차단', description: '스팸 필터 설정, 의심 문자 구별법' },
      { name: '보이스피싱 예방', description: '사기 전화 유형과 대처법' },
      { name: '개인정보 보호', description: '비밀번호 관리, 개인정보 유출 방지' },
      { name: '안전한 결제', description: '온라인 결제 시 주의사항, 인증 방법' },
      { name: '가짜뉴스 구별', description: 'AI 시대 허위정보 판별하는 방법' },
    ]
  },
];

// 양방향 스킬 (안부/정서교류)
const COMPANIONSHIP_SKILLS: { category: SkillCategory; skills: { name: string; description: string }[] }[] = [
  {
    category: 'companionship',
    skills: [
      { name: '주간 안부 전화', description: '일주일에 한 번 안부를 묻는 따뜻한 대화' },
      { name: '영상 안부 인사', description: '화상통화로 얼굴 보며 안부 나누기' },
      { name: '함께 산책하기', description: '동네를 함께 걸으며 대화 나누기' },
      { name: '경험 인터뷰', description: '시니어의 인생 이야기를 청년이 기록하기' },
      { name: '세대 간 토크', description: '서로의 세대 문화에 대해 이야기 나누기' },
      { name: '취미 공유', description: '각자의 취미를 소개하고 함께 즐기기' },
    ]
  },
];

// 멘토 생성 함수
function generateMentor(id: number, isSenior: boolean): Mentor {
  const isMale = Math.random() > 0.5;
  const lastName = LAST_NAMES[Math.floor(Math.random() * LAST_NAMES.length)];
  const firstName = isMale
    ? FIRST_NAMES_MALE[Math.floor(Math.random() * FIRST_NAMES_MALE.length)]
    : FIRST_NAMES_FEMALE[Math.floor(Math.random() * FIRST_NAMES_FEMALE.length)];

  const age = isSenior
    ? Math.floor(Math.random() * 20) + 55  // 55-74세
    : Math.floor(Math.random() * 15) + 20; // 20-34세

  const regions = ['서울특별시', '부산광역시', '대구광역시', '인천광역시', '광주광역시', '대전광역시', '울산광역시', '세종특별자치시', '경기도', '강원특별자치도', '충청북도', '충청남도', '전북특별자치도', '전라남도', '경상북도', '경상남도', '제주특별자치도'];
  const district = regions[Math.floor(Math.random() * regions.length)];

  const skillPool = isSenior ? SENIOR_SKILLS : YOUTH_SKILLS;
  const numSkills = Math.floor(Math.random() * 3) + 1;
  const skills: Mentor['skills'] = [];

  for (let i = 0; i < numSkills; i++) {
    const categoryData = skillPool[Math.floor(Math.random() * skillPool.length)];
    const skillData = categoryData.skills[Math.floor(Math.random() * categoryData.skills.length)];
    if (!skills.find(s => s.name === skillData.name)) {
      skills.push({
        id: `skill-${id}-${i}`,
        name: skillData.name,
        category: categoryData.category,
        description: skillData.description,
      });
    }
  }

  const numBadges = Math.floor(Math.random() * 4);
  const badges = [...BADGES].sort(() => Math.random() - 0.5).slice(0, numBadges);

  const bios = isSenior
    ? [
        '40년 주부 경력의 요리 전문가입니다. 젊은 분들께 전통 음식의 맛을 전해드리고 싶어요.',
        '은퇴 후 취미로 서예를 시작했는데, 이제는 나누고 싶은 마음이 생겼습니다.',
        '손재주가 좋다는 말을 많이 들었어요. 옷 수선, DIY 뭐든 물어보세요!',
        '정원 가꾸기가 취미입니다. 식물 키우는 건 마음을 다스리는 것과 같아요.',
        '인생 경험이 가장 큰 자산이라고 생각합니다. 젊은 분들과 이야기 나누고 싶어요.',
      ]
    : [
        'IT 회사에서 일하고 있어요. 어르신들께 디지털 세상을 쉽게 알려드릴게요!',
        '대학생입니다. 할머니, 할아버지 도와드리면서 보람을 느꼈어요.',
        '스마트폰 강사 경험이 있습니다. 천천히, 쉽게 설명해드릴게요.',
        'SNS 마케터로 일하고 있어요. 인스타그램, 유튜브 뭐든 물어보세요!',
        '프리랜서 개발자입니다. 디지털 문제 해결은 제게 맡겨주세요.',
      ];

  return {
    id: `mentor-${id}`,
    name: `${lastName}${firstName}`,
    age,
    generation: isSenior ? 'senior' : 'youth',
    profileImage: getProfileImage(id),
    location: district,
    district,
    bio: bios[Math.floor(Math.random() * bios.length)],
    skills,
    rating: Math.round((3.5 + Math.random() * 1.5) * 10) / 10,
    reviewCount: Math.floor(Math.random() * 30) + 1,
    mentoringCount: Math.floor(Math.random() * 50) + 1,
    badges,
    joinedAt: `2025-${String(Math.floor(Math.random() * 11) + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`,
    verified: Math.random() > 0.2,
  };
}

// 멘토 데이터 생성
export const MENTORS: Mentor[] = [
  ...Array.from({ length: 30 }, (_, i) => generateMentor(i, true)),  // 시니어 30명
  ...Array.from({ length: 30 }, (_, i) => generateMentor(i + 30, false)), // 청년 30명
];

// 멘토링 프로그램 생성 함수
function generateMentoring(id: number, mentor: Mentor): Mentoring {
  const skill = mentor.skills[Math.floor(Math.random() * mentor.skills.length)];
  const categoryInfo = SKILL_CATEGORIES[skill.category];

  const titles = {
    'traditional-cooking': ['집에서 배우는 전통 김장', '어머니표 떡 만들기 교실', '우리집 장 담그기', '손맛 가득 전통 반찬', '1인분 집밥 레시피'],
    'life-skills': ['간단한 옷 수선 기초', 'DIY 집수리 입문', '베란다 정원 가꾸기', '뜨개질로 만드는 따뜻함'],
    'traditional-culture': ['서예 입문 교실', '사군자 그리기 기초', '한복 바르게 입기', '다도의 기초'],
    'life-experience': ['인생 선배의 자녀교육 이야기', '현명한 재테크 경험담', '원만한 인간관계 노하우', '건강하게 나이 드는 법', '경제 위기, 이렇게 극복했습니다', '취업 성공 면접 비법'],
    'mental-wellness': ['마음을 다스리는 명상 시간', '인생 고민 상담소', '스트레스 날리는 대화법', '긍정의 힘으로 살아가기'],
    'smartphone': ['카카오톡 완전 정복', '스마트폰 사진 관리법', '필요한 앱 찾아 설치하기', '스마트폰 기초 완벽 가이드'],
    'life-it': ['모바일 뱅킹 시작하기', '키오스크 두려움 극복하기', '배달앱으로 맛있는 한끼', '교통앱으로 편한 이동'],
    'sns': ['유튜브 200% 활용법', '인스타그램 첫걸음', '밴드로 모임 관리하기', '네이버 카페 활용법', '숏폼 영상 만들기 도전', '가족 사진 공유 마스터'],
    'practical-tech': ['가족과 화상통화하기', '온라인 쇼핑 마스터', '소중한 사진 클라우드 백업', '스마트홈 기기 사용법'],
    'ai-basics': ['ChatGPT로 시작하는 AI 첫걸음', 'AI로 외국어 번역 쉽게하기', 'AI 음성비서 활용법', 'AI로 사진 예쁘게 편집하기', 'AI 검색으로 똑똑하게 정보 찾기', 'AI로 손주 사진 꾸미기', 'AI와 함께하는 건강 관리', '세대가 함께 배우는 AI'],
    'digital-safety': ['스팸 문자 완벽 차단법', '보이스피싱 이렇게 막으세요', '내 개인정보 지키기', '안전한 온라인 결제', '가짜뉴스 구별하는 눈'],
    'companionship': ['주간 안부 나눔', '영상으로 얼굴 보며 대화', '함께 걷는 동네 산책', '내 인생 이야기 들려주기', '세대를 넘는 대화', '취미 함께 즐기기'],
  };

  const titleList = titles[skill.category] || ['멘토링'];
  const title = `${titleList[Math.floor(Math.random() * titleList.length)]}`;

  const durations = [60, 90, 120];
  const duration = durations[Math.floor(Math.random() * durations.length)];

  const maxParticipants = Math.floor(Math.random() * 3) + 1;
  const currentParticipants = Math.floor(Math.random() * (maxParticipants + 1));

  const difficulties: Mentoring['difficulty'][] = ['beginner', 'intermediate', 'advanced'];

  // 스케줄 생성
  const schedules: Mentoring['schedule'] = [];
  const today = new Date();
  for (let i = 0; i < 5; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() + Math.floor(Math.random() * 14) + 1);
    const hour = Math.floor(Math.random() * 8) + 10; // 10시-17시
    schedules.push({
      id: `schedule-${id}-${i}`,
      date: date.toISOString().split('T')[0],
      startTime: `${String(hour).padStart(2, '0')}:00`,
      endTime: `${String(hour + Math.floor(duration / 60)).padStart(2, '0')}:${String(duration % 60).padStart(2, '0')}`,
      available: Math.random() > 0.3,
    });
  }

  const tags = [skill.name, categoryInfo.name, mentor.district, mentor.generation === 'senior' ? '전통' : '디지털'];

  return {
    id: `mentoring-${id}`,
    mentorId: mentor.id,
    mentor,
    title,
    description: `${skill.description}\n\n${mentor.bio}\n\n이 멘토링에서는 ${skill.name}에 대해 차근차근 배울 수 있습니다. 초보자도 쉽게 따라할 수 있도록 친절하게 알려드립니다.`,
    category: skill.category,
    duration,
    creditCost: Math.ceil(duration / 60),
    location: mentor.district,
    district: mentor.district,
    isOnline: Math.random() > 0.5,
    maxParticipants,
    currentParticipants,
    schedule: schedules.sort((a, b) => a.date.localeCompare(b.date)),
    difficulty: difficulties[Math.floor(Math.random() * difficulties.length)],
    tags,
    rating: mentor.rating,
    reviewCount: Math.floor(Math.random() * 20),
    views: Math.floor(Math.random() * 500) + 50,
    createdAt: `2025-${String(Math.floor(Math.random() * 11) + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`,
    status: currentParticipants >= maxParticipants ? 'full' : 'active',
  };
}

// 멘토링 데이터 생성
export const MENTORINGS: Mentoring[] = MENTORS.flatMap((mentor, idx) =>
  Array.from({ length: Math.floor(Math.random() * 2) + 1 }, (_, i) =>
    generateMentoring(idx * 3 + i, mentor)
  )
);

// 후기 생성 함수
function generateReview(id: number): Review {
  const mentoring = MENTORINGS[Math.floor(Math.random() * MENTORINGS.length)];
  const reviewer = MENTORS.find(m => m.generation !== mentoring.mentor.generation) || MENTORS[0];

  const contents = [
    '정말 친절하게 알려주셔서 감사합니다! 덕분에 많이 배웠어요.',
    '처음에는 어려울 줄 알았는데, 쉽게 설명해주셔서 금방 이해했습니다.',
    '다음에도 또 배우고 싶어요. 최고의 멘토링이었습니다!',
    '세대를 뛰어넘는 소통이 가능하다는 걸 느꼈어요. 추천합니다.',
    '시간 가는 줄 모르고 배웠습니다. 너무 재미있었어요!',
    '꼼꼼하게 하나하나 알려주셔서 정말 도움이 많이 됐습니다.',
    '따뜻한 마음이 느껴지는 멘토링이었어요. 감사합니다!',
    '이렇게 좋은 분을 만나다니 행운입니다. 강추해요!',
  ];

  const tags = ['친절함', '전문성', '재미있음', '도움됨', '추천', '다시 듣고 싶음'];
  const selectedTags = tags.sort(() => Math.random() - 0.5).slice(0, Math.floor(Math.random() * 3) + 1);

  return {
    id: `review-${id}`,
    mentoringId: mentoring.id,
    mentoring,
    reviewerId: reviewer.id,
    reviewer,
    rating: Math.round((4 + Math.random()) * 10) / 10,
    content: contents[Math.floor(Math.random() * contents.length)],
    tags: selectedTags,
    likes: Math.floor(Math.random() * 30),
    createdAt: `2025-${String(Math.floor(Math.random() * 11) + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`,
  };
}

// 후기 데이터 생성
export const REVIEWS: Review[] = Array.from({ length: 100 }, (_, i) => generateReview(i));

// 커뮤니티 게시글 생성 함수
function generateCommunityPost(id: number): CommunityPost {
  const author = MENTORS[Math.floor(Math.random() * MENTORS.length)];
  const types: CommunityPost['type'][] = ['review', 'story', 'tip', 'meetup'];
  const type = types[Math.floor(Math.random() * types.length)];

  const titles: Record<CommunityPost['type'], string[]> = {
    review: ['오늘 멘토링 후기입니다!', '첫 멘토링 완료!', '너무 좋은 경험이었어요', '추천하고 싶은 멘토링'],
    story: ['세대를 뛰어넘는 우정', '멘토링을 통해 배운 것들', '감동적인 만남', '이런 일이 있었어요'],
    tip: ['멘토링 잘 받는 팁', '첫 멘토링 준비하기', '효과적인 학습 방법', '이것만은 꼭 알아두세요'],
    meetup: ['서울 소모임 모집', '부산 주말 모임', '대구 정기 모임', '관심사 모임 함께해요'],
  };

  const contents: Record<CommunityPost['type'], string[]> = {
    review: [
      '오늘 처음으로 멘토링을 받았는데, 정말 유익했습니다. 다음에도 꼭 참여하고 싶어요!',
      '처음엔 긴장했는데 멘토님이 너무 친절하셔서 편하게 배울 수 있었어요.',
      '생각보다 훨씬 재미있었어요! 시간 가는 줄 몰랐습니다.',
    ],
    story: [
      '50년 차이 나는 분과 대화를 나눴는데, 생각보다 공통점이 많아서 놀랐어요.',
      '멘토링을 하면서 제가 더 많이 배우는 것 같아요. 정말 뜻깊은 경험입니다.',
      '처음에는 세대 차이가 클 줄 알았는데, 마음을 나누니 금방 친해졌어요.',
    ],
    tip: [
      '멘토링 전에 질문 목록을 미리 정리해가면 더 효과적이에요!',
      '첫 멘토링이 긴장된다면, 간단한 자기소개부터 시작해보세요.',
      '모르는 건 부끄러워하지 말고 바로바로 물어보는 게 좋아요.',
    ],
    meetup: [
      '매주 토요일 오전에 모여서 서로의 경험을 나누고 있어요. 함께 하실 분!',
      '관심 있는 분들끼리 정기적으로 만나서 멘토링 경험을 공유하고 있습니다.',
      '같은 동네에 사시는 분들끼리 소모임을 만들어보고 싶어요!',
    ],
  };

  const tags = {
    review: ['후기', '추천', '감사'],
    story: ['이야기', '감동', '경험'],
    tip: ['팁', '노하우', '정보'],
    meetup: ['모임', '소통', '함께'],
  };

  return {
    id: `post-${id}`,
    authorId: author.id,
    author,
    type,
    title: titles[type][Math.floor(Math.random() * titles[type].length)],
    content: contents[type][Math.floor(Math.random() * contents[type].length)],
    likes: Math.floor(Math.random() * 50),
    comments: [],
    tags: tags[type],
    createdAt: `2025-${String(Math.floor(Math.random() * 11) + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`,
  };
}

// 커뮤니티 게시글 데이터 생성
export const COMMUNITY_POSTS: CommunityPost[] = Array.from({ length: 50 }, (_, i) => generateCommunityPost(i));

// 통계 데이터
export const STATS = {
  totalMentors: MENTORS.length,
  seniorMentors: MENTORS.filter(m => m.generation === 'senior').length,
  youthMentors: MENTORS.filter(m => m.generation === 'youth').length,
  totalMentorings: MENTORINGS.length,
  totalReviews: REVIEWS.length,
  totalCreditsExchanged: 1847,
  totalHoursExchanged: 1847,
  averageRating: 4.7,
  monthlyActiveUsers: 523,
};

// 현재 로그인한 사용자 (목업)
export const CURRENT_USER: Mentor = {
  id: 'current-user',
  name: '김민준',
  age: 28,
  generation: 'youth',
  profileImage: getProfileImage(999),
  location: '서울특별시',
  district: '서울특별시',
  bio: '디자이너로 일하고 있습니다. 어르신들께 스마트폰 사용법을 알려드리면서 보람을 느끼고 있어요!',
  skills: [
    { id: 'skill-current-1', name: '스마트폰 기초', category: 'smartphone', description: '스마트폰 기본 사용법' },
    { id: 'skill-current-2', name: '사진 관리', category: 'smartphone', description: '사진 촬영 및 정리' },
  ],
  rating: 4.9,
  reviewCount: 15,
  mentoringCount: 23,
  badges: BADGES.slice(0, 5),
  joinedAt: '2025-03-15',
  verified: true,
};

// 현재 사용자 크레딧
export const CURRENT_USER_CREDITS = {
  userId: CURRENT_USER.id,
  balance: 12,
  totalEarned: 25,
  totalSpent: 16,
  history: [
    { id: 'tx-1', type: 'bonus' as const, amount: 3, description: '가입 축하 크레딧', createdAt: '2025-03-15' },
    { id: 'tx-2', type: 'earn' as const, amount: 2, description: '스마트폰 기초 멘토링 제공', mentoringId: 'mentoring-1', createdAt: '2025-04-01' },
    { id: 'tx-3', type: 'spend' as const, amount: 1, description: '김장 담그기 멘토링 수강', mentoringId: 'mentoring-5', createdAt: '2025-04-15' },
    { id: 'tx-4', type: 'earn' as const, amount: 2, description: '카카오톡 사용법 멘토링 제공', mentoringId: 'mentoring-2', createdAt: '2025-05-01' },
    { id: 'tx-5', type: 'spend' as const, amount: 2, description: '서예 입문 멘토링 수강', mentoringId: 'mentoring-10', createdAt: '2025-05-20' },
  ],
};
