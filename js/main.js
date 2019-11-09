/*--------------------------------------------------------------
STICKY NAVBAR
--------------------------------------------------------------*/

var StickyNavbar = {
  lastScrollTop: 0,
  scrollTop: document.documentElement.scrollTop || document.body.scrollTop,
  goingDown: true,
  range: 0,
  isHidden: false,

  autoHideScroll: function() {
    var self = this;
    var currentScrollTop =
      document.documentElement.scrollTop || document.body.scrollTop;

    // Fix for rubber band scroll (iOS quirk)
    if (currentScrollTop === 0 && self.isHidden) {
      return document.getElementById('header').classList.remove('hide');
    }

    // Check if scroll changes direction (up or down)
    if (
      (currentScrollTop > self.lastScrollTop && !self.goingDown) ||
      (currentScrollTop < self.lastScrollTop && self.goingDown)
    ) {
      self.scrollTop = currentScrollTop;
      self.goingDown = !self.goingDown;
      self.range = 0;
    } else {
      self.range = self.goingDown
        ? currentScrollTop - self.scrollTop
        : self.scrollTop - currentScrollTop;
    }

    // Check the range of scroll
    if (self.range > 10) {
      if (currentScrollTop > 54 && self.goingDown && !self.isHidden) {
        document.getElementById('header').classList.add('hide');
        self.isHidden = true;
      } else if (!self.goingDown && self.isHidden) {
        document.getElementById('header').classList.remove('hide');
        self.isHidden = false;
      }
    }

    self.lastScrollTop = currentScrollTop;
  },
};

window.onscroll = function windowOnScroll() {
  StickyNavbar.autoHideScroll();
};

/*--------------------------------------------------------------
AGE GATE MODAL
--------------------------------------------------------------*/

var AgeGate = {
  $modalAgeGate: [],
  countries: {
    DZ: 18,
    AO: 18,
    BI: 18,
    CM: 21,
    CV: 18,
    CF: 18,
    KM: 0,
    CD: 18,
    EG: 21,
    GQ: 0,
    ER: 18,
    ET: 18,
    GA: 18,
    GM: 18,
    GH: 18,
    GW: 0,
    KE: 18,
    LS: 18,
    LY: Infinity,
    MW: 18,
    MU: 18,
    MA: 16,
    MZ: 18,
    NA: 18,
    NE: 18,
    NG: 18,
    CG: 18,
    RW: 18,
    SN: 0,
    SC: 18,
    SO: Infinity,
    ZA: 18,
    SS: 18,
    SD: Infinity,
    SZ: 18,
    TZ: 18,
    TG: 18,
    TN: 18,
    UG: 18,
    ZM: 18,
    ZW: 18,
    AG: 16,
    AR: 18,
    BS: 18,
    BZ: 18,
    BM: 18,
    BO: 18,
    BR: 18,
    VG: 16,
    CA: 19,
    KY: 18,
    CL: 18,
    CO: 18,
    CR: 18,
    CU: 18,
    DO: 18,
    EC: 18,
    SV: 18,
    FK: 18,
    GT: 18,
    GY: 18,
    HT: 16,
    HN: 18,
    JM: 16,
    MX: 18,
    NI: 18,
    PA: 18,
    PY: 20,
    PE: 18,
    PR: 18,
    TT: 18,
    US: 21,
    VI: 18,
    UY: 18,
    VE: 18,
    AF: Infinity,
    BD: Infinity,
    BN: Infinity,
    KH: 0,
    CN: 18,
    HK: 18,
    IN: 18,
    ID: 21,
    IR: 18,
    JQ: 18,
    IL: 18,
    JP: 20,
    JO: 18,
    KZ: 21,
    KW: Infinity,
    KG: 18,
    LB: 18,
    MO: 18,
    MY: 18,
    MV: 18,
    MN: 18,
    NP: 18,
    KP: 18,
    OM: 21,
    PK: 21,
    PS: 16,
    PH: 18,
    QA: 21,
    SA: Infinity,
    SG: 18,
    KR: 19,
    LK: 21,
    SY: 18,
    TW: 18,
    TJ: 21,
    TH: 21,
    TM: 18,
    AE: 21,
    VN: 0,
    YE: Infinity,
    AL: 18,
    AM: 18,
    AT: 18,
    AZ: 18,
    BY: 18,
    BE: 18,
    BA: 18,
    BG: 18,
    HR: 18,
    CY: 17,
    CZ: 18,
    DK: 18,
    EE: 18,
    FI: 18,
    FR: 18,
    GE: 16,
    DE: 18,
    GI: 18,
    GR: 18,
    HU: 18,
    IS: 20,
    IE: 18,
    IT: 18,
    XK: 18,
    LV: 18,
    LI: 18,
    LT: 18,
    LU: 16,
    MK: 18,
    MT: 17,
    MD: 16,
    ME: 18,
    NL: 18,
    NO: 20,
    PL: 18,
    PT: 18,
    RO: 18,
    RU: 18,
    RS: 18,
    SK: 18,
    SI: 18,
    ES: 18,
    SE: 18,
    CH: 18,
    TR: 18,
    UA: 18,
    GB: 18,
    AS: 21,
    AU: 18,
    FJ: 18,
    GU: 21,
    FM: 21,
    NZ: 18,
    MP: 21,
    PW: 21,
    PG: 18,
    WS: 18,
    SB: 21,
    TK: 18,
    TO: 21,
    VU: 18,
  },
  months: [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ],
  currentDays: 31,

  init: function() {
    var self = this;
    var isLegalAge = window.localStorage.getItem('isLegalAge');

    if (isLegalAge && Number(isLegalAge) === 1) return;

    self.$modalAgeGate = jQuery('#modalAgeGate');

    if (self.$modalAgeGate.length === 0) return;

    self.$modalAgeGate.modal('show');

    // Populate day select input
    var ageGateDay = document.getElementById('ageGateDay');
    var dayOption, dayOptionText;

    for (var i = 1; i < 32; i++) {
      dayOption = document.createElement('OPTION');
      dayOptionText = document.createTextNode(String(i));
      dayOption.appendChild(dayOptionText);
      dayOption.value = i;

      ageGateDay.appendChild(dayOption);
    }

    // Populate month select input
    var ageGateMonth = document.getElementById('ageGateMonth');
    var monthOption, monthOptionText;

    for (var j = 1; j < 13; j++) {
      monthOption = document.createElement('OPTION');
      monthOptionText = document.createTextNode(self.months[Number(j) - 1]);
      monthOption.appendChild(monthOptionText);
      monthOption.value = j;

      ageGateMonth.appendChild(monthOption);
    }

    // Populate year select input
    var ageGateYear = document.getElementById('ageGateYear');
    var yearOption, yearOptionText;

    for (var k = new Date().getFullYear(); k > 1905; k--) {
      yearOption = document.createElement('OPTION');
      yearOptionText = document.createTextNode(String(k));
      yearOption.appendChild(yearOptionText);
      yearOption.value = k;

      ageGateYear.appendChild(yearOption);
    }

    // Update day select when changing year or month
    ageGateYear.addEventListener('change', self.updateDaySelect.bind(self));
    ageGateMonth.addEventListener('change', self.updateDaySelect.bind(self));

    // When clicking "Enter Site" button
    document
      .getElementById('ageGateEnterSiteBtn')
      .addEventListener('click', self.checkAge.bind(self));
  },

  updateDaySelect: function() {
    var self = this;
    var month = document.getElementById('ageGateMonth').value;
    var year = document.getElementById('ageGateYear').value;
    var days = self.getDaysInMonth(month, year);
    var currentDays = self.currentDays;

    if (currentDays === days) return;

    var ageGateDay = document.getElementById('ageGateDay');

    if (currentDays > days) {
      for (var i = 0; i < currentDays - days; i++) {
        ageGateDay.removeChild(ageGateDay.lastChild);
      }
    } else {
      // Populate day select input
      var dayOption, dayOptionText;

      for (var j = currentDays + 1; j < days + 1; j++) {
        dayOption = document.createElement('OPTION');
        dayOptionText = document.createTextNode(String(j));
        dayOption.appendChild(dayOptionText);
        dayOption.value = j;

        ageGateDay.appendChild(dayOption);
      }
    }

    self.currentDays = days;
  },

  getDaysInMonth: function(month, year) {
    return new Date(year, month, 0).getDate();
  },

  checkAge: function() {
    var day = document.getElementById('ageGateDay').value;
    var month = document.getElementById('ageGateMonth').value;
    var year = document.getElementById('ageGateYear').value;

    if (!year || !month || !day) {
      return document.getElementById('ageGateError').classList.remove('d-none');
    } else {
      document.getElementById('ageGateError').classList.add('d-none');
    }

    var country = document.getElementById('ageGateCountry').value;

    // Add leading zero
    if (Number(month) < 10) {
      month = '0' + month;
    }
    if (Number(day) < 10) {
      day = '0' + day;
    }

    var self = this;
    var age = self.calculateAge(new Date(year + '-' + month + '-' + day));

    if (age >= self.countries[country]) {
      self.$modalAgeGate.modal('hide');
      window.localStorage.setItem('isLegalAge', '1');
    } else {
      document.getElementById('ageGateContent').classList.add('d-none');
      document.getElementById('ageGateBlock').classList.remove('d-none');
      window.localStorage.setItem('isLegalAge', '0');
    }
  },

  calculateAge: function(birthDate) {
    var differenceInMs = Date.now() - birthDate.getTime();
    var ageDifference = new Date(differenceInMs);

    return Math.abs(ageDifference.getUTCFullYear() - 1970);
  },
};

/*--------------------------------------------------------------
INITIATIONS
--------------------------------------------------------------*/

document.body.classList.remove('d-none');
AgeGate.init();
