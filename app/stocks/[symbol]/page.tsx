"use client"

import { useEffect, useState } from "react"
import { ArrowLeft, LineChart, TrendingDown, TrendingUp } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { StockAlertLog } from "@/components/stock-alert-log"
import { StockMetrics } from "@/components/stock-metrics"
import { StockRelatedNews } from "@/components/stock-related-news"
import { MarketNews } from "@/components/market-news"

interface StockDetailProps {
  params: {
    symbol: string
  }
}

export default function StockDetail({ params }: StockDetailProps) {
  const [stockData, setStockData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [alertLogs, setAlertLogs] = useState<any[]>([])
  const [orderNumber, setOrderNumber] = useState<number>(1)

  // 주식 데이터 가져오기 (실제 구현에서는 API 호출)
  useEffect(() => {
    // 예시 데이터 - 실제 구현에서는 API에서 가져옵니다
    const fetchData = async () => {
      setLoading(true)

      // 실제 구현에서는 API 호출
      // const response = await fetch(`/api/stocks/${params.symbol}`);
      // const data = await response.json();

      // 주식 심볼에 따른 순서 번호 설정
      const orderMap: { [key: string]: number } = {
        "005930": 1, // 삼성전자
        "035420": 2, // 네이버
        "035720": 3, // 카카오
        AAPL: 1, // 애플
        TSLA: 2, // 테슬라
        NVDA: 3, // 엔비디아
      }

      setOrderNumber(orderMap[params.symbol] || 1)

      // 예시 데이터
      const mockData = {
        name: getStockName(params.symbol),
        symbol: params.symbol,
        price: getStockPrice(params.symbol),
        currency: isKoreanStock(params.symbol) ? "KRW" : "USD",
        change: 2.1,
        volume: "12,345,678",
        marketCap: isKoreanStock(params.symbol) ? "465조 원" : "$2.9T",
        highestPrice: {
          price: getHighestPrice(params.symbol),
          date: "2023-05-15",
          dropPercentage: 8.24,
        },
        dividend: {
          yield: isKoreanStock(params.symbol) ? 2.1 : 0.5,
          targetYield: isKoreanStock(params.symbol) ? 2.5 : 0.7,
          nextExDate: "2023-12-15",
        },
        indicators: {
          macd: {
            value: 1.23,
            signal: 0.98,
            histogram: 0.25,
            trend: "bullish",
          },
          rsi: {
            value: 58,
            previousValue: 48,
            trend: "상승",
            isBreakout: true,
          },
        },
      }

      setStockData(mockData)

      // 알림 로그 생성
      const logs = generateAlertLogs(mockData, params.symbol)
      setAlertLogs(logs)

      setLoading(false)
    }

    fetchData()
  }, [params.symbol])

  // 주식 심볼에 따른 이름 반환
  function getStockName(symbol: string): string {
    const stockNames: { [key: string]: string } = {
      "005930": "삼성전자",
      "035420": "네이버",
      "035720": "카카오",
      AAPL: "Apple Inc.",
      TSLA: "Tesla Inc.",
      NVDA: "NVIDIA Corp.",
    }
    return stockNames[symbol] || symbol
  }

  // 주식 심볼에 따른 가격 반환
  function getStockPrice(symbol: string): number {
    const stockPrices: { [key: string]: number } = {
      "005930": 78000,
      "035420": 234500,
      "035720": 56700,
      AAPL: 187.32,
      TSLA: 243.64,
      NVDA: 487.85,
    }
    return stockPrices[symbol] || 100
  }

  // 주식 심볼에 따른 최고가 반환
  function getHighestPrice(symbol: string): number {
    const highestPrices: { [key: string]: number } = {
      "005930": 85000,
      "035420": 250000,
      "035720": 60000,
      AAPL: 198.23,
      TSLA: 265.75,
      NVDA: 502.66,
    }
    return highestPrices[symbol] || 110
  }

  // 한국 주식인지 확인
  function isKoreanStock(symbol: string): boolean {
    return /^\d+$/.test(symbol)
  }

  // 알림 로그 생성 함수 (예시용)
  function generateAlertLogs(stockData: any, symbol: string) {
    const logs = []
    const today = new Date()
    const currency = isKoreanStock(symbol) ? "원" : "$"
    const priceFormat = isKoreanStock(symbol)
      ? (price: number) => `${price.toLocaleString()}원`
      : (price: number) => `${price}`

    // RSI 상향돌파 알림
    if (stockData.indicators.rsi.isBreakout) {
      logs.push({
        type: "rsi_breakout",
        message: `RSI 상향돌파 감지: ${stockData.indicators.rsi.previousValue} → ${stockData.indicators.rsi.value}`,
        indicator: "RSI",
        timestamp: new Date(today.getTime() - 2 * 60 * 60 * 1000).toISOString(),
        severity: "medium",
      })
    }

    // 고점 대비 하락률 알림 (20% 이상인 경우만)
    if (stockData.highestPrice.dropPercentage > 20) {
      logs.push({
        type: "price_drop",
        message: `고점(${stockData.highestPrice.date}) 대비 ${stockData.highestPrice.dropPercentage.toFixed(2)}% 하락`,
        indicator: "가격",
        timestamp: new Date(today.getTime() - 5 * 60 * 60 * 1000).toISOString(),
        severity: "high",
      })
    }

    // 목표 배당률 접근 알림
    const yieldDiff = stockData.dividend.targetYield - stockData.dividend.yield
    if (yieldDiff > 0 && yieldDiff < 0.5) {
      logs.push({
        type: "dividend_target",
        message: `목표 배당률(${stockData.dividend.targetYield}%)에 ${yieldDiff.toFixed(2)}% 차이로 접근 중`,
        indicator: "배당",
        timestamp: new Date(today.getTime() - 8 * 60 * 60 * 1000).toISOString(),
        severity: "low",
      })
    }

    // MACD 골든크로스 알림
    if (stockData.indicators.macd.trend === "bullish") {
      logs.push({
        type: "macd_golden_cross",
        message: "MACD 골든크로스 발생: 상승 추세 전환 가능성",
        indicator: "MACD",
        timestamp: new Date(today.getTime() - 12 * 60 * 60 * 1000).toISOString(),
        severity: "medium",
      })
    }

    // 미국 주식인 경우 추가 알림
    if (!isKoreanStock(symbol)) {
      // RSI 과매수 알림 (NVDA)
      if (symbol === "NVDA") {
        logs.push({
          type: "rsi_overbought",
          message: "RSI 과매수 구간 진입 (78)",
          indicator: "RSI",
          timestamp: new Date(today.getTime() - 3 * 60 * 60 * 1000).toISOString(),
          severity: "high",
        })
      }

      // 고점 대비 하락률 알림 (TSLA)
      if (symbol === "TSLA") {
        logs.push({
          type: "price_drop",
          message: "고점 대비 25% 하락",
          indicator: "가격",
          timestamp: new Date(today.getTime() - 7 * 60 * 60 * 1000).toISOString(),
          severity: "medium",
        })
      }
    }

    return logs.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
  }

  if (loading) {
    return (
      <div className="flex min-h-screen w-full flex-col items-center justify-center">
        <p>로딩 중...</p>
      </div>
    )
  }

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
          <span className="text-lg font-semibold">주식 상세</span>
        </div>
        <div className="ml-auto"></div>
      </header>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-muted">
                <span className="font-bold text-lg">{orderNumber}</span>
              </div>
              <h1 className="text-3xl font-bold">{stockData.name}</h1>
            </div>
            <div className="flex items-center gap-2">
              <span className={`text-2xl font-bold ${stockData.change > 0 ? "text-green-500" : "text-red-500"}`}>
                {stockData.currency === "KRW" ? `${stockData.price.toLocaleString()}원` : `$${stockData.price}`}
              </span>
              <span className={`text-sm ${stockData.change > 0 ? "text-green-500" : "text-red-500"}`}>
                {stockData.change > 0 ? (
                  <TrendingUp className="h-4 w-4 inline mr-1" />
                ) : (
                  <TrendingDown className="h-4 w-4 inline mr-1" />
                )}
                {stockData.change > 0 ? "+" : ""}
                {stockData.change}%
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">{stockData.symbol}</span>
            <span className="text-sm text-muted-foreground">|</span>
            <span className="text-sm text-muted-foreground">{stockData.currency === "KRW" ? "KOSPI" : "NASDAQ"}</span>
          </div>
        </div>

        <StockMetrics stockData={stockData} />

        <Tabs defaultValue="alerts" className="space-y-4">
          <TabsList>
            <TabsTrigger value="alerts">알림 로그</TabsTrigger>
            <TabsTrigger value="stock-news">관련 뉴스</TabsTrigger>
            <TabsTrigger value="market-news">시장 뉴스</TabsTrigger>
          </TabsList>

          <TabsContent value="alerts" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>알림 로그</CardTitle>
                <CardDescription>주요 지표 변화에 따른 알림 기록</CardDescription>
              </CardHeader>
              <CardContent>
                <StockAlertLog logs={alertLogs} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="stock-news" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>개별 주식 관련 뉴스</CardTitle>
                <CardDescription>{stockData.name}에 직접적으로 관련된 최신 뉴스</CardDescription>
              </CardHeader>
              <CardContent>
                <StockRelatedNews stockSymbol={params.symbol} stockName={stockData.name} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="market-news" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>시장 영향 뉴스</CardTitle>
                <CardDescription>{stockData.name}이(가) 포함된 시장 및 산업에 영향을 주는 뉴스</CardDescription>
              </CardHeader>
              <CardContent>
                <MarketNews stockSymbol={params.symbol} stockName={stockData.name} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
