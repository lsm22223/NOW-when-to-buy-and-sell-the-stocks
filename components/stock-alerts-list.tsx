import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { TrendingDown, TrendingUp } from "lucide-react"
import { StockSparkline } from "./stock-sparkline"

interface Alert {
  type: string
  message: string
  indicator?: string
  timestamp: string
  severity: "low" | "medium" | "high"
}

interface Stock {
  name: string
  symbol: string
  logo?: string
  price: number
  change: number
  alerts: Alert[]
  priceHistory?: number[] // 주가 히스토리 데이터 추가
}

interface StockAlertsListProps {
  title: string
  stocks: Stock[]
}

export function StockAlertsList({ title, stocks }: StockAlertsListProps) {
  // 알림 타입에 따른 매수/매도 관련 여부를 반환하는 함수
  function getAlertActionType(type: string): { action: "매수" | "매도"; color: string } {
    switch (type) {
      case "price_drop":
      case "rsi_oversold":
      case "rsi_breakout":
      case "macd_golden_cross":
      case "price_target":
        return { action: "매수", color: "bg-sky-500" } // 매수는 하늘색으로 변경
      case "price_surge":
      case "rsi_overbought":
      case "macd_death_cross":
      case "price_highest":
        return { action: "매도", color: "bg-rose-500" } // 매도는 장미색으로 변경
      default:
        return { action: "매수", color: "bg-sky-500" }
    }
  }

  // 타임스탬프를 읽기 쉬운 형식으로 변환
  function formatTimestamp(timestamp: string): string {
    const date = new Date(timestamp)
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")} ${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{stocks.length}개의 종목에 알림이 있습니다</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {stocks.map((stock, index) => {
            // 각 주식의 최신 알림만 가져오기
            const latestAlert = stock.alerts && stock.alerts.length > 0 ? stock.alerts[0] : null
            const actionType = latestAlert
              ? getAlertActionType(latestAlert.type)
              : { action: "매수", color: "bg-sky-500" }

            return (
              <div key={stock.symbol} className="border-b pb-4 last:border-0 last:pb-0">
                <div className="flex items-center justify-between mb-2">
                  <Link
                    href={`/stocks/${stock.symbol}`}
                    className="flex items-center gap-3 font-medium text-lg hover:underline"
                  >
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-muted">
                      <span className="font-semibold text-sm">{index + 1}</span>
                    </div>
                    {stock.name}
                    <span className="text-xs text-muted-foreground">{stock.symbol}</span>
                  </Link>
                  <div className="flex items-center gap-4">
                    {stock.priceHistory && (
                      <StockSparkline data={stock.priceHistory} color={stock.change >= 0 ? "#22c55e" : "#ef4444"} />
                    )}
                    <div className="flex items-center gap-2">
                      <span className={stock.change > 0 ? "text-green-500" : "text-red-500"}>
                        {stock.change > 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                      </span>
                      <span className={stock.change > 0 ? "text-green-500" : "text-red-500"}>
                        {stock.change > 0 ? "+" : ""}
                        {stock.change}%
                      </span>
                    </div>
                  </div>
                </div>

                {latestAlert ? (
                  <div className="flex items-start gap-3 mt-2">
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Badge className={`${actionType.color} text-white`}>{actionType.action}</Badge>
                          {latestAlert.indicator && (
                            <Badge variant="outline" className="text-xs">
                              {latestAlert.indicator}
                            </Badge>
                          )}
                        </div>
                        <span className="text-xs text-muted-foreground">{formatTimestamp(latestAlert.timestamp)}</span>
                      </div>
                      <p className="mt-1">{latestAlert.message}</p>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">알림이 없습니다</p>
                )}
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
