/* ============================================================
   APPOINTMENT MODAL — assets/js/appointment.js
   Ortho-specific booking overlay with multi-step form
   ============================================================ */
(function () {
  'use strict';

  /* ---- Modal HTML template ---- */
  const MODAL_HTML = `
<div class="overlay-backdrop" id="appointmentModal" role="dialog" aria-modal="true" aria-labelledby="apptModalTitle">
  <div class="overlay-box">
    <div class="overlay-header">
      <h2 id="apptModalTitle">📅 Book an Appointment</h2>
      <p>OrthoCare Orthopaedic Specialists — Pune</p>
      <button class="overlay-close" id="apptModalClose" aria-label="Close">&times;</button>
    </div>
    <div class="overlay-body">

      <!-- Step indicators -->
      <div class="appt-steps" id="apptSteps">
        <div class="appt-step active" data-step="1"><span>1</span> Service</div>
        <div class="appt-step-divider"></div>
        <div class="appt-step" data-step="2"><span>2</span> Doctor</div>
        <div class="appt-step-divider"></div>
        <div class="appt-step" data-step="3"><span>3</span> Schedule</div>
        <div class="appt-step-divider"></div>
        <div class="appt-step" data-step="4"><span>4</span> Details</div>
      </div>

      <!-- Step 1: Service selection -->
      <div class="appt-panel active" id="apptStep1">
        <h3 class="appt-panel-title">Select a Service</h3>
        <p class="appt-panel-sub">Choose the orthopaedic service you need</p>
        <div class="service-grid">
          <label class="service-card">
            <input type="radio" name="service" value="joint-replacement">
            <div class="service-card-inner">
              <span class="service-icon">🦴</span>
              <span class="service-name">Joint Replacement</span>
              <span class="service-desc">Hip, knee & shoulder</span>
            </div>
          </label>
          <label class="service-card">
            <input type="radio" name="service" value="spine-surgery">
            <div class="service-card-inner">
              <span class="service-icon">🔬</span>
              <span class="service-name">Spine Surgery</span>
              <span class="service-desc">Disc, scoliosis & more</span>
            </div>
          </label>
          <label class="service-card">
            <input type="radio" name="service" value="sports-medicine">
            <div class="service-card-inner">
              <span class="service-icon">⚽</span>
              <span class="service-name">Sports Medicine</span>
              <span class="service-desc">Injury rehab & prevention</span>
            </div>
          </label>
          <label class="service-card">
            <input type="radio" name="service" value="fracture-care">
            <div class="service-card-inner">
              <span class="service-icon">🩹</span>
              <span class="service-name">Fracture Care</span>
              <span class="service-desc">Emergency & complex</span>
            </div>
          </label>
          <label class="service-card">
            <input type="radio" name="service" value="arthroscopy">
            <div class="service-card-inner">
              <span class="service-icon">🔭</span>
              <span class="service-name">Arthroscopy</span>
              <span class="service-desc">Minimally invasive</span>
            </div>
          </label>
          <label class="service-card">
            <input type="radio" name="service" value="physiotherapy">
            <div class="service-card-inner">
              <span class="service-icon">💪</span>
              <span class="service-name">Physiotherapy</span>
              <span class="service-desc">Rehab & recovery</span>
            </div>
          </label>
          <label class="service-card">
            <input type="radio" name="service" value="pain-management">
            <div class="service-card-inner">
              <span class="service-icon">💊</span>
              <span class="service-name">Pain Management</span>
              <span class="service-desc">Chronic & acute pain</span>
            </div>
          </label>
          <label class="service-card">
            <input type="radio" name="service" value="consultation">
            <div class="service-card-inner">
              <span class="service-icon">👨‍⚕️</span>
              <span class="service-name">General Consultation</span>
              <span class="service-desc">Initial assessment</span>
            </div>
          </label>
        </div>
        <div class="appt-nav">
          <span></span>
          <button class="btn btn-primary appt-next-btn" onclick="OrthoApp.apptNext(1)">Next →</button>
        </div>
      </div>

      <!-- Step 2: Doctor -->
      <div class="appt-panel" id="apptStep2">
        <h3 class="appt-panel-title">Choose a Doctor</h3>
        <p class="appt-panel-sub">Select your preferred specialist</p>
        <div class="doctor-list">
          <label class="doctor-card">
            <input type="radio" name="doctor" value="dr-sharma">
            <div class="doctor-card-inner">
              <div class="doctor-avatar">DS</div>
              <div class="doctor-info">
                <span class="doctor-name">Dr. Rahul Sharma</span>
                <span class="doctor-spec">Joint Replacement & Arthroscopy</span>
                <span class="doctor-exp">18 yrs experience · MBBS, MS (Ortho)</span>
              </div>
              <svg class="doctor-check" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
            </div>
          </label>
          <label class="doctor-card">
            <input type="radio" name="doctor" value="dr-patel">
            <div class="doctor-card-inner">
              <div class="doctor-avatar">AP</div>
              <div class="doctor-info">
                <span class="doctor-name">Dr. Anjali Patel</span>
                <span class="doctor-spec">Spine Surgery & Pain Management</span>
                <span class="doctor-exp">14 yrs experience · MBBS, DNB (Ortho)</span>
              </div>
              <svg class="doctor-check" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
            </div>
          </label>
          <label class="doctor-card">
            <input type="radio" name="doctor" value="dr-desai">
            <div class="doctor-card-inner">
              <div class="doctor-avatar">VD</div>
              <div class="doctor-info">
                <span class="doctor-name">Dr. Vijay Desai</span>
                <span class="doctor-spec">Sports Medicine & Physiotherapy</span>
                <span class="doctor-exp">10 yrs experience · MBBS, MS, FISM</span>
              </div>
              <svg class="doctor-check" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
            </div>
          </label>
        </div>
        <div class="appt-nav">
          <button class="btn btn-outline" onclick="OrthoApp.apptPrev(2)">← Back</button>
          <button class="btn btn-primary" onclick="OrthoApp.apptNext(2)">Next →</button>
        </div>
      </div>

      <!-- Step 3: Date & Time -->
      <div class="appt-panel" id="apptStep3">
        <h3 class="appt-panel-title">Pick Date & Time</h3>
        <p class="appt-panel-sub">Choose a convenient slot</p>
        <div class="datetime-row">
          <div class="form-group">
            <label class="form-label">Preferred Date</label>
            <input type="date" class="form-input" id="apptDate" min="">
          </div>
          <div class="form-group">
            <label class="form-label">Branch</label>
            <select class="form-input" id="apptBranch">
              <option value="">Select branch</option>
              <option value="fc-road">FC Road, Pune</option>
              <option value="aundh">Aundh Branch</option>
              <option value="kothrud">Kothrud Branch</option>
              <option value="hadapsar">Hadapsar Branch</option>
            </select>
          </div>
        </div>
        <div class="form-group">
          <label class="form-label">Available Slots</label>
          <div class="time-slots" id="timeSlots">
            <button type="button" class="time-slot" data-time="09:00">9:00 AM</button>
            <button type="button" class="time-slot" data-time="09:30">9:30 AM</button>
            <button type="button" class="time-slot" data-time="10:00">10:00 AM</button>
            <button type="button" class="time-slot" data-time="10:30">10:30 AM</button>
            <button type="button" class="time-slot" data-time="11:00">11:00 AM</button>
            <button type="button" class="time-slot unavailable" data-time="11:30">11:30 AM</button>
            <button type="button" class="time-slot unavailable" data-time="12:00">12:00 PM</button>
            <button type="button" class="time-slot" data-time="14:00">2:00 PM</button>
            <button type="button" class="time-slot" data-time="14:30">2:30 PM</button>
            <button type="button" class="time-slot" data-time="15:00">3:00 PM</button>
            <button type="button" class="time-slot" data-time="15:30">3:30 PM</button>
            <button type="button" class="time-slot" data-time="16:00">4:00 PM</button>
          </div>
          <p class="slot-legend"><span class="legend-dot available"></span>Available &nbsp; <span class="legend-dot unavailable"></span>Booked</p>
        </div>
        <div class="appt-nav">
          <button class="btn btn-outline" onclick="OrthoApp.apptPrev(3)">← Back</button>
          <button class="btn btn-primary" onclick="OrthoApp.apptNext(3)">Next →</button>
        </div>
      </div>

      <!-- Step 4: Patient details -->
      <div class="appt-panel" id="apptStep4">
        <h3 class="appt-panel-title">Your Details</h3>
        <p class="appt-panel-sub">We'll send a confirmation to you</p>
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Full Name *</label>
            <input type="text" class="form-input" id="apptName" placeholder="e.g. Ramesh Kulkarni">
          </div>
          <div class="form-group">
            <label class="form-label">Mobile Number *</label>
            <input type="tel" class="form-input" id="apptPhone" placeholder="+91 98765 43210">
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Email Address</label>
            <input type="email" class="form-input" id="apptEmail" placeholder="your@email.com">
          </div>
          <div class="form-group">
            <label class="form-label">Age</label>
            <input type="number" class="form-input" id="apptAge" placeholder="e.g. 45" min="1" max="120">
          </div>
        </div>
        <div class="form-group">
          <label class="form-label">Describe your condition / symptoms (optional)</label>
          <textarea class="form-input form-textarea" id="apptNote" placeholder="Brief description of your issue..."></textarea>
        </div>
        <div class="appt-nav">
          <button class="btn btn-outline" onclick="OrthoApp.apptPrev(4)">← Back</button>
          <button class="btn btn-accent" onclick="OrthoApp.submitAppointment()">✓ Confirm Booking</button>
        </div>
      </div>

      <!-- Success state -->
      <div class="appt-panel" id="apptSuccess">
        <div class="appt-success-inner">
          <div class="success-icon">✅</div>
          <h3>Appointment Requested!</h3>
          <p>Thank you! We'll confirm your appointment via WhatsApp / SMS within 30 minutes.</p>
          <div class="success-ref">Reference: <strong id="apptRefNo"></strong></div>
          <button class="btn btn-primary" onclick="OrthoApp.closeAppointmentModal()">Done</button>
        </div>
      </div>

    </div>
  </div>
</div>`;

  /* ---- State ---- */
  const state = { step: 1 };

  /* ---- Public API ---- */
  window.OrthoApp = {
    openAppointmentModal,
    closeAppointmentModal,
    apptNext,
    apptPrev,
    submitAppointment
  };

  /* ---- Init ---- */
  document.addEventListener('DOMContentLoaded', () => {
    // Inject modal into body
    document.body.insertAdjacentHTML('beforeend', MODAL_HTML);

    // Close on backdrop click
    document.getElementById('appointmentModal').addEventListener('click', function (e) {
      if (e.target === this) closeAppointmentModal();
    });
    document.getElementById('apptModalClose').addEventListener('click', closeAppointmentModal);

    // Close on Escape
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') closeAppointmentModal();
    });

    // Time slot selection
    document.querySelectorAll('.time-slot:not(.unavailable)').forEach(btn => {
      btn.addEventListener('click', function () {
        document.querySelectorAll('.time-slot').forEach(b => b.classList.remove('selected'));
        this.classList.add('selected');
      });
    });

    // Set min date to today
    const dateInput = document.getElementById('apptDate');
    if (dateInput) dateInput.min = new Date().toISOString().split('T')[0];
  });

  function openAppointmentModal() {
    resetModal();
    document.getElementById('appointmentModal').classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeAppointmentModal() {
    document.getElementById('appointmentModal').classList.remove('active');
    document.body.style.overflow = '';
  }

  function apptNext(currentStep) {
    if (currentStep === 1 && !document.querySelector('input[name="service"]:checked')) {
      return showError('Please select a service to continue.');
    }
    if (currentStep === 2 && !document.querySelector('input[name="doctor"]:checked')) {
      return showError('Please select a doctor to continue.');
    }
    if (currentStep === 3) {
      const date = document.getElementById('apptDate').value;
      const time = document.querySelector('.time-slot.selected');
      const branch = document.getElementById('apptBranch').value;
      if (!date) return showError('Please select a date.');
      if (!branch) return showError('Please select a branch.');
      if (!time)  return showError('Please select a time slot.');
    }
    goToStep(currentStep + 1);
  }

  function apptPrev(currentStep) {
    goToStep(currentStep - 1);
  }

  function goToStep(n) {
    state.step = n;
    document.querySelectorAll('.appt-panel').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.appt-step').forEach(s => {
      const sn = parseInt(s.dataset.step);
      s.classList.toggle('active', sn === n);
      s.classList.toggle('done', sn < n);
    });
    const panel = document.getElementById('apptStep' + n);
    if (panel) panel.classList.add('active');
    document.querySelector('.overlay-box').scrollTop = 0;
  }

  function submitAppointment() {
    const name  = document.getElementById('apptName').value.trim();
    const phone = document.getElementById('apptPhone').value.trim();
    if (!name)  return showError('Please enter your full name.');
    if (!phone) return showError('Please enter your mobile number.');

    // Show success
    document.querySelectorAll('.appt-panel').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.appt-step').forEach(s => s.classList.add('done'));
    document.getElementById('apptSuccess').classList.add('active');
    document.getElementById('apptRefNo').textContent = 'OC-' + Math.floor(100000 + Math.random() * 900000);
    document.querySelector('.overlay-box').scrollTop = 0;
  }

  function resetModal() {
    document.querySelectorAll('input[name="service"]').forEach(r => r.checked = false);
    document.querySelectorAll('input[name="doctor"]').forEach(r => r.checked = false);
    document.querySelectorAll('.time-slot').forEach(b => b.classList.remove('selected'));
    ['apptDate','apptBranch','apptName','apptPhone','apptEmail','apptAge','apptNote'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.value = '';
    });
    goToStep(1);
    document.getElementById('apptSuccess').classList.remove('active');
    document.getElementById('apptStep1').classList.add('active');
  }

  function showError(msg) {
    alert(msg); // Replace with a nicer toast if desired
  }
})();
