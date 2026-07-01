// src/utils/storage.js

const storage = {
    /**
     * 로컬스토리지 저장
     */
    set: (key, value) => {
        try {
            const stringValue = typeof value === 'object' ? JSON.stringify(value) : value;
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
            
            return (value.startsWith('{') || value.startsWith('[')) ? JSON.parse(value) : value;
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
    }
};

export default storage;
