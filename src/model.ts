export type Activity = "all" | "read" | "study" | "work";
export type Place = {
  id: string;
  name: string;
  english: string;
  district: string;
  kind: string;
  activities: Activity[];
  amenities: string[];
  note: string;
  hours: string;
  budget: string;
  color: string;
  x: number;
  y: number;
};
export const places: Place[] = [
  {
    id: "paper",
    name: "บ้านกระดาษ",
    english: "Paper House",
    district: "ย่านริมคลอง",
    kind: "ห้องสมุดเล็ก",
    activities: ["read", "study"],
    amenities: ["เงียบ", "ปลั๊กไฟ", "Wi-Fi"],
    note: "มุมสงบข้างหน้าต่าง หนังสือหนึ่งเล่ม และบ่ายที่ไม่ต้องรีบ",
    hours: "09:00–18:00",
    budget: "ไม่มีค่าเข้า",
    color: "#d9b89a",
    x: 24,
    y: 35,
  },
  {
    id: "fern",
    name: "เฟิร์น แอนด์ โฟลิโอ",
    english: "Fern & Folio",
    district: "ย่านสวนตะวัน",
    kind: "คาเฟ่",
    activities: ["read", "work"],
    amenities: ["Wi-Fi", "ปลั๊กไฟ", "กลางแจ้ง"],
    note: "โต๊ะไม้ยาว แสงธรรมชาติ และพื้นที่สีเขียวเล็ก ๆ",
    hours: "08:00–17:00",
    budget: "฿80–150",
    color: "#9cae91",
    x: 64,
    y: 26,
  },
  {
    id: "chapter",
    name: "บทถัดไป",
    english: "Next Chapter",
    district: "ย่านถนนหนังสือ",
    kind: "พื้นที่อ่านร่วมกัน",
    activities: ["read", "study", "work"],
    amenities: ["เงียบ", "Wi-Fi", "ปลั๊กไฟ"],
    note: "โต๊ะเดี่ยวสำหรับช่วงที่ต้องการสมาธิ ทำทีละอย่างให้เสร็จ",
    hours: "10:00–20:00",
    budget: "฿60 / ชั่วโมง",
    color: "#b4aaa0",
    x: 47,
    y: 62,
  },
  {
    id: "clay",
    name: "ดินกับกาแฟ",
    english: "Clay & Coffee",
    district: "ย่านริมคลอง",
    kind: "คาเฟ่",
    activities: ["read", "work"],
    amenities: ["Wi-Fi", "กลางแจ้ง"],
    note: "กาแฟอุ่น ๆ และลานเล็กใต้ร่มไม้ เหมาะกับบ่ายวันสบาย",
    hours: "08:30–18:00",
    budget: "฿70–120",
    color: "#c58d74",
    x: 77,
    y: 69,
  },
  {
    id: "linen",
    name: "ลินินสตูดิโอ",
    english: "Linen Studio",
    district: "ย่านสวนตะวัน",
    kind: "พื้นที่ทำงาน",
    activities: ["study", "work"],
    amenities: ["Wi-Fi", "ปลั๊กไฟ", "ห้องคุยงาน"],
    note: "เลือกโต๊ะที่ใช่ แล้วให้ไอเดียค่อย ๆ เดินทาง",
    hours: "09:00–21:00",
    budget: "฿120 / วัน",
    color: "#a4b5b7",
    x: 34,
    y: 78,
  },
  {
    id: "light",
    name: "ห้องแสงเช้า",
    english: "Morning Light",
    district: "ย่านถนนหนังสือ",
    kind: "ห้องสมุดเล็ก",
    activities: ["read", "study"],
    amenities: ["เงียบ", "ปลั๊กไฟ"],
    note: "ห้องอ่านหนังสือแสงนุ่ม สำหรับบทที่อยากกลับมาอ่านซ้ำ",
    hours: "09:00–17:00",
    budget: "ไม่มีค่าเข้า",
    color: "#c8b678",
    x: 16,
    y: 58,
  },
];
export function filterPlaces(
  query: string,
  activity: Activity,
  amenities: string[],
  savedOnly: boolean,
  saved: string[],
): Place[] {
  const term = query.trim().toLocaleLowerCase();
  return places.filter(
    (p) =>
      (!term ||
        `${p.name} ${p.english} ${p.district} ${p.kind}`
          .toLocaleLowerCase()
          .includes(term)) &&
      (activity === "all" || p.activities.includes(activity)) &&
      amenities.every((a) => p.amenities.includes(a)) &&
      (!savedOnly || saved.includes(p.id)),
  );
}
export function readSaved(storage: Pick<Storage, "getItem">): string[] {
  try {
    const value: unknown = JSON.parse(
      storage.getItem("wtr-demo-favorites") || "[]",
    );
    return Array.isArray(value)
      ? value.filter(
          (v): v is string =>
            typeof v === "string" && places.some((p) => p.id === v),
        )
      : [];
  } catch {
    return [];
  }
}
export function toggleSaved(saved: string[], id: string): string[] {
  return saved.includes(id) ? saved.filter((v) => v !== id) : [...saved, id];
}
