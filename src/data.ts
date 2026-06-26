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
        "คุณเป็นสายลงพื้นที่ก่อนเปิดสไลด์ ชอบเห็นเมืองแก้ปัญหาด้วยพลังคน ระบบ และกล้ามเนื้อแห่งความหวัง",
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
      intro:
        "คุณเป็นสายเห็นอะไรยุ่งแล้วอยากตีเส้น จัดคิว ติดป้าย และทำให้ทุกคนรู้ว่าต้องยืนตรงไหน",
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
        "คุณเป็นสายไม่ปล่อยผ่าน เห็นปัญหาเดิมวนซ้ำแล้วอยากเปิดแฟ้ม เปิดกล้อง และถามว่า 'ใครอนุมัติ?'",
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
        "คุณเป็นสายถ้ามีปัญหา อย่าเพิ่งตกใจ เปิด dashboard ก่อน แล้วถาม AI ว่ากรุงเทพฯ ต้องการอะไรตอนตีสาม",
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
    id: "waste-smell",
    prompt: "โรงขยะส่งกลิ่นจนชาวบ้านแทบตั้งนาฬิกาปลุกด้วยจมูก เมืองควรจัดการยังไงให้จบจริง?",
    choices: [
      choice("waste-chadchart", "ลงพื้นที่ ดมจริง วัดจริง แล้วเปิด timeline แก้กลิ่นให้คนเห็น", "chadchart", {
        infrastructure_resilience: 3,
        anti_corruption_transparency: 1,
      }),
      choice("waste-anucha", "จัดระบบโรงขยะใหม่ ตั้งมาตรฐานปิดกลิ่นแบบมี checklist", "anucha", {
        clean_transport_order: 2,
        infrastructure_resilience: 2,
      }),
      choice("waste-joe", "เปิดสัญญาเอกชน ไล่เงื่อนไขทีละข้อ ใครไม่ทำก็เตรียมตอบ", "joe", {
        anti_corruption_transparency: 3,
        law_enforcement_business_friction: 1,
      }),
      choice("waste-mallika", "ติด sensor กลิ่นกับ AI แจ้งเตือนก่อนจมูกประชาชนลาออก", "mallika", {
        ai_innovation_future_city: 3,
        infrastructure_resilience: 2,
      }),
    ],
  },
  {
    id: "green-line-fare",
    prompt: "รถไฟฟ้าแพงจนแตะบัตรแล้วใจหาย ถ้าจะทำตั๋วเดือนหรือค่าโดยสารถูกลง ควรเริ่มตรงไหน?",
    choices: [
      choice("fare-chadchart", "เปิดตัวเลขต้นทุน รายได้ หนี้ แล้วคุยบนข้อมูลที่ประชาชนอ่านรู้เรื่อง", "chadchart", {
        opportunity_human_care: 2,
        infrastructure_resilience: 2,
      }),
      choice("fare-anucha", "ทำแพ็กเกจตั๋วเดือนให้เป็นระบบ คนทำงานไม่ต้องลุ้นยอดบัตรทุกเช้า", "anucha", {
        clean_transport_order: 2,
        opportunity_human_care: 1,
      }),
      choice("fare-joe", "รื้อดีลค่าเดินรถ หาจุดรั่ว แล้วเจรจาแบบถือแฟ้มหนา ๆ เข้าไป", "joe", {
        anti_corruption_transparency: 2,
        law_enforcement_business_friction: 2,
      }),
      choice("fare-mallika", "ทำระบบราคาอัจฉริยะ จ่ายตามพฤติกรรมเดินทาง ไม่ใช่ตามดวงรายวัน", "mallika", {
        ai_innovation_future_city: 3,
        opportunity_human_care: 1,
      }),
    ],
  },
  {
    id: "childcare",
    prompt: "พ่อแม่ทำงานเช้าเลิกค่ำ แต่ศูนย์เด็กเล็กปิดก่อนชีวิตจริง เมืองควรช่วยครอบครัวยังไง?",
    choices: [
      choice("child-chadchart", "ขยายศูนย์เด็กเล็ก เพิ่มเวลา และดูแลครอบครัวเหมือนเป็นเรื่องเมืองจริง ๆ", "chadchart", {
        opportunity_human_care: 3,
        infrastructure_resilience: 1,
      }),
      choice("child-anucha", "จัดระบบรับ-ส่ง นัดหมาย งบ และครูพี่เลี้ยงให้ไม่วุ่นเหมือนวันเปิดเทอม", "anucha", {
        clean_transport_order: 2,
        opportunity_human_care: 2,
      }),
      choice("child-joe", "ตรวจงบศูนย์เด็กเล็กให้โปร่งใส เงินเด็กต้องไม่เดินทางอ้อมโลก", "joe", {
        anti_corruption_transparency: 2,
        opportunity_human_care: 1,
      }),
      choice("child-mallika", "ทำแอปจองคิว แจ้งพัฒนาการ และให้ AI ช่วยดูแลตารางแบบพ่อแม่ไม่หัวหมุน", "mallika", {
        ai_innovation_future_city: 3,
        opportunity_human_care: 1,
      }),
    ],
  },
  {
    id: "public-safety",
    prompt: "ถนนยุบ ป้ายร่วง สะพานพัง ฟังแล้วเหมือนเมืองสุ่มกาชา เมืองควรป้องกันก่อนเกิดเหตุยังไง?",
    choices: [
      choice("safety-chadchart", "ลงสำรวจจุดเสี่ยง ทำแผนซ่อม และเปิด map ให้คนรู้ว่าตรงไหนควรระวัง", "chadchart", {
        infrastructure_resilience: 3,
        opportunity_human_care: 1,
      }),
      choice("safety-anucha", "ทำทะเบียนอาคาร ป้าย ถนน สะพาน ให้ครบ ไม่ใช่รอพังก่อนค่อยจำได้", "anucha", {
        clean_transport_order: 3,
        infrastructure_resilience: 2,
      }),
      choice("safety-joe", "ตรวจผู้รับเหมา มาตรฐานงาน และประวัติซ่อมซ้ำแบบไม่เกรงใจแฟ้มเก่า", "joe", {
        anti_corruption_transparency: 2,
        law_enforcement_business_friction: 2,
      }),
      choice("safety-mallika", "ใช้ AI ทำนายจุดเสี่ยงจากอายุอาคาร รูปถ่าย และเสียงประชาชนก่อนมันร่วง", "mallika", {
        ai_innovation_future_city: 3,
        infrastructure_resilience: 2,
      }),
    ],
  },
  {
    id: "corruption",
    prompt: "ส่วย ใบอนุญาต ฮั้วประมูล ฟังแล้วไมเกรนขึ้น เมืองควรปิดช่องโกงยังไง?",
    choices: [
      choice("corrupt-chadchart", "เปิดข้อมูลทุกขั้นตอนให้ประชาชนช่วยส่อง แสงแดดคือยาฆ่าเชื้อ", "chadchart", {
        anti_corruption_transparency: 3,
      }),
      choice("corrupt-anucha", "ย้ายใบอนุญาตขึ้นออนไลน์ 100% ให้ระบบเป็นคนจัดคิว ไม่ใช่โต๊ะลับ", "anucha", {
        clean_transport_order: 2,
        anti_corruption_transparency: 2,
      }),
      choice("corrupt-joe", "ไล่เส้นทางเงิน เปิดเอกสารจัดซื้อ แล้วถามคำถามที่ทำให้ห้องประชุมเงียบ", "joe", {
        anti_corruption_transparency: 3,
        law_enforcement_business_friction: 2,
      }),
      choice("corrupt-mallika", "ให้ AI จับ pattern งบแปลก ๆ แบบตัวเลขเห็นแล้วเริ่มมีพิรุธ", "mallika", {
        ai_innovation_future_city: 3,
        anti_corruption_transparency: 2,
      }),
    ],
  },
  {
    id: "foreign-nominee",
    prompt: "บางย่านเจอธุรกิจนอมินีจนคนพื้นที่เริ่มงงว่าอยู่กรุงเทพฯ หรือเซิร์ฟเวอร์ใหม่ เมืองควรทำไง?",
    choices: [
      choice("nominee-chadchart", "ฟังคนพื้นที่ เก็บข้อมูลจริง แล้วประสานหน่วยงานให้ไม่โยนกันไปมา", "chadchart", {
        opportunity_human_care: 2,
        anti_corruption_transparency: 1,
      }),
      choice("nominee-anucha", "จัดระเบียบทะเบียนร้าน ป้าย ภาษี และใบอนุญาตให้ตรวจง่ายเหมือนเช็กพัสดุ", "anucha", {
        clean_transport_order: 3,
        law_enforcement_business_friction: 1,
      }),
      choice("nominee-joe", "เปิดปฏิบัติการกฎหมายร่วมหลายหน่วย ใครสวมสิทธิ์ก็เจอแฟ้มจริง", "joe", {
        law_enforcement_business_friction: 3,
        anti_corruption_transparency: 2,
      }),
      choice("nominee-mallika", "ให้ AI จับชื่อซ้ำ ที่อยู่ซ้ำ และความบังเอิญที่ไม่ค่อยบังเอิญ", "mallika", {
        ai_innovation_future_city: 3,
        anti_corruption_transparency: 1,
      }),
    ],
  },
  {
    id: "tourism",
    prompt: "ถ้าไม่อยากให้กรุงเทพฯ มีแค่แลนด์มาร์กเดิม ๆ เมืองควรปลุก 50 เขตให้คนอยากมาเที่ยวยังไง?",
    choices: [
      choice("tour-chadchart", "ดันเส้นทางชุมชนจริง อาหารจริง คนจริง ให้ทุกเขตมีเรื่องเล่าของตัวเอง", "chadchart", {
        opportunity_human_care: 3,
        infrastructure_resilience: 1,
      }),
      choice("tour-anucha", "จัดปฏิทินเทศกาล 50 เขตแบบเป็นระบบ ไม่ใช่อีเวนต์ที่รู้วันสุดท้าย", "anucha", {
        clean_transport_order: 3,
      }),
      choice("tour-joe", "ตรวจงบอีเวนต์ให้คุ้มทุกบาท งานต้องดึงคน ไม่ใช่ดึงแต่พร็อพขึ้นเวที", "joe", {
        anti_corruption_transparency: 2,
        law_enforcement_business_friction: 1,
      }),
      choice("tour-mallika", "สร้าง Bangkok Festival Map ให้ AI แนะนำทริปตาม mood ตั้งแต่วัดยันคาเฟ่ลับ", "mallika", {
        ai_innovation_future_city: 3,
        opportunity_human_care: 1,
      }),
    ],
  },
  {
    id: "street-food",
    prompt: "ทางเท้าต้องเดินได้ แต่พ่อค้าแม่ค้าก็ต้องทำกิน เมืองควรบาลานซ์ street food ยังไง?",
    choices: [
      choice("food-chadchart", "หาพื้นที่ทำกินที่ไม่ทับทางเดิน ให้คนตัวเล็กอยู่ได้และคนเดินไม่ต้อง parkour", "chadchart", {
        opportunity_human_care: 3,
        clean_transport_order: 1,
      }),
      choice("food-anucha", "ทำโซนผ่อนผันชัด ๆ มีเวลา มีเส้น มีป้าย เห็นแล้วรู้ว่าต้องยืนตรงไหน", "anucha", {
        clean_transport_order: 3,
        law_enforcement_business_friction: 1,
      }),
      choice("food-joe", "ตัดวงจรส่วยพื้นที่ ใบอนุญาตต้องชัด ไม่ใช่ต้องรู้จักใครก่อนขายหมูปิ้ง", "joe", {
        law_enforcement_business_friction: 3,
        anti_corruption_transparency: 2,
      }),
      choice("food-mallika", "ทำแผนที่ร้าน street food แบบ real-time จองคิวได้ รีวิวได้ หิวแล้วไม่หลง", "mallika", {
        ai_innovation_future_city: 3,
        opportunity_human_care: 2,
      }),
    ],
  },
  {
    id: "traffic-pm25",
    prompt: "รถติดกับ PM2.5 มาเป็นแพ็กคู่เหมือนโปรไม่อยากได้ เมืองควรแก้ต้นตอยังไงให้เห็นผล?",
    choices: [
      choice("pm-chadchart", "เปิดข้อมูลควันดำ จุดเผา รถติด แล้วลงพื้นที่แก้ตรงที่คนหายใจจริง", "chadchart", {
        infrastructure_resilience: 2,
        opportunity_human_care: 2,
      }),
      choice("pm-anucha", "จัดระบบรถสาธารณะ เส้นทาง และจุดตรวจควันดำให้ไม่กระจัดกระจายเหมือนสายชาร์จ", "anucha", {
        clean_transport_order: 3,
        infrastructure_resilience: 1,
      }),
      choice("pm-joe", "บังคับใช้กฎรถควันดำจริง จับจริง ปรับจริง ไม่ใช่แค่ขมวดคิ้วใส่ฝุ่น", "joe", {
        law_enforcement_business_friction: 3,
        anti_corruption_transparency: 1,
      }),
      choice("pm-mallika", "ทำระบบพยากรณ์ฝุ่นและจราจร ให้ AI เตือนก่อนปอดขึ้นสถานะไม่ว่าง", "mallika", {
        ai_innovation_future_city: 3,
        infrastructure_resilience: 1,
      }),
    ],
  },
  {
    id: "bma-power",
    prompt: "ถ้าแก้ พ.ร.บ. กทม. ได้หนึ่งเรื่อง คุณอยากให้เมืองได้อำนาจอะไรกลับมาก่อน?",
    choices: [
      choice("power-chadchart", "ดึงอำนาจที่กระทบชีวิตคนทุกวันก่อน เช่น ทางเท้า น้ำท่วม ขนส่ง แล้วทำให้จบ", "chadchart", {
        opportunity_human_care: 2,
        infrastructure_resilience: 2,
      }),
      choice("power-anucha", "ขออำนาจจัดระบบจราจรและขนส่งให้เป็นแผงเดียว ไม่ใช่รีโมตคนละอัน", "anucha", {
        clean_transport_order: 3,
        infrastructure_resilience: 1,
      }),
      choice("power-joe", "ขออำนาจตรวจสอบงบ สัญญา และ enforcement ให้ฟันได้จริงไม่ใช่ถือไม้บรรทัด", "joe", {
        law_enforcement_business_friction: 3,
        anti_corruption_transparency: 2,
      }),
      choice("power-mallika", "ทำ city OS ให้ข้อมูลทุกหน่วยเชื่อมกัน ก่อนเมืองจะ lag กว่านี้", "mallika", {
        ai_innovation_future_city: 3,
        anti_corruption_transparency: 1,
      }),
    ],
  },
];
