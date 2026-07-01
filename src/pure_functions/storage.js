// src/utils/storage.js

const storage = {
    /**
     * 로컬스토리지 저장
     */
    set: (key, value) => {
        try {
            const stringValue = typeof value === "object" && value !== null ? JSON.stringify(value) : value;
            localStorage.setItem(key, stringValue);
        } catch (error) {
            console.error(`로컬스토리지 저장 실패 (${key}):`, error);
        }
    },

    /**
     * 로컬스토리지 읽기
     */
    get: (key, defaultValue = null) => {
        try {
            const value = localStorage.getItem(key);
            if (!value) return defaultValue;

            // 일단 JSON.parse를 시도하여 숫자, 불리언, 객체, 배열을 모두 원래 타입으로 복원
            try {
                return JSON.parse(value);
            } catch {
                // JSON.parse가 실패하는 순수 문자열(예: "hello")인 경우 그대로 반환
                return value;
            }
        } catch (error) {
            console.error(`로컬스토리지 읽기 실패 (${key}):`, error);
            return defaultValue;
        }
    },

    /**
     * 로컬스토리지 삭제
     */
    remove: (key) => {
        localStorage.removeItem(key);
    },
};

export default storage;
