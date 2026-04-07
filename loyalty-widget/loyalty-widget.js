class LoyaltyWidget extends HTMLElement {
  connectedCallback() {
    const shadow = this.attachShadow({ mode: 'open' });

    this.STORE_NAME = 'Joy Organics';
    this.CUSTOMER_NAME = 'Sarah Johnson';
    this.POINTS_BALANCE = 1750;
    this.DOLLAR_VALUE = (this.POINTS_BALANCE / 100).toFixed(2);
    this.CURRENT_TIER = 'Silver';
    this.NEXT_TIER = 'Gold';
    this.POINTS_TO_NEXT_TIER = 250;
    this.NEXT_TIER_THRESHOLD = 2000;

    this.TIERS = [
      { name: 'Bronze', threshold: 0, icon: '🥉', active: true },
      { name: 'Silver', threshold: 500, icon: '🥈', active: true, current: true },
      { name: 'Gold', threshold: 2000, icon: '🥇', active: false },
      { name: 'Platinum', threshold: 5000, icon: '💎', active: false },
    ];

    this.EARN_ACTIONS = [
      { icon: 'person-add', label: 'Join Program', points: 500 },
      { icon: 'bag', label: 'Place an Order', points: '1pt / $1' },
      { icon: 'star', label: 'Leave a Review', points: 200 },
      { icon: 'people', label: 'Refer a Friend', points: 500 },
      { icon: 'gift', label: 'Celebrate a Birthday', points: 100 },
      { icon: 'heart', label: 'Follow on Instagram', points: 50 },
    ];

    this.REWARDS = [
      { name: '$5 Off', cost: 500, icon: '🏷️' },
      { name: '$10 Off', cost: 1000, icon: '🏷️' },
      { name: 'Free Shipping', cost: 750, icon: '📦' },
      { name: '$25 Off', cost: 2500, icon: '🎁' },
    ];

    this._expandedSection = null;

    shadow.innerHTML = `
      <style>
        :host {
          display: block;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          --color-bg: #0f1117;
          --color-surface: #1a1d27;
          --color-surface-hover: #222531;
          --color-border: #2a2d3a;
          --color-primary: #7c6ef0;
          --color-primary-light: #a89bfa;
          --color-accent: #4fd1c5;
          --color-text: #e8e9ed;
          --color-text-muted: #8b8fa3;
          --color-text-dim: #5e6278;
          --color-gold: #f5c842;
          --color-success: #4ade80;
          --radius: 14px;
          --radius-sm: 10px;
        }

        * { box-sizing: border-box; margin: 0; padding: 0; }

        .widget {
          background: var(--color-bg);
          border-radius: var(--radius);
          overflow: hidden;
          max-width: 420px;
        }

        /* ── Header ── */
        .header {
          background: linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #4c1d95 100%);
          padding: 28px 24px 32px;
          text-align: center;
          position: relative;
          overflow: hidden;
        }

        .header::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle at 30% 70%, rgba(124,110,240,0.15) 0%, transparent 50%),
                      radial-gradient(circle at 80% 20%, rgba(79,209,197,0.1) 0%, transparent 40%);
          pointer-events: none;
        }

        .store-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(255,255,255,0.1);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255,255,255,0.12);
          padding: 5px 14px;
          border-radius: 999px;
          font-size: 12px;
          font-weight: 600;
          color: var(--color-primary-light);
          letter-spacing: 0.3px;
          margin-bottom: 16px;
          position: relative;
        }

        .store-badge svg {
          width: 14px;
          height: 14px;
        }

        .header-title {
          font-size: 14px;
          color: rgba(255,255,255,0.6);
          font-weight: 500;
          margin-bottom: 8px;
          position: relative;
        }

        .points-display {
          font-size: 42px;
          font-weight: 800;
          color: #fff;
          line-height: 1.1;
          margin-bottom: 4px;
          position: relative;
        }

        .points-label {
          font-size: 14px;
          color: rgba(255,255,255,0.5);
          font-weight: 500;
          position: relative;
        }

        .points-value {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(79,209,197,0.15);
          border: 1px solid rgba(79,209,197,0.25);
          color: var(--color-accent);
          font-size: 13px;
          font-weight: 600;
          padding: 4px 12px;
          border-radius: 999px;
          margin-top: 12px;
          position: relative;
        }

        /* ── Customer Card ── */
        .customer-card {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 18px 20px;
          margin: -16px 16px 0;
          background: var(--color-surface);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-sm);
          position: relative;
          z-index: 1;
        }

        .avatar {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--color-primary), var(--color-accent));
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          font-weight: 700;
          color: #fff;
          flex-shrink: 0;
          border: 2px solid var(--color-primary);
        }

        .customer-info {
          flex: 1;
          min-width: 0;
        }

        .customer-name {
          font-size: 15px;
          font-weight: 700;
          color: var(--color-text);
        }

        .customer-tier {
          font-size: 12px;
          color: var(--color-text-muted);
          display: flex;
          align-items: center;
          gap: 4px;
          margin-top: 2px;
        }

        .tier-badge {
          display: inline-block;
          background: rgba(245,200,66,0.15);
          color: var(--color-gold);
          font-size: 10px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          padding: 2px 8px;
          border-radius: 4px;
        }

        /* ── Body ── */
        .body {
          padding: 20px 16px 16px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        /* ── Tier Progress ── */
        .tier-progress {
          background: var(--color-surface);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-sm);
          padding: 18px 20px;
        }

        .section-title {
          font-size: 15px;
          font-weight: 700;
          color: var(--color-text);
          margin-bottom: 14px;
        }

        .progress-bar-container {
          position: relative;
          height: 6px;
          background: var(--color-border);
          border-radius: 999px;
          margin-bottom: 16px;
          overflow: hidden;
        }

        .progress-bar-fill {
          height: 100%;
          background: linear-gradient(90deg, var(--color-primary), var(--color-accent));
          border-radius: 999px;
          transition: width 1s ease;
        }

        .progress-info {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 12px;
          color: var(--color-text-muted);
          margin-bottom: 8px;
        }

        .progress-info strong {
          color: var(--color-accent);
          font-weight: 600;
        }

        .tier-steps {
          display: flex;
          justify-content: space-between;
          position: relative;
          margin-top: 12px;
        }

        .tier-steps::before {
          content: '';
          position: absolute;
          top: 15px;
          left: 18px;
          right: 18px;
          height: 2px;
          background: var(--color-border);
        }

        .tier-step {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          position: relative;
          z-index: 1;
        }

        .tier-step-dot {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          background: var(--color-border);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 13px;
          border: 2px solid var(--color-bg);
        }

        .tier-step-dot.active {
          background: var(--color-primary);
          box-shadow: 0 0 0 3px rgba(124,110,240,0.2);
        }

        .tier-step-dot.current {
          background: var(--color-accent);
          box-shadow: 0 0 0 3px rgba(79,209,197,0.2);
        }

        .tier-step-label {
          font-size: 10px;
          font-weight: 600;
          color: var(--color-text-dim);
          text-transform: uppercase;
          letter-spacing: 0.3px;
        }

        .tier-step.active .tier-step-label,
        .tier-step.current .tier-step-label {
          color: var(--color-text-muted);
        }

        /* ── Accordion Sections ── */
        .accordion-section {
          background: var(--color-surface);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-sm);
          overflow: hidden;
          transition: border-color 0.2s;
        }

        .accordion-section:hover {
          border-color: #3a3d4a;
        }

        .accordion-trigger {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 16px 20px;
          background: transparent;
          border: none;
          color: var(--color-text);
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          text-align: left;
          font-family: inherit;
          transition: background 0.15s;
        }

        .accordion-trigger:hover {
          background: var(--color-surface-hover);
        }

        .accordion-trigger-icon {
          width: 36px;
          height: 36px;
          border-radius: 10px;
          background: rgba(124,110,240,0.12);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 17px;
          flex-shrink: 0;
        }

        .accordion-trigger-text { flex: 1; }

        .accordion-chevron {
          color: var(--color-text-dim);
          font-size: 12px;
          transition: transform 0.25s;
        }

        .accordion-section.expanded .accordion-chevron {
          transform: rotate(180deg);
        }

        .accordion-content {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.35s ease;
        }

        .accordion-section.expanded .accordion-content {
          max-height: 600px;
        }

        .accordion-body {
          padding: 0 20px 18px;
        }

        /* ── Earn Actions ── */
        .earn-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 0;
          border-bottom: 1px solid var(--color-border);
        }

        .earn-row:last-child { border-bottom: none; }

        .earn-row-left {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .earn-icon {
          width: 32px;
          height: 32px;
          border-radius: 8px;
          background: rgba(124,110,240,0.08);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 15px;
          color: var(--color-primary-light);
        }

        .earn-label {
          font-size: 13px;
          color: var(--color-text);
          font-weight: 500;
        }

        .earn-points {
          font-size: 13px;
          font-weight: 700;
          color: var(--color-accent);
          white-space: nowrap;
        }

        /* ── Rewards ── */
        .rewards-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
        }

        .reward-card {
          background: var(--color-bg);
          border: 1px solid var(--color-border);
          border-radius: 10px;
          padding: 16px 14px;
          text-align: center;
          cursor: pointer;
          transition: all 0.2s;
        }

        .reward-card:hover {
          border-color: var(--color-primary);
          background: rgba(124,110,240,0.04);
        }

        .reward-card.available {
          border-color: rgba(79,209,197,0.3);
        }

        .reward-icon {
          font-size: 24px;
          margin-bottom: 8px;
        }

        .reward-name {
          font-size: 13px;
          font-weight: 700;
          color: var(--color-text);
          margin-bottom: 4px;
        }

        .reward-cost {
          font-size: 11px;
          color: var(--color-text-muted);
        }

        .reward-card.available .reward-cost {
          color: var(--color-accent);
          font-weight: 600;
        }

        /* ── Footer ── */
        .footer {
          padding: 0 16px 16px;
          text-align: center;
        }

        .powered-by {
          font-size: 11px;
          color: var(--color-text-dim);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 4px;
        }

        .powered-by strong {
          color: var(--color-text-muted);
          font-weight: 600;
        }

        @media (max-width: 420px) {
          .widget { border-radius: 0; }
          .header { padding: 24px 20px 28px; }
          .points-display { font-size: 36px; }
          .rewards-grid { grid-template-columns: 1fr 1fr; gap: 8px; }
        }
      </style>

      <div class="widget">
        <!-- Header -->
        <div class="header">
          <div class="store-badge">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>
            </svg>
            ${this.STORE_NAME} Loyalty
          </div>
          <p class="header-title">Your Points Balance</p>
          <p class="points-display">${this.POINTS_BALANCE.toLocaleString()}</p>
          <p class="points-label">points</p>
          <span class="points-value">= $${this.DOLLAR_VALUE} reward value</span>
        </div>

        <!-- Customer Card -->
        <div class="customer-card">
          <div class="avatar">${this.CUSTOMER_NAME.split(' ').map(n => n[0]).join('')}</div>
          <div class="customer-info">
            <div class="customer-name">${this.CUSTOMER_NAME}</div>
            <div class="customer-tier">
              <span class="tier-badge">${this.CURRENT_TIER} Tier</span>
              <span>Member</span>
            </div>
          </div>
        </div>

        <div class="body">
          <!-- Tier Progress -->
          <div class="tier-progress">
            <div class="section-title">Move Up Tiers</div>
            <div class="progress-info">
              <span>Spend <strong>${this.POINTS_TO_NEXT_TIER} more pts</strong> to reach ${this.NEXT_TIER}</span>
            </div>
            <div class="progress-bar-container">
              <div class="progress-bar-fill" style="width: ${(this.POINTS_BALANCE / this.NEXT_TIER_THRESHOLD * 100).toFixed(0)}%"></div>
            </div>
            <div class="tier-steps">
              ${this.TIERS.map(t => `
                <div class="tier-step ${t.active ? 'active' : ''} ${t.current ? 'current' : ''}">
                  <div class="tier-step-dot ${t.active ? 'active' : ''} ${t.current ? 'current' : ''}">${t.icon}</div>
                  <span class="tier-step-label">${t.name}</span>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Earn Points Accordion -->
          <div class="accordion-section" data-section="earn">
            <button class="accordion-trigger">
              <span class="accordion-trigger-icon">🎯</span>
              <span class="accordion-trigger-text">How to Earn Points</span>
              <span class="accordion-chevron">▼</span>
            </button>
            <div class="accordion-content">
              <div class="accordion-body">
                ${this.EARN_ACTIONS.map(a => `
                  <div class="earn-row">
                    <div class="earn-row-left">
                      <div class="earn-icon">${this._getActionIcon(a.icon)}</div>
                      <span class="earn-label">${a.label}</span>
                    </div>
                    <span class="earn-points">+${typeof a.points === 'number' ? a.points + ' pts' : a.points}</span>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>

          <!-- Redeem Rewards Accordion -->
          <div class="accordion-section" data-section="redeem">
            <button class="accordion-trigger">
              <span class="accordion-trigger-icon">🎁</span>
              <span class="accordion-trigger-text">Redeem Rewards</span>
              <span class="accordion-chevron">▼</span>
            </button>
            <div class="accordion-content">
              <div class="accordion-body">
                <div class="rewards-grid">
                  ${this.REWARDS.map(r => `
                    <div class="reward-card ${this.POINTS_BALANCE >= r.cost ? 'available' : ''}">
                      <div class="reward-icon">${r.icon}</div>
                      <div class="reward-name">${r.name}</div>
                      <div class="reward-cost">${r.cost.toLocaleString()} pts</div>
                    </div>
                  `).join('')}
                </div>
              </div>
            </div>
          </div>

          <!-- VIP Tiers Accordion -->
          <div class="accordion-section" data-section="vip">
            <button class="accordion-trigger">
              <span class="accordion-trigger-icon">🏆</span>
              <span class="accordion-trigger-text">VIP Tiers</span>
              <span class="accordion-chevron">▼</span>
            </button>
            <div class="accordion-content">
              <div class="accordion-body">
                ${this.TIERS.map(t => `
                  <div class="earn-row">
                    <div class="earn-row-left">
                      <div class="earn-icon">${t.icon}</div>
                      <span class="earn-label">${t.name}</span>
                    </div>
                    <span class="earn-points" style="color: ${t.current ? 'var(--color-accent)' : 'var(--color-text-muted)'}; font-weight: ${t.current ? '700' : '500'};">
                      ${t.threshold === 0 ? 'Sign up' : t.threshold.toLocaleString() + ' pts'}
                      ${t.current ? ' ✓' : ''}
                    </span>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div class="footer">
          <span class="powered-by">Powered by <strong>Okendo</strong> Loyalty</span>
        </div>
      </div>
    `;

    shadow.querySelectorAll('.accordion-trigger').forEach(trigger => {
      trigger.addEventListener('click', () => {
        const section = trigger.closest('.accordion-section');
        const sectionKey = section.dataset.section;

        if (this._expandedSection === sectionKey) {
          section.classList.remove('expanded');
          this._expandedSection = null;
        } else {
          shadow.querySelectorAll('.accordion-section').forEach(s => s.classList.remove('expanded'));
          section.classList.add('expanded');
          this._expandedSection = sectionKey;
        }
      });
    });
  }

  _getActionIcon(type) {
    const icons = {
      'person-add': '👤',
      'bag': '🛍️',
      'star': '⭐',
      'people': '👥',
      'gift': '🎂',
      'heart': '❤️',
    };
    return icons[type] || '●';
  }

  refresh() {
    this.shadowRoot.innerHTML = '';
    this.connectedCallback();
  }
}

export default LoyaltyWidget;
