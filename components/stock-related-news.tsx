import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface StockRelatedNewsProps {
  stockSymbol: string
  stockName: string
}

export function StockRelatedNews({ stockSymbol, stockName }: StockRelatedNewsProps) {
  // 실제 구현에서는 API에서 뉴스를 가져옵니다
  // 여기서는 예시 데이터를 사용합니다
  const newsData = [
    {
      id: 1,
      title: `${stockName}, 2분기 실적 예상치 상회. 영업이익 전년 대비 15% 증가`,
      summary: `${stockName}가 발표한 2분기 실적이 시장 예상치를 크게 상회했습니다. 특히 주력 사업 부문의 성장이 두드러졌으며, 영업이익은 전년 대비 15% 증가했습니다. 회사 측은 하반기에도 견조한 성장세를 유지할 것으로 전망했습니다.`,
      source: "한국경제",
      time: "2시간 전",
      sentiment: "positive",
      url: "#",
    },
    {
      id: 2,
      title: `${stockName}, 신규 제품 라인업 공개. 시장 반응 긍정적`,
      summary: `${stockName}가 어제 신규 제품 라인업을 공개했습니다. 혁신적인 기술과 디자인으로 시장의 반응이 매우 긍정적입니다. 애널리스트들은 이번 신제품이 회사의 매출 성장에 크게 기여할 것으로 전망하고 있습니다.`,
      source: "매일경제",
      time: "5시간 전",
      sentiment: "positive",
      url: "#",
    },
    {
      id: 3,
      title: `${stockName}, 해외 시장 확대 전략 발표. 아시아 지역 중심으로 투자 확대`,
      summary: `${stockName}가 해외 시장 확대 전략을 발표했습니다. 특히 아시아 지역을 중심으로 투자를 확대할 계획이며, 향후 5년간 해외 매출 비중을 현재 30%에서 50%까지 늘릴 계획입니다.`,
      source: "서울경제",
      time: "8시간 전",
      sentiment: "neutral",
      url: "#",
    },
    {
      id: 4,
      title: `${stockName} 임원진 인터뷰: "AI 기술 도입으로 생산성 20% 향상 기대"`,
      summary: `${stockName}의 최고기술책임자(CTO)는 최근 인터뷰에서 AI 기술 도입으로 생산성이 20% 향상될 것으로 기대한다고 밝혔습니다. 회사는 올해 AI 관련 연구개발에 전년 대비 두 배 많은 예산을 투자할 계획입니다.`,
      source: "디지털타임스",
      time: "12시간 전",
      sentiment: "positive",
      url: "#",
    },
    {
      id: 5,
      title: `${stockName}, 일부 제품 리콜 발표. 품질 이슈로 주가 하락 압박`,
      summary: `${stockName}가 일부 제품의 품질 이슈로 리콜을 발표했습니다. 이번 리콜은 전체 제품의 약 5%에 해당하며, 회사 측은 고객 안전을 위한 선제적 조치라고 설명했습니다. 그러나 시장에서는 이번 이슈가 단기적으로 주가에 부정적 영향을 줄 것으로 전망하고 있습니다.`,
      source: "아시아경제",
      time: "1일 전",
      sentiment: "negative",
      url: "#",
    },
  ]

  // 뉴스 감정에 따른 배지 색상 반환 - 톤 다운된 색상으로 변경
  function getSentimentColor(sentiment: string): string {
    switch (sentiment) {
      case "positive":
        return "bg-teal-400" // 부드러운 청록색으로 변경
      case "negative":
        return "bg-amber-500" // 부드러운 주황색으로 변경
      default:
        return "bg-slate-400" // 부드러운 회색으로 변경
    }
  }

  // 뉴스 감정에 따른 텍스트 반환
  function getSentimentText(sentiment: string): string {
    switch (sentiment) {
      case "positive":
        return "긍정"
      case "negative":
        return "부정"
      default:
        return "중립"
    }
  }

  return (
    <div className="space-y-4">
      {newsData.length > 0 ? (
        newsData.map((news) => (
          <Card key={news.id} className="overflow-hidden">
            <CardContent className="p-0">
              <div className="p-4 border-l-4 border-l-teal-200">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Badge className={`${getSentimentColor(news.sentiment)} text-white`}>
                      {getSentimentText(news.sentiment)}
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
