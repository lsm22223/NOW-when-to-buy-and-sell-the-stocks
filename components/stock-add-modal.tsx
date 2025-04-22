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

interface StockAddModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onAddStock: (symbol: string) => void
  title: string
  description: string
}

export function StockAddModal({ open, onOpenChange, onAddStock, title, description }: StockAddModalProps) {
  const [symbol, setSymbol] = useState("")
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

    setIsLoading(true)

    try {
      // 실제 구현에서는 API를 통해 심볼 유효성 검사를 수행합니다
      // 여기서는 간단히 시뮬레이션합니다
      await new Promise((resolve) => setTimeout(resolve, 500))

      onAddStock(symbol.toUpperCase())
      setSymbol("")
      onOpenChange(false)

      toast({
        title: "주식이 추가되었습니다",
        description: `${symbol.toUpperCase()} 심볼이 목록에 추가되었습니다.`,
      })
    } catch (error) {
      toast({
        title: "주식 추가 실패",
        description: "유효하지 않은 심볼이거나 서버 오류가 발생했습니다.",
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
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="symbol">티커 심볼</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="symbol"
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
              <p className="text-xs text-muted-foreground">
                한국 주식은 숫자 6자리(예: 005930), 미국 주식은 알파벳(예: AAPL)으로 입력하세요.
              </p>
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
