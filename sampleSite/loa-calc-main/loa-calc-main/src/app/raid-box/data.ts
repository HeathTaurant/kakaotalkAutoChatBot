export type Raid = keyof typeof rewardData;
export type Reward = (typeof rewardData)[Raid];

export const raidGroup: Record<string, Raid[]> = {
  '오레하의 우물(노말)': ['아이라의 눈(노말)', '오레하 프라바사(노말)'],
  '오레하의 우물(하드)': ['아이라의 눈(하드)', '오레하 프라바사(하드)'],
  아르고스: ['아르고스 1관문', '아르고스 2관문', '아르고스 3관문'],
  '발탄(노말)': ['발탄 1관문(노말)', '발탄 2관문(노말)'],
  '발탄(하드)': ['발탄 1관문(하드)', '발탄 2관문(하드)'],
  '비아키스(노말)': [
    '비아키스 1관문(노말)',
    '비아키스 2관문(노말)',
    '비아키스 3관문(노말)',
  ],
  '비아키스(하드)': [
    '비아키스 1관문(하드)',
    '비아키스 2관문(하드)',
    '비아키스 3관문(하드)',
  ],
  쿠크세이튼: ['쿠크세이튼 1관문', '쿠크세이튼 2관문', '쿠크세이튼 3관문'],
  '아브렐슈드(노말)': [
    '아브렐슈드 1관문(노말)',
    '아브렐슈드 2관문(노말)',
    '아브렐슈드 3관문(노말)',
    '아브렐슈드 4관문(노말)',
    '아브렐슈드 5관문(노말)',
    '아브렐슈드 6관문(노말)',
  ],
  '아브렐슈드(하드)': [
    '아브렐슈드 1관문(하드)',
    '아브렐슈드 2관문(하드)',
    '아브렐슈드 3관문(하드)',
    '아브렐슈드 4관문(하드)',
    '아브렐슈드 5관문(하드)',
    '아브렐슈드 6관문(하드)',
  ],
  '카양겔(노말)': [
    '영원한 빛의 요람 1관문(노말)',
    '영원한 빛의 요람 2관문(노말)',
    '영원한 빛의 요람 3관문(노말)',
    '영원한 빛의 요람 4관문(노말)',
  ],
  '카양겔(하드)': [
    '영원한 빛의 요람 1관문(하드)',
    '영원한 빛의 요람 2관문(하드)',
    '영원한 빛의 요람 3관문(하드)',
    '영원한 빛의 요람 4관문(하드)',
  ],
  '일리아칸(노말)': [
    '일리아칸 1관문(노말)',
    '일리아칸 2관문(노말)',
    '일리아칸 3관문(노말)',
  ],
  '일리아칸(하드)': [
    '일리아칸 1관문(하드)',
    '일리아칸 2관문(하드)',
    '일리아칸 3관문(하드)',
  ],
  '혼돈의 상아탑(노말)': [
    '혼돈의 상아탑 1관문(노말)',
    '혼돈의 상아탑 2관문(노말)',
    '혼돈의 상아탑 3관문(노말)',
    '혼돈의 상아탑 4관문(노말)',
  ],
  '혼돈의 상아탑(하드)': [
    '혼돈의 상아탑 1관문(하드)',
    '혼돈의 상아탑 2관문(하드)',
    '혼돈의 상아탑 3관문(하드)',
    '혼돈의 상아탑 4관문(하드)',
  ],
};

export const rewardData = {
  '아이라의 눈(노말)': {
    price: 200,
    rewards: {
      파결: 48,
      수결: 96,
      위명돌: 4,
    },
  },
  '오레하 프라바사(노말)': {
    price: 400,
    rewards: {
      파결: 60,
      수결: 120,
      위명돌: 4,
      파편: 600,
    },
  },
  '아이라의 눈(하드)': {
    price: 100,
    rewards: {
      파결: 60,
      수결: 120,
      위명돌: 16,
      파편: 600,
    },
  },
  '오레하 프라바사(하드)': {
    price: 150,
    rewards: {
      파결: 90,
      수결: 180,
      위명돌: 20,
      파편: 800,
    },
  },
  '아르고스 1관문': {
    price: 100,
    rewards: {
      파결: 60,
      수결: 120,
      위명돌: 14,
      파편: 520,
    },
  },
  '아르고스 2관문': {
    price: 150,
    rewards: {
      파결: 90,
      수결: 180,
      위명돌: 14,
      파편: 680,
    },
  },
  '아르고스 3관문': {
    price: 150,
    rewards: {
      파결: 120,
      수결: 240,
      위명돌: 17,
      파편: 720,
    },
  },
  '발탄 1관문(노말)': {
    price: 300,
    rewards: {
      파결: 240,
      수결: 480,
      위명돌: 6,
      파편: 400,
      혼돈의돌: 1 / 5,
    },
  },
  '발탄 2관문(노말)': {
    price: 400,
    rewards: {
      파결: 300,
      수결: 600,
      위명돌: 7,
      파편: 700,
      혼돈의돌: 2 / 5,
    },
  },
  '발탄 1관문(하드)': {
    price: 450,
    rewards: {
      파결: 360,
      수결: 720,
      위명돌: 10,
      파편: 1000,
      혼돈의돌: 3 / 5,
    },
  },
  '발탄 2관문(하드)': {
    price: 600,
    rewards: {
      파결: 480,
      수결: 960,
      위명돌: 10,
      파편: 1300,
      혼돈의돌: 3 / 5,
    },
  },
  '비아키스 1관문(노말)': {
    price: 200,
    rewards: {
      파결: 150,
      수결: 300,
      위명돌: 6,
      파편: 480,
      혼돈의돌: 1 / 5,
    },
  },
  '비아키스 2관문(노말)': {
    price: 250,
    rewards: {
      파결: 240,
      수결: 480,
      위명돌: 6,
      파편: 600,
      혼돈의돌: 1 / 5,
    },
  },
  '비아키스 3관문(노말)': {
    price: 400,
    rewards: {
      파결: 300,
      수결: 600,
      위명돌: 7,
      파편: 900,
      혼돈의돌: 1 / 5,
    },
  },
  '비아키스 1관문(하드)': {
    price: 300,
    rewards: {
      파결: 240,
      수결: 480,
      위명돌: 10,
      파편: 1200,
      혼돈의돌: 2 / 5,
    },
  },
  '비아키스 2관문(하드)': {
    price: 300,
    rewards: {
      파결: 360,
      수결: 720,
      위명돌: 10,
      파편: 1200,
      혼돈의돌: 2 / 5,
    },
  },
  '비아키스 3관문(하드)': {
    price: 600,
    rewards: {
      파결: 480,
      수결: 960,
      위명돌: 10,
      파편: 1500,
      혼돈의돌: 2 / 5,
    },
  },
  '쿠크세이튼 1관문': {
    price: 300,
    rewards: {
      파결: 300,
      수결: 600,
      위명돌: 12,
      파편: 1300,
      혼돈의돌: 1 / 5,
    },
  },
  '쿠크세이튼 2관문': {
    price: 500,
    rewards: {
      파결: 420,
      수결: 840,
      위명돌: 12,
      파편: 1300,
      혼돈의돌: 2 / 5,
    },
  },
  '쿠크세이튼 3관문': {
    price: 700,
    rewards: {
      파결: 540,
      수결: 1080,
      위명돌: 12,
      파편: 1600,
      혼돈의돌: 2 / 5,
    },
  },
  '아브렐슈드 1관문(노말)': {
    price: 400,
    rewards: {
      파괴강석: 120,
      수호강석: 240,
      경명돌: 6,
      파편: 2100,
      혼돈의돌: 2 / 5,
    },
  },
  '아브렐슈드 2관문(노말)': {
    price: 600,
    rewards: {
      파괴강석: 150,
      수호강석: 300,
      경명돌: 9,
      파편: 2400,
      혼돈의돌: 3 / 5,
    },
  },
  '아브렐슈드 3관문(노말)': {
    price: 700,
    rewards: {
      파괴강석: 200,
      수호강석: 400,
      경명돌: 8,
      파편: 2800,
      혼돈의돌: 2 / 5,
    },
  },
  '아브렐슈드 4관문(노말)': {
    price: 800,
    rewards: {
      파괴강석: 280,
      수호강석: 560,
      경명돌: 12,
      파편: 3200,
      혼돈의돌: 3 / 5,
    },
  },
  '아브렐슈드 5관문(노말)': {
    price: 900,
    rewards: {
      파괴강석: 370,
      수호강석: 720,
      경명돌: 12,
      파편: 3400,
      혼돈의돌: 2 / 5,
    },
  },
  '아브렐슈드 6관문(노말)': {
    price: 1100,
    rewards: {
      파괴강석: 480,
      수호강석: 960,
      경명돌: 16,
      파편: 4800,
      혼돈의돌: 4 / 5,
    },
  },
  '아브렐슈드 1관문(하드)': {
    price: 700,
    rewards: {
      파괴강석: 180,
      수호강석: 360,
      경명돌: 12,
      파편: 2400,
      혼돈의돌: 3 / 5,
    },
  },
  '아브렐슈드 2관문(하드)': {
    price: 800,
    rewards: {
      파괴강석: 270,
      수호강석: 540,
      경명돌: 12,
      파편: 3000,
      혼돈의돌: 4 / 5,
    },
  },
  '아브렐슈드 3관문(하드)': {
    price: 900,
    rewards: {
      파괴강석: 360,
      수호강석: 720,
      경명돌: 16,
      파편: 3200,
      혼돈의돌: 3 / 5,
    },
  },
  '아브렐슈드 4관문(하드)': {
    price: 1100,
    rewards: {
      파괴강석: 480,
      수호강석: 960,
      경명돌: 16,
      파편: 4000,
      혼돈의돌: 4 / 5,
    },
  },
  '아브렐슈드 5관문(하드)': {
    price: 1100,
    rewards: {
      파괴강석: 600,
      수호강석: 1200,
      경명돌: 20,
      파편: 4800,
      혼돈의돌: 3 / 5,
    },
  },
  '아브렐슈드 6관문(하드)': {
    price: 1400,
    rewards: {
      파괴강석: 900,
      수호강석: 1800,
      경명돌: 30,
      파편: 6000,
      혼돈의돌: 5 / 5,
    },
  },
  '영원한 빛의 요람 1관문(노말)': {
    price: 600,
    rewards: {
      파괴강석: 180,
      수호강석: 360,
      경명돌: 5,
      파편: 1500,
    },
  },
  '영원한 빛의 요람 2관문(노말)': {
    price: 600,
    rewards: {
      파괴강석: 180,
      수호강석: 360,
      경명돌: 5,
      파편: 1500,
    },
  },
  '영원한 빛의 요람 3관문(노말)': {
    price: 800,
    rewards: {
      파괴강석: 220,
      수호강석: 440,
      경명돌: 6,
      파편: 2000,
    },
  },
  '영원한 빛의 요람 4관문(노말)': {
    price: 1000,
    rewards: {
      파괴강석: 300,
      수호강석: 600,
      경명돌: 8,
      파편: 3600,
    },
  },
  '영원한 빛의 요람 1관문(하드)': {
    price: 700,
    rewards: {
      정제된파괴강석: 70,
      정제된수호강석: 140,
      찬명돌: 3,
      파편: 1500,
    },
  },
  '영원한 빛의 요람 2관문(하드)': {
    price: 700,
    rewards: {
      정제된파괴강석: 70,
      정제된수호강석: 140,
      찬명돌: 3,
      파편: 1500,
    },
  },
  '영원한 빛의 요람 3관문(하드)': {
    price: 900,
    rewards: {
      정제된파괴강석: 90,
      정제된수호강석: 180,
      찬명돌: 4,
      파편: 2000,
    },
  },
  '영원한 빛의 요람 4관문(하드)': {
    price: 1100,
    rewards: {
      정제된파괴강석: 120,
      정제된수호강석: 240,
      찬명돌: 6,
      파편: 2500,
    },
  },
  '일리아칸 1관문(노말)': {
    price: 900,
    rewards: {
      정제된파괴강석: 120,
      정제된수호강석: 240,
      찬명돌: 6,
      파편: 3000,
      혼돈의돌: 3 / 5,
    },
  },
  '일리아칸 2관문(노말)': {
    price: 1100,
    rewards: {
      정제된파괴강석: 160,
      정제된수호강석: 320,
      찬명돌: 8,
      파편: 3000,
      혼돈의돌: 3 / 5,
    },
  },
  '일리아칸 3관문(노말)': {
    price: 1500,
    rewards: {
      정제된파괴강석: 240,
      정제된수호강석: 480,
      찬명돌: 8,
      파편: 4200,
      혼돈의돌: 5 / 5,
    },
  },
  '일리아칸 1관문(하드)': {
    price: 1200,
    rewards: {
      정제된파괴강석: 200,
      정제된수호강석: 400,
      찬명돌: 9,
      파편: 4000,
      혼돈의돌: 7 / 5,
    },
  },
  '일리아칸 2관문(하드)': {
    price: 1400,
    rewards: {
      정제된파괴강석: 240,
      정제된수호강석: 480,
      찬명돌: 12,
      파편: 4000,
      혼돈의돌: 7 / 5,
    },
  },
  '일리아칸 3관문(하드)': {
    price: 1900,
    rewards: {
      정제된파괴강석: 360,
      정제된수호강석: 720,
      찬명돌: 18,
      파편: 5500,
      혼돈의돌: 8 / 5,
    },
  },
  '혼돈의 상아탑 1관문(노말)': {
    price: 700,
    rewards: {
      정제된파괴강석: 100,
      정제된수호강석: 200,
      찬명돌: 2,
      파편: 3000,
    },
  },
  '혼돈의 상아탑 2관문(노말)': {
    price: 800,
    rewards: {
      정제된파괴강석: 100,
      정제된수호강석: 200,
      찬명돌: 2,
      파편: 3000,
    },
  },
  '혼돈의 상아탑 3관문(노말)': {
    price: 900,
    rewards: {
      정제된파괴강석: 200,
      정제된수호강석: 400,
      찬명돌: 2,
      파편: 3000,
    },
  },
  '혼돈의 상아탑 4관문(노말)': {
    price: 1100,
    rewards: {
      정제된파괴강석: 200,
      정제된수호강석: 400,
      찬명돌: 3,
      파편: 4500,
    },
  },
  '혼돈의 상아탑 1관문(하드)': {
    price: 1000,
    rewards: {
      정제된파괴강석: 150,
      정제된수호강석: 300,
      찬명돌: 3,
      파편: 4000,
    },
  },
  '혼돈의 상아탑 2관문(하드)': {
    price: 1000,
    rewards: {
      정제된파괴강석: 150,
      정제된수호강석: 300,
      찬명돌: 3,
      파편: 4000,
    },
  },
  '혼돈의 상아탑 3관문(하드)': {
    price: 1500,
    rewards: {
      정제된파괴강석: 240,
      정제된수호강석: 480,
      찬명돌: 5,
      파편: 5000,
    },
  },
  '혼돈의 상아탑 4관문(하드)': {
    price: 2000,
    rewards: {
      정제된파괴강석: 300,
      정제된수호강석: 600,
      찬명돌: 7,
      파편: 5500,
    },
  },
};
