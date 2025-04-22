import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingDown, TrendingUp, AlertTriangle } from "lucide-react"
import Link from "next/link"
import { StockSparkline } from "./stock-sparkline"

interface HoldingStock {
  name: string
  symbol: string
  quantity: number
  avgPrice: number
  currentPrice: number
  profit: number
  profitPercentage: number
  priceHistory?: number[] // 주가 히스토리 데이터 추가
  isHighestPrice: boolean
  highestPrice: {
    price: number
    date: string
  }
}

interface HoldingStocksProps {
  stocks: HoldingStock[]
}

export function HoldingStocks({ stocks }: HoldingStocksProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>보유 주식</CardTitle>
        <CardDescription>{stocks.length}개의 종목을 보유하고 있습니다</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {stocks.map((stock, index) => (
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
                  <span className="text-xs text-muted-foreground ml-2">{stock.symbol}</span>
                </Link>
                <div className="flex items-center gap-4">
                  {stock.priceHistory && (
                    <StockSparkline data={stock.priceHistory} color={stock.profit >= 0 ? "#22c55e" : "#ef4444"} />
                  )}
                  <div className="flex items-center gap-2">
                    <span className={`${stock.profit >= 0 ? "text-green-500" : "text-red-500"}`}>
                      {stock.profit >= 0 ? (
                        <TrendingUp className="h-4 w-4 inline mr-1" />
                      ) : (
                        <TrendingDown className="h-4 w-4 inline mr-1" />
                      )}
                      {stock.profitPercentage.toFixed(2)}%
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm mb-2">
                <span className="text-muted-foreground">보유수량:</span>
                <span>{stock.quantity}주</span>
                <span className="text-muted-foreground">평균단가:</span>
                <span>{stock.avgPrice.toLocaleString()}원</span>
                <span className="text-muted-foreground">현재가:</span>
                <span>{stock.currentPrice.toLocaleString()}원</span>
                <span className="text-muted-foreground">평가손익:</span>
                <span className={stock.profit >= 0 ? "text-green-500" : "text-red-500"}>
                  {stock.profit.toLocaleString()}원
                </span>
              </div>

              {stock.isHighestPrice && (
                <div className="mt-3 bg-yellow-50 border border-yellow-200 rounded-md p-3 flex items-start gap-2">
                  <AlertTriangle className="h-5 w-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-yellow-800">매도 추천</p>
                    <p className="text-sm text-yellow-700">
                      현재 주가({stock.currentPrice.toLocaleString()}원)가 역대 고점을 기록하고 있습니다. 일부 수익
                      실현을 고려해보세요.
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
