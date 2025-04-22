import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface MarketNewsProps {
  stockSymbol: string
  stockName: string
}

export function MarketNews({ stockSymbol, stockName }: MarketNewsProps) {
  // 실제 구현에서는 API에서 뉴스를 가져옵니다
  // 여기서는 예시 데이터를 사용합니다
  const newsData = [
    {
      id: 1,
      title: "한국은행, 기준금리 동결 결정. 경기 회복 신호 기다린다.",
      summary:
        "한국은행 금융통화위원회가 오늘 기준금리를 현행 3.50%로 동결하기로 결정했습니다. 한국은행은 현재의 긴축 기조를 유지하면서 경기 회복 신호를 기다리겠다는 입장을 밝혔습니다. 시장에서는 올해 하반기 금리 인하 가능성에 주목하고 있습니다.",
      source: "서울경제",
      time: "3시간 전",
      category: "금리",
      impact: "high",
      url: "#",
    },
    {
      id: 2,
      title: `${getIndustry(stockSymbol)} 산업, 글로벌 공급망 이슈로 생산량 감소 예상`,
      summary: `${getIndustry(stockSymbol)} 산업이 글로벌 공급망 문제로 인해 3분기 생산량 감소가 예상된다고 업계 관계자들이 밝혔습니다. 특히 원자재 수급 문제가 지속되면서 일부 기업들의 생산 일정이 지연될 것으로 보입니다.`,
      source: "매일경제",
      time: "5시간 전",
      category: "산업",
      impact: "medium",
      url: "#",
    },
    {
      id: 3,
      title: `${getCompetitor(stockSymbol)}, 신기술 개발 성공. 시장 점유율 확대 전망`,
      summary: `${stockName}의 경쟁사인 ${getCompetitor(stockSymbol)}가 혁신적인 신기술 개발에 성공했다고 발표했습니다. 이번 기술 개발로 ${getCompetitor(stockSymbol)}의 시장 점유율이 확대될 것으로 전망되며, 업계 경쟁이 더욱 치열해질 것으로 예상됩니다.`,
      source: "아시아경제",
      time: "8시간 전",
      category: "경쟁사",
      impact: "high",
      url: "#",
    },
    {
      id: 4,
      title: "미 연준, 인플레이션 우려로 금리 인상 시사. 글로벌 시장 영향 주목",
      summary:
        "미국 연방준비제도(Fed)가 인플레이션 우려로 추가 금리 인상을 시사했습니다. 이에 따라 글로벌 금융시장의 변동성이 확대될 것으로 예상되며, 특히 신흥국 시장에 미치는 영향이 클 것으로 전망됩니다.",
      source: "한국경제",
      time: "12시간 전",
      category: "글로벌",
      impact: "high",
      url: "#",
    },
    {
      id: 5,
      title: `정부, ${getIndustry(stockSymbol)} 산업 지원 정책 발표. 세제 혜택 및 R&D 지원 확대`,
      summary: `정부가 ${getIndustry(stockSymbol)} 산업 경쟁력 강화를 위한 지원 정책을 발표했습니다. 주요 내용으로는 세제 혜택 확대, R&D 지원금 증액, 규제 완화 등이 포함되어 있으며, 업계에서는 이번 정책이 산업 성장에 긍정적인 영향을 미칠 것으로 기대하고 있습니다.`,
      source: "디지털타임스",
      time: "1일 전",
      category: "정책",
      impact: "medium",
      url: "#",
    },
  ]

  // 영향도에 따른 배지 색상 반환 - 톤 다운된 색상으로 변경
  function getImpactColor(impact: string): string {
    switch (impact) {
      case "high":
        return "bg-violet-400" // 높은 영향도는 부드러운 보라색으로 변경
      case "medium":
        return "bg-amber-400" // 중간 영향도는 부드러운 황색으로 변경
      default:
        return "bg-slate-400" // 낮은 영향도는 부드러운 슬레이트 색상으로 변경
    }
  }

  // 영향도에 따른 텍스트 반환
  function getImpactText(impact: string): string {
    switch (impact) {
      case "high":
        return "높음"
      case "medium":
        return "중간"
      default:
        return "낮음"
    }
  }

  // 카테고리에 따른 배지 색상 반환 - 톤 다운된 색상으로 변경
  function getCategoryColor(category: string): string {
    switch (category) {
      case "금리":
        return "bg-purple-400" // 부드러운 보라색
      case "산업":
        return "bg-cyan-400" // 부드러운 청록색
      case "경쟁사":
        return "bg-rose-300" // 부드러운 장미색
      case "글로벌":
        return "bg-indigo-300" // 부드러운 남색
      case "정책":
        return "bg-emerald-400" // 부드러운 에메랄드색
      default:
        return "bg-gray-400" // 부드러운 회색
    }
  }

  // 주식 심볼에 따른 산업 반환 (예시)
  function getIndustry(symbol: string): string {
    if (symbol === "005930") return "반도체"
    if (symbol === "AAPL") return "IT"
    return "전자"
  }

  // 주식 심볼에 따른 경쟁사 반환 (예시)
  function getCompetitor(symbol: string): string {
    if (symbol === "005930") return "SK하이닉스"
    if (symbol === "AAPL") return "삼성전자"
    return "LG전자"
  }

  return (
    <div className="space-y-4">
      {newsData.length > 0 ? (
        newsData.map((news) => (
          <Card key={news.id} className="overflow-hidden">
            <CardContent className="p-0">
              <div className="p-4 border-l-4 border-l-amber-200">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Badge className={`${getCategoryColor(news.category)} text-white`}>{news.category}</Badge>
                    <Badge className={`${getImpactColor(news.impact)} text-white`}>
                      영향도: {getImpactText(news.impact)}
                    </Badge>
                    <span className="text-sm font-medium">{news.source}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">{news.time}</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">{news.title}</h3>
                <p className="text-sm text-muted-foreground mb-3">{news.summary}</p>
                <a href={news.url} className="text-sm text-blue-500 hover:underline">
                  원문 보기 →
                </a>
              </div>
            </CardContent>
          </Card>
        ))
      ) : (
        <div className="flex items-center justify-center h-40">
          <p className="text-muted-foreground">관련 뉴스가 없습니다</p>
        </div>
      )}
    </div>
  )
}
