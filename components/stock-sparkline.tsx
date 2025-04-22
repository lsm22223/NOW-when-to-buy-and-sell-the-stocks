"use client"

import { useMemo } from "react"

interface StockSparklineProps {
  data: number[]
  width?: number
  height?: number
  color?: string
  className?: string
}

export function StockSparkline({
  data,
  width = 80,
  height = 30,
  color = "currentColor",
  className = "",
}: StockSparklineProps) {
  const sparklinePoints = useMemo(() => {
    if (!data || data.length === 0) return ""

    const min = Math.min(...data)
    const max = Math.max(...data)
    const range = max - min || 1

    // 데이터 포인트 간의 간격 계산
    const xStep = width / (data.length - 1)

    // 각 데이터 포인트를 SVG 경로 포인트로 변환
    return data
      .map((value, index) => {
        const x = index * xStep
        // y 값을 반전시켜 높은 값이 위로 가도록 함
        const y = height - ((value - min) / range) * height
        return `${x},${y}`
      })
      .join(" ")
  }, [data, width, height])

  if (!data || data.length < 2) {
    return null
  }

  return (
    <svg width={width} height={height} className={className}>
      <polyline
        points={sparklinePoints}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
