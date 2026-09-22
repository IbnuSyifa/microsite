document.getElementById('school-name').textContent = CONFIG.SCHOOL_NAME;
document.title = 'Portal Ujian \u2014 ' + CONFIG.SCHOOL_NAME;

function isRunningInSEB() {
  var ua = navigator.userAgent || '';
  return ua.indexOf('SEB') !== -1 || !!window.SafeExamBrowser;
}

function showGateWarning() {
  document.getElementById('gate-warning').hidden = false;
  document.getElementById('loading-state').hidden = true;
}

function formatTime(iso) {
  var d = new Date(iso);
  return d.toLocaleString('id-ID', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' });
}

function statusLabel(status) {
  if (status === 'berlangsung') return 'Sedang berlangsung';
  if (status === 'selesai') return 'Sudah ditutup';
  return 'Belum dibuka';
}

function renderExams(items) {
  var container = document.getElementById('exam-list');
  container.innerHTML = '';

  if (!items.length) {
    container.innerHTML = '<p>Belum ada ujian yang dijadwalkan.</p>';
    container.hidden = false;
    return;
  }

  var groups = {};
  items.forEach(function (item) {
    if (!groups[item.kelas]) groups[item.kelas] = [];
    groups[item.kelas].push(item);
  });

  Object.keys(groups).sort().forEach(function (kelas) {
    var groupEl = document.createElement('section');
    groupEl.className = 'exam-group';

    var title = document.createElement('h2');
    title.className = 'exam-group__title';
    title.textContent = kelas;
    groupEl.appendChild(title);

    groups[kelas].forEach(function (item) {
      var row = document.createElement('div');
      row.className = 'exam-row';

      var info = document.createElement('div');
      info.className = 'exam-row__info';

      var subject = document.createElement('p');
      subject.className = 'exam-row__subject';
      subject.textContent = item.mapel;

      var time = document.createElement('p');
      time.className = 'exam-row__time';
      time.textContent = formatTime(item.mulai) + ' \u2013 ' + formatTime(item.selesai);

      info.appendChild(subject);
      info.appendChild(time);

      var action = document.createElement('div');
      action.className = 'exam-row__action';

      var badge = document.createElement('span');
      badge.className = 'status-badge status-badge--' + item.status;
      badge.textContent = statusLabel(item.status);
      action.appendChild(badge);

      if (item.status === 'berlangsung' && item.link) {
        var btn = document.createElement('a');
        btn.className = 'btn-start';
        btn.href = item.link;
        btn.textContent = 'Buka Ujian';
        action.appendChild(btn);
      }

      row.appendChild(info);
      row.appendChild(action);
      groupEl.appendChild(row);
    });

    container.appendChild(groupEl);
  });

  container.hidden = false;
}

function loadExams() {
  fetch(CONFIG.API_URL)
    .then(function (res) { return res.json(); })
    .then(function (data) {
      document.getElementById('loading-state').hidden = true;
      document.getElementById('error-state').hidden = true;
      document.getElementById('server-time').textContent = formatTime(data.server_time);
      renderExams(data.data || []);
    })
    .catch(function () {
      document.getElementById('loading-state').hidden = true;
      document.getElementById('error-state').hidden = false;
    });
}

function init() {
  if (CONFIG.REQUIRE_SEB && !isRunningInSEB()) {
    showGateWarning();
    return;
  }
  loadExams();
  setInterval(loadExams, CONFIG.REFRESH_INTERVAL_MS);
}

init();
