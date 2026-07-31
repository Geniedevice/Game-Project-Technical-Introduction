import { ImageResponse } from "next/og";
import { site } from "@/content/site";
import { series, totalPostCount } from "@/content/til";

/**
 * 링크를 공유했을 때 뜨는 미리보기 카드. 빌드 시 PNG로 생성됩니다.
 *
 * `opengraph-image.tsx` 파일 컨벤션 대신 확장자가 붙는 라우트를 쓰는 이유:
 * 그 컨벤션은 확장자 없는 파일(/opengraph-image)로 내보내는데,
 * GitHub Pages는 확장자로 Content-Type을 판단해 image/png로 응답하지 않습니다.
 * 그러면 카카오톡·트위터 미리보기가 깨집니다.
 */
export const dynamic = "force-static";

const size = { width: 1200, height: 630 };

// 기본 폰트가 한글을 담지 못해 로마자로 구성합니다
const stats = [
  { label: "Records", value: String(totalPostCount) },
  { label: "Algorithms", value: String(series.find((s) => s.id === "algo")?.posts.length ?? 0) },
  { label: "GAS Notes", value: String(series.find((s) => s.id === "gas")?.posts.length ?? 0) },
];

export function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#1d1d1f",
          padding: 80,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              color: "#2997ff",
              fontSize: 24,
              letterSpacing: 4,
            }}
          >
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: 999,
                backgroundColor: "#2997ff",
              }}
            />
            TECHNICAL INTRODUCTION
          </div>

          <div
            style={{
              display: "flex",
              color: "#ffffff",
              fontSize: 88,
              fontWeight: 600,
              letterSpacing: -2,
            }}
          >
            {site.nameEn}
          </div>

          <div style={{ display: "flex", color: "#cccccc", fontSize: 36 }}>
            {site.role}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            borderTop: "1px solid rgba(255,255,255,0.15)",
            paddingTop: 36,
          }}
        >
          <div style={{ display: "flex", gap: 64 }}>
            {stats.map((s) => (
              <div
                key={s.label}
                style={{ display: "flex", flexDirection: "column", gap: 6 }}
              >
                <div style={{ display: "flex", color: "#7a7a7a", fontSize: 22 }}>
                  {s.label}
                </div>
                <div
                  style={{
                    display: "flex",
                    color: "#ffffff",
                    fontSize: 44,
                    fontWeight: 600,
                  }}
                >
                  {s.value}
                </div>
              </div>
            ))}
          </div>

          <div style={{ display: "flex", color: "#7a7a7a", fontSize: 24 }}>
            Unreal Engine · C++ · GAS
          </div>
        </div>
      </div>
    ),
    size,
  );
}
