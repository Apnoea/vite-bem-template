import flatpickr from 'flatpickr'
import { Russian } from 'flatpickr/dist/l10n/ru'

export default function uiDatepicker() {
  function initializeDatepickers(selector, settings) {
    const datepickers = document.querySelectorAll(selector)
    for (const datepicker of datepickers) {
      const input = datepicker.querySelector('input')
      flatpickr(input, settings)
    }
  }

  // datepicker settings
  const defaultSettings = {
    locale: Russian,
    defaultDate: 'today',
    dateFormat: 'd.m.Y',
    disableMobile: true
  }
  const rangeSettings = {
    mode: 'range',
    defaultDate: ['today', new Date().fp_incr(1)]
  }
  const timeSettings = {
    enableTime: true,
    noCalendar: true,
    dateFormat: 'H:i',
    defaultDate: '12:00',
    time_24hr: true
  }

  // datepicker init
  initializeDatepickers('.ui-datepicker--single', defaultSettings)
  initializeDatepickers('.ui-datepicker--range', { ...defaultSettings, ...rangeSettings })
  initializeDatepickers('.ui-datepicker--time', timeSettings)
}
