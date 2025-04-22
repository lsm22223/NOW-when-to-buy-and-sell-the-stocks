import { ArrowLeft, Filter, LineChart, Search } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function NewsSummaryFeed() {
  // 예시 뉴스 데이터
  const newsData = [
    {
      id: 1,
      title: "삼성전자, 2분기 실적 예상치 상회. 반도체 부문 회복세 뚜렷.",
      summary:
        "삼성전자가 발표한 2분기 실적이 시장 예상치를 크게 상회했습니다. 특히 반도체 부문의 회복세가 뚜렷하게 나타나며 전체 실적을 견인했습니다. 메모리 반도체 가격 상승과 AI 관련 수요 증가가 주요 원인으로 분석됩니다.",
      source: "한국경제",
      time: "1시간 전",
      sentiment: "positive",
      relatedStocks: ["삼성전자", "SK하이닉스"],
      url: "#",
    },
    {
      id: 2,
      title: "현대차, 글로벌 공급망 이슈로 생산량 감소 예상. 주가 하락.",
      summary:
        "현대자동차가 글로벌 공급망 문제로 인해 3분기 생산량 감소가 예상된다고 밝혔습니다. 특히 반도체 부품 수급 문제가 지속되면서 일부 모델의 생산 일정이 지연될 것으로 보입니다. 이에 따라 현대차 주가는 오늘 4.1% 하락했습니다.",
      source: "매일경제",
      time: "2시간 전",
      sentiment: "negative",
      relatedStocks: ["현대차", "기아"],
      url: "#",
    },
    {
      id: 3,
      title: "한국은행, 기준금리 동결 결정. 경기 회복 신호 기다린다.",
      summary:
        "한국은행 금융통화위원회가 오늘 기준금리를 현행 3.50%로 동결하기로 결정했습니다. 한국은행은 현재의 긴축 기조를 유지하면서 경기 회복 신호를 기다리겠다는 입장을 밝혔습니다. 시장에서는 올해 하반기 금리 인하 가능성에 주목하고 있습니다.",
      source: "서울경제",
      time: "3시간 전",
      sentiment: "neutral",
      relatedStocks: ["KB금융", "신한지주", "하나금융"],
      url: "#",
    },
    {
      id: 4,
      title: "네이버, 클라우드 사업 확대 계획 발표. AI 서비스 강화.",
      summary:
        "네이버가 클라우드 사업 확대 계획을 발표했습니다. 향후 3년간 2조원을 투자해 AI 기반 클라우드 서비스를 강화하고 글로벌 시장 진출을 가속화할 예정입니다. 이번 발표 후 네이버 주가는 2.9% 상승했습니다.",
      source: "디지털타임스",
      time: "4시간 전",
      sentiment: "positive",
      relatedStocks: ["네이버", "카카오"],
      url: "#",
    },
    {
      id: 5,
      title: "LG전자, 가전 부문 실적 부진으로 주가 하락.",
      summary:
        "LG전자가 가전 부문의 실적 부진으로 인해 주가가 하락했습니다. 글로벌 경기 침체로 인한 소비자 가전 수요 감소가 주요 원인으로 분석됩니다. 다만 자동차 부품 사업은 성장세를 유지하고 있어 향후 실적 개선 가능성이 있습니다.",
      source: "아시아경제",
      time: "5시간 전",
      sentiment: "negative",
      relatedStocks: ["LG전자"],
      url: "#",
    },
  ]

  return (
    <div className="flex min-h-screen w-full flex-col">
      <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">뒤로 가기</span>
          </Link>
        </Button>
        <div className="flex items-center gap-2">
          <LineChart className="h-6 w-6" />
          <span className="text-lg font-semibold">뉴스 요약</span>
        </div>
        <div className="ml-auto flex items-center gap-4">
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
            <span className="sr-only">필터</span>
          </Button>
        </div>
      </header>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold">뉴스 요약 피드</h1>
          <p className="text-muted-foreground">금융 뉴스를 요약하여 보여주는 타임라인입니다.</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="키워드, 주식명, 또는 출처로 검색" className="pl-8" />
          </div>
        </div>
        <Tabs defaultValue="all">
          <TabsList className="mb-4">
            <TabsTrigger value="all">전체</TabsTrigger>
            <TabsTrigger value="positive">긍정적</TabsTrigger>
            <TabsTrigger value="neutral">중립적</TabsTrigger>
            <TabsTrigger value="negative">부정적</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="space-y-4">
            {newsData.map((news) => (
              <Card key={news.id}>
                <CardContent className="p-4">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <div
                        className={`h-2 w-2 rounded-full ${
                          news.sentiment === "positive"
                            ? "bg-green-500"
                            : news.sentiment === "negative"
                              ? "bg-red-500"
                              : "bg-yellow-500"
                        }`}
                      />
                      <span className="text-sm font-medium">{news.source}</span>
                      <span className="text-xs text-muted-foreground">{news.time}</span>
                    </div>
                    <h3 className="font-semibold">{news.title}</h3>
                    <p className="text-sm text-muted-foreground">{news.summary}</p>
                    <div className="flex flex-wrap gap-2 pt-2">
                      {news.relatedStocks.map((stock, index) => (
                        <Link
                          key={index}
                          href={`/stocks/${stock}`}
                          className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors hover:bg-muted"
                        >
                          {stock}
                        </Link>
                      ))}
                    </div>
                    <div className="pt-2">
                      <Link href={news.url} className="text-xs text-blue-500 hover:underline">
                        원문 보기
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
          <TabsContent value="positive" className="space-y-4">
            {newsData
              .filter((news) => news.sentiment === "positive")
              .map((news) => (
                <Card key={news.id}>
                  <CardContent className="p-4">
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-green-500" />
                        <span className="text-sm font-medium">{news.source}</span>
                        <span className="text-xs text-muted-foreground">{news.time}</span>
                      </div>
                      <h3 className="font-semibold">{news.title}</h3>
                      <p className="text-sm text-muted-foreground">{news.summary}</p>
                      <div className="flex flex-wrap gap-2 pt-2">
                        {news.relatedStocks.map((stock, index) => (
                          <Link
                            key={index}
                            href={`/stocks/${stock}`}
                            className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors hover:bg-muted"
                          >
                            {stock}
                          </Link>
                        ))}
                      </div>
                      <div className="pt-2">
                        <Link href={news.url} className="text-xs text-blue-500 hover:underline">
                          원문 보기
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </TabsContent>
          <TabsContent value="neutral" className="space-y-4">
            {newsData
              .filter((news) => news.sentiment === "neutral")
              .map((news) => (
                <Card key={news.id}>
                  <CardContent className="p-4">
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-yellow-500" />
                        <span className="text-sm font-medium">{news.source}</span>
                        <span className="text-xs text-muted-foreground">{news.time}</span>
                      </div>
                      <h3 className="font-semibold">{news.title}</h3>
                      <p className="text-sm text-muted-foreground">{news.summary}</p>
                      <div className="flex flex-wrap gap-2 pt-2">
                        {news.relatedStocks.map((stock, index) => (
                          <Link
                            key={index}
                            href={`/stocks/${stock}`}
                            className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors hover:bg-muted"
                          >
                            {stock}
                          </Link>
                        ))}
                      </div>
                      <div className="pt-2">
                        <Link href={news.url} className="text-xs text-blue-500 hover:underline">
                          원문 보기
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </TabsContent>
          <TabsContent value="negative" className="space-y-4">
            {newsData
              .filter((news) => news.sentiment === "negative")
              .map((news) => (
                <Card key={news.id}>
                  <CardContent className="p-4">
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-red-500" />
                        <span className="text-sm font-medium">{news.source}</span>
                        <span className="text-xs text-muted-foreground">{news.time}</span>
                      </div>
                      <h3 className="font-semibold">{news.title}</h3>
                      <p className="text-sm text-muted-foreground">{news.summary}</p>
                      <div className="flex flex-wrap gap-2 pt-2">
                        {news.relatedStocks.map((stock, index) => (
                          <Link
                            key={index}
                            href={`/stocks/${stock}`}
                            className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors hover:bg-muted"
                          >
                            {stock}
                          </Link>
                        ))}
                      </div>
                      <div className="pt-2">
                        <Link href={news.url} className="text-xs text-blue-500 hover:underline">
                          원문 보기
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
