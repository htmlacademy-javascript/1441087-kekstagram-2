/**
 * Конвертирует время из строки в минуты.
 * @param {string} timeString Строка со временем вида '08:30'.
 * @returns {number} Время в минутах.
 */
const convertTimeStringToMinutes = (timeString = '') => {
  const timeParts = timeString.split(':');
  const timeMinutes = (timeParts[0] * 60) + +timeParts[1];
  return timeMinutes;
};


/**
 * Проверка: выходит ли встреча за рамки рабочего дня.
 * @param {string} dayStart Время начала рабочего дня.
 * @param {string} dayEnd Время конца рабочего дня.
 * @param {string} meetingStart Время старта встречи.
 * @param {number} meetingDuration Продолжительность встречи.
 * @returns {boolean} Встреча не выходит за рамки рабочего дня.
 */
const checkMeetingTime = (dayStart = '', dayEnd = '', meetingStart = '', meetingDuration = 0) => {
  const dayStartMunites = convertTimeStringToMinutes(dayStart);
  const dayEndMunites = convertTimeStringToMinutes(dayEnd);
  const meetingStartMunites = convertTimeStringToMinutes(meetingStart);

  if (meetingStartMunites >= dayStartMunites && meetingStartMunites <= (dayEndMunites - meetingDuration)) {
    return true;
  }
  return false;
};
checkMeetingTime();
