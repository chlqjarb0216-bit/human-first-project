function getPastTime(registeredAt) {
    // 1. 등록 일시 배열을 Date 객체로 변환
    const [date, time] = registeredAt;
    const registeredDate = new Date(`${date}T${time}`);

    // 2. 현재 시각과의 차이 계산 (밀리초 단위)
    const now = new Date();
    const diffMs = now - registeredDate;

    // 3. 분, 시간, 일 단위로 환산
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    // 4. 상황별 친절한 문자열 반환
    if (diffMins < 1) return "방금 전";
    if (diffMins < 60) return `${diffMins}분 전`;
    if (diffHours < 24) return `${diffHours}시간 전`;
    return `${diffDays}일 전`;
}

export default getPastTime;
