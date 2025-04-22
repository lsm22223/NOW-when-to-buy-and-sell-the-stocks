import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export function DataModel() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">주식 알림 대시보드 시스템 - 데이터 모델</h1>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">데이터 모델 개요</h2>
        <p className="text-muted-foreground mb-4">
          주식 알림 대시보드 시스템의 데이터 모델은 사용자, 주식, 알림, 포트폴리오, 뉴스 등의 주요 엔티티로 구성됩니다.
          각 엔티티는 고유한 속성을 가지며, 서로 관계를 맺고 있습니다.
        </p>
      </div>

      <Tabs defaultValue="user">
        <TabsList className="mb-4">
          <TabsTrigger value="user">사용자</TabsTrigger>
          <TabsTrigger value="stock">주식</TabsTrigger>
          <TabsTrigger value="alert">알림</TabsTrigger>
          <TabsTrigger value="portfolio">포트폴리오</TabsTrigger>
          <TabsTrigger value="news">뉴스</TabsTrigger>
        </TabsList>

        <TabsContent value="user" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>User (사용자)</CardTitle>
              <CardDescription>사용자 계정 정보를 저장하는 엔티티입니다.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>필드명</TableHead>
                    <TableHead>타입</TableHead>
                    <TableHead>설명</TableHead>
                    <TableHead>제약조건</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>id</TableCell>
                    <TableCell>String</TableCell>
                    <TableCell>사용자 고유 식별자</TableCell>
                    <TableCell>Primary Key</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>email</TableCell>
                    <TableCell>String</TableCell>
                    <TableCell>사용자 이메일 주소</TableCell>
                    <TableCell>Unique, Not Null</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>password</TableCell>
                    <TableCell>String</TableCell>
                    <TableCell>암호화된 비밀번호</TableCell>
                    <TableCell>Not Null</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>name</TableCell>
                    <TableCell>String</TableCell>
                    <TableCell>사용자 이름</TableCell>
                    <TableCell>Not Null</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>phone</TableCell>
                    <TableCell>String</TableCell>
                    <TableCell>전화번호</TableCell>
                    <TableCell>Nullable</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>role</TableCell>
                    <TableCell>String</TableCell>
                    <TableCell>사용자 역할 (user, admin)</TableCell>
                    <TableCell>Not Null, Default: "user"</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>subscriptionType</TableCell>
                    <TableCell>String</TableCell>
                    <TableCell>구독 유형 (free, premium)</TableCell>
                    <TableCell>Not Null, Default: "free"</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>subscriptionExpiresAt</TableCell>
                    <TableCell>DateTime</TableCell>
                    <TableCell>구독 만료일</TableCell>
                    <TableCell>Nullable</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>createdAt</TableCell>
                    <TableCell>DateTime</TableCell>
                    <TableCell>계정 생성일</TableCell>
                    <TableCell>Not Null</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>updatedAt</TableCell>
                    <TableCell>DateTime</TableCell>
                    <TableCell>계정 정보 수정일</TableCell>
                    <TableCell>Not Null</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>UserAlertSettings (사용자 알림 설정)</CardTitle>
              <CardDescription>사용자의 알림 설정 정보를 저장하는 엔티티입니다.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>필드명</TableHead>
                    <TableHead>타입</TableHead>
                    <TableHead>설명</TableHead>
                    <TableHead>제약조건</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>id</TableCell>
                    <TableCell>String</TableCell>
                    <TableCell>설정 고유 식별자</TableCell>
                    <TableCell>Primary Key</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>userId</TableCell>
                    <TableCell>String</TableCell>
                    <TableCell>사용자 ID</TableCell>
                    <TableCell>Foreign Key, Not Null</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>notificationMethod</TableCell>
                    <TableCell>String</TableCell>
                    <TableCell>알림 방법 (push, email, both)</TableCell>
                    <TableCell>Not Null, Default: "push"</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>frequency</TableCell>
                    <TableCell>String</TableCell>
                    <TableCell>알림 빈도 (realtime, hourly, daily, weekly)</TableCell>
                    <TableCell>Not Null, Default: "realtime"</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>quietHoursEnabled</TableCell>
                    <TableCell>Boolean</TableCell>
                    <TableCell>방해 금지 시간 활성화 여부</TableCell>
                    <TableCell>Not Null, Default: false</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>quietHoursStart</TableCell>
                    <TableCell>String</TableCell>
                    <TableCell>방해 금지 시작 시간 (HH:MM)</TableCell>
                    <TableCell>Nullable</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>quietHoursEnd</TableCell>
                    <TableCell>String</TableCell>
                    <TableCell>방해 금지 종료 시간 (HH:MM)</TableCell>
                    <TableCell>Nullable</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>priceAlerts</TableCell>
                    <TableCell>JSON</TableCell>
                    <TableCell>가격 알림 설정 (상승, 하락 등)</TableCell>
                    <TableCell>Not Null</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>technicalAlerts</TableCell>
                    <TableCell>JSON</TableCell>
                    <TableCell>기술적 지표 알림 설정 (RSI, MACD 등)</TableCell>
                    <TableCell>Not Null</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>dividendAlerts</TableCell>
                    <TableCell>JSON</TableCell>
                    <TableCell>배당금 알림 설정</TableCell>
                    <TableCell>Not Null</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>newsAlerts</TableCell>
                    <TableCell>JSON</TableCell>
                    <TableCell>뉴스 알림 설정</TableCell>
                    <TableCell>Not Null</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>updatedAt</TableCell>
                    <TableCell>DateTime</TableCell>
                    <TableCell>설정 수정일</TableCell>
                    <TableCell>Not Null</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="stock" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Stock (주식)</CardTitle>
              <CardDescription>주식 정보를 저장하는 엔티티입니다.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>필드명</TableHead>
                    <TableHead>타입</TableHead>
                    <TableHead>설명</TableHead>
                    <TableHead>제약조건</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>id</TableCell>
                    <TableCell>String</TableCell>
                    <TableCell>주식 고유 식별자</TableCell>
                    <TableCell>Primary Key</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>symbol</TableCell>
                    <TableCell>String</TableCell>
                    <TableCell>주식 심볼 (예: 005930, AAPL)</TableCell>
                    <TableCell>Unique, Not Null</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>name</TableCell>
                    <TableCell>String</TableCell>
                    <TableCell>주식 이름</TableCell>
                    <TableCell>Not Null</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>market</TableCell>
                    <TableCell>String</TableCell>
                    <TableCell>시장 (예: KOSPI, NASDAQ)</TableCell>
                    <TableCell>Not Null</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>currency</TableCell>
                    <TableCell>String</TableCell>
                    <TableCell>통화 (예: KRW, USD)</TableCell>
                    <TableCell>Not Null</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>price</TableCell>
                    <TableCell>Decimal</TableCell>
                    <TableCell>현재 가격</TableCell>
                    <TableCell>Not Null</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>change</TableCell>
                    <TableCell>Decimal</TableCell>
                    <TableCell>가격 변동률 (%)</TableCell>
                    <TableCell>Not Null</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>volume</TableCell>
                    <TableCell>String</TableCell>
                    <TableCell>거래량</TableCell>
                    <TableCell>Not Null</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>marketCap</TableCell>
                    <TableCell>String</TableCell>
                    <TableCell>시가총액</TableCell>
                    <TableCell>Not Null</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>highestPrice</TableCell>
                    <TableCell>JSON</TableCell>
                    <TableCell>최고가 정보 (가격, 날짜, 하락률)</TableCell>
                    <TableCell>Nullable</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>dividend</TableCell>
                    <TableCell>JSON</TableCell>
                    <TableCell>배당금 정보 (수익률, 목표 수익률, 배당락일)</TableCell>
                    <TableCell>Nullable</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>indicators</TableCell>
                    <TableCell>JSON</TableCell>
                    <TableCell>기술적 지표 정보 (RSI, MACD 등)</TableCell>
                    <TableCell>Nullable</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>updatedAt</TableCell>
                    <TableCell>DateTime</TableCell>
                    <TableCell>정보 갱신일</TableCell>
                    <TableCell>Not Null</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>StockHistory (주식 가격 히스토리)</CardTitle>
              <CardDescription>주식의 과거 가격 정보를 저장하는 엔티티입니다.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>필드명</TableHead>
                    <TableHead>타입</TableHead>
                    <TableHead>설명</TableHead>
                    <TableHead>제약조건</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>id</TableCell>
                    <TableCell>String</TableCell>
                    <TableCell>히스토리 고유 식별자</TableCell>
                    <TableCell>Primary Key</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>stockId</TableCell>
                    <TableCell>String</TableCell>
                    <TableCell>주식 ID</TableCell>
                    <TableCell>Foreign Key, Not Null</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>date</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>날짜</TableCell>
                    <TableCell>Not Null</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>open</TableCell>
                    <TableCell>Decimal</TableCell>
                    <TableCell>시가</TableCell>
                    <TableCell>Not Null</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>high</TableCell>
                    <TableCell>Decimal</TableCell>
                    <TableCell>고가</TableCell>
                    <TableCell>Not Null</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>low</TableCell>
                    <TableCell>Decimal</TableCell>
                    <TableCell>저가</TableCell>
                    <TableCell>Not Null</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>close</TableCell>
                    <TableCell>Decimal</TableCell>
                    <TableCell>종가</TableCell>
                    <TableCell>Not Null</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>volume</TableCell>
                    <TableCell>BigInt</TableCell>
                    <TableCell>거래량</TableCell>
                    <TableCell>Not Null</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="alert" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Alert (알림)</CardTitle>
              <CardDescription>주식 알림 정보를 저장하는 엔티티입니다.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>필드명</TableHead>
                    <TableHead>타입</TableHead>
                    <TableHead>설명</TableHead>
                    <TableHead>제약조건</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>id</TableCell>
                    <TableCell>String</TableCell>
                    <TableCell>알림 고유 식별자</TableCell>
                    <TableCell>Primary Key</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>userId</TableCell>
                    <TableCell>String</TableCell>
                    <TableCell>사용자 ID</TableCell>
                    <TableCell>Foreign Key, Not Null</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>stockId</TableCell>
                    <TableCell>String</TableCell>
                    <TableCell>주식 ID</TableCell>
                    <TableCell>Foreign Key, Not Null</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>stockSymbol</TableCell>
                    <TableCell>String</TableCell>
                    <TableCell>주식 심볼</TableCell>
                    <TableCell>Not Null</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>stockName</TableCell>
                    <TableCell>String</TableCell>
                    <TableCell>주식 이름</TableCell>
                    <TableCell>Not Null</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>type</TableCell>
                    <TableCell>String</TableCell>
                    <TableCell>알림 유형 (price_surge, rsi_oversold 등)</TableCell>
                    <TableCell>Not Null</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>message</TableCell>
                    <TableCell>String</TableCell>
                    <TableCell>알림 메시지</TableCell>
                    <TableCell>Not Null</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>indicator</TableCell>
                    <TableCell>String</TableCell>
                    <TableCell>관련 지표 (RSI, MACD, 가격 등)</TableCell>
                    <TableCell>Nullable</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>timestamp</TableCell>
                    <TableCell>DateTime</TableCell>
                    <TableCell>알림 발생 시간</TableCell>
                    <TableCell>Not Null</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>severity</TableCell>
                    <TableCell>String</TableCell>
                    <TableCell>알림 중요도 (low, medium, high)</TableCell>
                    <TableCell>Not Null</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>isRead</TableCell>
                    <TableCell>Boolean</TableCell>
                    <TableCell>읽음 여부</TableCell>
                    <TableCell>Not Null, Default: false</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>isDelivered</TableCell>
                    <TableCell>Boolean</TableCell>
                    <TableCell>전송 완료 여부</TableCell>
                    <TableCell>Not Null, Default: false</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>deliveryMethod</TableCell>
                    <TableCell>String</TableCell>
                    <TableCell>전송 방법 (push, email)</TableCell>
                    <TableCell>Nullable</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>AlertCondition (알림 조건)</CardTitle>
              <CardDescription>사용자가 설정한 알림 조건을 저장하는 엔티티입니다.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>필드명</TableHead>
                    <TableHead>타입</TableHead>
                    <TableHead>설명</TableHead>
                    <TableHead>제약조건</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>id</TableCell>
                    <TableCell>String</TableCell>
                    <TableCell>알림 조건 고유 식별자</TableCell>
                    <TableCell>Primary Key</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>userId</TableCell>
                    <TableCell>String</TableCell>
                    <TableCell>사용자 ID</TableCell>
                    <TableCell>Foreign Key, Not Null</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>stockId</TableCell>
                    <TableCell>String</TableCell>
                    <TableCell>주식 ID</TableCell>
                    <TableCell>Foreign Key, Not Null</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>type</TableCell>
                    <TableCell>String</TableCell>
                    <TableCell>알림 유형 (price, rsi, macd 등)</TableCell>
                    <TableCell>Not Null</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>subType</TableCell>
                    <TableCell>String</TableCell>
                    <TableCell>알림 세부 유형 (surge, drop, overbought 등)</TableCell>
                    <TableCell>Not Null</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>threshold</TableCell>
                    <TableCell>Decimal</TableCell>
                    <TableCell>알림 임계값</TableCell>
                    <TableCell>Nullable</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>enabled</TableCell>
                    <TableCell>Boolean</TableCell>
                    <TableCell>활성화 여부</TableCell>
                    <TableCell>Not Null, Default: true</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>createdAt</TableCell>
                    <TableCell>DateTime</TableCell>
                    <TableCell>생성일</TableCell>
                    <TableCell>Not Null</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>updatedAt</TableCell>
                    <TableCell>DateTime</TableCell>
                    <TableCell>수정일</TableCell>
                    <TableCell>Not Null</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="portfolio" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Watchlist (관심 주식)</CardTitle>
              <CardDescription>사용자의 관심 주식 목록을 저장하는 엔티티입니다.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>필드명</TableHead>
                    <TableHead>타입</TableHead>
                    <TableHead>설명</TableHead>
                    <TableHead>제약조건</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>id</TableCell>
                    <TableCell>String</TableCell>
                    <TableCell>관심 주식 고유 식별자</TableCell>
                    <TableCell>Primary Key</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>userId</TableCell>
                    <TableCell>String</TableCell>
                    <TableCell>사용자 ID</TableCell>
                    <TableCell>Foreign Key, Not Null</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>stockId</TableCell>
                    <TableCell>String</TableCell>
                    <TableCell>주식 ID</TableCell>
                    <TableCell>Foreign Key, Not Null</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>order</TableCell>
                    <TableCell>Integer</TableCell>
                    <TableCell>표시 순서</TableCell>
                    <TableCell>Not Null</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>createdAt</TableCell>
                    <TableCell>DateTime</TableCell>
                    <TableCell>추가일</TableCell>
                    <TableCell>Not Null</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Holding (보유 주식)</CardTitle>
              <CardDescription>사용자의 보유 주식 정보를 저장하는 엔티티입니다.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>필드명</TableHead>
                    <TableHead>타입</TableHead>
                    <TableHead>설명</TableHead>
                    <TableHead>제약조건</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>id</TableCell>
                    <TableCell>String</TableCell>
                    <TableCell>보유 주식 고유 식별자</TableCell>
                    <TableCell>Primary Key</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>userId</TableCell>
                    <TableCell>String</TableCell>
                    <TableCell>사용자 ID</TableCell>
                    <TableCell>Foreign Key, Not Null</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>stockId</TableCell>
                    <TableCell>String</TableCell>
                    <TableCell>주식 ID</TableCell>
                    <TableCell>Foreign Key, Not Null</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>quantity</TableCell>
                    <TableCell>Integer</TableCell>
                    <TableCell>보유 수량</TableCell>
                    <TableCell>Not Null</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>avgPrice</TableCell>
                    <TableCell>Decimal</TableCell>
                    <TableCell>평균 매수가</TableCell>
                    <TableCell>Not Null</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>purchaseDate</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>매수일</TableCell>
                    <TableCell>Not Null</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>notes</TableCell>
                    <TableCell>String</TableCell>
                    <TableCell>메모</TableCell>
                    <TableCell>Nullable</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>createdAt</TableCell>
                    <TableCell>DateTime</TableCell>
                    <TableCell>생성일</TableCell>
                    <TableCell>Not Null</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>updatedAt</TableCell>
                    <TableCell>DateTime</TableCell>
                    <TableCell>수정일</TableCell>
                    <TableCell>Not Null</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="news" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>News (뉴스)</CardTitle>
              <CardDescription>주식 관련 뉴스 정보를 저장하는 엔티티입니다.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>필드명</TableHead>
                    <TableHead>타입</TableHead>
                    <TableHead>설명</TableHead>
                    <TableHead>제약조건</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>id</TableCell>
                    <TableCell>String</TableCell>
                    <TableCell>뉴스 고유 식별자</TableCell>
                    <TableCell>Primary Key</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>title</TableCell>
                    <TableCell>String</TableCell>
                    <TableCell>뉴스 제목</TableCell>
                    <TableCell>Not Null</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>summary</TableCell>
                    <TableCell>String</TableCell>
                    <TableCell>뉴스 요약</TableCell>
                    <TableCell>Not Null</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>content</TableCell>
                    <TableCell>Text</TableCell>
                    <TableCell>뉴스 전체 내용</TableCell>
                    <TableCell>Nullable</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>source</TableCell>
                    <TableCell>String</TableCell>
                    <TableCell>뉴스 출처</TableCell>
                    <TableCell>Not Null</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>url</TableCell>
                    <TableCell>String</TableCell>
                    <TableCell>원문 URL</TableCell>
                    <TableCell>Not Null</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>publishedAt</TableCell>
                    <TableCell>DateTime</TableCell>
                    <TableCell>발행일</TableCell>
                    <TableCell>Not Null</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>sentiment</TableCell>
                    <TableCell>String</TableCell>
                    <TableCell>감정 분석 결과 (positive, neutral, negative)</TableCell>
                    <TableCell>Not Null</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>sentimentScore</TableCell>
                    <TableCell>Decimal</TableCell>
                    <TableCell>감정 점수 (-1.0 ~ 1.0)</TableCell>
                    <TableCell>Not Null</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>createdAt</TableCell>
                    <TableCell>DateTime</TableCell>
                    <TableCell>생성일</TableCell>
                    <TableCell>Not Null</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>NewsStockRelation (뉴스-주식 관계)</CardTitle>
              <CardDescription>뉴스와 주식 간의 관계를 저장하는 엔티티입니다.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>필드명</TableHead>
                    <TableHead>타입</TableHead>
                    <TableHead>설명</TableHead>
                    <TableHead>제약조건</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>id</TableCell>
                    <TableCell>String</TableCell>
                    <TableCell>관계 고유 식별자</TableCell>
                    <TableCell>Primary Key</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>newsId</TableCell>
                    <TableCell>String</TableCell>
                    <TableCell>뉴스 ID</TableCell>
                    <TableCell>Foreign Key, Not Null</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>stockId</TableCell>
                    <TableCell>String</TableCell>
                    <TableCell>주식 ID</TableCell>
                    <TableCell>Foreign Key, Not Null</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>relevanceScore</TableCell>
                    <TableCell>Decimal</TableCell>
                    <TableCell>관련성 점수 (0.0 ~ 1.0)</TableCell>
                    <TableCell>Not Null</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>impactType</TableCell>
                    <TableCell>String</TableCell>
                    <TableCell>영향 유형 (direct, indirect)</TableCell>
                    <TableCell>Not Null</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">엔티티 관계도</h2>
        <Card>
          <CardContent className="p-6">
            <pre className="text-xs overflow-x-auto">
              {`User (사용자)
  ├── UserAlertSettings (사용자 알림 설정) - 1:1 관계
  ├── Watchlist (관심 주식) - 1:N 관계
  ├── Holding (보유 주식) - 1:N 관계
  └── Alert (알림) - 1:N 관계

Stock (주식)
  ├── StockHistory (주식 가격 히스토리) - 1:N 관계
  ├── Watchlist (관심 주식) - 1:N 관계
  ├── Holding (보유 주식) - 1:N 관계
  ├── Alert (알림) - 1:N 관계
  ├── AlertCondition (알림 조건) - 1:N 관계
  └── NewsStockRelation (뉴스-주식 관계) - 1:N 관계

News (뉴스)
  └── NewsStockRelation (뉴스-주식 관계) - 1:N 관계`}
            </pre>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
