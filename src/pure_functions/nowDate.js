// 현재 날짜 및 시각을 문자열 배열로 반환하는 함수
// [날짜('YYYY-MM-DD'), 시각('hh:mm:ss')] 로 반환함

const options = {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false, // 24시간 형식으로 표기 (true로 하면 오전/오후로 나옴)
};

export default () => {
    const now = new Date();
    const datePart = new Intl.DateTimeFormat("fr-CA").format(now);
    const timePart = new Intl.DateTimeFormat("zh-CN", options).format(now);

    return [datePart, timePart];
};
