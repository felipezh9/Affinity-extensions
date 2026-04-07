class PromoBanner extends HTMLElement {
  connectedCallback() {
    if (sessionStorage.getItem('promo-banner-dismissed') === 'true') {
      this.style.display = 'none';
      return;
    }

    const shadow = this.attachShadow({ mode: 'open' });

    this.PRODUCT_NAME = 'Coffee Mug';
    this.PRODUCT_IMAGE = 'https://recharge-noons-coffee.myshopify.com/cdn/shop/files/Premiummatcha_2.png?v=1769192650&width=1920';
    this.VARIANT_ID = '46334392598717';
    this.ORIGINAL_PRICE = 35.00;
    this.DISCOUNT_PERCENT = 25;
    this.DISCOUNTED_PRICE = (this.ORIGINAL_PRICE * (1 - this.DISCOUNT_PERCENT / 100)).toFixed(2);

    shadow.innerHTML = `
      <style>
        :host {
          display: block;
          font-family: inherit;
        }

        .banner {
          position: relative;
          display: flex;
          align-items: center;
          gap: 20px;
          padding: 20px 24px;
          border-radius: 16px;
          background: #fff;
          color: #1b3a4b;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
          overflow: hidden;
        }

        .accent-bar {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, #f59e0b, #f97316);
        }

        .close-btn {
          position: absolute;
          top: 10px;
          right: 10px;
          background: transparent;
          border: 1px solid #e2e8f0;
          color: #94a3b8;
          width: 26px;
          height: 26px;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
          line-height: 1;
          transition: all 0.2s;
          z-index: 2;
        }

        .close-btn:hover {
          background: #f1f5f9;
          color: #475569;
          border-color: #cbd5e1;
        }

        .image-wrapper {
          flex-shrink: 0;
          width: 88px;
          height: 88px;
          border-radius: 12px;
          overflow: hidden;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
        }

        .image-wrapper img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .content {
          flex: 1;
          min-width: 0;
          padding-right: 20px;
        }

        .badge {
          display: inline-block;
          background: #fef3c7;
          color: #92400e;
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          padding: 2px 8px;
          border-radius: 4px;
          margin-bottom: 6px;
        }

        .product-name {
          font-size: 16px;
          font-weight: 700;
          margin: 0 0 2px 0;
          line-height: 1.3;
          color: #0f172a;
        }

        .subtitle {
          font-size: 13px;
          color: #64748b;
          margin: 0 0 10px 0;
          line-height: 1.4;
        }

        .pricing {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 12px;
        }

        .original-price {
          font-size: 13px;
          color: #94a3b8;
          text-decoration: line-through;
        }

        .sale-price {
          font-size: 18px;
          font-weight: 700;
          color: #0f172a;
        }

        .discount-tag {
          font-size: 11px;
          font-weight: 700;
          background: #dcfce7;
          color: #166534;
          padding: 2px 8px;
          border-radius: 4px;
        }

        .cta-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #1b3a4b;
          color: #fff;
          font-size: 13px;
          font-weight: 600;
          padding: 8px 20px;
          border: none;
          border-radius: 999px;
          cursor: pointer;
          text-decoration: none;
          transition: all 0.2s;
        }

        .cta-btn:hover {
          background: #264e63;
        }

        .cta-btn:active {
          background: #153040;
        }

        .cta-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .spinner {
          width: 14px;
          height: 14px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-top-color: #fff;
          border-radius: 50%;
          animation: spin 0.6s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .success-msg {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: #dcfce7;
          color: #166534;
          font-size: 13px;
          font-weight: 600;
          padding: 6px 14px;
          border-radius: 999px;
        }

        .error-msg {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: #fee2e2;
          color: #991b1b;
          font-size: 13px;
          font-weight: 600;
          padding: 6px 14px;
          border-radius: 999px;
        }

        @media (max-width: 520px) {
          .banner {
            flex-direction: column;
            text-align: center;
            padding: 24px 16px 20px;
            gap: 14px;
          }

          .content {
            padding-right: 0;
          }

          .pricing {
            justify-content: center;
          }

          .image-wrapper {
            width: 72px;
            height: 72px;
          }
        }
      </style>

      <div class="banner">
        <div class="accent-bar"></div>
        <button class="close-btn" aria-label="Dismiss">&times;</button>

        <div class="image-wrapper">
          <img src="${this.PRODUCT_IMAGE}" alt="${this.PRODUCT_NAME}" />
        </div>

        <div class="content">
          <span class="badge">New Launch</span>
          <p class="product-name">${this.PRODUCT_NAME}</p>
          <p class="subtitle">Add it to your next order and get an exclusive launch discount!</p>

          <div class="pricing">
            <span class="original-price">$${this.ORIGINAL_PRICE.toFixed(2)}</span>
            <span class="sale-price">$${this.DISCOUNTED_PRICE}</span>
            <span class="discount-tag">${this.DISCOUNT_PERCENT}% OFF</span>
          </div>

          <div class="action-area">
            <button class="cta-btn" id="add-btn">Add to My Next Order</button>
          </div>
        </div>
      </div>
    `;

    shadow.querySelector('.close-btn').addEventListener('click', () => {
      sessionStorage.setItem('promo-banner-dismissed', 'true');
      this.style.display = 'none';
    });

    shadow.querySelector('#add-btn').addEventListener('click', () => this.addToNextOrder());
  }

  loadRechargeSDK() {
    if (window.recharge) return Promise.resolve(window.recharge);

    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://static.rechargecdn.com/assets/storefront/recharge-client-1.80.0.min.js';
      script.onload = () => {
        if (window.recharge) resolve(window.recharge);
        else reject(new Error('SDK loaded but window.recharge not found'));
      };
      script.onerror = () => reject(new Error('Failed to load Recharge SDK script'));
      document.head.appendChild(script);
    });
  }

  async addToNextOrder() {
    const shadow = this.shadowRoot;
    const actionArea = shadow.querySelector('.action-area');
    const btn = shadow.querySelector('#add-btn');

    btn.disabled = true;
    btn.innerHTML = '<span class="spinner"></span> Adding...';

    try {
      const sdk = await this.loadRechargeSDK();
      sdk.init({ storeIdentifier: window.location.hostname });

      const session = await sdk.auth.loginCustomerPortal();

      const addressData = await sdk.address.listAddresses(session, { limit: 1 });
      const addresses = addressData?.addresses;
      if (!addresses || addresses.length === 0) {
        throw new Error('No address found for this customer.');
      }

      await sdk.onetime.createOnetime(session, {
        address_id: addresses[0].id,
        add_to_next_charge: true,
        external_variant_id: { ecommerce: this.VARIANT_ID },
        quantity: 1,
        price: this.DISCOUNTED_PRICE,
        product_title: this.PRODUCT_NAME,
      });

      actionArea.innerHTML = '<span class="success-msg">&#10003; Added to your next order!</span>';
      document.dispatchEvent(new CustomEvent('Affinity:refresh'));

    } catch (err) {
      console.error('Promo banner error:', err);
      actionArea.innerHTML = '<span class="error-msg">Something went wrong. Please try again.</span>';
      setTimeout(() => {
        actionArea.innerHTML = '<button class="cta-btn" id="add-btn">Add to My Next Order</button>';
        shadow.querySelector('#add-btn').addEventListener('click', () => this.addToNextOrder());
      }, 3000);
    }
  }
}

export default PromoBanner;
