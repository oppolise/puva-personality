import type { AxisVector, Persona, Question } from "./types";

export const emptyAxisVector = (): AxisVector => ({
  opportunity_human_care: 0,
  infrastructure_resilience: 0,
  clean_transport_order: 0,
  anti_corruption_transparency: 0,
  law_enforcement_business_friction: 0,
  ai_innovation_future_city: 0,
});

export const personas: Persona[] = [
  {
    id: "chadchart",
    name: "อ.ชัชาติ สิทธิพันธุ์",
    color: "#008377",
    image: "/characters/chadchart.webp",
    vector: {
      opportunity_human_care: 3,
      infrastructure_resilience: 3,
      clean_transport_order: 1,
      anti_corruption_transparency: 2,
      law_enforcement_business_friction: 1,
      ai_innovation_future_city: 1,
    },
    result: {
      headline: "คุณเป็นชัชชาติ",
      intro:
        "คุณเป็นสายเมื่อเจอปัญหาตรงหน้าก็จะขยับตัวและลงมือทำ รับผิดชอบตรง ๆ และเชื่อว่าร่างกายที่แข็งแรงช่วยพาชีวิตรอดได้หลายสถานการณ์",
    },
  },
  {
    id: "anucha",
    name: "คุณอนุชา บูรพชัยศรี",
    color: "#2f9fd8",
    image: "/characters/anucha.webp",
    vector: {
      opportunity_human_care: 2,
      infrastructure_resilience: 1,
      clean_transport_order: 3,
      anti_corruption_transparency: 2,
      law_enforcement_business_friction: 2,
      ai_innovation_future_city: 1,
    },
    result: {
      headline: "คุณเป็นอนุชา",
      intro: "คุณเป็นคนใต้แน่ๆ แต่แค่เราพิสูจน์ไม่ได้",
    },
  },
  {
    id: "joe",
    name: "ดร.โจ ชัยวัฒน์ สถาวรวิจิตร",
    color: "#e9782f",
    image: "/characters/joe.webp",
    vector: {
      opportunity_human_care: 1,
      infrastructure_resilience: 2,
      clean_transport_order: 2,
      anti_corruption_transparency: 3,
      law_enforcement_business_friction: 3,
      ai_innovation_future_city: 1,
    },
    result: {
      headline: "คุณเป็นดร.โจ",
      intro:
        "คุณเป็นสายตั้งคำถามกับต้นเหตุ ชอบมีหลักฐาน มีแผน และไม่อยากให้ปัญหาเดิมกลับมาซ้ำอีกแบบไร้คำอธิบาย",
    },
  },
  {
    id: "mallika",
    name: "ดร.มัลลิกา บุญมีตระกูล มหาสุข",
    color: "#1f3f7a",
    image: "/characters/mallika.webp",
    vector: {
      opportunity_human_care: 2,
      infrastructure_resilience: 2,
      clean_transport_order: 1,
      anti_corruption_transparency: 1,
      law_enforcement_business_friction: 1,
      ai_innovation_future_city: 3,
    },
    result: {
      headline: "คุณเป็นดร.มัลลิกา",
      intro:
        "คุณเป็นสายใช้เทคโนโลยีเป็นผู้ช่วยชีวิตประจำวัน มีอะไรติดขัดก็อยากโยนข้อมูลให้ AI ช่วยคิด ช่วยจัด และช่วยตัดสินใจให้ไวขึ้น เพราะ AI คือสมองที่สองของคุณ",
    },
  },
];

const choice = (
  id: string,
  label: string,
  persona: Question["choices"][number]["persona"],
  axes: Question["choices"][number]["axes"],
) => ({ id, label, persona, axes });

export const questions: Question[] = [
  {
    id: "end-month-money",
    prompt: "สิ้นเดือนเหมือนสิ้นใจ เงินในกระเป๋าแห้งกรอบ คุณจะเอาตัวรอดยังไงจนกว่าเงินเดือนออก?",
    choices: [
      choice("money-mallika", "เปิด AI แล้วโยนรายรับรายจ่าย ให้ช่วยวางแผนเอาตัวรอดถึงสิ้นเดือนนี้", "mallika", {
        ai_innovation_future_city: 3,
        anti_corruption_transparency: 1,
      }),
      choice("money-anucha", "โทรหาแม่ที่ใต้ ขอข้าวสารกับแกงส้มมาช่วยชีวิตเมืองกรุงที่แสนยากลำบาก", "anucha", {
        opportunity_human_care: 3,
        clean_transport_order: 1,
      }),
      choice("money-chadchart", "วางแผนค่าใช้จ่ายให้รัดกุม แล้วปลอบใจว่ากำลังลดน้ำหนักอยู่", "chadchart", {
        infrastructure_resilience: 2,
        opportunity_human_care: 2,
      }),
      choice("money-joe", "เปิด Excel วางแผนการเงินใหม่ แล้วนั่งถามตัวเองว่ามาถึงจุดนี้ได้ยังไง", "joe", {
        anti_corruption_transparency: 3,
        infrastructure_resilience: 1,
      }),
    ],
  },
  {
    id: "friend-conflict",
    prompt: "เพื่อนสนิทสองคนทะเลาะกันหนัก แล้วมากดดันให้คุณเลือกข้าง คุณจะทำยังไง?",
    choices: [
      choice("conflict-joe", "รับฟังทั้งสองฝั่ง แล้วเลือกเข้าข้างกับคนที่มีเหตุผลและหลักฐานที่สุด", "joe", {
        anti_corruption_transparency: 3,
        law_enforcement_business_friction: 2,
      }),
      choice("conflict-chadchart", "ไม่เลือกข้าง แล้วชวนทั้งคู่ไปวิ่งให้เหงื่อช่วยดับอารมณ์", "chadchart", {
        opportunity_human_care: 2,
        infrastructure_resilience: 2,
      }),
      choice("conflict-anucha", "ไม่เลือกข้าง ชวนมากินแกงส้มที่บ้านแล้วค่อยปรับความเข้าใจ", "anucha", {
        opportunity_human_care: 3,
      }),
      choice("conflict-mallika", "ให้ทั้งคู่พิมพ์เรื่องที่ทะเลาะกันลง AI แล้วรอดูคำตัดสิน", "mallika", {
        ai_innovation_future_city: 3,
        anti_corruption_transparency: 1,
      }),
    ],
  },
  {
    id: "forgot-line",
    prompt: "ตื่นมาเจอข้อความแชทสำคัญมากๆ ที่ส่งตั้งแต่เมื่อวาน แต่คุณลืมตอบสนิท คุณจะทำยังไง?",
    choices: [
      choice("line-anucha", "บอกไปว่าฝนตกไฟดับทั้งคืน แล้วส่งสติ๊กเกอร์หน้าเศร้าไปสามอัน", "anucha", {
        opportunity_human_care: 3,
      }),
      choice("line-mallika", "ให้ AI draft คำขอโทษแบบมืออาชีพที่สุดก่อนส่ง", "mallika", {
        ai_innovation_future_city: 3,
        opportunity_human_care: 1,
      }),
      choice("line-chadchart", "โทรหาทันที ขอโทษตรง ๆ ไม่แก้ตัว", "chadchart", {
        infrastructure_resilience: 2,
        opportunity_human_care: 2,
      }),
      choice("line-joe", "ตอบก่อน แล้วตั้งระบบแจ้งเตือนใหม่ไม่ให้พลาดซ้ำอีก", "joe", {
        anti_corruption_transparency: 2,
        opportunity_human_care: 1,
      }),
    ],
  },
  {
    id: "cant-sleep",
    prompt: "ดึกมากแล้วแต่นอนไม่หลับ พรุ่งนี้ต้องประชุมตอนเช้า คุณจะทำยังไง?",
    choices: [
      choice("sleep-chadchart", "ลุกไปออกกำลังกายเบา ๆ ให้ร่างกายเหนื่อยแล้วค่อยกลับมานอน", "chadchart", {
        infrastructure_resilience: 3,
      }),
      choice("sleep-mallika", "เปิด voice mode ของ AI เล่านิทานกล่อมเรานอน", "mallika", {
        ai_innovation_future_city: 3,
        opportunity_human_care: 1,
      }),
      choice("sleep-anucha", "เปิดเสียงทะเลใน YouTube ให้รู้สึกเหมือนได้กลับไปอยู่บ้านเกิด", "anucha", {
        opportunity_human_care: 3,
      }),
      choice("sleep-joe", "เสิร์ชหาสาเหตุการนอนไม่หลับ แล้วลองแก้จากต้นเหตุ", "joe", {
        anti_corruption_transparency: 2,
        infrastructure_resilience: 1,
      }),
    ],
  },
  {
    id: "dinner-vs-work",
    prompt: "เพื่อนชวนไปกินข้าวคืนนี้ แต่คุณมีงานด่วนต้องส่งพรุ่งนี้เช้า คุณจะทำยังไง?",
    choices: [
      choice("dinner-mallika", "ให้ AI ช่วยทำงานให้ทั้งหมด ระหว่างนั้นไปกินข้าวกับเพื่อนแบบเริ่ดๆ !!", "mallika", {
        ai_innovation_future_city: 3,
        clean_transport_order: 1,
      }),
      choice("dinner-joe", "ปฏิเสธเพื่อนตรงๆ แล้วบอกเหตุผลว่าติดงานด่วนจริงๆ", "joe", {
        anti_corruption_transparency: 3,
        law_enforcement_business_friction: 1,
      }),
      choice("dinner-chadchart", "ไปกินด้วยกับเพื่อน แต่ขอกลับไวก่อน แล้วรีบกลับมาทำงานต่อ", "chadchart", {
        opportunity_human_care: 2,
        infrastructure_resilience: 2,
      }),
      choice("dinner-anucha", "ชวนเพื่อนมาบ้านตัวเอง เพื่อจะทำแกงส้มให้เพื่อนกิน แล้วงานค่อยว่ากันอีกที", "anucha", {
        opportunity_human_care: 3,
        clean_transport_order: 1,
      }),
    ],
  },
  {
    id: "restaurant-queue",
    prompt: "คิวร้านอาหารสุดฮิตยาวมาก แต่คุณหิวและอยากกินสุด ๆ คุณจะทำยังไง?",
    choices: [
      choice("queue-anucha", "เดินไปซื้อข้าวราดแกงข้างๆ อร่อย ถูก ไม่ต้องรอใคร", "anucha", {
        opportunity_human_care: 3,
      }),
      choice("queue-chadchart", "ต่อคิวเลย เพื่อของกินเราทำได้ !!", "chadchart", {
        infrastructure_resilience: 3,
        opportunity_human_care: 1,
      }),
      choice("queue-mallika", "ให้ AI หาร้านรสชาติใกล้เคียงแต่คิวสั้นกว่าในระยะ 500 เมตรเดี่ยวนี้ๆๆ", "mallika", {
        ai_innovation_future_city: 3,
        opportunity_human_care: 1,
      }),
      choice("queue-joe", "วิเคราะห์ว่าช่วงเวลาไหนคิวน้อยที่สุด แล้วค่อยกลับมาซื้อใหม่", "joe", {
        anti_corruption_transparency: 2,
        clean_transport_order: 1,
      }),
    ],
  },
  {
    id: "loud-neighbor",
    prompt: "เพื่อนบ้านจัดปาร์ตี้ ร้องคาราโอเกะทะลุกำแพงตอนตีหนึ่ง คุณจะทำยังไง?",
    choices: [
      choice("noise-joe", "แจ้งเจ้าหน้าที่เรื่องเสียงรบกวน เพราะคนรอบข้างก็ควรได้นอน", "joe", {
        law_enforcement_business_friction: 3,
        anti_corruption_transparency: 1,
      }),
      choice("noise-anucha", "เคาะห้องแล้วขอแจมไปด้วย เพราะเราโคตรจะเริ่ด", "anucha", {
        opportunity_human_care: 3,
      }),
      choice("noise-chadchart", "ไม่อยากผิดใจกัน เลยใส่หูฟังแล้วพยายามนอนต่อ", "chadchart", {
        opportunity_human_care: 2,
        infrastructure_resilience: 1,
      }),
      choice("noise-mallika", "ใช้ AI สร้างคลื่นเสียงความถี่ตรงข้าม (Anti-noise) ยิงทะลุกำแพงไปหักล้างเสียงของห้องข้างๆ ให้เงียบสนิท", "mallika", {
        ai_innovation_future_city: 3,
        infrastructure_resilience: 1,
      }),
    ],
  },
  {
    id: "series-choice",
    prompt: "คืนวันศุกร์ อยากดูซีรีส์สักเรื่อง แต่เลื่อนหามาครึ่งชั่วโมงแล้วยังเลือกไม่ได้?",
    choices: [
      choice("series-mallika", "เปิด AI แล้วถามว่าคนแบบเราน่าจะชอบดูเรื่องอะไร", "mallika", {
        ai_innovation_future_city: 3,
      }),
      choice("series-chadchart", "ถามเพื่อนหรือแฟนว่าอยากดูอะไร แล้วดูตาม ง่ายดี", "chadchart", {
        opportunity_human_care: 2,
        infrastructure_resilience: 1,
      }),
      choice("series-anucha", "เลิกหาซีรีส์ แล้วเปิดเพลงใต้เพื่อชีวิตแทน", "anucha", {
        opportunity_human_care: 3,
      }),
      choice("series-joe", "ถามตัวเองก่อนว่าอยากดูซีรีส์จริง ๆ หรือแค่ว่างจนเลื่อนวน", "joe", {
        anti_corruption_transparency: 2,
        opportunity_human_care: 1,
      }),
    ],
  },
];
