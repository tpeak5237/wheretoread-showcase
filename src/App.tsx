import { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  BookOpen,
  Check,
  ChevronRight,
  Coffee,
  Heart,
  Map,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";
import {
  filterPlaces,
  readSaved,
  toggleSaved,
  type Activity,
  type Place,
} from "./model";
function RoomArt({ place, large = false }: { place: Place; large?: boolean }) {
  return (
    <svg
      viewBox="0 0 500 300"
      role="img"
      aria-label={`ภาพวาดพื้นที่สมมติ ${place.name}`}
      className={large ? "room-art large" : "room-art"}
    >
      <rect width="500" height="300" fill={place.color} />
      <rect x="0" y="230" width="500" height="70" fill="#725c48" opacity=".3" />
      <path d="M75 25h200v190H75z" fill="#f3ead8" />
      <path d="M88 38h174v163H88z" fill="#d7dfc4" />
      <path d="M175 38v163M88 120h174" stroke="#f9f5ed" strokeWidth="10" />
      <path
        d="M98 188Q140 60 174 180Q205 65 252 188"
        fill="#9ba381"
        opacity=".6"
      />
      <path d="M330 57h122v151H330z" fill="#876e53" />
      <path
        d="M340 77h18v45h-18zm24-10h12v55h-12zm19 6h20v49h-20zm28-6h13v55h-13zm19 12h10v43h-10z"
        fill="#e4d4b6"
      />
      <path d="M337 129h108M337 190h108" stroke="#50483c" strokeWidth="5" />
      <path
        d="M344 147h15v37h-15zm22-9h18v46h-18zm27 3h13v43h-13zm20-1h22v44h-22z"
        fill="#d0b59b"
      />
      <ellipse cx="225" cy="238" rx="112" ry="11" fill="#534a40" opacity=".2" />
      <path
        d="M124 216h214v12H124zM143 228v57m175-57v57"
        stroke="#745841"
        strokeWidth="8"
        fill="#a5835e"
      />
      <path d="M189 209l30-10 32 9-30 11z" fill="#fcf5e7" />
      <path d="M220 200v17" stroke="#b2a790" />
      <path d="M284 191h15v18h-15z" fill="#faf4e8" />
      <path
        d="M299 194q15 0 6 12h-6"
        fill="none"
        stroke="#faf4e8"
        strokeWidth="4"
      />
      <path d="M23 220h32l-4 42H29z" fill="#a16e50" />
      <path
        d="M39 219v-80m0 56q-50-40-24-65 35 8 24 65m1-20q45-53 37-68-33 2-37 68"
        fill="#61775c"
        stroke="#61775c"
        strokeWidth="4"
      />
    </svg>
  );
}
export default function App() {
  const [query, setQuery] = useState("");
  const [activity, setActivity] = useState<Activity>("all");
  const [amenities, setAmenities] = useState<string[]>([]);
  const [saved, setSaved] = useState(() => {
    try {
      return readSaved(window.localStorage);
    } catch {
      return [];
    }
  });
  const [savedOnly, setSavedOnly] = useState(false);
  const [view, setView] = useState<"list" | "map">("list");
  const [selected, setSelected] = useState<Place | null>(null);
  const [status, setStatus] = useState<"ready" | "loading" | "error">("ready");
  const [notice, setNotice] = useState("");
  const dialog = useRef<HTMLDialogElement>(null);
  const results = filterPlaces(query, activity, amenities, savedOnly, saved);
  useEffect(() => {
    try {
      localStorage.setItem("wtr-demo-favorites", JSON.stringify(saved));
    } catch {
      setNotice("เบราว์เซอร์ไม่อนุญาตให้บันทึก รายการโปรดจะอยู่เฉพาะครั้งนี้");
    }
  }, [saved]);
  useEffect(() => {
    if (selected) dialog.current?.showModal();
  }, [selected]);
  useEffect(() => {
    if (status !== "loading") return;
    const id = setTimeout(() => setStatus("ready"), 650);
    return () => clearTimeout(id);
  }, [status]);
  function favorite(id: string) {
    setSaved((v) => toggleSaved(v, id));
    setNotice(
      saved.includes(id)
        ? "นำออกจากรายการที่บันทึกแล้ว"
        : "บันทึกไว้ในเบราว์เซอร์แล้ว",
    );
  }
  const clear = () => {
    setQuery("");
    setActivity("all");
    setAmenities([]);
    setSavedOnly(false);
    setStatus("ready");
  };
  return (
    <>
      <a className="skip" href="#discover">
        ข้ามไปค้นหาสถานที่
      </a>
      <header>
        <a className="brand" href="#" onClick={clear}>
          <BookOpen size={25} />
          <span>
            อ่านไหนดี<small>WHERE TO READ</small>
          </span>
        </a>
        <nav aria-label="เมนูหลัก">
          <button
            className={!savedOnly ? "active" : ""}
            onClick={() => setSavedOnly(false)}
          >
            ค้นพบสถานที่
          </button>
          <button
            className={savedOnly ? "active" : ""}
            onClick={() => setSavedOnly(true)}
          >
            <Heart size={16} />
            บันทึกไว้ <span className="count">{saved.length}</span>
          </button>
        </nav>
        <span className="demo">พื้นที่สาธิต · ข้อมูลสมมติ</span>
      </header>
      <main>
        <section className="hero">
          <div>
            <span className="eyebrow">
              A LITTLE SPACE FOR YOUR NEXT CHAPTER
            </span>
            <h1>
              ที่ดี ๆ สำหรับ
              <br />
              หนังสือเล่มถัดไป<span>ของคุณ.</span>
            </h1>
            <p>
              ค้นหามุมอ่านหนังสือ เรียน และทำงาน
              <br className="desktop-br" /> ในจังหวะที่เป็นคุณ
            </p>
            <a className="text-link" href="#discover">
              ออกไปเจอมุมโปรด <ArrowUpRight size={18} />
            </a>
          </div>
          <div className="hero-art">
            <RoomArt place={filterPlaces("", "all", [], false, [])[0]} large />
            <div className="art-label">
              <span>01 / มุมอ่านประจำวัน</span>
              <strong>ช้าลงอีกนิด อ่านต่ออีกบท</strong>
            </div>
            <span className="vertical-note">
              ILLUSTRATED SPACES, IMAGINED POSSIBILITIES
            </span>
          </div>
        </section>
        <section id="discover" className="discovery">
          <div className="section-heading">
            <div>
              <span className="eyebrow">FIND YOUR CORNER</span>
              <h2>
                {savedOnly ? "มุมที่คุณบันทึกไว้" : "วันนี้อยากไปนั่งที่ไหน"}
              </h2>
            </div>
            <span className="muted">
              6 พื้นที่สมมติ · ไม่มีข้อมูลสถานที่จริง
            </span>
          </div>
          <div className="search-row">
            <label className="search">
              <Search size={20} />
              <input
                aria-label="ค้นหาสถานที่ ไทยหรืออังกฤษ"
                placeholder="ชื่อสถานที่ ย่าน หรือ Paper House…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              {query && (
                <button aria-label="ล้างคำค้น" onClick={() => setQuery("")}>
                  <X size={18} />
                </button>
              )}
            </label>
            <div className="view-toggle" aria-label="มุมมอง">
              <button
                aria-pressed={view === "list"}
                onClick={() => setView("list")}
              >
                รายการ
              </button>
              <button
                aria-pressed={view === "map"}
                onClick={() => setView("map")}
              >
                <Map size={16} />
                แผนผัง
              </button>
            </div>
          </div>
          <div className="filters">
            <div className="activities" aria-label="กิจกรรม">
              {(
                [
                  ["all", "ทั้งหมด"],
                  ["read", "อ่านหนังสือ"],
                  ["study", "เรียน"],
                  ["work", "ทำงาน"],
                ] as [Activity, string][]
              ).map(([key, label]) => (
                <button
                  key={key}
                  aria-pressed={activity === key}
                  onClick={() => setActivity(key)}
                >
                  {label}
                </button>
              ))}
            </div>
            <div className="amenities">
              <SlidersHorizontal size={16} />
              {["เงียบ", "Wi-Fi", "ปลั๊กไฟ", "กลางแจ้ง"].map((a) => (
                <label key={a}>
                  <input
                    type="checkbox"
                    checked={amenities.includes(a)}
                    onChange={() =>
                      setAmenities((v) =>
                        v.includes(a) ? v.filter((x) => x !== a) : [...v, a],
                      )
                    }
                  />
                  {a}
                </label>
              ))}
            </div>
          </div>
          <div className="results-line">
            <span role="status">{results.length} มุมที่เหมาะกับคุณ</span>
            <button className="subtle" onClick={clear}>
              ล้างตัวกรอง
            </button>
          </div>
          {status === "loading" ? (
            <div className="state" role="status">
              กำลังเตรียมพื้นที่ตัวอย่าง…
            </div>
          ) : status === "error" ? (
            <div className="state" role="alert">
              <h3>ตัวอย่างสถานะโหลดไม่สำเร็จ</h3>
              <p>นี่เป็นสถานะสาธิต ไม่มีการเชื่อมต่อบริการจริง</p>
              <button onClick={() => setStatus("loading")}>ลองอีกครั้ง</button>
            </div>
          ) : results.length === 0 ? (
            <div className="state">
              <BookOpen size={30} />
              <h3>ยังไม่เจอมุมที่ตรงใจ</h3>
              <p>ลองเปลี่ยนคำค้น หรือลดตัวกรองดูสักนิด</p>
              <button onClick={clear}>ดูสถานที่ทั้งหมด</button>
            </div>
          ) : view === "map" ? (
            <div className="map-layout">
              <div
                className="local-map"
                aria-label="แผนผังสมมติ ไม่ใช่แผนที่สำหรับเดินทาง"
              >
                <svg viewBox="0 0 800 540" aria-hidden="true">
                  <rect width="800" height="540" fill="#e9e8dc" />
                  <path
                    d="M0 100Q150 240 340 80T800 160M60 540Q250 280 480 370T800 280"
                    stroke="#d5e0dc"
                    strokeWidth="65"
                    fill="none"
                  />
                  <path
                    d="M0 300L800 120M100 0L610 540M390 0L150 540M0 460L800 440"
                    stroke="#faf8f0"
                    strokeWidth="22"
                  />
                  <path
                    d="M500 170h180v100H500zM90 330h150v90H90z"
                    fill="#c7d3b9"
                  />
                </svg>
                <span className="map-label">
                  แผนผังย่านสมมติ · ไม่ใช้เดินทาง
                </span>
                {results.map((p, i) => (
                  <button
                    key={p.id}
                    className="pin"
                    style={{ left: `${p.x}%`, top: `${p.y}%` }}
                    onClick={() => setSelected(p)}
                    aria-label={`เปิด ${p.name}`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
              <div className="map-index">
                {results.map((p, i) => (
                  <button key={p.id} onClick={() => setSelected(p)}>
                    <span className="index">0{i + 1}</span>
                    <span>
                      <strong>{p.name}</strong>
                      <small>
                        {p.kind} · {p.district}
                      </small>
                    </span>
                    <ChevronRight size={16} />
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="places">
              {results.map((p, i) => (
                <article key={p.id} className="place">
                  <div className="image-wrap">
                    <button
                      className="image-button"
                      aria-label={`ดูรายละเอียด ${p.name}`}
                      onClick={() => setSelected(p)}
                    >
                      <RoomArt place={p} />
                    </button>
                    <span className="image-number">0{i + 1}</span>
                    <button
                      className="favorite"
                      aria-label={`${saved.includes(p.id) ? "เลิกบันทึก" : "บันทึก"} ${p.name}`}
                      aria-pressed={saved.includes(p.id)}
                      onClick={() => favorite(p.id)}
                    >
                      <Heart
                        size={19}
                        fill={saved.includes(p.id) ? "currentColor" : "none"}
                      />
                    </button>
                  </div>
                  <div className="place-meta">
                    <span>{p.kind}</span>
                    <span>{p.budget}</span>
                  </div>
                  <button
                    className="place-title"
                    onClick={() => setSelected(p)}
                  >
                    <h3>{p.name}</h3>
                    <ArrowUpRight size={21} />
                  </button>
                  <p className="place-note">{p.note}</p>
                  <div className="place-bottom">
                    <span>{p.district}</span>
                    <span>{p.amenities.slice(0, 2).join(" · ")}</span>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
        <details className="demo-controls">
          <summary>ทดลองสถานะของหน้าจอ</summary>
          <p>ทุกสถานะทำงานในเครื่อง ไม่มีคำขอไปยัง API</p>
          <button onClick={() => setStatus("loading")}>ทดลอง Loading</button>
          <button onClick={() => setStatus("error")}>ทดลอง Error</button>
          <button onClick={() => setStatus("ready")}>กลับสู่รายการ</button>
        </details>
        <p className="notice" role="status">
          {notice}
        </p>
      </main>
      <footer>
        <span className="footer-brand">
          <BookOpen size={18} />
          อ่านไหนดี
        </span>
        <p>เลือกที่นั่งให้หนังสือเล่มโปรด · Independent frontend showcase</p>
        <span>ไม่มีสถานที่จริง ไม่มีการติดตาม</span>
      </footer>
      <dialog
        ref={dialog}
        onClose={() => setSelected(null)}
        onCancel={() => setSelected(null)}
        aria-labelledby="place-heading"
      >
        {selected && (
          <>
            <div className="dialog-top">
              <span className="eyebrow">SYNTHETIC PLACE / ข้อมูลสมมติ</span>
              <button
                autoFocus
                aria-label="ปิดรายละเอียด"
                onClick={() => dialog.current?.close()}
              >
                <X />
              </button>
            </div>
            <RoomArt place={selected} />
            <div className="detail-content">
              <span className="eyebrow">
                {selected.kind} · {selected.english}
              </span>
              <h2 id="place-heading">{selected.name}</h2>
              <p>{selected.note}</p>
              <dl>
                <div>
                  <dt>ย่านสมมติ</dt>
                  <dd>{selected.district}</dd>
                </div>
                <div>
                  <dt>เวลาตัวอย่าง</dt>
                  <dd>{selected.hours}</dd>
                </div>
                <div>
                  <dt>งบประมาณตัวอย่าง</dt>
                  <dd>{selected.budget}</dd>
                </div>
              </dl>
              <div className="detail-tags">
                {selected.amenities.map((a) => (
                  <span key={a}>
                    <Check size={14} />
                    {a}
                  </span>
                ))}
              </div>
              <button className="primary" onClick={() => favorite(selected.id)}>
                <Heart size={18} />
                {saved.includes(selected.id)
                  ? "นำออกจากที่บันทึก"
                  : "บันทึกมุมนี้ไว้"}
              </button>
              <p className="muted">
                <Coffee size={14} />{" "}
                ไม่ใช่ข้อมูลร้านจริงหรือคำแนะนำสำหรับการเดินทาง
              </p>
            </div>
          </>
        )}
      </dialog>
    </>
  );
}
