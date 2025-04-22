import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

export function SystemRequirements() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">주식 알림 대시보드 시스템 - 사용자별 기능 요구사항 정의서</h1>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">시스템 개요</h2>
        <p className="text-muted-foreground mb-4">
          주식 알림 대시보드 시스템은 사용자가 관심 있는 주식의 가격 변동, 기술적 지표, 뉴스 등을 모니터링하고 알림을
          받을 수 있는 플랫폼입니다. 사용자는 한국 주식과 미국 주식을 추적하고, 보유 주식을 관리하며, 맞춤형 알림을
          설정할 수 있습니다.
        </p>
      </div>

      <Tabs defaultValue="general">
        <TabsList className="mb-4">
          <TabsTrigger value="general">일반 사용자</TabsTrigger>
          <TabsTrigger value="premium">프리미엄 사용자</TabsTrigger>
          <TabsTrigger value="admin">관리자</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>일반 사용자 기능 요구사항</CardTitle>
              <CardDescription>기본 계정으로 이용 가능한 주요 기능들입니다.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[200px]">기능 분류</TableHead>
                    <TableHead>기능 설명</TableHead>
                    <TableHead className="w-[150px]">우선순위</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">대시보드 조회</TableCell>
                    <TableCell>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>한국/미국 주식 알림 목록 조회</li>
                        <li>보유 주식 목록 조회</li>
                        <li>주식별 간단한 가격 차트(스파크라인) 표시</li>
                        <li>주식별 최신 알림 1개 표시</li>
                      </ul>
                    </TableCell>
                    <TableCell>
                      <Badge className="bg-red-500">필수</Badge>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">주식 상세 정보</TableCell>
                    <TableCell>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>주식 기본 정보(가격, 변동률 등) 조회</li>
                        <li>기술적 지표(RSI, MACD) 조회</li>
                        <li>알림 로그 조회</li>
                        <li>관련 뉴스 및 시장 뉴스 조회</li>
                      </ul>
                    </TableCell>
                    <TableCell>
                      <Badge className="bg-red-500">필수</Badge>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">관심 주식 관리</TableCell>
                    <TableCell>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>한국/미국 관심 주식 추가 (최대 5개)</li>
                        <li>관심 주식 삭제</li>
                        <li>티커 심볼로 주식 검색</li>
                      </ul>
                    </TableCell>
                    <TableCell>
                      <Badge className="bg-red-500">필수</Badge>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">보유 주식 관리</TableCell>
                    <TableCell>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>보유 주식 추가 (티커, 수량, 매수일)</li>
                        <li>보유 주식 삭제</li>
                        <li>매수 평균가 및 손익 자동 계산</li>
                      </ul>
                    </TableCell>
                    <TableCell>
                      <Badge className="bg-red-500">필수</Badge>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">알림 설정</TableCell>
                    <TableCell>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>알림 방법 설정 (푸시, 이메일)</li>
                        <li>알림 빈도 설정 (실시간, 시간별, 일별, 주간)</li>
                        <li>방해 금지 시간 설정</li>
                      </ul>
                    </TableCell>
                    <TableCell>
                      <Badge className="bg-red-500">필수</Badge>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">뉴스 요약</TableCell>
                    <TableCell>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>관심 주식 관련 뉴스 요약 조회</li>
                        <li>감정 분석 기반 뉴스 필터링 (긍정/중립/부정)</li>
                        <li>키워드 검색</li>
                      </ul>
                    </TableCell>
                    <TableCell>
                      <Badge className="bg-amber-500">권장</Badge>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="premium" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>프리미엄 사용자 기능 요구사항</CardTitle>
              <CardDescription>유료 구독 계정으로 이용 가능한 고급 기능들입니다.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[200px]">기능 분류</TableHead>
                    <TableHead>기능 설명</TableHead>
                    <TableHead className="w-[150px]">우선순위</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">고급 알림 설정</TableCell>
                    <TableCell>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>주식별 맞춤형 알림 조건 설정</li>
                        <li>복합 조건 알림 설정 (예: RSI + 가격 변동)</li>
                        <li>알림 우선순위 설정</li>
                        <li>알림 템플릿 저장 및 재사용</li>
                      </ul>
                    </TableCell>
                    <TableCell>
                      <Badge className="bg-red-500">필수</Badge>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">확장된 관심 주식</TableCell>
                    <TableCell>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>무제한 관심 주식 추가</li>
                        <li>관심 주식 그룹 관리</li>
                        <li>산업별/섹터별 주식 필터링</li>
                      </ul>
                    </TableCell>
                    <TableCell>
                      <Badge className="bg-red-500">필수</Badge>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">고급 차트 분석</TableCell>
                    <TableCell>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>다양한 기술적 지표 추가 (볼린저 밴드, 이동평균선 등)</li>
                        <li>차트 패턴 자동 감지</li>
                        <li>차트 그리기 도구</li>
                        <li>멀티 타임프레임 분석</li>
                      </ul>
                    </TableCell>
                    <TableCell>
                      <Badge className="bg-amber-500">권장</Badge>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">포트폴리오 분석</TableCell>
                    <TableCell>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>포트폴리오 성과 분석</li>
                        <li>섹터별/산업별 포트폴리오 분포</li>
                        <li>위험 분석 및 최적화 제안</li>
                        <li>세금 효과 시뮬레이션</li>
                      </ul>
                    </TableCell>
                    <TableCell>
                      <Badge className="bg-amber-500">권장</Badge>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">AI 투자 조언</TableCell>
                    <TableCell>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>AI 기반 매수/매도 타이밍 제안</li>
                        <li>뉴스 및 시장 데이터 기반 투자 아이디어</li>
                        <li>개인화된 주식 추천</li>
                      </ul>
                    </TableCell>
                    <TableCell>
                      <Badge className="bg-blue-500">선택</Badge>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">데이터 내보내기</TableCell>
                    <TableCell>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>거래 내역 및 포트폴리오 데이터 내보내기 (CSV, Excel)</li>
                        <li>맞춤형 보고서 생성</li>
                        <li>세금 보고용 문서 생성</li>
                      </ul>
                    </TableCell>
                    <TableCell>
                      <Badge className="bg-blue-500">선택</Badge>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="admin" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>관리자 기능 요구사항</CardTitle>
              <CardDescription>시스템 관리자가 사용할 수 있는 관리 기능들입니다.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[200px]">기능 분류</TableHead>
                    <TableHead>기능 설명</TableHead>
                    <TableHead className="w-[150px]">우선순위</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">사용자 관리</TableCell>
                    <TableCell>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>사용자 계정 조회 및 관리</li>
                        <li>사용자 권한 설정</li>
                        <li>계정 활성화/비활성화</li>
                        <li>사용자 활동 로그 조회</li>
                      </ul>
                    </TableCell>
                    <TableCell>
                      <Badge className="bg-red-500">필수</Badge>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">주식 데이터 관리</TableCell>
                    <TableCell>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>주식 정보 추가/수정/삭제</li>
                        <li>주식 데이터 소스 관리</li>
                        <li>데이터 동기화 상태 모니터링</li>
                        <li>데이터 오류 수정</li>
                      </ul>
                    </TableCell>
                    <TableCell>
                      <Badge className="bg-red-500">필수</Badge>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">알림 시스템 관리</TableCell>
                    <TableCell>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>알림 템플릿 관리</li>
                        <li>알림 발송 상태 모니터링</li>
                        <li>알림 우선순위 및 제한 설정</li>
                        <li>시스템 알림 발송</li>
                      </ul>
                    </TableCell>
                    <TableCell>
                      <Badge className="bg-red-500">필수</Badge>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">시스템 모니터링</TableCell>
                    <TableCell>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>시스템 성능 모니터링</li>
                        <li>API 사용량 및 제한 관리</li>
                        <li>오류 로그 조회 및 분석</li>
                        <li>시스템 상태 대시보드</li>
                      </ul>
                    </TableCell>
                    <TableCell>
                      <Badge className="bg-amber-500">권장</Badge>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">결제 및 구독 관리</TableCell>
                    <TableCell>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>구독 플랜 관리</li>
                        <li>결제 내역 조회</li>
                        <li>환불 처리</li>
                        <li>프로모션 코드 관리</li>
                      </ul>
                    </TableCell>
                    <TableCell>
                      <Badge className="bg-amber-500">권장</Badge>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">통계 및 분석</TableCell>
                    <TableCell>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>사용자 활동 통계</li>
                        <li>인기 주식 및 알림 분석</li>
                        <li>시스템 사용 패턴 분석</li>
                        <li>비즈니스 인사이트 대시보드</li>
                      </ul>
                    </TableCell>
                    <TableCell>
                      <Badge className="bg-blue-500">선택</Badge>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">우선순위 정의</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center">
                <Badge className="bg-red-500 mr-2">필수</Badge>
                필수 기능
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                시스템의 핵심 기능으로, 반드시 구현되어야 합니다. 이 기능이 없으면 시스템의 기본 목적을 달성할 수
                없습니다.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center">
                <Badge className="bg-amber-500 mr-2">권장</Badge>
                권장 기능
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                시스템의 사용성과 효율성을 크게 향상시키는 기능입니다. 구현이 강력히 권장되지만, 초기 버전에서는 생략될
                수 있습니다.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center">
                <Badge className="bg-blue-500 mr-2">선택</Badge>
                선택 기능
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                시스템에 추가적인 가치를 제공하지만, 핵심 기능은 아닙니다. 리소스와 시간이 허락하는 경우에 구현할 수
                있습니다.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
