export type Ad = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  link: string;
  backgroundColor: string;
};

export const ads: Ad[] = [
  {
    id: 'ad-1',
    title: '🌊 여름맞이 특가!',
    description: '시원한 여름 가전제품 최대 50% 할인',
    imageUrl: 'https://picsum.photos/seed/summer/800/200',
    link: '#',
    backgroundColor: 'from-cyan-400 to-blue-500',
  },
  {
    id: 'ad-2',
    title: '🏖️ 바캉스 시즌',
    description: '캠핑용품 & 아웃도어 기어 대방출',
    imageUrl: 'https://picsum.photos/seed/camping/800/200',
    link: '#',
    backgroundColor: 'from-amber-400 to-orange-500',
  },
  {
    id: 'ad-3',
    title: '📱 스마트 기기 마켓',
    description: '중고폰 안심거래, 검수 완료 상품만!',
    imageUrl: 'https://picsum.photos/seed/phone/800/200',
    link: '#',
    backgroundColor: 'from-violet-400 to-purple-500',
  },
  {
    id: 'ad-4',
    title: '🎮 게이머즈 천국',
    description: '콘솔, PC 부품, 게이밍 기어 특가',
    imageUrl: 'https://picsum.photos/seed/gaming/800/200',
    link: '#',
    backgroundColor: 'from-rose-400 to-pink-500',
  },
  {
    id: 'ad-5',
    title: '🛋️ 인테리어 특집',
    description: '가구 & 소품으로 방 꾸미기',
    imageUrl: 'https://picsum.photos/seed/interior/800/200',
    link: '#',
    backgroundColor: 'from-emerald-400 to-teal-500',
  },
];

export function getRandomAd(): Ad {
  return ads[Math.floor(Math.random() * ads.length)];
}

export function getAdByIndex(index: number): Ad {
  return ads[index % ads.length];
}
