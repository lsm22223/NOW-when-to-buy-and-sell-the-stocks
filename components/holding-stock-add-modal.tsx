"use client"

import type React from "react"

import { useState } from "react"
import { X } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"

interface HoldingStockAddModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onAddStock: (symbol: string, quantity: number, purchaseDate: string) => void
}

export function HoldingStockAddModal({ open, onOpenChange, onAddStock }: HoldingStockAddModalProps) {
  const [symbol, setSymbol] = useState("")
  const [quantity, setQuantity] = useState("")
  const [purchaseDate, setPurchaseDate] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!symbol.trim()) {
      toast({
        title: "티커 심볼을 입력하세요",
        variant: "destructive",
      })
      return
    }

    if (!quantity || Number.parseInt(quantity) <= 0) {
      toast({
        title: "유효한 수량을 입력하세요",
        variant: "destructive",
      })
      return
    }

    if (!purchaseDate) {
      toast({
        title: "매수 날짜를 입력하세요",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      // 실제 구현에서는 API를 통해 심볼 유효성 검사 및 해당 날짜의 가격 조회
      // 여기서는 간단히 시뮬레이션합니다
      await new Promise((resolve) => setTimeout(resolve, 500))

      onAddStock(symbol.toUpperCase(), Number.parseInt(quantity), purchaseDate)

      // 입력 필드 초기화
      setSymbol("")
      setQuantity("")
      setPurchaseDate("")

      onOpenChange(false)

      toast({
        title: "보유주식이 추가되었습니다",
        description: `${symbol.toUpperCase()} ${quantity}주가 보유주식에 추가되었습니다.`,
      })
    } catch (error) {
      toast({
        title: "주식 추가 실패",
        description: "유효하지 않은 정보이거나 서버 오류가 발생했습니다.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>보유주식 추가</DialogTitle>
          <DialogDescription>
            보유하고 있는 주식의 정보를 입력하세요. 매수 날짜의 종가를 기준으로 평균 단가가 계산됩니다.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="holding-symbol">티커 심볼</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="holding-symbol"
                  placeholder="예: 005930, AAPL"
                  value={symbol}
                  onChange={(e) => setSymbol(e.target.value)}
                  className="flex-1"
                />
                {symbol && (
                  <Button type="button" variant="ghost" size="icon" onClick={() => setSymbol("")}>
                    <X className="h-4 w-4" />
                    <span className="sr-only">지우기</span>
                  </Button>
                )}
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="quantity">보유 수량</Label>
              <Input
                id="quantity"
                type="number"
                placeholder="수량 입력"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                min="1"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="purchase-date">매수 날짜</Label>
              <Input
                id="purchase-date"
                type="date"
                value={purchaseDate}
                onChange={(e) => setPurchaseDate(e.target.value)}
                max={new Date().toISOString().split("T")[0]}
              />
              <p className="text-xs text-muted-foreground">해당 날짜의 종가를 기준으로 매수 가격이 계산됩니다.</p>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              취소
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "처리 중..." : "추가"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
