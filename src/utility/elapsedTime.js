export const elapsedTime = (serverTimestamp) => {
    //firestore idő konverziója Date objektummá
    const serverTime = new Date(serverTimestamp.seconds * 1000 + serverTimestamp.nanoseconds / 1000000);
    const currentTime = new Date();
    const elapsedTimeMiliseconds = currentTime - serverTime;

    const miliSecondsInSeconds = 1000;
    const miliSecondsInMinute = 60 * miliSecondsInSeconds;
    const miliSecondsInHour = 60 * miliSecondsInMinute;
    const miliSecondsInDay = 24 * miliSecondsInHour;
    const miliSecondsInWeek = 7 * miliSecondsInDay;

    if (elapsedTimeMiliseconds < miliSecondsInMinute) {
        const seconds = Math.floor(elapsedTimeMiliseconds / miliSecondsInSeconds);
        return `${seconds} másodperce`
    } else if (elapsedTimeMiliseconds < miliSecondsInHour) {
        const minutes = Math.floor(elapsedTimeMiliseconds / miliSecondsInMinute);
        return `${minutes} perce`
    } else if (elapsedTimeMiliseconds < miliSecondsInDay) {
        const hours = Math.floor(elapsedTimeMiliseconds / miliSecondsInHour);
        return `${hours} órája`
    } else if (elapsedTimeMiliseconds < miliSecondsInWeek) {
        const days = Math.floor(elapsedTimeMiliseconds / miliSecondsInDay);
        return `${days} napja`
    }
    else if (elapsedTimeMiliseconds > miliSecondsInWeek) {
        const weeks = Math.floor(elapsedTimeMiliseconds / miliSecondsInWeek);
        return `${weeks} hete`
    }
}