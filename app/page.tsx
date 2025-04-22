"use client"

import { useState } from "react"
import { LineChart } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { StockAlertsList } from "@/components/stock-alerts-list"
import { HoldingStocks } from "@/components/holding-stocks"
import { StockManagement } from "@/components/stock-management"
import { HoldingStockManagement } from "@/components/holding-stock-management"

// 주별 가격 데이터 생성 함수 (실제로는 API에서 가져옴)
function generatePriceHistory(basePrice: number, weeks = 12, trend: "up" | "down" | "volatile" = "volatile") {
  const data: number[] = []
  let price = basePrice

  for (let i = 0; i < weeks; i++) {
    // 추세에 따라 다른 변동 패턴 생성
    let change: number

    switch (trend) {
      case "up":
        change = Math.random() * 0.05 + 0.01 // 1~6% 상승
        break
      case "down":
        change = Math.random() * 0.05 + 0.01 // 1~6% 하락
        change = -change
        break
      case "volatile":
      default:
        change = Math.random() * 0.08 - 0.04 // -4~4% 변동
    }

    price = price * (1 + change)
    data.push(price)
  }

  return data
}

export default function Dashboard() {
  // 초기 데이터 설정
  const initialKoreanStocks = [
    {
      name: "삼성전자",
      symbol: "005930",
      price: 78000,
      change: 2.1,
      priceHistory: generatePriceHistory(75000, 12, "up"),
      alerts: [
        {
          type: "rsi_oversold",
          message: "RSI 과매도 구간 진입 (28)",
          indicator: "RSI",
          timestamp: "2023-07-15T10:30:00Z",
          severity: "medium",
        },
      ],
      selected: false,
    },
    {
      name: "네이버",
      symbol: "035420",
      price: 234500,
      change: 2.9,
      priceHistory: generatePriceHistory(220000, 12, "up"),
      alerts: [
        {
          type: "price_drop",
          message: "고점 대비 22% 하락",
          indicator: "가격",
          timestamp: "2023-07-15T09:45:00Z",
          severity: "low",
        },
      ],
      selected: false,
    },
    {
      name: "카카오",
      symbol: "035720",
      price: 56700,
      change: 3.8,
      priceHistory: generatePriceHistory(52000, 12, "volatile"),
      alerts: [
        {
          type: "macd_golden_cross",
          message: "MACD 골든크로스 발생",
          indicator: "MACD",
          timestamp: "2023-07-15T11:20:00Z",
          severity: "medium",
        },
      ],
      selected: false,
    },
  ]

  const initialUsStocks = [
    {
      name: "애플",
      symbol: "AAPL",
      price: 187.32,
      change: 1.2,
      priceHistory: generatePriceHistory(180, 12, "up"),
      alerts: [
        {
          type: "price_target",
          message: "목표가 $200 도달 가능성",
          indicator: "가격",
          timestamp: "2023-07-15T14:10:00Z",
          severity: "low",
        },
      ],
      selected: false,
    },
    {
      name: "테슬라",
      symbol: "TSLA",
      price: 243.64,
      change: -2.3,
      priceHistory: generatePriceHistory(260, 12, "down"),
      alerts: [
        {
          type: "price_drop",
          message: "고점 대비 25% 하락",
          indicator: "가격",
          timestamp: "2023-07-15T16:05:00Z",
          severity: "medium",
        },
      ],
      selected: false,
    },
    {
      name: "엔비디아",
      symbol: "NVDA",
      price: 487.85,
      change: 3.2,
      priceHistory: generatePriceHistory(450, 12, "up"),
      alerts: [
        {
          type: "rsi_overbought",
          message: "RSI 과매수 구간 진입 (78)",
          indicator: "RSI",
          timestamp: "2023-07-15T13:45:00Z",
          severity: "high",
        },
      ],
      selected: false,
    },
  ]

  // 보유 주식 데이터
  const initialHoldingStocks = [
    {
      name: "삼성전자",
      symbol: "005930",
      quantity: 100,
      avgPrice: 65000,
      currentPrice: 78000,
      profit: 1300000,
      profitPercentage: 20,
      priceHistory: generatePriceHistory(75000, 12, "up"),
      isHighestPrice: true,
      highestPrice: {
        price: 78000,
        date: "2023-07-15",
      },
      purchaseDate: "2023-01-15",
    },
    {
      name: "애플",
      symbol: "AAPL",
      quantity: 50,
      avgPrice: 150.25,
      currentPrice: 187.32,
      profit: 1853.5,
      profitPercentage: 24.67,
      priceHistory: generatePriceHistory(180, 12, "up"),
      isHighestPrice: false,
      highestPrice: {
        price: 198.23,
        date: "2023-05-15",
      },
      purchaseDate: "2023-02-10",
    },
    {
      name: "네이버",
      symbol: "035420",
      quantity: 20,
      avgPrice: 220000,
      currentPrice: 234500,
      profit: 290000,
      profitPercentage: 6.59,
      priceHistory: generatePriceHistory(220000, 12, "volatile"),
      isHighestPrice: true,
      highestPrice: {
        price: 234500,
        date: "2023-07-15",
      },
      purchaseDate: "2023-03-22",
    },
  ]

  // 상태 관리
  const [koreanStocks, setKoreanStocks] = useState(initialKoreanStocks)
  const [usStocks, setUsStocks] = useState(initialUsStocks)
  const [holdingStocks, setHoldingStocks] = useState(initialHoldingStocks)
  const [activeTab, setActiveTab] = useState("all")
  const [isManageMode, setIsManageMode] = useState(false)

  // 모든 주식 목록 (한국 + 미국)
  // const allStocks = [...koreanStocks, ...usStocks]

  return (
    <div className="flex min-h-screen w-full flex-col">
      <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <div className="flex items-center gap-2">
          <LineChart className="h-6 w-6" />
          <span className="text-lg font-semibold">내 주식 대시보드</span>
        </div>
        <div className="ml-auto flex items-center gap-4">
          <Button
            variant={isManageMode ? "default" : "outline"}
            size="sm"
            onClick={() => setIsManageMode(!isManageMode)}
          >
            {isManageMode ? "보기 모드" : "관리 모드"}
          </Button>
          <Button variant="outline" size="sm" asChild>
            <Link href="/settings/user">설정</Link>
          </Button>
        </div>
      </header>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div>
          <h1 className="text-3xl font-bold">주식 알림 모니터링</h1>
          <p className="text-muted-foreground">종목별 최신 알림과 보유 주식 현황을 확인하세요.</p>
        </div>

        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList>
            <TabsTrigger value="all">전체</TabsTrigger>
            <TabsTrigger value="korean">한국주식</TabsTrigger>
            <TabsTrigger value="us">미국주식</TabsTrigger>
            <TabsTrigger value="holdings">보유주식</TabsTrigger>
          </TabsList>

          {!isManageMode ? (
            <>
              <TabsContent value="all" className="space-y-4">
                <StockAlertsList title="한국주식 알림" stocks={koreanStocks} />
                <StockAlertsList title="미국주식 알림" stocks={usStocks} />
              </TabsContent>

              <TabsContent value="korean" className="space-y-4">
                <StockAlertsList title="한국주식 알림" stocks={koreanStocks} />
              </TabsContent>

              <TabsContent value="us" className="space-y-4">
                <StockAlertsList title="미국주식 알림" stocks={usStocks} />
              </TabsContent>

              <TabsContent value="holdings" className="space-y-4">
                <HoldingStocks stocks={holdingStocks} />
              </TabsContent>
            </>
          ) : (
            <>
              <TabsContent value="all" className="space-y-4">
                <StockManagement
                  title="한국주식 관리"
                  description="관심있는 한국 주식을 추가하고 관리합니다."
                  stocks={koreanStocks}
                  onStocksChange={setKoreanStocks}
                />
                <StockManagement
                  title="미국주식 관리"
                  description="관심있는 미국 주식을 추가하고 관리합니다."
                  stocks={usStocks}
                  onStocksChange={setUsStocks}
                />
              </TabsContent>

              <TabsContent value="korean" className="space-y-4">
                <StockManagement
                  title="한국주식 관리"
                  description="관심있는 한국 주식을 추가하고 관리합니다."
                  stocks={koreanStocks}
                  onStocksChange={setKoreanStocks}
                />
              </TabsContent>

              <TabsContent value="us" className="space-y-4">
                <StockManagement
                  title="미국주식 관리"
                  description="관심있는 미국 주식을 추가하고 관리합니다."
                  stocks={usStocks}
                  onStocksChange={setUsStocks}
                />
              </TabsContent>

              <TabsContent value="holdings" className="space-y-4">
                <HoldingStockManagement stocks={holdingStocks} onStocksChange={setHoldingStocks} />
              </TabsContent>
            </>
          )}
        </Tabs>
      </main>
    </div>
  )
}
